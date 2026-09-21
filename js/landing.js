/* IMB · Landing: menú mobile, atajos al formulario y validación básica */
(function () {
  "use strict";

  // Menú mobile
  const nav = document.querySelector(".site-nav");
  const toggle = nav && nav.querySelector(".site-nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    nav.querySelectorAll(".site-nav__links a").forEach((a) =>
      a.addEventListener("click", () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }));
  }

  // "¿Qué necesitas hoy?"
  const interes = document.getElementById("f-interes");
  document.querySelectorAll("[data-interes]").forEach((el) =>
    el.addEventListener("click", () => {
      if (interes) interes.value = el.dataset.interes;
      setTimeout(() => document.getElementById("f-nombres")?.focus({ preventScroll: true }), 500);
    }));

  // Formulario
  const form = document.querySelector(".contact-form");
  if (form) {
    const status = form.querySelector(".contact-form__status");
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        const first = form.querySelector(":invalid");
        first?.focus();
        status.textContent = "Completá los campos obligatorios: nombres, apellidos y cómo podemos ayudarte.";
        return;
      }
      if (!form.getAttribute("action")) {
        e.preventDefault();
        status.textContent = "Formulario sin conectar todavía (falta configurar el envío).";
        console.warn("IMB landing: configurar el atributo action del formulario.");
      }
    });
  }
})();
