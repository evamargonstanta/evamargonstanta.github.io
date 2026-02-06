async function loadHeader() {
  const mount = document.querySelector('[data-include="header"]');
  if (!mount) return;

  const res = await fetch('partials/header.html', { cache: "no-cache" });
  const html = await res.text();
  mount.innerHTML = html;

  // Preberi meta podatke iz strani
  const title = document.querySelector('meta[name="page-title"]')?.content || document.title;
  const icon = document.querySelector('meta[name="page-icon"]')?.content || '';

  const pageTitle = document.getElementById('pageTitle');
  const pageIcon = document.getElementById('pageIcon');

  if (pageTitle) pageTitle.textContent = title;
  if (pageIcon) {
    pageIcon.src = icon;
    pageIcon.alt = title;
  }

  // Active stanje v meniju
  const activeKey = document.querySelector('meta[name="nav-active"]')?.content;
  if (activeKey) {
    const activeLink = mount.querySelector(`.icon-link[data-nav="${activeKey}"]`);
    if (activeLink) activeLink.classList.add('is-active');
  }
}

document.addEventListener('DOMContentLoaded', loadHeader);



(function setActiveNavAuto(){
  const file = (location.pathname.split('/').pop() || '').toLowerCase();

  const map = {
    'about.html': 'about',
    'wet-techniques.html': 'wet-techniques',
    'dry-techniques.html': 'dry-techniques',
    'books.html': 'books',
    'printmaking.html': 'printmaking',
    'animation.html': 'animation'
  };

  const activeKey = map[file];
  if (!activeKey) return;

  document.querySelectorAll('[data-nav]').forEach(a => {
    a.classList.toggle('is-active', a.getAttribute('data-nav') === activeKey);
  });
})();

