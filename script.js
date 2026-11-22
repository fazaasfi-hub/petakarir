const STORAGE_KEYS = {
  THEME: "petakarir_theme",
  ACTIVE_PROF: "petakarir_active_prof"
};

// Built-in offline SVG fallback so images never break
const FALLBACK_IMAGE_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800" viewBox="0 0 1400 800">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="55%" stop-color="#115e59"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="800" fill="url(#bg)"/>
      <text x="50%" y="48%" text-anchor="middle" fill="#f8fafc" font-family="sans-serif" font-size="46" font-weight="700" letter-spacing="6">PETAKARIR</text>
      <text x="50%" y="55%" text-anchor="middle" fill="#99f6e4" font-family="sans-serif" font-size="20" letter-spacing="2">DIREKTORI PROFESI RUMAH SAKIT</text>
    </svg>`
  );

// ==========================================================================
// 2. DATASET: 5 PROFESI UTAMA RUMAH SAKIT
// ==========================================================================
const DEFAULT_PROFESSIONS = [
  {
    id: "dokter-medis",
    shortName: "Dokter Medis",
    category: "Pelayanan Medis & Klinis",
    title: "Dokter Umum & Spesialis",
    tagline: "Garda terdepan diagnosis klinis, tata laksana terapi, dan keselamatan pasien di rumah sakit.",
    heroSummary: "Menangani diagnosis klinis, tindakan medis, hingga perawatan pasien terpadu dengan estimasi penghasilan Rp 12 Juta – Rp 65+ Juta per bulan.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
    thumbImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80",
    statSalary: "Rp 12 – 65+ Jt/bln",
    statEdu: "S1 Profesi + STR & SIP",
    statShift: "Poliklinik & Jaga Shift",
    overview: "Dokter di rumah sakit bertanggung jawab melakukan pemeriksaan fisik, menegakkan diagnosis berdasarkan bukti klinis dan penunjang diagnostik, merencanakan terapi farmakologis maupun operatif, serta memimpin tim medis multidisiplin demi pemulihan pasien secara optimal.",
    salaries: {
      entry: "Rp 9.000.000 – Rp 15.000.000 / bulan (Dokter Umum / Jaga IGD)",
      mid: "Rp 18.000.000 – Rp 32.000.000 / bulan (Dokter Umum Senior / PPDS)",
      senior: "Rp 35.000.000 – Rp 85.000.000+ / bulan (Dokter Spesialis & Subspesialis)",
      intl: "USD 12.000 – USD 28.000 / bulan (Singapura, Timur Tengah, Australia)"
    },
    allowances: "Jasa medis per tindakan & konsultasi pasien, insentif jaga IGD/ICU malam hari, tunjangan fungsional dokter, perlindungan asuransi malpraktik profesi, serta dana pendidikan berkelanjutan (SKP/seminar).",
    education: "Sarjana Kedokteran (S.Ked) + Pendidikan Profesi Dokter (dr.), lulus UKMPPD, Program Internsip Dokter Indonesia (PIDI), memiliki STR Seumur Hidup dari KKI, dan Surat Izin Praktik (SIP) aktif.",
    shift: "Kombinasi jadwal poliklinik rawat jalan (pagi/sore) dan sistem jaga shift IGD/rawat inap (8–12 jam per shift) serta jadwal on-call untuk kasus kegawatdaruratan.",
    workEnv: "Instalasi Gawat Darurat (IGD), Poliklinik Spesialis, Bangsal Rawat Inap, Ruang Operasi (OK), dan Intensive Care Unit (ICU).",
    outlook: "Sangat tinggi; rasio dokter terhadap populasi Indonesia masih terus ditingkatkan, terutama untuk dokter spesialis di rumah sakit rujukan daerah maupun swasta.",
    careerLadder: [
      { level: "Tahap 1", role: "Dokter Internsip & Dokter Jaga IGD", note: "Penanganan kasus akut & stabilisasi pasien" },
      { level: "Tahap 2", role: "Dokter Umum Tetap / Case Manager", note: "Manajemen rawat inap & koordinasi klinis" },
      { level: "Tahap 3", role: "Dokter Spesialis (Sp.PD, Sp.B, dll.)", note: "Keahlian klinis spesifik & tindakan lanjutan" },
      { level: "Tahap 4", role: "Subspesialis / Direktur Pelayanan Medis", note: "Konsultan utama & pimpinan strategis RS" }
    ],
    tasks: [
      "Melakukan anamnesis, pemeriksaan fisik komprehensif, dan menentukan pemeriksaan penunjang lab/radiologi.",
      "Menegakkan diagnosis klinis serta menyusun rencana terapi dan resep obat yang rasional.",
      "Melakukan visite harian pasien rawat inap dan mengevaluasi respons pengobatan.",
      "Memberikan edukasi medis dan informed consent kepada pasien maupun keluarga."
    ],
    hardSkills: [
      "Penegakan Diagnosis Klinis & Kegawatdaruratan (ACLS/ATLS)",
      "Interpretasi Hasil Laboratorium, EKG & Pencitraan Radiologi",
      "Prosedur Tindakan Medis Invasif & Non-Invasif",
      "Dokumentasi Rekam Medis Elektronik (EMR) & Standar Akreditasi RS"
    ],
    softSkills: [
      "Pengambilan Keputusan Cepat di Bawah Tekanan Tinggi",
      "Empati Klinis & Komunikasi Terapeutik kepada Keluarga Pasien",
      "Kepemimpinan Tim Multidisiplin (Perawat, Apoteker, Analis)",
      "Ketahanan Mental & Etika Kedokteran yang Kuat"
    ],
    pros: [
      "Otoritas klinis tinggi dengan dampak langsung menyelamatkan nyawa pasien.",
      "Potensi penghasilan dan jasa medis yang sangat kompetitif seiring spesialisasi.",
      "Fleksibilitas praktik di maksimal 3 fasilitas pelayanan kesehatan sesuai SIP."
    ],
    cons: [
      "Masa pendidikan panjang (5,5–6 tahun untuk dokter umum, ditambah 4–5 tahun spesialis).",
      "Jam kerja panjang termasuk jaga malam, akhir pekan, dan panggilan darurat (on-call).",
      "Tanggung jawab hukum dan risiko kelelahan emosional (burnout) yang tinggi."
    ],
    stages: [
      {
        title: "Pendidikan Sarjana & Kepaniteraan Klinik (Koas)",
        duration: "5,5 – 6 Tahun",
        desc: "Menyelesaikan pendidikan akademik S.Ked dan rotasi klinik di berbagai departemen rumah sakit pendidikan.",
        deliverables: ["Gelar Sarjana Kedokteran (S.Ked)", "Rotasi klinik stase mayor & minor", "Lulus ujian nasional UKMPPD"],
        resources: "Konsil Kedokteran Indonesia (KKI) & Ikatan Dokter Indonesia (IDI)"
      },
      {
        title: "Program Internsip & Penerbitan STR/SIP",
        duration: "1 Tahun",
        desc: "Praktik kemandirian klinis di rumah sakit dan puskesmas di bawah pendampingan sebelum mengurus izin praktik mandiri.",
        deliverables: ["Surat Tanda Selesai Internsip (STSI)", "STR Dokter dari KKI", "Pengurusan SIP di Dinas Kesehatan"],
        resources: "Kementerian Kesehatan RI & Sistem SatuSehat SDMK"
      },
      {
        title: "Sertifikasi Kegawatdaruratan & Praktik Klinis",
        duration: "Berjalan",
        desc: "Memperkuat kompetensi penanganan kasus kritis IGD dan pemenuhan Satuan Kredit Profesi (SKP).",
        deliverables: ["Sertifikat ACLS, ATLS, & EKG Lanjutan", "Praktik dokter jaga IGD atau poliklinik umum"],
        resources: "PERKI, IKABI, & Platform Pelataran Sehat Kemenkes"
      },
      {
        title: "Program Pendidikan Dokter Spesialis (PPDS)",
        duration: "4 – 5 Tahun",
        desc: "Pendidikan lanjutan berbasis rumah sakit untuk menjadi dokter spesialis di bidang bedah, penyakit dalam, anak, atau lainnya.",
        deliverables: ["Ujian masuk PPDS berbasis hospital/university", "Gelar Spesialis & SIP Spesialis"],
        resources: "Kolegium Spesialis Nasional & RS Pendidikan Utama"
      }
    ]
  },
  {
    id: "perawat-klinis",
    shortName: "Perawat Klinis",
    category: "Keperawatan & Asuhan Pasien",
    title: "Perawat Klinis / Ners",
    tagline: "Pendamping utama pemulihan pasien 24 jam dengan ketelitian klinis dan empati tinggi.",
    heroSummary: "Mengelola asuhan keperawatan, pemantauan tanda vital, dan tindakan klinis pasien 24 jam dengan estimasi gaji Rp 6 Juta – Rp 22+ Juta per bulan.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
    thumbImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=700&q=80",
    statSalary: "Rp 6 – 22+ Jt/bln",
    statEdu: "D3 / S1 Ners + STR",
    statShift: "3 Shift (Pagi/Sore/Malam)",
    overview: "Perawat Klinis (Ners) merupakan tulang punggung pelayanan rumah sakit yang mendampingi pasien secara berkesinambungan. Tugasnya mencakup pengkajian keperawatan, pemberian obat dan cairan intravena, pemantauan hemodinamik, asistensi tindakan medis, hingga edukasi perawatan mandiri.",
    salaries: {
      entry: "Rp 5.500.000 – Rp 8.000.000 / bulan (Perawat Pelaksana PK I)",
      mid: "Rp 8.500.000 – Rp 13.500.000 / bulan (Perawat Klinis PK II–III)",
      senior: "Rp 14.000.000 – Rp 22.000.000 / bulan (Kepala Ruangan / Perawat ICU-OK)",
      intl: "USD 3.800 – USD 7.500 / bulan (Jepang, Jerman, Arab Saudi, Australia)"
    },
    allowances: "Tunjangan shift malam, tunjangan area khusus berisiko tinggi (ICU, IGD, Kamar Bedah, Hemodialisa), jasa pelayanan keperawatan, BPJS Kesehatan & Ketenagakerjaan, serta THR.",
    education: "D3 Keperawatan (A.Md.Kep) atau S1 Keperawatan + Profesi Ners (Ns.), lulus Uji Kompetensi Nasional (UKOM), memiliki STR aktif dan Surat Izin Praktik Perawat (SIPP).",
    shift: "Sistem 3 shift bergilir: Shift Pagi (07.00–14.00), Shift Sore (14.00–21.00), dan Shift Malam (21.00–07.00) dengan jadwal libur rotasi.",
    workEnv: "Bangsal Rawat Inap, IGD, ICU/NICU/PICU, Kamar Operasi (Perawat Scrub/Sirkuler), Unit Hemodialisa, dan Poliklinik.",
    outlook: "Kebutuhan paling besar di seluruh rumah sakit nasional maupun luar negeri (program G-to-G Jepang, Jerman, dan Timur Tengah).",
    careerLadder: [
      { level: "Tahap 1", role: "Perawat Klinis I (PK I)", note: "Asuhan keperawatan dasar di bawah supervisi" },
      { level: "Tahap 2", role: "Perawat Klinis II & III (PK II–III)", note: "Mandiri & spesialisasi unit kritis (ICU/IGD)" },
      { level: "Tahap 3", role: "Kepala Ruangan (Head Nurse) / CCM", note: "Manajemen bangsal & mutu asuhan keperawatan" },
      { level: "Tahap 4", role: "Manajer Keperawatan / Ners Spesialis", note: "Pimpinan komite & kebijakan keperawatan RS" }
    ],
    tasks: [
      "Melakukan pengkajian kondisi pasien, mengukur tanda-tanda vital, dan memantau keseimbangan cairan.",
      "Memberikan obat injeksi, oral, maupun infus sesuai prinsip 7 Benar pemberian obat.",
      "Melakukan perawatan luka modern, pemasangan kateter, NGT, dan asistensi tindakan dokter.",
      "Menyusun dokumentasi asuhan keperawatan (SDKI, SLKI, SIKI) pada sistem informasi rumah sakit."
    ],
    hardSkills: [
      "Basic Trauma Cardiac Life Support (BTCLS)",
      "Pemasangan Akses Vena, Terapi Infus & Pemantauan Monitor Pasien",
      "Standar Asuhan Keperawatan Indonesia (SDKI, SLKI, SIKI)",
      "Pengendalian Infeksi Nosokomial (PPI) & Patient Safety"
    ],
    softSkills: [
      "Empati Tinggi & Kesabaran Menghadapi Pasien",
      "Ketelitian Ekstra dalam Pemberian Dosis Obat",
      "Komunikasi Efektif saat Handover Antar-Shift (SBAR)",
      "Stamina Fisik & Manajemen Stres di Unit Kritis"
    ],
    pros: [
      "Peluang kerja sangat luas baik di rumah sakit dalam negeri maupun luar negeri.",
      "Jenjang Perawat Klinis (PK I sampai PK V) terstruktur jelas beserta tunjangan kompetensinya.",
      "Keterampilan klinis praktis yang sangat bermanfaat bagi keluarga dan masyarakat."
    ],
    cons: [
      "Jadwal kerja shift malam dan hari libur nasional yang menuntut adaptasi pola tidur.",
      "Beban kerja fisik cukup tinggi saat rasio pasien perawat sedang padat.",
      "Paparan risiko infeksi biologis jika kepatuhan APD tidak dijaga ketat."
    ],
    stages: [
      {
        title: "Pendidikan D3 Keperawatan atau S1 + Profesi Ners",
        duration: "3 – 5 Tahun",
        desc: "Menempuh perkuliahan teori, laboratorium keterampilan keperawatan, dan praktik klinik di rumah sakit.",
        deliverables: ["Gelar A.Md.Kep atau Ns.", "Logbook praktik klinik dasar & lanjutan"],
        resources: "AIPNI & PPNI (Persatuan Perawat Nasional Indonesia)"
      },
      {
        title: "Uji Kompetensi Nasional & Sertifikasi BTCLS",
        duration: "3 – 6 Bulan",
        desc: "Lulus ujian kompetensi nasional untuk mendapatkan STR dan mengikuti pelatihan kegawatdaruratan dasar.",
        deliverables: ["Sertifikat Kompetensi & STR Perawat", "Sertifikat pelatihan BTCLS aktif"],
        resources: "Lembaga Diklat Keperawatan Terakreditasi Kemenkes"
      },
      {
        title: "Kredensialing & Praktik Perawat Klinis (PK I–II)",
        duration: "1 – 3 Tahun",
        desc: "Mengikuti proses kredensial Komite Keperawatan RS untuk memperoleh Rincian Kewenangan Klinis (RKK).",
        deliverables: ["SIPP aktif", "Surat Penugasan Klinis dari Direktur RS"],
        resources: "Komite Keperawatan Rumah Sakit"
      },
      {
        title: "Spesialisasi Unit Kritis atau Karier Internasional",
        duration: "Lanjutan",
        desc: "Mengambil pelatihan ICU, Kamar Bedah, Hemodialisa, atau program penempatan perawat ke luar negeri.",
        deliverables: ["Sertifikat Pelatihan Keperawatan Intensif/Bedah", "Posisi Perawat Senior / Kepala Ruangan"],
        resources: "HIPERCCI, HIPKABI, & BP2MI"
      }
    ]
  },
  {
    id: "apoteker-klinis",
    shortName: "Apoteker Klinis",
    category: "Farmasi & Pengelolaan Obat",
    title: "Apoteker Klinis Rumah Sakit",
    tagline: "Penjamin keamanan terapi obat, pencegahan interaksi obat, dan tata kelola farmasi klinis.",
    heroSummary: "Mengawasi rasionalitas resep, peracikan steril, serta konseling obat pasien dengan estimasi penghasilan Rp 7,5 Juta – Rp 25+ Juta per bulan.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=80",
    thumbImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=700&q=80",
    statSalary: "Rp 7,5 – 25+ Jt/bln",
    statEdu: "S1 Farmasi + Apt (STRA/SIPA)",
    statShift: "Shift Farmasi & Visite Klinis",
    overview: "Apoteker Klinis di rumah sakit memastikan setiap pasien menerima terapi obat yang tepat indikasi, tepat dosis, aman dari interaksi berbahaya, dan efektif secara biaya. Selain manajemen perbekalan farmasi, apoteker melakukan visite bersama dokter dan pencampuran sediaan steril.",
    salaries: {
      entry: "Rp 6.500.000 – Rp 9.500.000 / bulan (Apoteker Pelaksana / Depo)",
      mid: "Rp 10.000.000 – Rp 16.000.000 / bulan (Apoteker Klinis Rawat Inap / ICU)",
      senior: "Rp 17.000.000 – Rp 28.000.000 / bulan (Kepala Instalasi Farmasi RS)",
      intl: "USD 5.500 – USD 11.000 / bulan (Singapura, Australia, Inggris, UEA)"
    },
    allowances: "Tunjangan profesi apoteker (SIPA), insentif pencampuran sitostatika/IV admixture, jasa pelayanan farmasi klinis, tunjangan shift depo IGD 24 jam, dan asuransi kesehatan.",
    education: "Sarjana Farmasi (S.Farm) + Pendidikan Profesi Apoteker (Apt.), lulus UKMPPAI, memiliki Surat Tanda Registrasi Apoteker (STRA) dan Surat Izin Praktik Apoteker (SIPA).",
    shift: "Jam kerja reguler manajemen (08.00–16.00) untuk instalasi logistik/klinis, serta sistem shift pada Depo Farmasi Rawat Jalan dan Depo IGD 24 jam.",
    workEnv: "Instalasi Farmasi Rumah Sakit (IFRS), Depo Rawat Jalan & IGD, Ruang Pencampuran Obat Steril (Clean Room), dan Bangsal Rawat Inap.",
    outlook: "Terus bertumbuh pesat seiring kewajiban akreditasi rumah sakit (STARKES/JCI) yang mewajibkan rasio apoteker klinis di setiap bangsal rawat inap.",
    careerLadder: [
      { level: "Tahap 1", role: "Apoteker Depo & Pelayanan Resep", note: "Skrining resep, dispensing & konseling pasien" },
      { level: "Tahap 2", role: "Apoteker Farmasi Klinis Bangsal", note: "Visite tim medis & pemantauan terapi obat (PTO)" },
      { level: "Tahap 3", role: "Koordinator Farmasi Klinis / Logistik", note: "Pengendalian formularium & obat high-alert" },
      { level: "Tahap 4", role: "Kepala Instalasi Farmasi (Ka. IFRS)", note: "Manajemen anggaran, pengadaan & mutu farmasi RS" }
    ],
    tasks: [
      "Melakukan skrining administratif, farmasetik, dan klinis pada setiap resep dokter sebelum obat diserahkan.",
      "Melaksanakan Pemantauan Terapi Obat (PTO), rekonsiliasi obat saat pasien masuk/pulang, dan pelaporan MESO.",
      "Melakukan pencampuran sediaan intravena steril (IV Admixture), nutrisi parenteral (TPN), dan sitostatika.",
      "Mengelola perencanaan, pengadaan, penyimpanan rantai dingin (cold chain), dan pengendalian stok obat."
    ],
    hardSkills: [
      "Farmakoterapi Klinis & Analisis Interaksi Obat",
      "Aseptic Dispensing & Penanganan Obat Sitostatika",
      "Manajemen Logistik Farmasi, Formularium RS & Sistem ERP",
      "Evaluasi Penggunaan Obat (EPO) & Farmakoekonomi"
    ],
    softSkills: [
      "Ketelitian Tinggi terhadap Dosis & Obat High-Alert (LASA)",
      "Komunikasi Asertif saat Berdiskusi Resep dengan Dokter",
      "Kemampuan Edukasi Pasien dengan Bahasa Sederhana",
      "Integritas Tinggi dalam Pengawasan Narkotika & Psikotropika"
    ],
    pros: [
      "Lingkungan kerja bersih, terstruktur, dan menggabungkan ilmu klinis serta manajemen.",
      "Peran strategis dalam mencegah medication error di rumah sakit.",
      "Peluang karier stabil di rumah sakit pemerintah, swasta, maupun industri alat kesehatan."
    ],
    cons: [
      "Tanggung jawab hukum ketat terkait pengelolaan obat narkotika, psikotropika, dan high-alert.",
      "Antrean resep rawat jalan yang padat pada jam puncak poliklinik.",
      "Memerlukan pembaruan ilmu obat baru yang terus berkembang setiap tahun."
    ],
    stages: [
      {
        title: "Sarjana Farmasi (S.Farm) & Profesi Apoteker (Apt.)",
        duration: "5 Tahun",
        desc: "Menyelesaikan studi sarjana farmasi dan praktik kerja profesi apoteker (PKPA) di rumah sakit.",
        deliverables: ["Gelar Apoteker (Apt.)", "Lulus ujian nasional UKMPPAI"],
        resources: "Ikatan Apoteker Indonesia (IAI) & APTFI"
      },
      {
        title: "Registrasi STRA & Pengurusan SIPA Rumah Sakit",
        duration: "2 – 4 Bulan",
        desc: "Mengurus registrasi kompetensi nasional dan izin praktik resmi pada fasilitas kesehatan.",
        deliverables: ["STRA aktif", "SIPA fasilitas pelayanan kefarmasian"],
        resources: "Konsil Tenaga Kesehatan Indonesia (KTKI) & SatuSehat"
      },
      {
        title: "Pelatihan Farmasi Klinis & Aseptic Dispensing",
        duration: "6 – 12 Bulan",
        desc: "Menguasai teknik pencampuran sediaan steril, pemantauan terapi obat, dan manajemen obat high-alert.",
        deliverables: ["Sertifikat Pelatihan Farmasi Klinis RS", "Kewenangan klinis apoteker"],
        resources: "HISFARSI (Himpunan Seminat Farmasi Rumah Sakit)"
      },
      {
        title: "Spesialisasi Farmasi Klinis / Manajemen IFRS",
        duration: "Lanjutan",
        desc: "Melanjutkan ke jenjang Magister Farmasi Klinis atau menjadi Kepala Instalasi Farmasi.",
        deliverables: ["Gelar M.Farm.Klin", "Jabatan Koordinator / Kepala IFRS"],
        resources: "Program Pascasarjana Farmasi Klinis Nasional"
      }
    ]
  },
  {
    id: "analis-lab-medis",
    shortName: "Analis Lab Medis",
    category: "Diagnostik & Laboratorium RS",
    title: "Analis Laboratorium Medis (ATLM)",
    tagline: "Penentu akurasi data diagnostik klinis melalui analisis sampel biologis berteknologi tinggi.",
    heroSummary: "Mengoperasikan instrumen diagnostik laboratorium dan memvalidasi hasil pemeriksaan pasien dengan gaji Rp 5,5 Juta – Rp 18+ Juta per bulan.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80",
    thumbImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=700&q=80",
    statSalary: "Rp 5,5 – 18+ Jt/bln",
    statEdu: "D3 / D4 TLM + STR",
    statShift: "Shift 24 Jam Lab RS",
    overview: "Ahli Teknologi Laboratorium Medik (ATLM) berperan krusial di balik layar keputusan medis dengan mengolah dan menganalisis sampel darah, urine, jaringan, dan mikrobiologi. Lebih dari 70% keputusan diagnosis dokter bergantung pada ketepatan hasil pemeriksaan laboratorium.",
    salaries: {
      entry: "Rp 5.000.000 – Rp 7.500.000 / bulan (ATLM Pelaksana)",
      mid: "Rp 7.800.000 – Rp 11.500.000 / bulan (Analis Senior / Biomolekuler)",
      senior: "Rp 12.000.000 – Rp 18.500.000 / bulan (Koordinator Mutu / Kepala Lab)",
      intl: "USD 3.500 – USD 6.800 / bulan (Singapura, Timur Tengah, Eropa)"
    },
    allowances: "Tunjangan bahaya biologis (biohazard), insentif shift malam, jasa pelayanan laboratorium, pemeriksaan kesehatan berkala (medical check-up), dan tunjangan sertifikasi.",
    education: "D3 Teknologi Laboratorium Medik (A.Md.Kes) atau Sarjana Terapan D4 TLM (S.Tr.Kes), lulus UKOM Nasional, memiliki STR ATLM dan SIP-ATLM.",
    shift: "Sistem 3 shift operasional laboratorium 24 jam (Pagi, Sore, Malam) untuk mendukung pemeriksaan cito dari IGD dan ICU.",
    workEnv: "Laboratorium Patologi Klinik, Mikrobiologi, Bank Darah Rumah Sakit (BDRS), Patologi Anatomi, dan Lab PCR/Biomolekuler.",
    outlook: "Stabil dan terus meningkat seiring berkembangnya pemeriksaan diagnostik molekuler, bank darah terpadu, dan layanan medical check-up rumah sakit.",
    careerLadder: [
      { level: "Tahap 1", role: "ATLM Pelaksana (Sampling & Analitik)", note: "Flebotomi, hematologi, kimia klinik & urinalisis" },
      { level: "Tahap 2", role: "ATLM Spesialis Sub-Unit (BDRS / PCR)", note: "Uji silang bank darah, mikrobiologi & molekuler" },
      { level: "Tahap 3", role: "Penanggung Jawab Kendali Mutu (QC)", note: "Pemantapan Mutu Internal & Eksternal (PMI/PME)" },
      { level: "Tahap 4", role: "Koordinator / Manajer Teknis Lab RS", note: "Manajemen operasional & akreditasi ISO 15189" }
    ],
    tasks: [
      "Melakukan pengambilan sampel darah vena/kapiler (flebotomi) sesuai standar keselamatan pasien.",
      "Mengoperasikan dan mengkalibrasi alat otomatis hematologi, kimia klinik, imunoserologi, dan PCR.",
      "Melakukan verifikasi teknis hasil pemeriksaan serta segera melaporkan nilai kritis (critical value) ke dokter.",
      "Menjalankan kontrol kualitas harian (Quality Control) dan pengelolaan limbah infeksius laboratorium."
    ],
    hardSkills: [
      "Teknik Flebotomi & Penanganan Spesimen Biologis",
      "Operasional Hematology Analyzer, Chemistry Analyzer & PCR",
      "Pemantapan Mutu Internal (PMI) & Validasi Hasil Lab",
      "Pengelolaan Bank Darah Rumah Sakit (Crossmatch)"
    ],
    softSkills: [
      "Ketelitian & Akurasi Tinggi terhadap Angka dan Sampel",
      "Kecepatan Kerja untuk Sampel Darurat (Cito) dari IGD",
      "Kepatuhan Ketat pada Biosafety & Pencegahan Kontaminasi",
      "Komunikasi Jelas saat Pelaporan Nilai Kritis"
    ],
    pros: [
      "Fokus kerja teknis analitik dengan dukungan teknologi alat laboratorium modern.",
      "Tekanan interaksi massa lebih rendah dibanding unit rawat jalan.",
      "Dibutuhkan di setiap rumah sakit, klinik utama, laboratorium swasta, dan balai kesehatan."
    ],
    cons: [
      "Paparan langsung terhadap spesimen infeksius yang menuntut disiplin APD tinggi.",
      "Jadwal shift malam untuk melayani pemeriksaan darurat IGD.",
      "Tuntutan akurasi nol-kesalahan karena tertukarnya sampel berdampak fatal."
    ],
    stages: [
      {
        title: "Pendidikan D3 atau D4 Teknologi Laboratorium Medik",
        duration: "3 – 4 Tahun",
        desc: "Mempelajari hematologi, kimia klinik, imunoserologi, mikrobiologi, parasitologi, dan praktik lab RS.",
        deliverables: ["Gelar A.Md.Kes atau S.Tr.Kes", "Lulus UKOM Nasional ATLM"],
        resources: "PATELKI (Persatuan Ahli Teknologi Laboratorium Medik Indonesia)"
      },
      {
        title: "Penerbitan STR ATLM & Pelatihan Flebotomi",
        duration: "3 – 6 Bulan",
        desc: "Mengurus registrasi tenaga kesehatan dan sertifikasi teknik pengambilan spesimen standar.",
        deliverables: ["STR ATLM & SIP-ATLM", "Sertifikat Kompetensi Flebotomi"],
        resources: "KTKI & Lembaga Pelatihan Kesehatan"
      },
      {
        title: "Penguasaan Instrumen Otomatis & Bank Darah",
        duration: "1 – 2 Tahun",
        desc: "Menguasai kalibrasi analyzer modern serta pelayanan uji kecocokan darah di BDRS.",
        deliverables: ["Sertifikat Pelatihan Bank Darah (BDRS)", "Mandiri jaga shift cito"],
        resources: "Unit Transfusi Darah & Komite Mutu Lab RS"
      },
      {
        title: "Sertifikasi Manajemen Mutu Lab (ISO 15189)",
        duration: "Lanjutan",
        desc: "Mengambil peran sebagai auditor internal mutu laboratorium dan koordinator teknis.",
        deliverables: ["Sertifikat ISO 15189", "Posisi Koordinator / Kepala Unit Lab"],
        resources: "Komite Akreditasi Nasional (KAN) & PATELKI"
      }
    ]
  },
  {
    id: "administrasi-rs",
    shortName: "Administrasi RS",
    category: "Manajemen, SIMRS & Klaim",
    title: "Administrasi & Manajemen Rumah Sakit",
    tagline: "Penggerak efisiensi operasional, rekam medis digital, penjaminan BPJS, dan tata kelola RS.",
    heroSummary: "Mengelola operasional rumah sakit, rekam medis elektronik, verifikasi klaim INA-CBGs, dan layanan pasien dengan gaji Rp 5,5 Juta – Rp 30+ Juta per bulan.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
    thumbImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80",
    statSalary: "Rp 5,5 – 30+ Jt/bln",
    statEdu: "S1 Adm. RS / Kesehatan / RMIK",
    statShift: "Office Hour & Front Office",
    overview: "Profesional Administrasi & Manajemen Rumah Sakit memastikan seluruh roda pelayanan medis berjalan lancar dari sisi tata kelola, pendaftaran pasien, koding diagnosis (ICD-10/ICD-9-CM), verifikasi klaim JKN-BPJS & asuransi swasta, hingga perencanaan mutu dan akreditasi rumah sakit.",
    salaries: {
      entry: "Rp 5.000.000 – Rp 7.500.000 / bulan (Staf Admisi / Koder / Billing)",
      mid: "Rp 8.000.000 – Rp 14.000.000 / bulan (Supervisor Casemix / Mutu / SIMRS)",
      senior: "Rp 15.000.000 – Rp 32.000.000+ / bulan (Manajer Operasional / Keuangan RS)",
      intl: "USD 4.200 – USD 9.500 / bulan (Healthcare Operations & Revenue Cycle)"
    },
    allowances: "Tunjangan kinerja operasional, insentif ketepatan klaim casemix, tunjangan jabatan struktural, asuransi kesehatan keluarga, dan pelatihan manajemen rumah sakit.",
    education: "S1 Administrasi Rumah Sakit, S1 Kesehatan Masyarakat (AKK), D3/D4 Rekam Medis & Informasi Kesehatan (RMIK), atau S1 Manajemen/Akuntansi dengan minat industri kesehatan.",
    shift: "Umumnya jam kerja kantor (08.00–16.30) untuk bagian Casemix, Keuangan, dan Manajemen; sementara staf Admisi Pendaftaran IGD/Rawat Inap menggunakan sistem shift.",
    workEnv: "Unit Casemix & Verifikasi BPJS, Rekam Medis Elektronik, Front Office & Admisi, Komite Mutu & Akreditasi, serta Manajemen Eksekutif RS.",
    outlook: "Sangat cerah seiring transformasi digital rumah sakit (SatuSehat & Rekam Medis Elektronik) serta kebutuhan optimalisasi klaim INA-CBGs/iDRG.",
    careerLadder: [
      { level: "Tahap 1", role: "Staf Admisi, Billing & Koder Klinis", note: "Registrasi pasien, koding ICD & penagihan" },
      { level: "Tahap 2", role: "Koordinator Casemix / Rekam Medis", note: "Audit kelengkapan resume medis & klaim JKN" },
      { level: "Tahap 3", role: "Kepala Bagian Pelayanan / Keuangan", note: "Pengelolaan anggaran, SDM & alur layanan RS" },
      { level: "Tahap 4", role: "Manajer Operasional / Direktur Umum RS", note: "Strategi bisnis, akreditasi & ekspansi RS" }
    ],
    tasks: [
      "Mengelola alur pendaftaran pasien rawat jalan, rawat inap, dan penerbitan Surat Eligibilitas Peserta (SEP).",
      "Melakukan koding diagnosis (ICD-10) dan prosedur tindakan (ICD-9-CM) untuk pengajuan klaim BPJS dan asuransi.",
      "Menganalisis indikator mutu pelayanan rumah sakit (BOR, ALOS, TOI, BTO) serta kepuasan pasien.",
      "Mengkoordinasikan integrasi Sistem Informasi Manajemen Rumah Sakit (SIMRS) dengan platform SatuSehat."
    ],
    hardSkills: [
      "Koding Klinis ICD-10, ICD-9-CM & Sistem Casemix INA-CBGs",
      "Operasional SIMRS, Rekam Medis Elektronik (RME) & SatuSehat",
      "Analisis Indikator Efisiensi RS (Barber-Johnson) & Anggaran",
      "Standar Akreditasi Rumah Sakit Kemenkes (STARKES)"
    ],
    softSkills: [
      "Komunikasi Pelayanan Prima (Hospitality) kepada Pasien",
      "Negosiasi & Koordinasi Lintas Unit Medis maupun Non-Medis",
      "Ketelitian Administratif & Kepatuhan Regulasi JKN",
      "Pemecahan Masalah Operasional secara Sistematis"
    ],
    pros: [
      "Mayoritas posisi memiliki jam kerja kantor reguler tanpa risiko paparan klinis langsung.",
      "Jalur cepat menuju posisi manajerial dan kepemimpinan operasional rumah sakit.",
      "Keahlian Casemix dan manajemen RS sangat dicari oleh jaringan rumah sakit swasta besar."
    ],
    cons: [
      "Tekanan tenggat waktu bulanan saat proses verifikasi dan penagihan klaim asuransi/BPJS.",
      "Menangani keluhan administratif pasien atau keluarga di area front office.",
      "Memerlukan pemahaman istilah medis yang kuat meski berlatar belakang manajemen."
    ],
    stages: [
      {
        title: "Sarjana Administrasi RS / Kesmas / Rekam Medis",
        duration: "3 – 4 Tahun",
        desc: "Mempelajari manajemen pelayanan kesehatan, ekonomi kesehatan, sistem informasi RS, dan hukum kesehatan.",
        deliverables: ["Gelar S.ARS / S.KM / A.Md.RMIK", "Magang operasional di unit manajemen RS"],
        resources: "PERSI (Perhimpunan Rumah Sakit Seluruh Indonesia) & PORMIKI"
      },
      {
        title: "Pelatihan Koding Klinis & Manajemen Casemix",
        duration: "2 – 4 Bulan",
        desc: "Menguasai aturan koding diagnosis dan prosedur medis untuk mencegah pending klaim JKN.",
        deliverables: ["Sertifikat Pelatihan Koding & Casemix", "Penguasaan aplikasi E-Klaim & SIMRS"],
        resources: "Kementerian Kesehatan RI & Diklat Manajemen RS"
      },
      {
        title: "Koordinator Unit Layanan / Akreditasi RS",
        duration: "2 – 4 Tahun",
        desc: "Memimpin tim front office, rekam medis, atau tim persiapan survei akreditasi rumah sakit.",
        deliverables: ["Portofolio peningkatan efisiensi klaim/layanan", "Posisi Supervisor / Kepala Unit"],
        resources: "Lembaga Akreditasi Rumah Sakit (KARS / LARS)"
      },
      {
        title: "Magister Administrasi Rumah Sakit (MARS)",
        duration: "2 Tahun",
        desc: "Pendidikan pascasarjana untuk menduduki jabatan strategis manajer senior hingga direktur rumah sakit.",
        deliverables: ["Gelar M.A.R.S / M.Kes", "Posisi Manajer Operasional / Direktur RS"],
        resources: "Program Pascasarjana MARS UI, UGM, Unair & Universitas Terkemuka"
      }
    ]
  }
];

// ==========================================================================
// 3. APPLICATION STATE & IMAGE PRELOADING
// ==========================================================================
let professions = [...DEFAULT_PROFESSIONS];
let activeProfessionId = DEFAULT_PROFESSIONS[0].id;
let deckOrder = DEFAULT_PROFESSIONS.map(p => p.id);
let activeBgLayer = "a";
let selectionToken = 0;
let isCyclingDeck = false;
let wheelLockUntil = 0;
let suppressDeckClickUntil = 0;
let contentSwapTimer = null;
let detailRevealInitialized = false;
let chatHistory = [];
let isAiTyping = false;
let revealObserver = null;

const preloadedImageCache = new Map();

function safeCreateIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function handleImageError(imgEl) {
  if (!imgEl || imgEl.dataset.fallbackApplied === "true") return;
  imgEl.dataset.fallbackApplied = "true";
  imgEl.src = FALLBACK_IMAGE_DATA_URI;
}

function preloadImage(url) {
  if (!url) return Promise.resolve(FALLBACK_IMAGE_DATA_URI);
  if (preloadedImageCache.has(url)) {
    return Promise.resolve(preloadedImageCache.get(url));
  }
  return new Promise(resolve => {
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.onload = () => {
      preloadedImageCache.set(url, url);
      resolve(url);
    };
    img.onerror = () => {
      preloadedImageCache.set(url, FALLBACK_IMAGE_DATA_URI);
      resolve(FALLBACK_IMAGE_DATA_URI);
    };
    img.src = url;
  });
}

function preloadAllTrackImages() {
  professions.forEach(p => {
    preloadImage(p.image);
    if (p.thumbImage) preloadImage(p.thumbImage);
  });
}

// ==========================================================================
// 4. INITIALIZATION, THEME & NAVIGATION
// ==========================================================================
function loadState() {
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

    const savedProf = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROF);
    if (savedProf && professions.some(p => p.id === savedProf)) {
      activeProfessionId = savedProf;
      const idx = deckOrder.indexOf(savedProf);
      if (idx > 0) {
        deckOrder = [...deckOrder.slice(idx), ...deckOrder.slice(0, idx)];
      }
    }
  } catch (e) {
    applyTheme(false);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROF, activeProfessionId);
  } catch (e) { }
}

function applyTheme(isDark) {
  const html = document.documentElement;
  if (isDark) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, isDark ? "dark" : "light");
  } catch (e) { }

  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.setAttribute("data-lucide", isDark ? "sun" : "moon");
  }
  safeCreateIcons();
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.contains("dark");
  applyTheme(!isDark);
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("hidden");
}

function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.add("hidden");
}

function scrollToDetail() {
  const section = document.getElementById("detail-section");
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function initApp() {
  loadState();
  preloadAllTrackImages();

  const initialProf = professions.find(p => p.id === activeProfessionId) || professions[0];
  setInitialHeroBackground(initialProf);
  updateHeroLeftContent(initialProf);

  initHeroCardsDeck();
  setupDeckInteractions();

  renderDetailView(initialProf);
  initAiChatGreeting();
  safeCreateIcons();
}

// ==========================================================================
// 5. DUAL-LAYER HERO BACKGROUND CROSSFADE (RACE-CONDITION SAFE)
// ==========================================================================
async function setInitialHeroBackground(prof) {
  const layerA = document.getElementById("hero-bg-a");
  if (!layerA || !prof) return;

  layerA.style.backgroundImage = `url('${prof.image}')`;
  layerA.classList.add("is-active");
  activeBgLayer = "a";

  const resolved = await preloadImage(prof.image);
  if (resolved !== prof.image) {
    layerA.style.backgroundImage = `url('${resolved}')`;
  }
}

async function switchHeroBackground(prof) {
  const layerA = document.getElementById("hero-bg-a");
  const layerB = document.getElementById("hero-bg-b");
  if (!layerA || !layerB || !prof) return;

  const currentToken = ++selectionToken;
  const resolvedUrl = await preloadImage(prof.image);

  if (currentToken !== selectionToken) return;

  const incoming = activeBgLayer === "a" ? layerB : layerA;
  const outgoing = activeBgLayer === "a" ? layerA : layerB;

  incoming.style.backgroundImage = `url('${resolvedUrl}')`;
  void incoming.offsetWidth;

  incoming.classList.add("is-active");
  outgoing.classList.remove("is-active");
  activeBgLayer = activeBgLayer === "a" ? "b" : "a";
}

function updateHeroLeftContent(prof) {
  if (!prof) return;
  const idx = professions.findIndex(p => p.id === prof.id);
  const indexEl = document.getElementById("hero-index");
  const catEl = document.getElementById("hero-category");
  const titleEl = document.getElementById("hero-title");
  const subEl = document.getElementById("hero-subtitle");
  const salEl = document.getElementById("hero-stat-salary");
  const eduEl = document.getElementById("hero-stat-edu");
  const shiftEl = document.getElementById("hero-stat-shift");

  if (indexEl) indexEl.textContent = `0${idx + 1} / 0${professions.length}`;
  if (catEl) catEl.textContent = prof.category;
  if (titleEl) titleEl.textContent = prof.title;
  if (subEl) subEl.textContent = prof.heroSummary || prof.tagline;
  if (salEl) salEl.textContent = prof.statSalary;
  if (eduEl) eduEl.textContent = prof.statEdu;
  if (shiftEl) shiftEl.textContent = prof.statShift;
}

// ==========================================================================
// 6. OVERLAPPING STACKED CARD DECK
//    - Scroll / Geser = HANYA memutar tumpukan kartu (tidak ganti profesi)
//    - 1x Klik Kartu = Langsung ganti profesi aktif
// ==========================================================================
let cycleTimer = null;

function getSlotTransform(stackIndex, progress = 0) {
  const effectiveIndex = Math.max(0, stackIndex - progress);
  const offsetX = Math.min(effectiveIndex * 24, 96);
  const offsetY = Math.min(effectiveIndex * 10, 40);
  const scale = Math.max(1 - effectiveIndex * 0.045, 0.82);
  const rotate = Math.min(effectiveIndex * 1.4, 5.6);
  const isFront = effectiveIndex < 0.35;
  const brightness = isFront ? 1 : Math.max(0.84 - effectiveIndex * 0.06, 0.62);
  const opacity = isFront ? 1 : Math.max(0.95 - effectiveIndex * 0.07, 0.68);

  return {
    transform: `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotate.toFixed(2)}deg)`,
    brightness: brightness.toFixed(3),
    opacity: opacity.toFixed(3)
  };
}

function initHeroCardsDeck() {
  const deck = document.getElementById("hero-cards-deck");
  if (!deck) return;

  deck.innerHTML = professions
    .map((prof, idx) => {
      const imgSrc = prof.thumbImage || prof.image;
      return `
        <article
          data-prof-id="${prof.id}"
          class="deck-card group cursor-pointer select-none"
        >
          <img
            src="${imgSrc}"
            alt="${prof.shortName}"
            draggable="false"
            referrerpolicy="no-referrer"
            onerror="handleImageError(this)"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/15 pointer-events-none"></div>

          <div class="relative z-10 h-full p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-950/75 border border-white/15 text-teal-300 tabular-nums">
                0${idx + 1}
              </span>
              <span class="deck-status-pill px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
                Kartu Depan
              </span>
            </div>

            <div class="space-y-2">
              <p class="text-[11px] font-semibold uppercase tracking-wider text-teal-300">
                ${prof.category}
              </p>
              <h2 class="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                ${prof.shortName}
              </h2>
              <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                ${prof.tagline}
              </p>
              <div class="pt-2 flex items-center justify-between border-t border-white/15 text-xs">
                <span class="font-mono font-bold text-white tabular-nums">${prof.statSalary}</span>
                <span class="deck-action-hint font-bold text-teal-300">Pilih Profesi →</span>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  applyDeckPositions();
}

