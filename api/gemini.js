// Vercel Serverless Function: /api/gemini
module.exports = async function handler(req, res) {
  // Hanya terima method POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method Not Allowed" } });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

  if (!GEMINI_API_KEY) {
    return res.status(500).json({
      error: {
        message: "GEMINI_API_KEY belum dikonfigurasi di Environment Variables Vercel."
      }
    });
  }

  try {
    const { systemInstruction, contents, generationConfig } = req.body || {};

    if (!contents || !Array.isArray(contents) || contents.length === 0) {
      return res.status(400).json({
        error: { message: "Field 'contents' wajib diisi dan tidak boleh kosong." }
      });
    }

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    const payload = {
      contents,
      generationConfig: generationConfig || { temperature: 0.6, maxOutputTokens: 1024 }
    };

    if (systemInstruction) {
      payload.systemInstruction = systemInstruction;
    }

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Gemini API proxy error:", err.message);
    return res.status(500).json({
      error: { message: "Gagal menghubungi Gemini API: " + err.message }
    });
  }
};
