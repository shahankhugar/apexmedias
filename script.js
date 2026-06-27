/* ── script.js — Apexmedias (Enhanced) ── */

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');


/* ── Mobile nav toggle ── */
navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});


navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Open menu');
  });
});


/* ── Header scroll state ── */
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
});


/* ── Scroll progress bar ── */
const scrollProgress = document.querySelector('.scroll-progress');
function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });


/* ── Back to top button ── */
const backToTop = document.getElementById('backToTop');
function updateBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle('visible', window.scrollY > 600);
}
window.addEventListener('scroll', updateBackToTop, { passive: true });
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── Intersection Observer for scroll reveals ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);


document.querySelectorAll('.service-card, .work-card, .founder-card, .process-step, .media-strip-inner, .platform-card').forEach((el) => {
  el.style.opacity = '0';
  if (!el.classList.contains('tilt-card')) {
    el.style.transform = 'translateY(24px)';
  }
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});


const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .service-card.visible,
  .work-card.visible,
  .founder-card.visible,
  .process-step.visible,
  .media-strip-inner.visible,
  .platform-card.visible {
    opacity: 1 !important;
  }
  .service-card.visible:not(.tilt-card),
  .founder-card.visible,
  .process-step.visible,
  .media-strip-inner.visible,
  .platform-card.visible {
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(revealStyle);


/* ── Staggered reveal for grid items ── */
function staggerReveal(selector) {
  const container = document.querySelector(selector);
  if (!container) return;
  const items = container.children;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Array.from(items).forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('visible');
            }, i * 120);
          });
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  obs.observe(container);
}

staggerReveal('.services-grid');
staggerReveal('.founders-grid');
staggerReveal('.process-steps');
staggerReveal('.platforms-row');


/* ── Counter animation for hero stats ── */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const numberEl = el.querySelector('.stat-number');
        if (!numberEl || el.dataset.counted) return;
        el.dataset.counted = 'true';

        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        function animate() {
          current += step;
          if (current >= target) {
            numberEl.textContent = target + suffix;
            return;
          }
          numberEl.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(animate);
        }
        numberEl.textContent = '0';
        animate();
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat[data-count]').forEach((el) => {
  counterObserver.observe(el);
});


/* ── Typed effect for hero heading ── */
const heroH1 = document.querySelector('.hero h1');
if (heroH1) {
  heroH1.style.opacity = '0';
  heroH1.style.transform = 'translateY(20px)';
  heroH1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  setTimeout(() => {
    heroH1.style.opacity = '1';
    heroH1.style.transform = 'translateY(0)';
  }, 300);
}

const heroLead = document.querySelector('.hero-lead');
if (heroLead) {
  heroLead.style.opacity = '0';
  heroLead.style.transform = 'translateY(16px)';
  heroLead.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
  setTimeout(() => {
    heroLead.style.opacity = '1';
    heroLead.style.transform = 'translateY(0)';
  }, 100);
}

const heroActions = document.querySelector('.hero-actions');
if (heroActions) {
  heroActions.style.opacity = '0';
  heroActions.style.transform = 'translateY(16px)';
  heroActions.style.transition = 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s';
  setTimeout(() => {
    heroActions.style.opacity = '1';
    heroActions.style.transform = 'translateY(0)';
  }, 100);
}


/* ── Active nav highlight ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach((a) => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--gold-light)';
        }
      });
    }
  });
}
window.addEventListener('scroll', highlightNav, { passive: true });


/* ── Custom cursor & mouse interactions ── */
const finePointer = window.matchMedia('(pointer: fine)');