function applyDeckPositions(dragProgress = 0) {
  const deck = document.getElementById("hero-cards-deck");
  if (!deck) return;

  const cards = Array.from(deck.querySelectorAll(".deck-card"));
  const total = deckOrder.length;

  cards.forEach(card => {
    const id = card.getAttribute("data-prof-id");
    const stackIndex = deckOrder.indexOf(id);
    if (stackIndex === -1) return;

    if (stackIndex === 0 && dragProgress > 0) return;

    const isFront = stackIndex === 0;
    const isSelectedProf = id === activeProfessionId;
    const slot = getSlotTransform(stackIndex, stackIndex > 0 ? dragProgress : 0);

    card.classList.toggle("is-front", isFront);
    card.classList.toggle("is-stack-dragging", dragProgress > 0 && stackIndex > 0);
    card.style.zIndex = String(total - stackIndex);
    card.style.opacity = slot.opacity;
    card.style.filter = `brightness(${slot.brightness})`;
    card.style.transform = slot.transform;

    if (dragProgress === 0) {
      const pill = card.querySelector(".deck-status-pill");
      const hint = card.querySelector(".deck-action-hint");
      if (pill) {
        if (isSelectedProf) {
          pill.textContent = "Aktif Ditampilkan";
          pill.classList.add("bg-teal-500/35", "text-teal-200");
        } else if (isFront) {
          pill.textContent = "Kartu Depan";
          pill.classList.remove("bg-teal-500/35", "text-teal-200");
        } else {
          pill.textContent = `Urutan #${stackIndex + 1}`;
          pill.classList.remove("bg-teal-500/35", "text-teal-200");
        }
      }
      if (hint) {
        if (isSelectedProf) {
          hint.textContent = "Sedang aktif • Klik untuk detail ↓";
        } else {
          hint.textContent = "Klik untuk tampilkan profesi ini";
        }
      }
    }
  });
}

