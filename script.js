// Intersection observer for fade-up animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Smooth active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cyan)' : '';
  });
}, { passive: true });

// Parallax on hero glows
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const g1 = document.querySelector('.hero-glow');
  const g2 = document.querySelector('.hero-glow2');
  if (g1) g1.style.transform = `translateY(${y * 0.15}px)`;
  if (g2) g2.style.transform = `translateY(${y * 0.1}px)`;
}, { passive: true });
