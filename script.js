const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!open));
    mobileNav.classList.toggle("is-open", !open);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("is-open");
    });
  });
}

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const params = new URLSearchParams(window.location.search);

// Someone who clicked an ad for bacteriostatic water goes straight to that
// product, not the full catalog they would have to search through.
if (/\bbac(teriostatic)?\s+water\b/i.test(params.get("utm_term") || "")) {
  document.querySelectorAll('a[href="https://azzurriwellness.com/shop/"]').forEach((link) => {
    link.href = "https://azzurriwellness.com/shop/bacteriostatic-water/";
    link.firstChild.textContent = link.firstChild.textContent.replace("Shop Now", "Shop Bacteriostatic Water");
  });
}

// Carry the ad click's tracking parameters (gclid, utm_*) onto links to the
// shop, so Google Ads can still credit an order placed on azzurriwellness.com.
const keep = new URLSearchParams();
params.forEach((value, key) => {
  if (/^(gclid|gbraid|wbraid|fbclid|utm_)/.test(key)) keep.set(key, value);
});

if ([...keep].length) {
  document.querySelectorAll('a[href^="https://azzurriwellness.com"]').forEach((link) => {
    const url = new URL(link.href);
    keep.forEach((value, key) => url.searchParams.set(key, value));
    link.href = url.toString();
  });
}