if (finePointer.matches) {
  document.body.classList.add('custom-cursor');


  const cursor = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');


  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;


  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    updateParallax(e);
    updateHeroGlow(e);
  });


  document.addEventListener('mouseleave', () => {
    cursor?.classList.add('hidden');
  });


  document.addEventListener('mouseenter', () => {
    cursor?.classList.remove('hidden');
  });


  function animateCursor() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();


  const hoverTargets = 'a, button, .btn, .social-icon, .social-badge, .footer-social-link, .service-card, .work-card, .founder-card, .process-step, .tilt-card, .float-icon, .logo-interactive, .logo-link, .platform-card, .founder-social-link, .back-to-top';
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
  });


  document.querySelectorAll('.logo-interactive').forEach((wrapper) => {
    const shine = wrapper.querySelector('.logo-shine');

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      if (shine) {
        const shineX = ((e.clientX - rect.left) / rect.width) * 100;
        shine.style.setProperty('--shine-x', `${shineX}%`);
      }
    });
  });


  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });


  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  const floatIcons = document.querySelectorAll('.float-icon');
  let parallaxX = 0;
  let parallaxY = 0;


  function updateParallax(e) {
    parallaxX = (e.clientX / window.innerWidth - 0.5) * 2;
    parallaxY = (e.clientY / window.innerHeight - 0.5) * 2;
    floatIcons.forEach((icon, i) => {
      const depth = (i + 1) * 12;
      icon.style.transform = `translate(${parallaxX * depth}px, ${parallaxY * depth}px)`;
    });
  }


  const hero = document.querySelector('.hero');
  function updateHeroGlow(e) {
    if (!hero) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    hero.style.setProperty('--mouse-x', `${x}%`);
    hero.style.setProperty('--mouse-y', `${y}%`);
  }


  document.querySelectorAll('.service-card:not(.tilt-card)').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--spot-x', `${x}%`);
      card.style.setProperty('--spot-y', `${y}%`);
    });
  });
}


finePointer.addEventListener('change', (e) => {
  if (!e.matches) {
    document.body.classList.remove('custom-cursor');
  }
});


/* ── Ripple effect on buttons ── */
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out;
      pointer-events: none;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleKeyframes = document.createElement('style');
rippleKeyframes.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleKeyframes);

/* ── Founder Modal Logic ── */
const founderModal = document.getElementById('founderModal');
const modalClose = document.querySelector('.founder-modal-close');
const modalBackdrop = document.querySelector('.founder-modal-backdrop');

if (founderModal) {
  const mPhoto = document.getElementById('modalPhoto');
  const mAvatarFallback = document.getElementById('modalAvatarFallback');
  const mRole = document.getElementById('modalRole');
  const mName = document.getElementById('modalName');
  const mSubtitle = document.getElementById('modalSubtitle');
  const mBio = document.getElementById('modalBio');
  const mSkills = document.getElementById('modalSkills');
  const mEmail = document.getElementById('modalEmail');
  const mEmailText = document.getElementById('modalEmailText');
  const mIg = document.getElementById('modalIg');

  function openModal(card) {
    const ds = card.dataset;
    mName.textContent = ds.name;
    mRole.textContent = ds.role;
    mSubtitle.textContent = ds.subtitle || '';
    mSubtitle.style.display = ds.subtitle ? 'block' : 'none';
    mBio.textContent = ds.bio;
    
    if (ds.photo) {
      mPhoto.src = ds.photo;
      mPhoto.style.display = 'block';
      mAvatarFallback.style.display = 'none';
      mPhoto.nextElementSibling.style.display = 'block'; // the glow
    } else {
      mPhoto.style.display = 'none';
      mPhoto.nextElementSibling.style.display = 'none';
      mAvatarFallback.textContent = card.querySelector('.founder-avatar')?.textContent || '';
      mAvatarFallback.style.display = 'flex';
    }

    mSkills.innerHTML = '';
    if (ds.skills) {
      ds.skills.split(',').forEach(s => {
        const span = document.createElement('span');
        span.className = 'founder-modal-skill-tag';
        span.textContent = s.trim();
        mSkills.appendChild(span);
      });
    }

    if (ds.email) {
      mEmail.href = `mailto:${ds.email}`;
      mEmailText.textContent = 'Email'; // Or could be ds.email
      mEmail.style.display = 'inline-flex';
    } else {
      mEmail.style.display = 'none';
    }

    if (ds.instagram) {
      mIg.href = ds.instagram;
      mIg.style.display = 'inline-flex';
    } else {
      mIg.style.display = 'none';
    }

    founderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    founderModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.founder-card-interactive').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      // Don't open if they are hovering over the instagram icon link directly
      if (!e.target.closest('a')) {
        openModal(card);
      }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && founderModal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ── Dynamic Scroll Color Theme ── */
// Shifts the primary accent color within the Eggplant spectrum based on scroll depth
window.addEventListener('scroll', () => {
  const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollTotal > 0) {
    const scrollProgress = Math.min(1, Math.max(0, window.scrollY / scrollTotal));
    // Start Hue: 280 (Cool Eggplant) -> End Hue: 300 (Warm Eggplant)
    const currentHue = 280 + (scrollProgress * 20);
    document.documentElement.style.setProperty('--theme-h', currentHue);
  }
});
