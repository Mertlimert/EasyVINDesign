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
