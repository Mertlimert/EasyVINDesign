/* ═══════════════════════════════════════════════════════
   fahrzeugteile24 Admin Panel — JavaScript
   ═══════════════════════════════════════════════════════ */

// ─── Mock Data ───
const requests = [
  {
    id: 1,
    customer: 'Mehmet Yılmaz',
    text: 'BMW 320d 2019 model için arka amortisör',
    status: 'yeni',
    time: '12 Haz 2026, 14:32',
    timeAgo: '2 saat önce',
    vehicle: { model: 'BMW 320d', year: '2019', vin: 'WBAJB5107KB894512' },
    hasVin: true,
    hasPhoto: false,
    hasOem: false,
    docs: [
      { icon: '📄', name: 'Fahrzeugschein', type: 'pdf' }
    ],
    chat: [
      { from: 'customer', name: 'Mehmet Y.', text: 'Merhaba, arka amortisörler için fiyat alabilir miyim?', time: '14:32' },
      { from: 'admin', name: 'Ahmet Y.', text: 'Merhaba Mehmet Bey, talebiniz alındı. VIN numaranıza göre araştırma yapıyoruz.', time: '14:45' }
    ],
    notes: [
      { text: 'Müşteri acil ihtiyaç belirtti. Sachs ve Bilstein fiyatları kontrol edilecek.', author: 'Ahmet Y.', time: '14:50' }
    ]
  },
  {
    id: 2,
    customer: 'Ayşe Kaya',
    text: 'VW Golf 7 fren balataları',
    status: 'inceleniyor',
    time: '12 Haz 2026, 11:18',
    timeAgo: '5 saat önce',
    vehicle: { model: 'VW Golf 7', year: '2017', vin: 'WVWZZZ1KZHW345678' },
    hasVin: true,
    hasPhoto: true,
    hasOem: true,
    docs: [
      { icon: '📄', name: 'Fahrzeugschein', type: 'pdf' },
      { icon: '📷', name: 'Fren fotoğrafı', type: 'jpg' },
      { icon: '📋', name: 'OEM numarası', type: 'txt' }
    ],
    chat: [
      { from: 'customer', name: 'Ayşe K.', text: 'Ön fren balataları için teklif istiyorum. OEM numara: 5Q0 698 151 AA', time: '11:18' },
      { from: 'admin', name: 'Ahmet Y.', text: 'Ayşe Hanım, bilgiler alındı. Uygun parçaları araştırıyoruz.', time: '11:30' },
      { from: 'customer', name: 'Ayşe K.', text: 'Teşekkürler, ne kadar sürer?', time: '11:35' },
      { from: 'admin', name: 'Ahmet Y.', text: 'Yaklaşık 1 saat içinde teklif hazır olacak.', time: '11:40' }
    ],
    notes: [
      { text: 'OEM numarası doğrulandı. TRW ve ATE karşılaştırma yapılacak.', author: 'Ahmet Y.', time: '11:45' }
    ]
  },
  {
    id: 3,
    customer: 'Ali Demir',
    text: 'Mercedes C220 sol far',
    status: 'teklif',
    time: '11 Haz 2026, 16:05',
    timeAgo: '1 gün önce',
    vehicle: { model: 'Mercedes C220', year: '2020', vin: 'WDD2050091A789012' },
    hasVin: true,
    hasPhoto: true,
    hasOem: false,
    docs: [
      { icon: '📄', name: 'Fahrzeugschein', type: 'pdf' },
      { icon: '📷', name: 'Far fotoğrafı 1', type: 'jpg' },
      { icon: '📷', name: 'Far fotoğrafı 2', type: 'jpg' }
    ],
    chat: [
      { from: 'customer', name: 'Ali D.', text: 'Sol far komple değişim lazım, LED farsa tercih ederim.', time: '16:05' },
      { from: 'admin', name: 'Ahmet Y.', text: 'Ali Bey, fotoğrafları inceledik. LED far için teklif hazırladık: Hella marka LED far — 450€, teslimat 5-7 iş günü.', time: '17:20' },
      { from: 'customer', name: 'Ali D.', text: 'Teşekkürler, düşüneceğim.', time: '17:45' }
    ],
    notes: [
      { text: 'Müşteri LED tercih ediyor. OEM dışı Hella önerildi. Yanıt bekleniyor.', author: 'Ahmet Y.', time: '17:30' }
    ]
  },
  {
    id: 4,
    customer: 'Fatma Öz',
    text: 'Audi A4 yağ filtresi',
    status: 'onaylanan',
    time: '11 Haz 2026, 09:42',
    timeAgo: '1 gün önce',
    vehicle: { model: 'Audi A4', year: '2018', vin: 'WAUZZZ8K9JA456789' },
    hasVin: true,
    hasPhoto: false,
    hasOem: true,
    docs: [
      { icon: '📄', name: 'Fahrzeugschein', type: 'pdf' }
    ],
    chat: [
      { from: 'customer', name: 'Fatma Ö.', text: 'Yağ filtresi lazım, OEM numara: 06L 115 562', time: '09:42' },
      { from: 'admin', name: 'Ahmet Y.', text: 'Fatma Hanım, MANN marka yağ filtresi: 18€, 1-2 iş günü teslimat. Onaylıyor musunuz?', time: '10:15' },
      { from: 'customer', name: 'Fatma Ö.', text: 'Evet onaylıyorum, sipariş verebilirsiniz.', time: '10:30' },
      { from: 'admin', name: 'Ahmet Y.', text: 'Sipariş oluşturuldu. Kargo takip numarası en kısa sürede paylaşılacak. ✅', time: '10:45' }
    ],
    notes: [
      { text: 'Sipariş onaylandı. MANN HU 6002 z sipariş verildi. Kargo: DHL', author: 'Ahmet Y.', time: '10:50' },
      { text: 'DHL takip no: 1234567890 — müşteriye iletilecek.', author: 'Ahmet Y.', time: '13:00' }
    ]
  }
];

