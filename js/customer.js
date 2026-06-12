/* ═══════════════════════════════════════
   fahrzeugteile24 — Customer Interactions
   Theme Toggle + Flow + Scroll Reveals
   ═══════════════════════════════════════ */

// ─── Theme Toggle with View Transitions API (Gradient Reveal) ───

function toggleTheme() {
  const toggle = document.getElementById('themeToggle');
  const rect = toggle.getBoundingClientRect();
  const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
  const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

  // Set CSS custom properties for animation origin
  document.documentElement.style.setProperty('--toggle-x', x + '%');
  document.documentElement.style.setProperty('--toggle-y', y + '%');

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  // Use View Transitions API if supported
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });
  } else {
    // Fallback: simple CSS transition
    document.documentElement.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 600);
  }

  // Save preference
  localStorage.setItem('ft24-theme', isDark ? 'light' : 'dark');
}

// Initialize theme from saved preference
function initTheme() {
  const saved = localStorage.getItem('ft24-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    // Default to light
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// ─── Page Navigation (Taleplerim, Detay) ───

function showPage(page) {
  // Hide all page overlays
  document.querySelectorAll('.page-overlay').forEach(p => p.classList.remove('active'));

  if (page === 'home') {
    // Show main page, hide overlays
    document.getElementById('pageContent').style.display = '';
    document.body.style.overflow = '';
  } else {
    // Hide main landing page content
    document.getElementById('pageContent').style.display = 'none';
    document.body.style.overflow = '';

    // Show the target page
    const pageMap = {
      'requests': 'requestsPage',
      'detail': 'detailPage'
    };
    const target = document.getElementById(pageMap[page]);
    if (target) {
      target.classList.add('active');
      target.scrollTop = 0;
    }
  }
}

// ─── Mobile Menu ───

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileBackdrop');
  const isOpen = menu.classList.contains('open');

  if (isOpen) {
    menu.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    menu.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// ─── Request Flow ───

let currentStep = 1;

function openFlow() {
  const overlay = document.getElementById('flowOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  currentStep = 1;
  updateFlowStep(1);
}

function closeFlow() {
  const overlay = document.getElementById('flowOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  // Reset all steps
  currentStep = 1;
  updateFlowStep(1);
}

function goToStep(step) {
  currentStep = step;
  updateFlowStep(step);
}

function updateFlowStep(step) {
  // Hide all steps
  document.querySelectorAll('.flow-step').forEach(s => {
    s.classList.remove('active');
  });

  // Show target step
  const target = document.getElementById('flowStep' + step);
  if (target) {
    target.classList.add('active');
    // Scroll form to top
    const body = target.querySelector('.flow-body');
    if (body) body.scrollTop = 0;
  }
}

// ─── Chip Selection ───

function selectChip(chip) {
  chip.classList.toggle('selected');
}

// ─── Upload Simulation ───

function simulateUpload(uploadArea) {
  const pill = document.getElementById('filePill');
  if (pill) {
    pill.style.display = 'inline-flex';
  }
  // Change upload area style
  uploadArea.style.borderColor = 'var(--success)';
  uploadArea.style.backgroundColor = 'var(--success-bg)';
  const icon = uploadArea.querySelector('.upload-icon-circle');
  if (icon) {
    icon.style.backgroundColor = 'var(--success-bg)';
    icon.style.color = 'var(--success)';
    icon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
  }
  const text = uploadArea.querySelector('p');
  if (text) {
    text.textContent = 'Dosya başarıyla yüklendi';
    text.style.color = 'var(--success)';
  }
}

// ─── Navbar Scroll Effect ───

function handleScroll() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ─── Scroll Reveal Animations ───

function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// ─── Initialize ───

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRevealAnimations();
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Theme toggle click
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Close flow on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const flowOverlay = document.getElementById('flowOverlay');
      if (flowOverlay.classList.contains('active')) {
        closeFlow();
      }
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    }
  });

  console.log('fahrzeugteile24 Customer UI initialized');
});

// ─── Translations & Language Switcher ───

