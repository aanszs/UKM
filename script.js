/**
 * UKM BADMINTON UNU BLITAR
 * Premium Website Engine v2 — Hijau · Emas · Biru
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ====================================================
     1. PERFORMANCE DETECTION
  ==================================================== */
  const isMobile = window.matchMedia('(max-width: 768px)').matches
    || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const highPerf = !isMobile && !prefersReduced;

  /* ====================================================
     2. ANNOUNCEMENT BAR CLOSE
  ==================================================== */
  const annBar   = document.getElementById('announcementBar');
  const annClose = document.getElementById('annClose');
  const header   = document.getElementById('mainHeader');

  const updateHeaderOffset = () => {
    if (!annBar || annBar.style.display === 'none') {
      if (header) header.style.marginTop = '0';
    }
  };

  annClose?.addEventListener('click', () => {
    if (annBar) {
      annBar.style.transition = 'all 0.4s cubic-bezier(0.16,1,0.3,1)';
      annBar.style.opacity = '0';
      annBar.style.maxHeight = annBar.offsetHeight + 'px';
      setTimeout(() => {
        annBar.style.maxHeight = '0';
        annBar.style.padding = '0';
      }, 50);
      setTimeout(() => {
        annBar.style.display = 'none';
        if (header) header.style.marginTop = '0';
      }, 420);
    }
  });

  /* ====================================================
     3. CUSTOM CURSOR (desktop only)
  ==================================================== */
  const ring = document.getElementById('cursorRing');
  const dot  = document.getElementById('cursorDot');

  if (highPerf && ring && dot) {
    let rx = 0, ry = 0, mx = 0, my = 0;
    document.body.classList.add('cursor-ready');

    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

    const animRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      requestAnimationFrame(animRing);
    };
    requestAnimationFrame(animRing);

    document.querySelectorAll('a, button, .gm-item, .faq-q, input, textarea, select, .gf-btn').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  /* ====================================================
     4. READING PROGRESS BAR
  ==================================================== */
  const bar = document.getElementById('progressBar');
  if (bar) {
    const updateBar = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = ((window.scrollY / total) * 100) + '%';
    };
    window.addEventListener('scroll', updateBar, { passive: true });
  }

  /* ====================================================
     5. NAVBAR SCROLL STATE
  ==================================================== */
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ====================================================
     6. MOBILE MENU
  ==================================================== */
  const menuBtn  = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuBtn?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ====================================================
     7. ACTIVE NAV LINK ON SCROLL
  ==================================================== */
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections   = document.querySelectorAll('section[id]');

  const setActiveNav = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 180) current = s.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ====================================================
     8. TYPING ANIMATION
  ==================================================== */
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const words = ['berkembang bersama.', 'meraih prestasi emas.', 'menjunjung sportivitas.', 'membangun mental juara.'];
    let wi = 0, ci = 0, del = false;

    const type = () => {
      const word = words[wi];
      typingEl.textContent = del ? word.slice(0, --ci) : word.slice(0, ++ci);
      let delay = del ? 32 : 70;
      if (!del && ci === word.length) { delay = 2600; del = true; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; delay = 500; }
      setTimeout(type, delay);
    };
    setTimeout(type, 1000);
  }

  /* ====================================================
     9. PARTICLE CANVAS (hero background) — Tri-color
  ==================================================== */
  const canvas = document.getElementById('particleCanvas');
  if (canvas && highPerf) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const COUNT = 60, LINK = 120;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

    // Color palette matching logo: green, gold, blue
    const COLORS = [
      [26, 138, 64],   // green-mid
      [212, 168, 41],  // gold
      [20, 86, 168],   // blue
      [61, 184, 107],  // green-light
    ];

    class Particle {
      constructor() { this.color = COLORS[Math.floor(Math.random() * COLORS.length)]; this.init(); this.x = Math.random() * W; this.y = Math.random() * H; }
      init() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.8 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.55;
        this.vy = (Math.random() - 0.5) * 0.55;
        this.a  = Math.random() * 0.4 + 0.1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.init();
        const dx = mx - this.x, dy = my - this.y;
        const d  = Math.hypot(dx, dy);
        if (d < 110) {
          const f = (110 - d) / 110;
          this.x -= dx / d * f * 2.5;
          this.y -= dy / d * f * 2.5;
        }
      }
      draw() {
        const [r, g, b] = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${this.a})`; ctx.fill();
      }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    const drawLinks = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.12;
            const [r, g, b] = particles[i].color;
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLinks();
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ====================================================
     10. SCROLL REVEAL (IntersectionObserver)
  ==================================================== */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => el.classList.add('revealed'), delay);
      revealObs.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ====================================================
     11. ANIMATED COUNTERS
  ==================================================== */
  const counters = document.querySelectorAll('.counter');
  let countersDone = false;

  const runCounters = () => {
    if (countersDone) return;
    countersDone = true;
    counters.forEach(el => {
      const target = +el.dataset.target;
      const dur = 2200, fps = 60, frames = (dur / 1000) * fps;
      let f = 0;
      const tick = setInterval(() => {
        f++;
        const ease = 1 - Math.pow(1 - f / frames, 3);
        el.textContent = Math.floor(ease * target);
        if (f >= frames) { el.textContent = target + '+'; clearInterval(tick); }
      }, 1000 / fps);
    });
  };

  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) runCounters();
    }, { threshold: 0.3 });
    counters.forEach(c => cObs.observe(c));
  }

  /* ====================================================
     12. GALLERY FILTER + LIGHTBOX
  ==================================================== */
  const gfBtns  = document.querySelectorAll('.gf-btn');
  const gmItems = document.querySelectorAll('.gm-item');

  gfBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      gfBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;

      gmItems.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        if (match) {
          item.style.display = '';
          item.style.pointerEvents = '';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          item.style.pointerEvents = 'none';
          setTimeout(() => { item.style.display = 'none'; }, 360);
        }
      });
    });
  });

  // Lightbox
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lbImg');
  const lbCap   = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');
  let lbIndex   = 0;
  let lbActive  = [];

  const openLb = (idx) => {
    lbActive = Array.from(gmItems).filter(i => i.style.display !== 'none');
    lbIndex  = idx;
    renderLb();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  const renderLb = () => {
    const item = lbActive[lbIndex];
    if (!item) return;
    const img = item.querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
  };
  const shiftLb = (dir) => {
    lbIndex = (lbIndex + dir + lbActive.length) % lbActive.length;
    renderLb();
  };

  gmItems.forEach((item, i) => { item.addEventListener('click', () => openLb(i)); });
  lbClose?.addEventListener('click', closeLb);
  lbPrev?.addEventListener('click', () => shiftLb(-1));
  lbNext?.addEventListener('click', () => shiftLb(1));
  lb?.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') shiftLb(1);
    if (e.key === 'ArrowLeft')  shiftLb(-1);
  });

  /* ====================================================
     13. FAQ ACCORDION
  ==================================================== */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', function () {
      const item   = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ====================================================
     14. CONTACT FORM
  ==================================================== */
  const form   = document.getElementById('contactForm');
  const submit = document.getElementById('submitBtn');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btnSpan = submit.querySelector('span');
    const orig = btnSpan ? btnSpan.textContent : submit.textContent;
    if (btnSpan) btnSpan.textContent = 'Mengirim...';
    else submit.textContent = 'Mengirim...';
    submit.style.opacity = '0.7';
    submit.style.pointerEvents = 'none';

    setTimeout(() => {
      showToast('✅ Pesan berhasil dikirim! Tim pengurus akan menghubungi Anda dalam 1×24 jam. 🏸');
      if (btnSpan) btnSpan.textContent = orig;
      else submit.textContent = orig;
      submit.style.opacity = '';
      submit.style.pointerEvents = '';
      form.reset();
    }, 1600);
  });

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed', bottom: '32px', left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: 'linear-gradient(135deg, #1A8A40, #0E5A28)',
      color: '#fff', padding: '16px 28px',
      borderRadius: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: '0.88rem', fontWeight: '500', zIndex: '9999',
      boxShadow: '0 8px 40px rgba(26,138,64,.4)',
      border: '1px solid rgba(61,184,107,.4)',
      opacity: '0', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      maxWidth: '90vw', textAlign: 'center', lineHeight: '1.5',
    });
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* ====================================================
     15. HERO TITLE — STAGGERED ENTRANCE
  ==================================================== */
  const heroLines = document.querySelectorAll('.hero-title .line');
  heroLines.forEach((line, i) => {
    line.style.opacity  = '0';
    line.style.transform = 'translateY(30px)';
    line.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${200 + i * 140}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${200 + i * 140}ms`;
    setTimeout(() => {
      line.style.opacity  = '1';
      line.style.transform = 'none';
    }, 80);
  });

  /* ====================================================
     16. TEAM CARD HOVER TILT EFFECT (desktop)
  ==================================================== */
  if (highPerf) {
    document.querySelectorAll('.team-card, .vision-card, .ach-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ====================================================
     17. SMOOTH BACK-TO-TOP
  ==================================================== */
  document.querySelector('.back-to-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
