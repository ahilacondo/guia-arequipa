import { el } from "../utils/dom.js";
import { icon } from "../utils/icons.js";
import { toast } from "../utils/dom.js";
import lugares from "../data/lugares.json";
import { tarjetaLugar } from "../components/tarjeta.js";
import { store } from "../utils/store.js";

export function vistaFavoritos() {
  const root = el("div", { class: "view view-favoritos" });

  function pintar() {
    const ids = store.getFavoritos();
    const items = ids.map((id) => lugares.find((l) => l.id === id)).filter(Boolean);
    const conEntrada = items.filter((l) => /entrada|boleto/i.test(l.acceso)).length;

    if (items.length === 0) {
      root.replaceChildren(
        el("div", { class: "page-head" }, el("h1", {}, "Favoritos")),
        el("div", { class: "empty" }, [
          icon("heart"),
          el("p", {}, "Aún no guardas lugares. Toca el corazón en cualquier tarjeta para armar tu plan."),
          el("a", { class: "btn btn--primary", href: "#/explorar" }, "Ir a explorar"),
        ])
      );
      return;
    }

    root.replaceChildren(
      el("div", { class: "page-head" }, el("h1", {}, "Favoritos")),
      el("div", { class: "plan-summary" }, [
        el("div", {}, [
          el("h2", {}, "Mi plan"),
          el("p", { class: "card__meta" }, `${items.length} lugar${items.length === 1 ? "" : "es"} · ${conEntrada} con entrada`),
        ]),
        el("div", { class: "plan-summary__actions" }, [
          el(
            "button",
            {
              class: "btn btn--danger",
              onclick: () => {
                store.vaciar();
                toast("Favoritos vaciados");
              },
            },
            [icon("trash"), "Vaciar"]
          ),
          el("a", { class: "btn btn--primary", href: "#/rutas" }, "Ver rutas"),
        ]),
      ]),
      el(
        "div",
        { class: "grid grid--row" },
        items.map((l) => tarjetaLugar(l, { variante: "row", onToggle: () => pintar() }))
      )
    );
  }

  store.suscribir(pintar);
  pintar();
  return root;
}
