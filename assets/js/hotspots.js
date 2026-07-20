/* ======================================================
   HOTSPOTS
   - desktop hotspot hint
   - hotspot navigation
   - mobile tap animation
====================================================== */

  /* HOTSPOT NAV + TAP FADE (desktop + mobile) */
  (function () {
    const links = {
      // mobile ids
      'hotspot-newspaper': 'about.html',
      'hotspot-brushes': 'wet-techniques.html',
      'hotspot-crayons': 'dry-techniques.html',
      'hotspot-books': 'books.html',
      'hotspot-press': 'printmaking.html',
      'hotspot-screen': 'animation.html',
      'hotspot-contact': 'contact.html',
      'hotspot-bag': 'https://evamargon.sumupstore.com',

      // desktop ids (-d)
      'hotspot-newspaper-d': 'about.html',
      'hotspot-brushes-d': 'wet-techniques.html',
      'hotspot-crayons-d': 'dry-techniques.html',
      'hotspot-books-d': 'books.html',
      'hotspot-press-d': 'printmaking.html',
      'hotspot-screen-d': 'animation.html',
      'hotspot-contact-d': 'contact.html',
      'hotspot-bag-d': 'https://evamargon.sumupstore.com'
    };

    const isMobileOrPortrait = () =>
      window.matchMedia('(max-width: 420px)').matches ||
      window.matchMedia('(orientation: portrait) and (max-width: 768px)').matches;

    function closestHotspot(node) {
      let el = node;
      while (el && el !== document && el !== window) {
        if (el.classList && el.classList.contains('hotspot')) return el;
        el = el.parentNode;
      }
      return null;
    }

    function bindHotspots(svgEl) {
      if (!svgEl) return;

      const clearTapped = () => {
        svgEl.querySelectorAll('.hotspot.is-tapped')
          .forEach(el => el.classList.remove('is-tapped'));
      };

      svgEl.addEventListener('click', function (e) {
        const hotspot = closestHotspot(e.target);
        if (!hotspot) return;

        const href = links[hotspot.id];
        if (!href) return;

        const isExternal = /^https?:\/\//i.test(href);

        if (isMobileOrPortrait()) {
          e.preventDefault();
          clearTapped();
          hotspot.classList.add('is-tapped');
          window.setTimeout(() => {
            hotspot.classList.remove('is-tapped');
            window.location.href = href;
          }, 260);
          return;
        }

        if (isExternal) window.open(href, '_blank', 'noopener');
        else window.location.href = href;
      }, { passive:false });

      window.addEventListener('scroll', clearTapped, { passive:true });
      window.addEventListener('resize', clearTapped, { passive:true });
    }

    bindHotspots(document.getElementById('hotspots-desktop'));
    bindHotspots(document.getElementById('hotspots-mobile'));
  })();











(function () {

  const desktopBtn = document.getElementById("desktopMenuBtn");
  const mobileBtn  = document.getElementById("openMenuBtn");
  const menu       = document.getElementById("mobileMenu");

  if (!desktopBtn || !menu) return;

  function playHotspotShine() {
    document.body.classList.remove("hotspot-shine");

    // restart animation
    void document.body.offsetWidth;

    document.body.classList.add("hotspot-shine");

    setTimeout(() => {
      document.body.classList.remove("hotspot-shine");
    }, 1200);
  }

  desktopBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const open = document.body.classList.toggle("show-hotspots");

    if (open) {
      playHotspotShine();
    }

    if (mobileBtn) {
      mobileBtn.setAttribute(
        "aria-expanded",
        open ? "true" : "false"
      );
    }
  });

})();
