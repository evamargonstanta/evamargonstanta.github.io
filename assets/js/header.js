async function loadHeader() {
  const mount = document.getElementById("siteHeader");
  if (!mount) return;

  // Naloži skupni header iz sl/_header.html (ker so vse sl strani v isti mapi)
  const res = await fetch("header.html");

  mount.innerHTML = await res.text();

  // Ker so ikone v root/assets/images, iz sl/ do tja potrebuješ ../
  const assetPrefix = "../";

  // Nastavi src za vse ikone
  document.querySelectorAll(".site-header img[data-icon]").forEach(img => {
  const file = img.getAttribute("data-icon");
  const url = assetPrefix + "assets/images/" + file;

  img.src = url;

  // Če se ikona ne naloži, jo skrijemo (da ni "vprašaja")
  img.onerror = () => {
    img.style.display = "none";
  };
});


  // Ugotovi, katera stran je aktivna (npr. books.html)
  const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  // Označi aktivno + pokaži samo njen naslov
  document.querySelectorAll(".site-header .icon-link[data-page]").forEach(a => {
    const page = (a.getAttribute("data-page") || "").toLowerCase();
    const isActive = page === current;

    if (isActive) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
      const title = a.querySelector(".icon-title");
      if (title) title.style.display = "block";
    } else {
      a.classList.remove("is-active");
      a.removeAttribute("aria-current");
      const title = a.querySelector(".icon-title");
      if (title) title.style.display = "none";
    }
  });
}

loadHeader();
