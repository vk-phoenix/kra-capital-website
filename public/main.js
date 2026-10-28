'use strict';
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');
  const links = Array.from(document.querySelectorAll('.site-nav a'));
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const closeMenu = () => {
    if (!menu || !nav) return;
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });
    links.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
    document.addEventListener('click', e => {if (!nav.contains(e.target) && !menu.contains(e.target)) closeMenu();});
  }
  let ticking = false;
  const paintScroll = () => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    const progress = document.querySelector('.scroll-progress');
    if (progress) progress.style.width = (scrollable > 0 ? Math.max(0, Math.min(100, scrollY / scrollable * 100)) : 0) + '%';
    header?.classList.toggle('is-scrolled', scrollY > 15);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(paintScroll); ticking = true; }
  }, { passive: true });
  paintScroll();
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target);}
      }
    }, { threshold: 0.05, rootMargin: '0px 0px 20px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            const active = link.getAttribute('href') === '#' + entry.target.id;
            link.classList.toggle('is-active', active);
            if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
          });
        }
      });
    }, {rootMargin: '-25% 0px -55% 0px', threshold: 0});
    ['about','trading','technology','risk','research','partnerships'].forEach(id => {
      const section = document.getElementById(id); if (section) sectionObserver.observe(section);
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  }
})();