function cycleDeckForward(exitDirection = -1) {
  if (isCyclingDeck || deckOrder.length < 2) return;
  const deck = document.getElementById("hero-cards-deck");
  if (!deck) return;

  const frontId = deckOrder[0];
  const frontCard = deck.querySelector(`[data-prof-id="${frontId}"]`);
  if (!frontCard) return;

  isCyclingDeck = true;

  const exitX = exitDirection >= 0 ? "118%" : "-118%";
  const exitRot = exitDirection >= 0 ? 10 : -10;
  frontCard.classList.remove("is-dragging");
  frontCard.classList.add("is-peeling");
  frontCard.style.transform = `translate3d(${exitX}, -14px, 0) rotate(${exitRot}deg) scale(0.95)`;
  frontCard.style.opacity = "0";

  // Putar urutan tumpukan kartu SAJA (profesi aktif tetap tidak berubah)
  const remainingOrder = [...deckOrder.slice(1), frontId];
  const total = remainingOrder.length;
  remainingOrder.forEach((id, newIdx) => {
    if (id === frontId) return;
    const card = deck.querySelector(`[data-prof-id="${id}"]`);
    if (!card) return;
    const slot = getSlotTransform(newIdx, 0);
    card.classList.remove("is-stack-dragging");
    card.classList.toggle("is-front", newIdx === 0);
    card.style.zIndex = String(total - newIdx);
    card.style.transform = slot.transform;
    card.style.opacity = slot.opacity;
    card.style.filter = `brightness(${slot.brightness})`;
  });

  clearTimeout(cycleTimer);
  cycleTimer = setTimeout(() => {
    deckOrder = remainingOrder;
    frontCard.style.transition = "none";
    frontCard.classList.remove("is-peeling", "is-front");
    applyDeckPositions(0);
    void frontCard.offsetWidth;
    frontCard.style.transition = "";
    isCyclingDeck = false;
  }, 320);
}

