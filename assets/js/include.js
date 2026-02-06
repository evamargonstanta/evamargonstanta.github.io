async function loadInclude(selector, file) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  const res = await fetch(file, { cache: "no-cache" });
  const html = await res.text();
  mount.innerHTML = html;
}

async function initPartials() {
  // header
  await loadInclude('[data-include="header"]', 'partials/header.html');

  // footer nav (mobile spodaj)
  await loadInclude('[data-include="footer-nav"]', 'partials/footer-nav.html');

  // page meta -> header title/icon
  const title = document.querySelector('meta[name="page-title"]')?.content || document.title;
  const icon = document.querySelector('meta[name="page-icon"]')?.content || '';

  const pageTitle = document.getElementById('pageTitle');
  const pageIcon = document.getElementById('pageIcon');

  if (pageTitle) pageTitle.textContent = title;
  if (pageIcon) {
    pageIcon.src = icon;
    pageIcon.alt = title;
  }

  // active key -> označi v desktop in footer navu
  const activeKey = document.querySelector('meta[name="nav-active"]')?.content;
  if (activeKey) {
    document.querySelectorAll(`.icon-link[data-nav="${activeKey}"]`).forEach(el => {
      el.classList.add('is-active');
    });
  }
}

document.addEventListener('DOMContentLoaded', initPartials);