// ─── State ───
let activeRequestId = null;
let currentFilter = 'all';
let originalMessage = '';

// ─── Status Helpers ───
const statusLabels = {
  yeni: '🆕 Yeni',
  inceleniyor: '🔍 İnceleniyor',
  teklif: '💬 Teklif Gönderildi',
  onaylanan: '✅ Onaylandı',
  tamamlanan: '🏁 Tamamlandı'
};

const statusClasses = {
  yeni: 'status-yeni',
  inceleniyor: 'status-inceleniyor',
  teklif: 'status-teklif',
  onaylanan: 'status-onaylanan',
  tamamlanan: 'status-tamamlanan'
};

// ─── AI Message Formatter ───
function formatMessageWithAI(text) {
  if (!text.trim()) return '';
  // Simulate AI formatting — make it more formal and professional
  const formalGreeting = 'Merhaba, talebiniz incelendi.';
  const cleanedText = text.trim();
  
  // Detect some keywords and enhance
  let body = cleanedText;
  
  // If message mentions price
  const priceMatch = body.match(/(\d+)\s*(euro|€|eur)/i);
  if (priceMatch) {
    body = body.replace(priceMatch[0], '');
    return `${formalGreeting} ${body.trim().charAt(0).toUpperCase() + body.trim().slice(1)}${body.trim().endsWith('.') ? '' : '.'} Fiyat: ${priceMatch[1]} €. Teslimat süresi: 2-3 iş günü. Detaylı bilgi için lütfen çekinmeden sorun.`;
  }
  
  // If message mentions stock
  if (/stok/i.test(body)) {
    return `${formalGreeting} Belirttiğiniz ürün stoğumuzda mevcuttur. ${body.charAt(0).toUpperCase() + body.slice(1)}${body.endsWith('.') ? '' : '.'} Detaylı bilgi ve sipariş için bizimle iletişime geçebilirsiniz.`;
  }

  // Generic formal formatting
  return `${formalGreeting} ${cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1)}${cleanedText.endsWith('.') ? '' : '.'} Herhangi bir sorunuz olursa lütfen çekinmeden iletişime geçin.`;
}

