import { el } from "../utils/dom.js";
import { icon } from "../utils/icons.js";
import { toast } from "../utils/dom.js";
import rutas from "../data/rutas.json";
import lugares from "../data/lugares.json";

const KEY = "guia-arequipa:rutas-guardadas";

function leerGuardadas() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function guardarGuardadas(arr) {
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {
    /* noop */
  }
}

export function vistaRutas() {
  let guardadas = leerGuardadas();
  let abiertaId = rutas[0]?.id ?? null;

  const root = el("div", { class: "view view-rutas" });

  function pintar() {
    root.replaceChildren(
      el("div", { class: "page-head" }, [
        el("h1", {}, "Rutas sugeridas"),
        el("p", {}, "Recorridos temáticos armados con las paradas del catálogo. Ábrelos para ver el orden sugerido de visita."),
      ]),
      el(
        "div",
        { class: "route-list" },
        rutas.map((r) => tarjetaRuta(r))
      )
    );
  }

  function tarjetaRuta(r) {
    const abierta = abiertaId === r.id;
    const guardada = guardadas.includes(r.id);
    const paradas = r.paradas.map((id) => lugares.find((l) => l.id === id)).filter(Boolean);

    return el("article", { class: "route-card" }, [
      el(
        "button",
        {
          class: "route-card__head",
          "aria-expanded": String(abierta),
          onclick: () => {
            abiertaId = abierta ? null : r.id;
            pintar();
          },
        },
        [
          el("span", {}, [el("h3", {}, r.nombre), el("p", { class: "card__meta" }, `${paradas.length} paradas · ${r.duracion}`)]),
          icon("chevronDown", abierta ? "rot" : ""),
        ]
      ),
      abierta
        ? el("div", { class: "route-card__body" }, [
            el(
              "ol",
              { class: "route-steps" },
              paradas.map((p, i) =>
                el("li", {}, [
                  el("span", { class: "route-step__num" }, String(i + 1)),
                  el("a", { href: `#/lugar/${p.id}` }, p.nombre),
                ])
              )
            ),
            el("div", { class: "route-card__actions" }, [
              el(
                "button",
                {
                  class: "btn btn--primary",
                  onclick: () => {
                    if (!guardadas.includes(r.id)) {
                      guardadas = [...guardadas, r.id];
                      guardarGuardadas(guardadas);
                      toast(`Ruta “${r.nombre}” guardada`);
                      pintar();
                    }
                  },
                },
                guardada ? "Ruta guardada ✓" : "Guardar ruta"
              ),
            ]),
          ])
        : null,
    ]);
  }

  pintar();
  return root;
}
