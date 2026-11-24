document.addEventListener("DOMContentLoaded", () => {
  iniciarSonido();

  if (document.body.dataset.page === "mapa") {
    iniciarMapa();
  }
});

function iniciarMapa() {
  const map = L.map("mapa").setView([40.73, -73.95], 11);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const barrios = [
    { nombre: "Harlem", coords: [40.8116, -73.9465], nota: "Historia, jazz y el Apollo Theater." },
    { nombre: "SoHo", coords: [40.7233, -74.003], nota: "Galerías, buen shopping y arquitectura famosa por el uso del hierro" },
    { nombre: "Chinatown", coords: [40.7158, -73.997], nota: "Comida, mercados y tradición china" },
    { nombre: "Williamsburg", coords: [40.7081, -73.9571], nota: "Parques frente al río y buena rumba" },
    { nombre: "Astoria", coords: [40.7644, -73.9235], nota: "Comunidades diversas, parques, arte y diversidad" },
    { nombre: "Coney Island", coords: [40.5749, -73.9859], nota: "Playa y parque de diversiones" }
  ];

  barrios.forEach((b) => {
    L.marker(b.coords).addTo(map)
      .bindPopup("<strong>" + b.nombre + "</strong><br>" + b.nota);
  });
}
function iniciarSonido() {
  const boton = document.getElementById("btn-sonido");
  const audio = document.getElementById("ambiente");
  if (!boton || !audio) return;

  boton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        boton.setAttribute("aria-pressed", "true");
        boton.textContent = "🔊";
        boton.title = "Desactivar sonido ambiente";
      } catch (error) {
        console.error("No se pudo reproducir el sonido ambiente.", error);
        boton.setAttribute("aria-pressed", "false");
        boton.textContent = "🔇";
        boton.title = "Activar sonido ambiente";
      }
    } else {
      audio.pause();
      boton.setAttribute("aria-pressed", "false");
      boton.textContent = "🔇";
      boton.title = "Activar sonido ambiente";
    }
  });
}