function cycleDeckBackward() {
  if (isCyclingDeck || deckOrder.length < 2) return;
  const deck = document.getElementById("hero-cards-deck");
  if (!deck) return;

  isCyclingDeck = true;
  const lastId = deckOrder[deckOrder.length - 1];
  const incomingCard = deck.querySelector(`[data-prof-id="${lastId}"]`);

  deckOrder = [lastId, ...deckOrder.slice(0, deckOrder.length - 1)];

  if (incomingCard) {
    incomingCard.style.transition = "none";
    incomingCard.style.transform = "translate3d(-115%, -10px, 0) rotate(-8deg) scale(0.95)";
    incomingCard.style.opacity = "0";
    incomingCard.style.zIndex = String(deckOrder.length + 1);
    void incomingCard.offsetWidth;
    incomingCard.style.transition = "";
  }

  // Hanya memutar tumpukan kartu (tidak mengganti profesi aktif)
  applyDeckPositions(0);

  clearTimeout(cycleTimer);
  cycleTimer = setTimeout(() => {
    isCyclingDeck = false;
  }, 350);
}

function setupDeckInteractions() {
  const deck = document.getElementById("hero-cards-deck");
  if (!deck) return;

  // 1. Scroll roda mouse / trackpad -> 1x geser = tepat 1 kartu (tahan inersia trackpad)
  deck.addEventListener(
    "wheel",
    e => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX < 18 && absY < 18) return;

      e.preventDefault();
      const now = Date.now();
      if (now < wheelLockUntil || isCyclingDeck) return;
      wheelLockUntil = now + 850;

      const delta = absX > absY ? e.deltaX : e.deltaY;
      if (delta > 0) {
        cycleDeckForward(-1);
      } else {
        cycleDeckBackward();
      }
    },
    { passive: false }
  );

  // 2. Pointer / Touch: 1x Klik (< 12px) = Pilih Profesi | Geser (>= 12px) = Putar 1 Kartu
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocityX = 0;
  let trackingPointer = false;
  let didDrag = false;
  let activePointerId = null;
  let downProfId = null;
  let rafId = null;

  const renderDragFrame = () => {
    rafId = null;
    if (!trackingPointer || !didDrag) return;

    const dx = currentX - startX;
    const frontCard = deck.querySelector(`[data-prof-id="${deckOrder[0]}"]`);
    if (frontCard) {
      const rotate = Math.max(-14, Math.min(14, dx * 0.045));
      const liftY = Math.min(18, Math.abs(dx) * 0.05) * -1;
      frontCard.style.transform = `translate3d(${dx.toFixed(1)}px, ${liftY.toFixed(1)}px, 0) rotate(${rotate.toFixed(2)}deg)`;
    }

    const progress = Math.min(1, Math.abs(dx) / 170);
    applyDeckPositions(progress);
  };

  deck.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    const clickedCard = e.target.closest(".deck-card");
    downProfId = clickedCard ? clickedCard.getAttribute("data-prof-id") : null;

    // Cegah geseran baru jika kartu sebelumnya masih beranimasi keluar
    if (isCyclingDeck) {
      trackingPointer = false;
      return;
    }

    startX = e.clientX;
    startY = e.clientY;
    currentX = startX;
    lastX = startX;
    lastTime = performance.now();
    velocityX = 0;
    trackingPointer = true;
    didDrag = false;
    activePointerId = e.pointerId;
  });

  deck.addEventListener("pointermove", e => {
    if (!trackingPointer || e.pointerId !== activePointerId) return;

    const now = performance.now();
    const dt = Math.max(1, now - lastTime);
    velocityX = (e.clientX - lastX) / dt;
    lastX = e.clientX;
    lastTime = now;

    currentX = e.clientX;
    const dx = currentX - startX;
    const dy = e.clientY - startY;

    if (!didDrag && Math.hypot(dx, dy) >= 12) {
      didDrag = true;
      try {
        deck.setPointerCapture(e.pointerId);
      } catch (_) { }

      const frontCard = deck.querySelector(`[data-prof-id="${deckOrder[0]}"]`);
      if (frontCard) {
        frontCard.classList.add("is-dragging");
      }
    }

    if (didDrag && !rafId) {
      rafId = requestAnimationFrame(renderDragFrame);
    }
  });

  deck.addEventListener("pointerup", e => {
    if (!trackingPointer) {
      if (downProfId) {
        const targetId = downProfId;
        downProfId = null;
        handleDeckCardClick(targetId);
      }
      return;
    }

    if (activePointerId !== null && e.pointerId !== activePointerId) return;

    trackingPointer = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    if (didDrag && activePointerId !== null) {
      try {
        deck.releasePointerCapture(activePointerId);
      } catch (_) { }
    }
    activePointerId = null;

    const frontCard = deck.querySelector(`[data-prof-id="${deckOrder[0]}"]`);
    if (frontCard) {
      frontCard.classList.remove("is-dragging");
    }

    if (!didDrag) {
      const targetId = downProfId;
      downProfId = null;
      if (targetId) handleDeckCardClick(targetId);
      return;
    }

    downProfId = null;
    suppressDeckClickUntil = Date.now() + 260;

    const dx = currentX - startX;
    const passedDistance = Math.abs(dx) >= 65;
    const passedVelocity = Math.abs(dx) >= 24 && Math.abs(velocityX) >= 0.45;

    if (passedDistance || passedVelocity) {
      cycleDeckForward(dx >= 0 ? 1 : -1);
    } else {
      applyDeckPositions(0);
    }
  });

  deck.addEventListener("pointercancel", () => {
    trackingPointer = false;
    didDrag = false;
    downProfId = null;
    activePointerId = null;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    applyDeckPositions(0);
  });
}

