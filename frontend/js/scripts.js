// Muestra las tarjetas de misión y visión con una entrada suave al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
  const tarjetas = document.querySelectorAll(".af-oculto");

  if (!("IntersectionObserver" in window)) {
    tarjetas.forEach((t) => t.classList.add("af-visible"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("af-visible");
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  tarjetas.forEach((t) => observador.observe(t));
});