const translations = {
  nav_how: { TR: "Nasıl Çalışır?", DE: "Wie es funktioniert?" },
  nav_why: { TR: "Neden fahrzeugteile24?", DE: "Warum fahrzeugteile24?" },
  nav_req: { TR: "Taleplerim", DE: "Meine Anfragen" },
  nav_msgs: { TR: "Mesajlar", DE: "Nachrichten" },
  nav_cta: { TR: "Parça Talebi Oluştur", DE: "Teileanfrage erstellen" },
  
  hero_eyebrow: { TR: "VIN Bazlı Uzman Kontrolü", DE: "VIN-basierte Expertenprüfung" },
  hero_title: { TR: "Doğru Yedek Parça.<br>Uzman Güvencesiyle.", DE: "Das richtige Ersatzteil.<br>Mit Experten-Garantie." },
  hero_desc: { TR: "Fahrzeugschein'ınızı yükleyin, uzman ekibimiz VIN kontrolü yapsın. Tahmin yok, yanlış parça riski yok — sadece doğrulanmış sonuçlar.", DE: "Laden Sie Ihren Fahrzeugschein hoch, unser Expertenteam führt eine VIN-Prüfung durch. Kein Raten, kein Risiko für falsche Teile — nur verifizierte Ergebnisse." },
  hero_btn_primary: { TR: "Parça Talebi Oluştur", DE: "Teileanfrage erstellen" },
  hero_btn_secondary: { TR: "Nasıl Çalışır?", DE: "Wie es funktioniert?" },
  hero_trust_1: { TR: "Ücretsiz talep", DE: "Kostenlose Anfrage" },
  hero_trust_2: { TR: "15-30 dk yanıt", DE: "15-30 Min. Antwort" },
  hero_trust_3: { TR: "Kişisel danışmanlık", DE: "Persönliche Beratung" },
  
  steps_title: { TR: "Nasıl Çalışır?", DE: "Wie es funktioniert?" },
  steps_desc: { TR: "4 basit adımda doğru yedek parçaya ulaşın. Tüm süreç hızlı, şeffaf ve uzman kontrolünde.", DE: "In 4 einfachen Schritten zum richtigen Ersatzteil. Der Prozess ist schnell, transparent und expertengeprüft." },
  step1_title: { TR: "Talep Oluşturun", DE: "Anfrage erstellen" },
  step1_desc: { TR: "Aradığınız parçayı kendi kelimelerinizle yazın. \"BMW 320d arka amortisör\" gibi.", DE: "Beschreiben Sie das gesuchte Teil in Ihren Worten. Z.B. 'BMW 320d Stoßdämpfer hinten'." },
  step2_title: { TR: "Ruhsat Yükleyin", DE: "Fahrzeugschein hochladen" },
  step2_desc: { TR: "Fahrzeugschein fotoğrafını yükleyin. VIN kontrolü doğru parçanın temelidir.", DE: "Laden Sie ein Foto Ihres Fahrzeugscheins hoch. Die VIN-Prüfung ist die Basis für das richtige Teil." },
  step3_title: { TR: "Teklif Alın", DE: "Angebot erhalten" },
  step3_desc: { TR: "Uzmanlarımız parçayı araştırır, marka seçeneklerini ve fiyatları belirler.", DE: "Unsere Experten recherchieren das Teil und ermitteln Markenoptionen sowie Preise." },
  step4_title: { TR: "Onaylayın", DE: "Bestätigen" },
  step4_desc: { TR: "Teklifi onaylayın veya soru sorun. Sürecin her adımını takip edin.", DE: "Bestätigen Sie das Angebot oder stellen Sie Fragen. Verfolgen Sie jeden Schritt." },

  trust_title: { TR: "fahrzeugteile24'ü Farklı Yapan Ne?", DE: "Was macht fahrzeugteile24 anders?" },
  trust_desc: { TR: "Uzmanlığı dijital ortamda daha verimli hale getiren, güvenilir bir yedek parça danışmanlık platformu.", DE: "Eine zuverlässige Ersatzteilberatungsplattform, die Fachwissen im digitalen Umfeld effizienter macht." },
  trust1_title: { TR: "VIN Bazlı Kontrol", DE: "VIN-basierte Prüfung" },
  trust1_desc: { TR: "Her talep araç ruhsatındaki VIN numarasıyla doğrulanır. Tahmin yoktur.", DE: "Jede Anfrage wird mit der VIN aus dem Fahrzeugschein verifiziert. Kein Raten." },
  trust2_title: { TR: "Gerçek Uzman Desteği", DE: "Echte Expertenunterstützung" },
  trust2_desc: { TR: "Bütün teknik kararlar gerçek uzmanlar tarafından verilir. Otomatik öneri yoktur.", DE: "Alle technischen Entscheidungen werden von echten Experten getroffen. Keine automatischen Empfehlungen." },
  trust3_title: { TR: "Doğru Parça Garantisi", DE: "Passgenauigkeits-Garantie" },
  trust3_desc: { TR: "Bütün parçalar uzmanlar tarafından kontrol edilir. Yanlış parça riski ortadan kalkar.", DE: "Alle Teile werden von Experten geprüft. Das Risiko falscher Teile entfällt." },
  trust4_title: { TR: "Şeffaf Fiyat Teklifleri", DE: "Transparente Preisangebote" },
  trust4_desc: { TR: "Marka, fiyat ve teslimat süresi net olarak sunulur. Gizli maliyet yoktur.", DE: "Marke, Preis und Lieferzeit werden klar dargestellt. Keine versteckten Kosten." },
  trust5_title: { TR: "Talep & Sipariş Takibi", DE: "Anfrage- & Bestellverfolgung" },
  trust5_desc: { TR: "Talebinizin her aşamasını görün. WhatsApp karmaşası artık geride kaldı.", DE: "Sehen Sie jeden Schritt Ihrer Anfrage. WhatsApp-Chaos gehört der Vergangenheit an." },
  trust6_title: { TR: "Çok Dilli Destek", DE: "Mehrsprachiger Support" },
  trust6_desc: { TR: "Almanca, Türkçe, İngilizce ve daha fazlası. Herkes kendi dilinde destek alabilir.", DE: "Deutsch, Türkisch, Englisch und mehr. Jeder kann Support in seiner Sprache erhalten." },

  aud_title: { TR: "Kimler İçin?", DE: "Für wen?" },
  aud_desc: { TR: "fahrzeugteile24, doğru yedek parçayı güvenle almak isteyen herkes için tasarlandı.", DE: "fahrzeugteile24 wurde für alle entwickelt, die sicher das richtige Ersatzteil kaufen möchten." },
  aud1: { TR: "Araçlardan çok anlamayan kişiler", DE: "Personen ohne große Fahrzeugkenntnisse" },
  aud2: { TR: "Yanlış parça sipariş etmek istemeyenler", DE: "Diejenigen, die keine falschen Teile bestellen möchten" },
  aud3: { TR: "Güvenilir danışmanlık arayanlar", DE: "Diejenigen, die eine zuverlässige Beratung suchen" },
  aud4: { TR: "Fiziksel dükkâna gidemeyenler", DE: "Personen, die kein physisches Geschäft besuchen können" },
  aud5: { TR: "Farklı dillerde destek isteyenler", DE: "Diejenigen, die Support in verschiedenen Sprachen wünschen" },
  aud6: { TR: "Profesyonel deneyim bekleyen araç sahipleri", DE: "Fahrzeugbesitzer, die eine professionelle Erfahrung erwarten" },

  quote_text: { TR: "„Wir raten nicht. Wir prüfen die VIN.\"", DE: "„Wir raten nicht. Wir prüfen die VIN.“" },
  quote_sub: { TR: "Çünkü doğru yedek parça, tahminle değil; uzmanlık ve doğrulamayla bulunur.", DE: "Denn das richtige Ersatzteil findet man nicht durch Raten, sondern durch Expertise und Verifizierung." },

  cta_title: { TR: "Doğru Parçaya Ulaşmanın En Kolay Yolu", DE: "Der einfachste Weg zum richtigen Teil" },
  cta_desc: { TR: "Talebinizi oluşturun, uzmanlarımız sizin için en uygun parçayı bulsun.", DE: "Erstellen Sie Ihre Anfrage, unsere Experten finden das passendste Teil für Sie." },
  cta_btn: { TR: "Parça Talebi Oluştur — Ücretsiz", DE: "Teileanfrage erstellen — Kostenlos" },

  footer_copy: { TR: "© 2026 fahrzeugteile24. Tüm hakları saklıdır.", DE: "© 2026 fahrzeugteile24. Alle Rechte vorbehalten." },
  footer_privacy: { TR: "Gizlilik", DE: "Datenschutz" },
  footer_terms: { TR: "Kullanım Şartları", DE: "Nutzungsbedingungen" },
  footer_returns: { TR: "İade Politikası", DE: "Rückgaberecht" },

  flow1_title: { TR: "Parça Talebi", DE: "Teileanfrage" },
  flow_prog1: { TR: "Parça", DE: "Teil" },
  flow_prog2: { TR: "Ruhsat", DE: "Fahrzeugschein" },
  flow_prog3: { TR: "Ek Bilgi", DE: "Zusatzinfos" },
  flow_prog4: { TR: "Gönder", DE: "Senden" },
  flow1_h2: { TR: "Hangi parçayı arıyorsunuz?", DE: "Welches Teil suchen Sie?" },
  flow1_sub: { TR: "Aradığınız parçayı seçin veya kısaca tanımlayın.", DE: "Wählen Sie das gesuchte Teil aus oder beschreiben Sie es kurz." },
  flow1_chip1: { TR: "Fren Balataları", DE: "Bremsbeläge" },
  flow1_chip2: { TR: "Amortisör", DE: "Stoßdämpfer" },
  flow1_chip3: { TR: "Far / Aydınlatma", DE: "Scheinwerfer / Beleuchtung" },
  flow1_chip4: { TR: "Yağ Filtresi", DE: "Ölfilter" },
  flow1_chip5: { TR: "Akü", DE: "Batterie" },
  flow1_chip6: { TR: "Diğer", DE: "Sonstige" },
  flow1_label: { TR: "Parça Tanımı", DE: "Teilebeschreibung" },
  flow1_ph: { TR: "Örn: 2017 BMW 320d için arka sağ amortisör arıyorum...", DE: "Z.B.: Ich suche einen Stoßdämpfer hinten rechts für einen 2017 BMW 320d..." },
  flow_next: { TR: "Devam Et", DE: "Weiter" },
  
  flow2_title: { TR: "Araç Ruhsatı", DE: "Fahrzeugschein" },
  flow2_h2: { TR: "Fahrzeugschein Gerekli", DE: "Fahrzeugschein erforderlich" },
  flow2_sub: { TR: "Doğru parçayı bulabilmemiz için VIN kontrolü şarttır. Aynı modelin farklı motor ve donanım varyasyonları olabilir.", DE: "Eine VIN-Prüfung ist unerlässlich, damit wir das richtige Teil finden können. Es kann verschiedene Motor- und Ausstattungsvarianten geben." },
  flow2_up_title: { TR: "Ruhsat fotoğrafını yükleyin", DE: "Laden Sie ein Foto Ihres Fahrzeugscheins hoch" },
  flow2_up_sub: { TR: "JPG, PNG veya PDF · Maks. 10 MB", DE: "JPG, PNG oder PDF · Max. 10 MB" },
  flow2_cam: { TR: "Kamera", DE: "Kamera" },
  flow2_file: { TR: "Dosya Seç", DE: "Datei auswählen" },
  flow2_success: { TR: "fahrzeugschein.jpg yüklendi", DE: "fahrzeugschein.jpg hochgeladen" },
  flow2_note: { TR: "Fahrzeugschein olmadan talep işleme alınamaz. Bu, doğru parça tespitinin temelidir.", DE: "Ohne Fahrzeugschein kann die Anfrage nicht bearbeitet werden. Dies ist die Grundlage für die Teileidentifikation." }
};

