// ==========================================================================
// PetaKarir — Express Proxy Server for Gemini API
// Meneruskan permintaan dari frontend ke Gemini API agar API key tetap aman
// ==========================================================================
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

if (!GEMINI_API_KEY) {
  console.error("ERROR: GEMINI_API_KEY belum diatur di file .env");
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API proxy endpoint — menerima request dari frontend dan meneruskan ke Gemini
app.post("/api/gemini", async (req, res) => {
  try {
    const { systemInstruction, contents, generationConfig } = req.body;

    if (!contents || !Array.isArray(contents) || contents.length === 0) {
      return res.status(400).json({ error: { message: "Field 'contents' wajib diisi dan tidak boleh kosong." } });
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

    return res.json(data);
  } catch (err) {
    console.error("Gemini API proxy error:", err.message);
    return res.status(500).json({ error: { message: "Gagal menghubungi Gemini API: " + err.message } });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ PetaKarir server berjalan di http://localhost:${PORT}`);
  console.log(`  Model Gemini: ${GEMINI_MODEL}`);
});
