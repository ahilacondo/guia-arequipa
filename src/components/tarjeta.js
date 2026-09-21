import { el, CATEGORIA_LABEL } from "../utils/dom.js";
import { icon } from "../utils/icons.js";
import { store } from "../utils/store.js";

// Genera una imagen de marcador de posición sin depender de red: un SVG con
// degradado por categoría e iniciales del lugar. Cumple "mostrar resultados
// con imágenes" sin necesitar assets binarios externos.
const PALETAS = {
  historia: ["#c96b3a", "#7a3410"],
  naturaleza: ["#4f8f63", "#21532f"],
  gastronomia: ["#c9433a", "#7a1d18"],
};

function placeholder(nombre, categoria) {
  const [a, b] = PALETAS[categoria] ?? PALETAS.historia;
  const iniciales = nombre
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const uid = `g${Math.random().toString(36).slice(2, 8)}`;
  return `<svg viewBox="0 0 200 140" role="img" aria-label="Imagen de ${nombre}">
    <defs><linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient></defs>
    <rect width="200" height="140" fill="url(#${uid})"/>
    <text x="100" y="78" font-family="Georgia, serif" font-size="40" fill="#ffffff" fill-opacity="0.85" text-anchor="middle">${iniciales || "AQ"}</text>
  </svg>`;
}

/**
 * Crea una tarjeta de lugar.
 * @param {object} lugar
 * @param {{variante?: "grid"|"row"}} opts
 */
export function tarjetaLugar(lugar, opts = {}) {
  const variante = opts.variante ?? "grid";
  const favBtn = el(
    "button",
    {
      class: "fav-btn",
      "aria-pressed": String(store.esFavorito(lugar.id)),
      "aria-label": `Guardar ${lugar.nombre} en favoritos`,
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        const activo = store.alternar(lugar.id);
        favBtn.setAttribute("aria-pressed", String(activo));
        favBtn.classList.remove("pop");
        void favBtn.offsetWidth;
        favBtn.classList.add("pop");
        opts.onToggle?.(activo);
      },
    },
    icon("heart")
  );

  return el("article", { class: variante === "row" ? "card card--row" : "card" }, [
    el("div", { class: "card__media", html: placeholder(lugar.nombre, lugar.categoria) }),
    el("div", { class: "card__body" }, [
      el("h3", { class: "card__title" }, el("a", { href: `#/lugar/${lugar.id}` }, lugar.nombre)),
      el("p", { class: "card__meta" }, `${lugar.zona} · ${lugar.tiempo}`),
      el("span", { class: `tag tag--${lugar.categoria}` }, CATEGORIA_LABEL[lugar.categoria]),
    ]),
    favBtn,
  ]);
}

export { placeholder as imagenPlaceholder };
