/* ============================================
   MAIN.JS — Leonardo García Portfolio
   ============================================ */

/* ---- CURSOR PERSONALIZADO ---- */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (cursor && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Smooth lag for outer ring
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top  = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .project-card, .tool-chip, .tag').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

/* ---- NAV SCROLL ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---- BURGER MENU ---- */
const burger    = document.getElementById('burger');
const navLinks  = document.querySelector('.nav__links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ---- TYPEWRITER ---- */
const typewriterEl = document.getElementById('typewriter');
const roles = [
  'UX/UI Designer Jr.',
  'Front-End Developer',
  'Visual Thinker',
  'Problem Solver'
];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeWrite() {
  if (!typewriterEl) return;
  const current = roles[roleIndex];

  if (!deleting) {
    typewriterEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeWrite, 2000);
      return;
    }
  } else {
    typewriterEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeWrite, deleting ? 50 : 80);
}
typeWrite();

/* ---- PARALLAX ---- */
const parallaxLayer = document.querySelector('.parallax-layer');

window.addEventListener('scroll', () => {
  if (!parallaxLayer) return;
  const scrollY = window.scrollY;
  parallaxLayer.style.transform = `translateY(${scrollY * 0.3}px)`;
});

/* ---- SCROLL REVEAL ---- */
const revealEls = document.querySelectorAll(
  '.project-card, .skills__category, .process__step, .about__img-wrap, .about__text, .section__header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ---- SKILL BAR ANIMATION ---- */
const skillBars = document.querySelectorAll('.skill-bar__fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.getAttribute('data-target');
      entry.target.style.width = target + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ---- ORB MOUSE FOLLOW (subtle) ---- */
const orb3 = document.querySelector('.hero__orb--3');
document.addEventListener('mousemove', e => {
  if (!orb3) return;
  const x = (e.clientX / window.innerWidth  - 0.5) * 40;
  const y = (e.clientY / window.innerHeight - 0.5) * 40;
  orb3.style.transform = `translate(${x}px, ${y}px)`;
});

/* ---- CONTACT FORM ---- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = form.querySelector('.btn--primary');
    const span = btn.querySelector('span');
    const action = form.getAttribute('action');

    span.textContent = 'Enviando...';
    btn.disabled = true;

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        span.textContent = '¡Enviado!';
        btn.style.background = 'linear-gradient(135deg, #27C93F, #1a9e2e)';
        form.reset();
        setTimeout(() => {
          span.textContent = 'Enviar mensaje';
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      } else {
        span.textContent = 'Error, intenta de nuevo';
        btn.disabled = false;
      }
    } catch {
      span.textContent = 'Error de conexi&oacute;n';
      btn.disabled = false;
    }
  });
}

/* ---- ACTIVE NAV LINK ---- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--white)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