let currentLang = 'TR';

function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
  } else {
    menu.classList.add('open');
  }
}

// Close lang menu when clicking outside
document.addEventListener('click', (e) => {
  const selector = document.querySelector('.lang-selector');
  if (selector && !selector.contains(e.target)) {
    document.getElementById('langMenu')?.classList.remove('open');
  }
});

function typeWriter(element, text, speed = 8) {
  // If text contains HTML, do a fast crossfade to avoid breaking layout
  if (text.includes('<')) {
    element.style.transition = 'opacity 0.15s ease';
    element.style.opacity = '0';
    setTimeout(() => {
      element.innerHTML = text;
      element.style.opacity = '1';
    }, 150);
    return;
  }

  // Find the text node or existing wrapper to replace, preserving SVGs
  let targetNode = null;
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const node = element.childNodes[i];
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
      targetNode = node;
      break;
    } else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('type-wrap')) {
      targetNode = node;
      break;
    }
  }

  let wrapper;
  if (!targetNode) {
    wrapper = document.createElement('span');
    wrapper.className = 'type-wrap';
    element.appendChild(wrapper);
  } else if (targetNode.nodeType === Node.TEXT_NODE) {
    wrapper = document.createElement('span');
    wrapper.className = 'type-wrap';
    element.replaceChild(wrapper, targetNode);
  } else {
    wrapper = targetNode;
    wrapper.innerHTML = ''; // Clear previous text
  }

  // Preserve space after SVGs if needed
  if (element.children.length > 1 && element.firstChild !== wrapper) {
    wrapper.appendChild(document.createTextNode(' '));
  }

  // Create spans for each character.
  // Setting opacity:0 reserves the exact layout space INSTANTLY. No jumping!
  const spans = [];
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.style.opacity = '0';
    wrapper.appendChild(span);
    spans.push(span);
  }

  // Reveal characters very quickly
  let i = 0;
  function reveal() {
    if (i < spans.length) {
      // Reveal 3 chars at a time for a fast, clean premium feel
      spans[i].style.opacity = '1';
      if (i + 1 < spans.length) spans[i + 1].style.opacity = '1';
      if (i + 2 < spans.length) spans[i + 2].style.opacity = '1';
      i += 3;
      
      requestAnimationFrame(() => {
        setTimeout(reveal, speed);
      });
    }
  }
  reveal();
}

function changeLang(langCode) {
  const btn = document.getElementById('currentLangBtn');
  if (btn) btn.textContent = langCode;
  document.getElementById('langMenu').classList.remove('open');
  
  // Real translations for DE, fallback for others
  let targetLang = langCode;
  if (langCode !== 'TR' && langCode !== 'DE') {
    targetLang = 'DE'; // Use German as mock for EN, FR, IT, ES, RU
  }
  currentLang = targetLang;

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][currentLang]) {
      const newText = translations[key][currentLang];
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        el.setAttribute('placeholder', newText);
      } else {
        typeWriter(el, newText, 10); // Very fast typing effect to feel premium
      }
    }
  });
}