// ─── Render Request List ───
function renderRequestList() {
  const list = document.getElementById('requestList');
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  let filtered = requests;
  
  // Filter by status
  if (currentFilter !== 'all') {
    filtered = filtered.filter(r => r.status === currentFilter);
  }
  
  // Filter by search
  if (searchTerm) {
    filtered = filtered.filter(r =>
      r.customer.toLowerCase().includes(searchTerm) ||
      r.text.toLowerCase().includes(searchTerm) ||
      r.vehicle.model.toLowerCase().includes(searchTerm)
    );
  }
  
  list.innerHTML = filtered.map(r => `
    <div class="request-card ${r.id === activeRequestId ? 'active' : ''}" data-id="${r.id}">
      <div class="request-card-top">
        <span class="request-customer">${r.customer}</span>
        <span class="request-time">${r.timeAgo}</span>
      </div>
      <p class="request-text">${r.text}</p>
      <div class="request-card-bottom">
        <span class="status-badge ${statusClasses[r.status]}">${statusLabels[r.status]}</span>
        <div class="request-indicators">
          <span class="indicator ${r.hasVin ? 'has' : 'missing'}">VIN ${r.hasVin ? '✓' : '✕'}</span>
          <span class="indicator ${r.hasPhoto ? 'has' : 'missing'}">Foto ${r.hasPhoto ? '✓' : '✕'}</span>
          <span class="indicator ${r.hasOem ? 'has' : 'missing'}">OEM ${r.hasOem ? '✓' : '✕'}</span>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add click listeners
  list.querySelectorAll('.request-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      selectRequest(id);
    });
  });
}

// ─── Select Request ───
function selectRequest(id) {
  activeRequestId = id;
  const req = requests.find(r => r.id === id);
  if (!req) return;
  
  document.getElementById('detailEmpty').style.display = 'none';
  document.getElementById('detailContent').style.display = 'block';
  
  // Section 1: Info
  document.getElementById('detailCustomerName').textContent = req.customer;
  document.getElementById('detailStatusBadge').className = `badge status-badge ${statusClasses[req.status]}`;
  document.getElementById('detailStatusBadge').textContent = statusLabels[req.status];
  document.getElementById('detailRequestText').textContent = req.text;
  document.getElementById('detailTime').textContent = req.time;
  document.getElementById('vehicleModel').textContent = req.vehicle.model;
  document.getElementById('vehicleYear').textContent = req.vehicle.year;
  document.getElementById('vehicleVin').textContent = req.vehicle.vin;
  document.getElementById('statusSelect').value = req.status;
  
  // Section 2: Docs
  const docsGrid = document.getElementById('docsGrid');
  docsGrid.innerHTML = req.docs.map(d => `
    <div class="doc-item">
      <span class="doc-icon">${d.icon}</span>
      <span class="doc-name">${d.name}</span>
      <span class="doc-action">Önizle →</span>
    </div>
  `).join('');
  
  // Section 3: Chat
  renderChat(req);
  
  // Section 5: Notes
  renderNotes(req);
  
  // Refresh list to update active state
  renderRequestList();
  
  // Hide AI preview if visible
  document.getElementById('aiPreviewBox').style.display = 'none';
  document.getElementById('chatInput').value = '';
  
  // Reset offer form
  document.getElementById('offerBrand').value = '';
  document.getElementById('offerProduct').value = '';
  document.getElementById('offerPrice').value = '';
  document.getElementById('offerDelivery').value = '';
  document.getElementById('aiOfferPreview').style.display = 'none';
  
  // Scroll detail to top
  document.getElementById('detailPanel').scrollTop = 0;
}

// ─── Render Chat ───
function renderChat(req) {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = req.chat.map(m => `
    <div class="chat-bubble ${m.from}">
      <div class="chat-bubble-name">${m.name}</div>
      <div>${m.text}</div>
      <div class="chat-bubble-time">${m.time}</div>
    </div>
  `).join('');
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ─── Render Notes ───
function renderNotes(req) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = req.notes.map(n => `
    <div class="note-item">
      <p class="note-text">${n.text}</p>
      <div class="note-meta">
        <span class="note-author">${n.author}</span>
        <span class="note-time">${n.time}</span>
      </div>
    </div>
  `).join('');
}

// ─── Update Metrics ───
function updateMetrics() {
  const counts = {
    yeni: requests.filter(r => r.status === 'yeni').length,
    inceleniyor: requests.filter(r => r.status === 'inceleniyor').length,
    teklif: requests.filter(r => r.status === 'teklif').length,
    onaylanan: requests.filter(r => r.status === 'onaylanan').length,
    tamamlanan: requests.filter(r => r.status === 'tamamlanan').length
  };
  
  document.getElementById('metric-yeni').textContent = counts.yeni;
  document.getElementById('metric-inceleniyor').textContent = counts.inceleniyor;
  document.getElementById('metric-teklif').textContent = counts.teklif;
  document.getElementById('metric-onaylanan').textContent = counts.onaylanan;
  
  document.getElementById('count-all').textContent = requests.length;
  document.getElementById('count-yeni').textContent = counts.yeni;
  document.getElementById('count-inceleniyor').textContent = counts.inceleniyor;
  document.getElementById('count-teklif').textContent = counts.teklif;
  document.getElementById('count-onaylanan').textContent = counts.onaylanan;
  document.getElementById('count-tamamlanan').textContent = counts.tamamlanan;
}

// ─── Toast Notification ───
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'} ${message}`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ═══ EVENT LISTENERS ═══

document.addEventListener('DOMContentLoaded', () => {
  renderRequestList();
  updateMetrics();
  
  // ─── Search ───
  document.getElementById('searchInput').addEventListener('input', renderRequestList);
  
  // ─── Sidebar Navigation ───
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = item.dataset.filter;
      if (!filter) return;
      
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      currentFilter = filter;
      renderRequestList();
    });
  });
  
  // ─── Sidebar Toggle (Mobile) ───
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
  
  // ─── Theme Toggle ───
  document.getElementById('themeToggle').addEventListener('click', (e) => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Try View Transitions API
    if (document.startViewTransition) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
      const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
      html.style.setProperty('--toggle-x', x + '%');
      html.style.setProperty('--toggle-y', y + '%');
      
      document.startViewTransition(() => {
        html.setAttribute('data-theme', newTheme);
      });
    } else {
      html.classList.add('theme-transitioning');
      html.setAttribute('data-theme', newTheme);
      setTimeout(() => html.classList.remove('theme-transitioning'), 600);
    }
    
    localStorage.setItem('ft24-theme', newTheme);
  });
  
  // Restore saved theme
  const savedTheme = localStorage.getItem('ft24-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  
  // ─── Status Change ───
  document.getElementById('statusSelect').addEventListener('change', (e) => {
    const req = requests.find(r => r.id === activeRequestId);
    if (!req) return;
    
    req.status = e.target.value;
    document.getElementById('detailStatusBadge').className = `badge status-badge ${statusClasses[req.status]}`;
    document.getElementById('detailStatusBadge').textContent = statusLabels[req.status];
    
    updateMetrics();
    renderRequestList();
    showToast(`Durum "${statusLabels[req.status]}" olarak güncellendi.`, 'success');
  });
  
  // ─── Chat: Send Message ───
  document.getElementById('chatSendBtn').addEventListener('click', sendChatMessage);
  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });
  
  function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text || !activeRequestId) return;
    
    const req = requests.find(r => r.id === activeRequestId);
    if (!req) return;
    
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    req.chat.push({
      from: 'admin',
      name: 'Ahmet Y.',
      text: text,
      time: timeStr
    });
    
    renderChat(req);
    input.value = '';
    document.getElementById('aiPreviewBox').style.display = 'none';
    showToast('Mesaj gönderildi.', 'success');
  }
  
  // ─── Chat: AI Format ───
  document.getElementById('aiFormatBtn').addEventListener('click', () => {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) {
      showToast('Lütfen önce bir mesaj yazın.', 'error');
      return;
    }
    
    originalMessage = text;
    const formatted = formatMessageWithAI(text);
    
    document.getElementById('aiPreviewText').textContent = formatted;
    document.getElementById('aiPreviewBox').style.display = 'block';
  });
  
  // AI Approve
  document.getElementById('aiApproveBtn').addEventListener('click', () => {
    const formatted = document.getElementById('aiPreviewText').textContent;
    document.getElementById('chatInput').value = formatted;
    document.getElementById('aiPreviewBox').style.display = 'none';
    sendChatMessage();
  });
  
  // AI Reject (use original)
  document.getElementById('aiRejectBtn').addEventListener('click', () => {
    document.getElementById('chatInput').value = originalMessage;
    document.getElementById('aiPreviewBox').style.display = 'none';
  });
  
  // ─── Offer Tabs ───
  document.querySelectorAll('.offer-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.offer-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabName = tab.dataset.tab;
      document.getElementById('tabManual').style.display = tabName === 'manual' ? 'block' : 'none';
      document.getElementById('tabAi').style.display = tabName === 'ai' ? 'block' : 'none';
    });
  });
  
  // ─── Send Offer (Manual) ───
  document.getElementById('sendOfferBtn').addEventListener('click', () => {
    const brand = document.getElementById('offerBrand').value.trim();
    const product = document.getElementById('offerProduct').value.trim();
    const price = document.getElementById('offerPrice').value.trim();
    const delivery = document.getElementById('offerDelivery').value.trim();
    
    if (!brand || !product || !price) {
      showToast('Lütfen marka, ürün ve fiyat alanlarını doldurun.', 'error');
      return;
    }
    
    const req = requests.find(r => r.id === activeRequestId);
    if (!req) return;
    
    // Add offer as a chat message
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    const offerText = `📦 Teklif: ${brand} ${product} — ${price} €${delivery ? ` | Teslimat: ${delivery}` : ''}`;
    
    req.chat.push({
      from: 'admin',
      name: 'Ahmet Y.',
      text: offerText,
      time: timeStr
    });
    
    renderChat(req);
    showToast('Teklif başarıyla gönderildi!', 'success');
    
    // Clear form
    document.getElementById('offerBrand').value = '';
    document.getElementById('offerProduct').value = '';
    document.getElementById('offerPrice').value = '';
    document.getElementById('offerDelivery').value = '';
  });
  
  // ─── AI Offer ───
  document.getElementById('aiOfferBtn').addEventListener('click', () => {
    const brand = document.getElementById('offerBrand').value.trim();
    const product = document.getElementById('offerProduct').value.trim();
    const price = document.getElementById('offerPrice').value.trim();
    const delivery = document.getElementById('offerDelivery').value.trim();
    
    if (!brand && !product && !price) {
      showToast('Lütfen Manuel Teklif sekmesindeki formu doldurun.', 'error');
      return;
    }
    
    // Show preview card
    document.getElementById('previewBrand').textContent = brand || '—';
    document.getElementById('previewProduct').textContent = product || '—';
    document.getElementById('previewPrice').textContent = price ? `${price} €` : '—';
    document.getElementById('previewDelivery').textContent = delivery || '2-3 iş günü';
    document.getElementById('aiOfferPreview').style.display = 'block';
  });
  
  // Confirm AI Offer
  document.getElementById('confirmAiOfferBtn').addEventListener('click', () => {
    const brand = document.getElementById('previewBrand').textContent;
    const product = document.getElementById('previewProduct').textContent;
    const price = document.getElementById('previewPrice').textContent;
    const delivery = document.getElementById('previewDelivery').textContent;
    
    const req = requests.find(r => r.id === activeRequestId);
    if (!req) return;
    
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    req.chat.push({
      from: 'admin',
      name: 'Ahmet Y.',
      text: `📦 Profesyonel Teklif\n\nMarka: ${brand}\nÜrün: ${product}\nFiyat: ${price}\nTeslimat: ${delivery}\n\nOnayınızı bekliyoruz.`,
      time: timeStr
    });
    
    renderChat(req);
    document.getElementById('aiOfferPreview').style.display = 'none';
    showToast('AI destekli teklif gönderildi!', 'success');
  });
  
  // ─── Quick Offer Buttons ───
  document.querySelectorAll('.quick-offer').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('offerBrand').value = btn.dataset.brand;
      document.getElementById('offerProduct').value = btn.dataset.product;
      document.getElementById('offerPrice').value = btn.dataset.price;
      document.getElementById('offerDelivery').value = btn.dataset.delivery;
      
      // Also show the preview
      document.getElementById('previewBrand').textContent = btn.dataset.brand;
      document.getElementById('previewProduct').textContent = btn.dataset.product;
      document.getElementById('previewPrice').textContent = `${btn.dataset.price} €`;
      document.getElementById('previewDelivery').textContent = btn.dataset.delivery;
      document.getElementById('aiOfferPreview').style.display = 'block';
      
      showToast(`${btn.dataset.brand} şablonu yüklendi.`, 'info');
    });
  });
  
  // ─── Profit Calculator ───
  function calcProfit() {
    const cost = parseFloat(document.getElementById('costPrice').value) || 0;
    const sell = parseFloat(document.getElementById('sellPrice').value) || 0;
    const profit = sell - cost;
    const profitEl = document.getElementById('profitValue');
    profitEl.textContent = `${profit.toFixed(2)} €`;
    profitEl.style.color = profit >= 0 ? 'var(--success)' : 'var(--error)';
  }
  
  document.getElementById('costPrice').addEventListener('input', calcProfit);
  document.getElementById('sellPrice').addEventListener('input', calcProfit);
  
  // ─── Save Note ───
  document.getElementById('saveNoteBtn').addEventListener('click', () => {
    const input = document.getElementById('noteInput');
    const text = input.value.trim();
    if (!text || !activeRequestId) return;
    
    const req = requests.find(r => r.id === activeRequestId);
    if (!req) return;
    
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    req.notes.push({
      text: text,
      author: 'Ahmet Y.',
      time: timeStr
    });
    
    renderNotes(req);
    input.value = '';
    showToast('Not kaydedildi.', 'success');
  });
  
  // ─── Doc Preview (simulated) ───
  document.getElementById('docsGrid').addEventListener('click', (e) => {
    const docItem = e.target.closest('.doc-item');
    if (docItem) {
      const name = docItem.querySelector('.doc-name').textContent;
      showToast(`"${name}" önizlemesi açılıyor…`, 'info');
    }
  });
  
  // ─── Image Upload (simulated) ───
  document.getElementById('offerImageUpload').addEventListener('click', () => {
    showToast('Dosya seçici açılıyor… (simülasyon)', 'info');
  });
  
  // ─── Click outside sidebar to close on mobile ───
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    if (window.innerWidth <= 1024 && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });
});
