/* =========================================================
   НАСТРОЙКИ РЕФЕРАЛЬНЫХ ССЫЛОК
   ========================================================= */
const REFERRAL_LINKS = {
  bybit:
    "https://www.bybit.com/invite?ref=460JR2&medium=referral&utm_campaign=evergreen&share_to=link",
  bingx: "https://bingxdao.com/invite/PMY2YU/",
  pionex: "https://accounts.pionex.com/ru/signUp?r=08uCq3BCqWP",
};

/* ---------- 1. Подставляем реферальные ссылки ---------- */
document.querySelectorAll(".btn[data-ref]").forEach((btn) => {
  const key = btn.dataset.ref;
  const url = REFERRAL_LINKS[key];
  if (url && url !== "#") {
    btn.setAttribute("href", url);
  }
});

/* ---------- 2. Плейсхолдер при ошибке загрузки картинки ---------- */
document.querySelectorAll(".exchange__media img").forEach((img) => {
  const markFailed = () => {
    img.classList.add("is-error");
    const media = img.closest(".exchange__media");
    if (media) media.classList.add("is-empty");
  };
  if (img.complete && img.naturalWidth === 0) markFailed();
  img.addEventListener("error", markFailed);
});

/* ---------- 3. Плавное появление секций ---------- */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("is-visible"));
}

/* ---------- 4. Индикатор прокрутки и кнопка «Наверх» ---------- */
const progressBar = document.getElementById("progress");
const toTopBtn = document.getElementById("toTop");

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) progressBar.style.width = percent + "%";
  if (toTopBtn) toTopBtn.classList.toggle("is-visible", scrollTop > 600);
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

toTopBtn?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
});

/* ---------- 5. Активный пункт навигации ---------- */
const navLinks = document.querySelectorAll(".topnav__list a");
const sections = [...document.querySelectorAll("main [id]")].filter(
  (el) => el.id
);

if ("IntersectionObserver" in window && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  sections.forEach((s) => navObserver.observe(s));
}

/* ---------- 6. Год в подвале ---------- */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = Math.max(2026, new Date().getFullYear());
}
