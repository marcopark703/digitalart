/* =============================================
   507 MUSEUM — Main JavaScript
   ============================================= */

'use strict';

/* ===== Navigation ===== */
const mainNav = document.getElementById('mainNav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (mainNav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  });
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ===== Reveal on Scroll ===== */
function initReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ===== Hero Canvas Animation ===== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animFrame;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.opacityDelta = (Math.random() - 0.5) * 0.008;
      this.color = Math.random() > 0.7 
        ? `rgba(201, 169, 110, ${this.opacity})` 
        : `rgba(255, 255, 255, ${this.opacity})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += this.opacityDelta;
      if (this.opacity <= 0.05 || this.opacity >= 0.65) this.opacityDelta *= -1;
      if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) {
        this.reset();
      }
    }
    draw() {
      const isGold = this.color.includes('201, 169');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = isGold
        ? `rgba(201, 169, 110, ${this.opacity})`
        : `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Line connections
  function drawConnections() {
    const maxDist = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.06;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(201, 169, 110, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Gradient overlay on canvas
  function drawGradient() {
    // Subtle radial glow — deep crimson/gold at center
    const gradient = ctx.createRadialGradient(W * 0.25, H * 0.7, 0, W * 0.25, H * 0.7, W * 0.6);
    gradient.addColorStop(0, 'rgba(80, 20, 10, 0.35)');
    gradient.addColorStop(0.5, 'rgba(20, 10, 5, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    // Gold shimmer top-right
    const g2 = ctx.createRadialGradient(W * 0.8, H * 0.15, 0, W * 0.8, H * 0.15, W * 0.4);
    g2.addColorStop(0, 'rgba(201, 169, 110, 0.12)');
    g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, W, H);

    drawGradient();
    drawConnections();

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animFrame = requestAnimationFrame(animate);
  }

  function init() {
    resize();
    particles = [];
    const count = Math.min(Math.floor((W * H) / 9000), 120);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
    if (animFrame) cancelAnimationFrame(animFrame);
    animate();
  }

  init();
  window.addEventListener('resize', () => {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(init, 200);
  });
}

/* ===== Content Slider ===== */
function initContentSlider() {
  const track = document.getElementById('contentTrack');
  const prevBtn = document.getElementById('contentPrev');
  const nextBtn = document.getElementById('contentNext');

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = track.querySelectorAll('.content-preview__card');
  const total = cards.length;

  function getVisibleCount() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1100) return 1.5;
    return 3;
  }

  function getCardWidth() {
    const card = cards[0];
    if (!card) return 0;
    const style = window.getComputedStyle(card);
    return card.offsetWidth + parseFloat(style.marginRight || 0) + 24; // gap
  }

  function updateSlider() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, total - Math.floor(visibleCount));
    currentIndex = Math.min(currentIndex, maxIndex);
    const offset = currentIndex * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, total - Math.floor(visibleCount));
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
}

/* ===== Parallax on Scroll ===== */
function initParallax() {
  const parallaxImgs = document.querySelectorAll('.parallax-img');
  if (!parallaxImgs.length) return;

  function update() {
    parallaxImgs.forEach(img => {
      const rect = img.closest('section')?.getBoundingClientRect();
      if (!rect) return;
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!visible) return;
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const shift = (progress - 0.5) * 60;
      img.style.transform = `translateY(${shift}px)`;
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ===== Smooth Cursor Highlight (desktop) ===== */
function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateGlow() {
    cx += (mx - cx) * 0.06;
    cy += (my - cy) * 0.06;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* ===== Number Counter Animation ===== */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current).toLocaleString();
        }, 16);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ===== Form Handling ===== */
function initForms() {
  const forms = document.querySelectorAll('.contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate send
      await new Promise(r => setTimeout(r, 1200));
      btn.textContent = '✓ Message Sent';
      btn.style.background = '#2a6b45';
      btn.style.borderColor = '#2a6b45';
      btn.style.color = '#fff';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  });
}

/* ===== Tab Panels ===== */
function initTabs() {
  const tabGroups = document.querySelectorAll('.tab-group');
  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById(tab.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  });
}

/* ===== Anchor smooth scroll for hash links ===== */
function initAnchorScroll() {
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#') || href.includes(window.location.pathname)) {
        const id = href.split('#')[1];
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ===== Init All ===== */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initHeroCanvas();
  initContentSlider();
  initParallax();
  initCursorGlow();
  initCounters();
  initForms();
  initTabs();
  initAnchorScroll();
});
