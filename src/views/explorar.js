import { el } from "../utils/dom.js";
import { icon } from "../utils/icons.js";
import { CATEGORIA_LABEL } from "../utils/dom.js";
import lugares from "../data/lugares.json";
import { tarjetaLugar } from "../components/tarjeta.js";

const CATS = [
  { id: "todos", label: "Todos" },
  { id: "historia", label: "Historia" },
  { id: "naturaleza", label: "Naturaleza" },
  { id: "gastronomia", label: "Gastronomía" },
];

export function vistaExplorar() {
  // ?cat=historia funciona porque el hash router usa location.hash completo;
  // aquí leemos el "query" que va dentro del propio hash tras el path.
  const q = new URLSearchParams(location.hash.split("?")[1] || "");
  let catActiva = q.get("cat") || "todos";
  let orden = "az";
  let busqueda = "";

  const root = el("div", { class: "view view-explorar" });

  function resultados() {
    let r = lugares.filter((l) => catActiva === "todos" || l.categoria === catActiva);
    if (busqueda.trim()) {
      const q = busqueda.trim().toLowerCase();
      r = r.filter((l) => l.nombre.toLowerCase().includes(q) || l.zona.toLowerCase().includes(q));
    }
    r = [...r].sort((a, b) => (orden === "az" ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)));
    return r;
  }

  function pintar() {
    const lista = resultados();

    const chips = el(
      "div",
      { class: "chips", role: "group", "aria-label": "Filtrar por categoría" },
      CATS.map((c) =>
        el(
          "button",
          {
            class: "chip",
            "aria-pressed": String(catActiva === c.id),
            onclick: () => {
              catActiva = c.id;
              pintar();
            },
          },
          c.label
        )
      )
    );

    const buscador = el("div", { class: "search" }, [
      icon("search"),
      el("input", {
        type: "search",
        placeholder: "Buscar lugar o plato…",
        "aria-label": "Buscar lugar o plato",
        value: busqueda,
        oninput: (e) => {
          busqueda = e.target.value;
          pintar();
        },
      }),
    ]);

    const barra = el("div", { class: "list-toolbar" }, [
      el("p", { class: "list-count" }, `${lista.length} resultado${lista.length === 1 ? "" : "s"}`),
      el(
        "button",
        { class: "sort-btn", onclick: () => { orden = orden === "az" ? "za" : "az"; pintar(); } },
        [`Orden: ${orden === "az" ? "A-Z" : "Z-A"}`, icon("chevronDown")]
      ),
    ]);

    const grid = lista.length
      ? el("div", { class: "grid" }, lista.map((l) => tarjetaLugar(l)))
      : el("div", { class: "empty" }, [icon("search"), el("p", {}, "No encontramos lugares con ese filtro. Prueba con otra categoría o palabra.")]);

    root.replaceChildren(
      el("div", { class: "page-head" }, [el("h1", {}, "Explorar"), el("p", {}, "Filtra por tipo de experiencia o busca directamente lo que quieres conocer.")]),
      buscador,
      chips,
      barra,
      grid
    );
  }

  pintar();
  return root;
}
