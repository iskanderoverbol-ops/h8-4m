// ===== DigitalHub — скрипты =====
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const toTop = document.querySelector(".to-top");

  // Мобильное меню
  if (burger && nav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        burger.classList.remove("open");
        nav.classList.remove("open");
      })
    );
  }

  // Подсветка активного пункта меню по текущему URL
  const current = location.pathname.replace(/\/$/, "/index.html").split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach((link) => {
    const href = link.getAttribute("href").replace(/\/$/, "/index.html").split("/").pop() || "index.html";
    if (href === current) link.classList.add("active");
  });

  // Тень у header и кнопка «наверх» при прокрутке
  const onScroll = () => {
    header?.classList.toggle("scrolled", scrollY > 10);
    toTop?.classList.toggle("show", scrollY > 500);
  };
  addEventListener("scroll", onScroll);
  onScroll();
  toTop?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  // Анимация появления блоков
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Анимация счётчиков
  document.querySelectorAll("[data-count]").forEach((el) => {
    const counter = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || "";
      let value = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        value = Math.min(value + step, target);
        el.textContent = value + suffix;
        if (value === target) clearInterval(timer);
      }, 20);
      counter.disconnect();
    });
    counter.observe(el);
  });

  // Валидация формы обратной связи
  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", (e) => {
      let valid = true;
      form.querySelectorAll("[required]").forEach((field) => {
        const group = field.closest(".form__group");
        let ok = field.value.trim() !== "";
        if (field.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        group.classList.toggle("error", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        return;
      }
      // В Django-версии форма отправится на сервер; в статичном шаблоне показываем сообщение
      if (!form.getAttribute("action")) {
        e.preventDefault();
        form.reset();
        form.querySelector(".form__success").classList.add("show");
      }
    });
    form.querySelectorAll("input, textarea").forEach((field) =>
      field.addEventListener("input", () => field.closest(".form__group").classList.remove("error"))
    );
  }
});
