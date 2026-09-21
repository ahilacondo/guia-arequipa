import { el } from "../utils/dom.js";
import { icon } from "../utils/icons.js";
import { CATEGORIA_LABEL, toast } from "../utils/dom.js";
import lugares from "../data/lugares.json";
import { imagenPlaceholder, tarjetaLugar } from "../components/tarjeta.js";
import { store } from "../utils/store.js";

export function vistaDetalle({ id }) {
  const lugar = lugares.find((l) => l.id === id);

  if (!lugar) {
    return el("div", { class: "view" }, [
      el("a", { class: "back-link", href: "#/explorar" }, [icon("back"), "Volver"]),
      el("div", { class: "empty" }, el("p", {}, "No encontramos ese lugar.")),
    ]);
  }

  const relacionados = lugares.filter((l) => l.categoria === lugar.categoria && l.id !== lugar.id).slice(0, 3);

  const favBtn = el(
    "button",
    {
      class: "fav-btn fav-btn--lg",
      "aria-pressed": String(store.esFavorito(lugar.id)),
      "aria-label": "Guardar en favoritos",
      onclick: () => {
        const activo = store.alternar(lugar.id);
        favBtn.setAttribute("aria-pressed", String(activo));
        toast(activo ? "Añadido a favoritos" : "Quitado de favoritos");
      },
    },
    icon("heart")
  );

  return el("div", { class: "view view-detalle" }, [
    el("a", { class: "back-link", href: "#/explorar" }, [icon("back"), "Volver a explorar"]),

    el("div", { class: "detalle-grid" }, [
      el("div", { class: "detalle-media", html: imagenPlaceholder(lugar.nombre, lugar.categoria) }),

      el("div", { class: "detalle-info" }, [
        el("div", { class: "detalle-title-row" }, [
          el("h1", {}, lugar.nombre),
          favBtn,
        ]),
        el("span", { class: `tag tag--${lugar.categoria}` }, CATEGORIA_LABEL[lugar.categoria]),

        el("div", { class: "facts" }, [
          fact("Zona", lugar.zona),
          fact("Tiempo sugerido", lugar.tiempo),
          fact("Acceso", lugar.acceso),
          fact("Altitud", lugar.altitud),
        ]),

        el("p", { class: "detalle-desc" }, lugar.detalle),

        el("button", { class: "btn btn--primary btn--block", onclick: () => favBtn.click() }, [icon("heart"), "Guardar en favoritos"]),
      ]),
    ]),

    relacionados.length
      ? el("section", { class: "section" }, [
          el("h2", {}, "También te puede interesar"),
          el("div", { class: "grid" }, relacionados.map((l) => tarjetaLugar(l))),
        ])
      : null,
  ]);
}

function fact(label, value) {
  return el("div", { class: "fact" }, [el("span", { class: "fact__label" }, label), el("span", { class: "fact__value" }, value)]);
}
