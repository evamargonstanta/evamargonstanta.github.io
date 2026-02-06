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

  // Active stanje v menijih (desktop + mobile footer)
  const activeKey = document.querySelector('meta[name="nav-active"]')?.content;

  if (activeKey) {
    // označi aktivno ikono povsod (če obstaja v headerju)
    mount.querySelectorAll(`.icon-link[data-nav="${activeKey}"]`).forEach(el => {
      el.classList.add('is-active');
    });

    // Na mobilnem footer meniju skrij aktivno ikono,
    // AMPAK samo za tvoje interne strani (ne za shop).
    const internalKeys = new Set(['about','painting','drawing','books','printmaking','animation']);
    if (internalKeys.has(activeKey)) {
      const footerActive = mount.querySelector(
        `.icon-nav-mobile-footer .icon-link[data-nav="${activeKey}"]`
      );
      if (footerActive) footerActive.style.display = 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', loadHeader);
