import { el } from "../utils/dom.js";
import { icon } from "../utils/icons.js";
import lugares from "../data/lugares.json";
import { tarjetaLugar } from "../components/tarjeta.js";

export function vistaInicio() {
  const destacados = lugares.filter((l) => l.destacado);

  function irAlAzar() {
    const azar = lugares[Math.floor(Math.random() * lugares.length)];
    location.hash = `/lugar/${azar.id}`;
  }

  return el("div", { class: "view view-inicio" }, [
    el("section", { class: "hero" }, [
      el("h1", {}, "Descubre la Ciudad Blanca"),
      el("p", {}, "Una guía rápida y offline-friendly de Arequipa: qué visitar, qué comer y cómo armar tu ruta, sin depender de conexión ni de cuentas."),
      el("a", { class: "btn btn--primary", href: "#/explorar" }, ["Explorar lugares", icon("compass")]),
    ]),

    el("section", { class: "section" }, [
      el("div", { class: "section__head" }, el("h2", {}, "Categorías")),
      el("div", { class: "chips" }, [
        el("a", { class: "chip", href: "#/explorar?cat=historia" }, "Historia"),
        el("a", { class: "chip", href: "#/explorar?cat=naturaleza" }, "Naturaleza"),
        el("a", { class: "chip", href: "#/explorar?cat=gastronomia" }, "Gastronomía"),
      ]),
    ]),

    el("section", { class: "section" }, [
      el("div", { class: "section__head" }, [el("h2", {}, "Destacados"), el("a", { href: "#/explorar" }, "ver todo")]),
      el(
        "div",
        { class: "grid" },
        destacados.map((l) => tarjetaLugar(l))
      ),
    ]),

    el("section", { class: "section" }, [
      el(
        "button",
        { class: "btn btn--ghost btn--block", onclick: irAlAzar },
        [icon("shuffle"), "Sorpréndeme (lugar al azar)"]
      ),
    ]),
  ]);
}