// ==========================================================================
// 7. PROFESSION SELECTION, SMOOTH DETAIL RENDERER & SCROLL REVEAL
// ==========================================================================
function selectTrackSmooth(profId) {
  const prof = professions.find(p => p.id === profId);
  if (!prof) return;

  activeProfessionId = profId;
  saveState();

  switchHeroBackground(prof);
  updateAiContextBadge(prof);

  const heroLeft = document.getElementById("hero-left-content");
  const detailSec = document.getElementById("detail-section");

  if (heroLeft) heroLeft.classList.add("is-switching");
  if (detailSec) detailSec.classList.add("is-switching");

  clearTimeout(contentSwapTimer);
  contentSwapTimer = setTimeout(() => {
    updateHeroLeftContent(prof);
    renderDetailView(prof);

    requestAnimationFrame(() => {
      if (heroLeft) heroLeft.classList.remove("is-switching");
      if (detailSec) detailSec.classList.remove("is-switching");
    });
  }, 165);
}

function selectTrack(profId, shouldScroll = false) {
  const prof = professions.find(p => p.id === profId);
  if (!prof) return;

  activeProfessionId = profId;
  saveState();

  switchHeroBackground(prof);
  updateHeroLeftContent(prof);
  renderDetailView(prof);
  updateAiContextBadge(prof);
  applyDeckPositions(0);

  if (shouldScroll) {
    scrollToDetail();
  }
}

