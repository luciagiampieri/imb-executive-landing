/* IMB · Landing: menú mobile, atajos al formulario, slider y validación básica */
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

  // Atajos al formulario: preseleccionan "¿Qué necesitas?"
  const interes = document.getElementById("f-interes");
  document.querySelectorAll("[data-interes]").forEach((el) =>
    el.addEventListener("click", () => {
      if (interes) interes.value = el.dataset.interes;
      setTimeout(() => document.getElementById("f-nombre")?.focus({ preventScroll: true }), 500);
    }));

  // Slider "Sobre nosotros"
  document.querySelectorAll(".slider").forEach((slider) => {
    const track = slider.querySelector(".slider__track");
    const slides = [...track.children];
    const dots = slider.querySelector(".slider__dots");
    let current = 0;

    const goTo = (i) => {
      current = (i + slides.length) % slides.length;
      track.scrollTo({ left: slides[current].offsetLeft - track.offsetLeft });
    };
    const mark = () => dots.querySelectorAll(".slider__dot").forEach((d, i) =>
      d.setAttribute("aria-current", String(i === current)));

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot";
      dot.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dots.appendChild(dot);
    });
    slider.querySelectorAll(".slider__btn").forEach((btn) =>
      btn.addEventListener("click", () => goTo(current + Number(btn.dataset.dir))));
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
    });
    // Sincroniza el punto activo cuando se desliza con el dedo/trackpad
    track.addEventListener("scroll", () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== current) { current = i; mark(); }
    }, { passive: true });
    mark();
  });

  // Formulario
  const form = document.querySelector(".contact-form");
  if (form) {
    const status = form.querySelector(".contact-form__status");
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        const first = form.querySelector(":invalid");
        first?.focus();
        status.textContent = first?.type === "email" && first.value
          ? "Revisa el formato del correo."
          : "Completa los campos obligatorios: nombre, correo, teléfono y qué necesitas.";
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
