import { el } from "../utils/dom.js";
import { icon } from "../utils/icons.js";
import { store } from "../utils/store.js";

const ITEMS = [
  { href: "#/", match: "/", label: "Inicio", ic: "home" },
  { href: "#/explorar", match: "/explorar", label: "Explorar", ic: "compass" },
  { href: "#/rutas", match: "/rutas", label: "Rutas", ic: "route" },
  { href: "#/favoritos", match: "/favoritos", label: "Favoritos", ic: "heart", badge: true },
  { href: "#/info", match: "/info", label: "Info", ic: "info" },
];

export function montarMarca() {
  document.getElementById("brand").replaceChildren(
    el("div", { class: "brand__logo", html: `<svg viewBox="0 0 64 64" role="img" aria-label="Guía Arequipa">
      <rect width="64" height="64" rx="14" fill="#b3261e"/>
      <path d="M8 50 L27 20 L34 30 L40 22 L56 50 Z" fill="#faf6ef"/>
      <path d="M12 50 h40" stroke="#faf6ef" stroke-width="3" stroke-linecap="round"/>
    </svg>` }),
    el("div", {}, [
      el("p", { class: "brand__name" }, "Guía Arequipa"),
      el("p", { class: "brand__tag" }, "La Ciudad Blanca, en tu bolsillo"),
    ])
  );
}

export function montarNav() {
  const nav = document.getElementById("nav");

  function pintar(rutaActual) {
    const list = el(
      "ul",
      { class: "nav__list" },
      ITEMS.map((it) => {
        const activo = it.match === "/" ? rutaActual === "/" : rutaActual.startsWith(it.match);
        return el("li", {}, [
          el(
            "a",
            {
              class: "nav__link",
              href: it.href,
              "aria-current": activo ? "page" : null,
            },
            [
              icon(it.ic),
              el("span", {}, it.label),
              it.badge
                ? el("span", { class: "nav__badge", hidden: store.getFavoritos().length === 0 || null }, String(store.getFavoritos().length))
                : null,
            ]
          ),
        ]);
      })
    );
    nav.replaceChildren(list);
  }

  store.suscribir(() => pintar(location.hash.slice(1) || "/"));
  return pintar;
}