function renderDetailView(prof) {
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text || "-";
  };

  const heroImg = document.getElementById("detail-hero-img");
  if (heroImg) {
    heroImg.dataset.fallbackApplied = "false";
    heroImg.onerror = () => handleImageError(heroImg);
    heroImg.src = preloadedImageCache.get(prof.image) || prof.image;
  }

  setText("detail-badge", prof.category);
  setText("detail-title", prof.title);
  setText("detail-tagline", prof.tagline);
  setText("detail-overview", prof.overview);

  setText("salary-entry", prof.salaries?.entry);
  setText("salary-mid", prof.salaries?.mid);
  setText("salary-senior", prof.salaries?.senior);
  setText("salary-intl", prof.salaries?.intl);
  setText("detail-allowances", prof.allowances);

  setText("detail-education", prof.education);
  setText("detail-shift", prof.shift);
  setText("detail-work-env", prof.workEnv);
  setText("detail-outlook", prof.outlook);

  const ladderEl = document.getElementById("detail-career-ladder");
  if (ladderEl && Array.isArray(prof.careerLadder)) {
    ladderEl.innerHTML = prof.careerLadder
      .map(
        (step, idx) => `
        <div class="relative group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 transition-all hover:border-teal-500/60 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="font-mono text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-400">
                ${step.level}
              </span>
              <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500">Tingkat 0${idx + 1}</span>
            </div>
            <p class="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">${step.role}</p>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">${step.note}</p>
        </div>
      `
      )
      .join("");
  }

  const renderTaskList = (elId, items) => {
    const ul = document.getElementById(elId);
    if (!ul || !Array.isArray(items)) return;
    ul.innerHTML = items
      .map(
        (item, idx) => `
        <li class="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0">
          <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-500/10 shrink-0 mt-0.5">
            0${idx + 1}
          </span>
          <span class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">${item}</span>
        </li>
      `
      )
      .join("");
  };

  const renderHardSkills = (elId, items) => {
    const ul = document.getElementById(elId);
    if (!ul || !Array.isArray(items)) return;
    ul.innerHTML = items
      .map(
        item => `
        <li class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
          <i data-lucide="check-circle-2" class="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0"></i>
          <span class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">${item}</span>
        </li>
      `
      )
      .join("");
  };

  const renderSoftSkills = (elId, items) => {
    const ul = document.getElementById(elId);
    if (!ul || !Array.isArray(items)) return;
    ul.innerHTML = items
      .map(
        item => `
        <li class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
          <i data-lucide="heart-handshake" class="w-4 h-4 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0"></i>
          <span class="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">${item}</span>
        </li>
      `
      )
      .join("");
  };

  const renderProsList = (elId, items) => {
    const ul = document.getElementById(elId);
    if (!ul || !Array.isArray(items)) return;
    ul.innerHTML = items
      .map(
        item => `
        <li class="flex items-start gap-3 py-2 border-b border-emerald-500/10 last:border-b-0">
          <span class="w-5 h-5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="check" class="w-3.5 h-3.5"></i>
          </span>
          <span class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${item}</span>
        </li>
      `
      )
      .join("");
  };

  const renderConsList = (elId, items) => {
    const ul = document.getElementById(elId);
    if (!ul || !Array.isArray(items)) return;
    ul.innerHTML = items
      .map(
        item => `
        <li class="flex items-start gap-3 py-2 border-b border-amber-500/10 last:border-b-0">
          <span class="w-5 h-5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="alert-circle" class="w-3.5 h-3.5"></i>
          </span>
          <span class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${item}</span>
        </li>
      `
      )
      .join("");
  };

  renderTaskList("detail-tasks", prof.tasks);
  renderHardSkills("detail-hard-skills", prof.hardSkills);
  renderSoftSkills("detail-soft-skills", prof.softSkills);
  renderProsList("detail-pros", prof.pros);
  renderConsList("detail-cons", prof.cons);

  renderRoadmap(prof);
  safeCreateIcons();

  if (!detailRevealInitialized) {
    detailRevealInitialized = true;
    setupScrollRevealCards();
  } else {
    document.querySelectorAll(".reveal-card").forEach(card => card.classList.add("is-visible"));
  }
}

