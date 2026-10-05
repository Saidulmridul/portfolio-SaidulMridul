/* ════════════════════════════════════════════════════════
   Md. Saidul Islam Mridul — Portfolio — script.js
════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav toggle ── */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => navObserver.observe(s));
  }

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ── Project tabs ── */
  const tabs = document.querySelectorAll('.mission-tab');
  const panels = document.querySelectorAll('[data-mission-panel]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      panels.forEach(p => p.style.display = (p.dataset.missionPanel === target) ? 'flex' : 'none');
    });
  });

  /* ── Hero role typewriter ── */
  const roleEl = document.getElementById('hero-role-text');
  const roles = ['SUPPLY CHAIN', 'DATA ANALYTICS', 'LOGISTICS', 'OPTIMIZATION'];
  if (roleEl) {
    if (prefersReducedMotion) {
      roleEl.textContent = roles.join(' · ');
    } else {
      let ri = 0, ci = 0, deleting = false;
      const tick = () => {
        const word = roles[ri];
        roleEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
        if (!deleting && ci === word.length + 1) { deleting = true; setTimeout(tick, 1100); return; }
        if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
        setTimeout(tick, deleting ? 40 : 75);
      };
      tick();
    }
  }

});