function renderRoadmap(prof) {
  const container = document.getElementById("roadmap-container");
  if (!container || !Array.isArray(prof.stages)) return;

  container.innerHTML = prof.stages
    .map(
      (stage, idx) => `
      <div
        onclick="openDetailModal(${idx})"
        class="cursor-pointer group relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-teal-500/70 dark:hover:border-teal-400/70 transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
      >
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="font-mono text-xs font-bold text-teal-700 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-500/10">
              FASE 0${idx + 1}
            </span>
            <span class="font-mono text-[11px] text-slate-500 dark:text-slate-400">${stage.duration}</span>
          </div>
          <h4 class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors leading-snug">
            ${stage.title}
          </h4>
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            ${stage.desc}
          </p>
        </div>
        <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-teal-700 dark:text-teal-400">
          <span>Persyaratan Lengkap</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `
    )
    .join("");
}

function setupScrollRevealCards() {
  const cards = Array.from(document.querySelectorAll(".reveal-card"));
  if (!cards.length) return;

  if (revealObserver) {
    revealObserver.disconnect();
  }

  cards.forEach(card => card.classList.remove("is-visible"));

  if (!("IntersectionObserver" in window)) {
    cards.forEach(card => card.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      const visibleBatch = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);

      visibleBatch.forEach((entry, batchIdx) => {
        const card = entry.target;
        setTimeout(() => {
          card.classList.add("is-visible");
        }, batchIdx * 90);
        observer.unobserve(card);
      });
    },
    {
      threshold: 0.06,
      rootMargin: "0px 0px -20px 0px"
    }
  );

  cards.forEach(card => revealObserver.observe(card));
}

function openDetailModal(stageIndex) {
  const prof = professions.find(p => p.id === activeProfessionId);
  if (!prof || !prof.stages || !prof.stages[stageIndex]) return;

  const stage = prof.stages[stageIndex];
  const badge = document.getElementById("modal-stage-badge");
  const title = document.getElementById("modal-title");
  const duration = document.getElementById("modal-duration");
  const desc = document.getElementById("modal-desc");
  const resources = document.getElementById("modal-resources");
  const delivEl = document.getElementById("modal-deliverables");

  if (badge) badge.textContent = `Tahap 0${stageIndex + 1} — ${prof.shortName}`;
  if (title) title.textContent = stage.title;
  if (duration) duration.textContent = `Estimasi Waktu: ${stage.duration}`;
  if (desc) desc.textContent = stage.desc;
  if (resources) resources.textContent = stage.resources || "-";

  if (delivEl && Array.isArray(stage.deliverables)) {
    delivEl.innerHTML = stage.deliverables
      .map(
        d => `
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></span>
          <span>${d}</span>
        </li>
      `
      )
      .join("");
  }

  const modal = document.getElementById("detail-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeDetailModal() {
  const modal = document.getElementById("detail-modal");
  if (modal) modal.classList.add("hidden");
}

function copyProfessionSummary() {
  const prof = professions.find(p => p.id === activeProfessionId);
  if (!prof) return;

  const summary = [
    `RINGKASAN PROFESI: ${prof.title.toUpperCase()}`,
    `Kategori: ${prof.category}`,
    `Deskripsi: ${prof.overview}`,
    ``,
    `ESTIMASI GAJI:`,
    `- Pemula: ${prof.salaries.entry}`,
    `- Menengah: ${prof.salaries.mid}`,
    `- Senior/Spesialis: ${prof.salaries.senior}`,
    `- Internasional: ${prof.salaries.intl}`,
    `Tunjangan: ${prof.allowances}`,
    ``,
    `SYARAT PENDIDIKAN & LISENSI: ${prof.education}`,
    `JAM KERJA & SHIFT: ${prof.shift}`
  ].join("\n");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(summary)
      .then(() => showToast(`Ringkasan ${prof.shortName} berhasil disalin`))
      .catch(() => fallbackCopyText(summary, prof.shortName));
  } else {
    fallbackCopyText(summary, prof.shortName);
  }
}

function fallbackCopyText(text, label) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    showToast(`Ringkasan ${label} berhasil disalin`);
  } catch (e) {
    showToast("Gagal menyalin ringkasan");
  }
  document.body.removeChild(ta);
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const msgEl = document.getElementById("toast-message");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 2800);
}

// ==========================================================================
// 8. PURE GEMINI API CAREER CONSULTATION (NO LOCAL FALLBACK)
// ==========================================================================
function toggleAiChat(forceOpen) {
  const win = document.getElementById("ai-chat-window");
  const fab = document.getElementById("ai-chat-fab");
  if (!win) return;

  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : win.classList.contains("hidden");
  if (shouldOpen) {
    win.classList.remove("hidden");
    if (fab) fab.classList.add("hidden");
    const prof = professions.find(p => p.id === activeProfessionId);
    if (prof) updateAiContextBadge(prof);
  } else {
    win.classList.add("hidden");
    if (fab) fab.classList.remove("hidden");
  }
}

function updateAiContextBadge(prof) {
  const badge = document.getElementById("ai-active-context-badge");
  if (badge && prof) {
    badge.textContent = `Konteks: ${prof.title}`;
  }
}

function initAiChatGreeting() {
  chatHistory = [];
  const box = document.getElementById("ai-chat-messages");
  if (!box) return;

  const prof = professions.find(p => p.id === activeProfessionId) || professions[0];
  box.innerHTML = `
    <div class="p-3.5 rounded-2xl rounded-tl-sm bg-[#F7F6F2] dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 leading-relaxed">
      Halo, silakan ajukan pertanyaan mengenai profesi <strong>${prof.title}</strong>, mulai dari komponen gaji, syarat STR/SIP, jadwal shift, hingga persiapan wawancara rumah sakit.
    </div>
  `;
}

function resetAiChat() {
  initAiChatGreeting();
  showToast("Percakapan dimulai ulang");
}

function askAiAboutCurrentProfession() {
  const prof = professions.find(p => p.id === activeProfessionId);
  toggleAiChat(true);
  if (prof) {
    sendQuickPrompt(
      `Jelaskan prospek karier, realitas jam kerja, dan strategi meningkatkan pendapatan untuk profesi ${prof.title}.`
    );
  }
}

function sendQuickPrompt(text) {
  const input = document.getElementById("ai-chat-input");
  if (input) {
    input.value = text;
    handleAiChatSubmit(new Event("submit"));
  }
}

function appendChatBubble(role, rawText) {
  const box = document.getElementById("ai-chat-messages");
  if (!box) return;

  const isUser = role === "user";
  const wrapper = document.createElement("div");
  wrapper.className = isUser ? "flex justify-end" : "flex justify-start";

  if (isUser) {
    wrapper.innerHTML = `
      <div class="max-w-[84%] p-3.5 rounded-2xl rounded-tr-sm bg-teal-600 text-white leading-relaxed">
        ${escapeHtml(rawText)}
      </div>
    `;
  } else {
    wrapper.innerHTML = `
      <div class="max-w-[88%] p-3.5 rounded-2xl rounded-tl-sm bg-[#F7F6F2] dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/60 text-slate-800 dark:text-slate-100 leading-relaxed space-y-2">
        ${formatAiMarkdown(rawText)}
      </div>
    `;
  }

  box.appendChild(wrapper);
  box.scrollTop = box.scrollHeight;
}

function showTypingIndicator() {
  const box = document.getElementById("ai-chat-messages");
  if (!box) return;

  const indicator = document.createElement("div");
  indicator.id = "ai-typing-indicator";
  indicator.className = "flex justify-start";
  indicator.innerHTML = `
    <div class="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#F7F6F2] dark:bg-slate-800/90 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-1.5">
      <span class="typing-dot w-2 h-2 rounded-full bg-teal-600"></span>
      <span class="typing-dot w-2 h-2 rounded-full bg-teal-600"></span>
      <span class="typing-dot w-2 h-2 rounded-full bg-teal-600"></span>
    </div>
  `;
  box.appendChild(indicator);
  box.scrollTop = box.scrollHeight;
}

function removeTypingIndicator() {
  const el = document.getElementById("ai-typing-indicator");
  if (el) el.remove();
}

function buildGeminiContents(history) {
  const contents = [];
  for (const item of history) {
    if (contents.length === 0 && item.role !== "user") continue;

    const last = contents[contents.length - 1];
    if (last && last.role === item.role) {
      last.parts[0].text += "\n" + item.text;
    } else {
      contents.push({
        role: item.role,
        parts: [{ text: item.text }]
      });
    }
  }
  return contents;
}

async function handleAiChatSubmit(event) {
  event.preventDefault();
  if (isAiTyping) return;

  const input = document.getElementById("ai-chat-input");
  const sendBtn = document.getElementById("ai-send-btn");
  const userMessage = (input ? input.value : "").trim();
  if (!userMessage) return;

  input.value = "";
  appendChatBubble("user", userMessage);

  chatHistory.push({ role: "user", text: userMessage });
  isAiTyping = true;
  if (sendBtn) sendBtn.disabled = true;
  showTypingIndicator();

  try {
    const reply = await fetchGeminiCareerReply(chatHistory);
    removeTypingIndicator();
    chatHistory.push({ role: "model", text: reply });
    appendChatBubble("model", reply);
  } catch (err) {
    removeTypingIndicator();
    if (chatHistory.length && chatHistory[chatHistory.length - 1].role === "user") {
      chatHistory.pop();
    }
    appendChatBubble(
      "model",
      `Gagal terhubung ke Gemini API: ${err.message}. Periksa konfigurasi GEMINI_API_KEY di file .env dan pastikan server berjalan.`
    );
  } finally {
    isAiTyping = false;
    if (sendBtn) sendBtn.disabled = false;
  }
}

async function callGeminiApiWithBackoff(endpoint, payload, maxRetries = 2) {
  let attempt = 0;
  while (true) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return await response.json();
    }

    const errData = await response.json().catch(() => ({}));
    const errMsg = errData?.error?.message || `HTTP ${response.status}`;

    if ((response.status === 429 || response.status >= 500) && attempt < maxRetries) {
      attempt++;
      const delayMs = 700 * Math.pow(2, attempt);
      await new Promise(res => setTimeout(res, delayMs));
      continue;
    }

    throw new Error(errMsg);
  }
}

async function fetchGeminiCareerReply(history) {
  const prof = professions.find(p => p.id === activeProfessionId) || professions[0];
  const endpoint = "/api/gemini";

  const systemInstructionText = `Anda adalah konselor karier kesehatan profesional pada platform PetaKarir.
Berikan jawaban dalam Bahasa Indonesia yang jelas, ringkas, terstruktur, dan praktis tanpa emoji.

Konteks profesi yang sedang dibuka pengguna:
- Profesi: ${prof.title} (${prof.category})
- Ringkasan: ${prof.overview}
- Gaji Pemula: ${prof.salaries.entry}
- Gaji Menengah: ${prof.salaries.mid}
- Gaji Senior/Spesialis: ${prof.salaries.senior}
- Gaji Internasional: ${prof.salaries.intl}
- Tunjangan: ${prof.allowances}
- Pendidikan & Lisensi: ${prof.education}
- Jam Kerja & Shift: ${prof.shift}
- Lingkungan Kerja: ${prof.workEnv}`;

  const payload = {
    systemInstruction: {
      parts: [{ text: systemInstructionText }]
    },
    contents: buildGeminiContents(history),
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 1024
    }
  };

  const data = await callGeminiApiWithBackoff(endpoint, payload);
  const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!replyText) {
    throw new Error("Respons kosong dari server Gemini");
  }

  return replyText;
}

// ==========================================================================
// 9. MISSING UTILITY FUNCTIONS
// ==========================================================================
function handleDeckCardClick(profId) {
  if (!profId || Date.now() < suppressDeckClickUntil) return;
  if (profId === activeProfessionId) {
    scrollToDetail();
    return;
  }
  selectTrackSmooth(profId);
  applyDeckPositions(0);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

function formatAiMarkdown(text) {
  if (!text) return "";
  let html = escapeHtml(text);
  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic: *text*
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, "<em>$1</em>");
  // Numbered lists: lines starting with 1. 2. etc.
  html = html.replace(/^(\d+)\.\s+(.+)$/gm, '<div class="flex gap-2"><span class="font-bold text-teal-600 dark:text-teal-400 shrink-0">$1.</span><span>$2</span></div>');
  // Bullet lists: lines starting with - or •
  html = html.replace(/^[-•]\s+(.+)$/gm, '<div class="flex gap-2 items-start"><span class="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></span><span>$1</span></div>');
  // Paragraphs: double newlines
  html = html.replace(/\n{2,}/g, '</p><p class="mt-2">');
  // Single newlines
  html = html.replace(/\n/g, "<br>");
  return `<p>${html}</p>`;
}

// Bootstrap Application
document.addEventListener("DOMContentLoaded", initApp);