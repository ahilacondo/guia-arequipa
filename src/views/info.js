import { el } from "../utils/dom.js";
import { icon } from "../utils/icons.js";

const SECCIONES = [
  {
    titulo: "Altura y aclimatación",
    abierta: true,
    cuerpo:
      "Arequipa está a 2 328 m s. n. m., una altitud moderada frente a Cusco o Puno. Aun así, llega bien descansado e hidratado y evita el alcohol el primer día si vienes de zonas cercanas al nivel del mar. Si vas a subir al Misti (5 822 m) o al Colca, considera un día extra de aclimatación en la ciudad.",
  },
  {
    titulo: "Clima y mejor época",
    cuerpo:
      "El clima es templado y muy seco: cerca de 3 333 horas de sol al año y apenas unos 18 días con lluvia apreciable, concentrados entre diciembre y marzo (temporada de lluvias, sobre todo por las tardes). El resto del año predominan los cielos despejados, con noches frías por la altitud.",
  },
  {
    titulo: "Cómo moverse",
    cuerpo:
      "El centro histórico se recorre a pie sin problema. Para Yanahuara, Sabandía o Cayma, taxis y aplicaciones de transporte son la opción más simple; para el Colca o el Misti conviene contratar una agencia local. Lleva siempre efectivo en soles para mercados y picanterías pequeñas.",
  },
  {
    titulo: "Sobre este proyecto",
    cuerpo:
      "Guía Arequipa es una aplicación web construida con HTML, CSS y JavaScript puro sobre Vite, como proyecto académico del curso Plataformas Emergentes. Toda la información se guarda en tu propio navegador (localStorage): no hay servidor ni cuenta de usuario.",
  },
];

export function vistaInfo() {
  const root = el("div", { class: "view view-info" });

  function pintar() {
    root.replaceChildren(
      el("div", { class: "page-head" }, [el("h1", {}, "Información útil"), el("p", {}, "Algunos datos prácticos antes de salir a caminar.")]),
      el(
        "div",
        { class: "accordion" },
        SECCIONES.map((s) => item(s))
      ),
      el("p", { class: "disclaimer" }, "Los horarios, tarifas y condiciones de acceso pueden cambiar; verifica siempre con fuentes oficiales antes de tu visita.")
    );
  }

  function item(s) {
    return el("div", { class: "acc-item" }, [
      el(
        "button",
        {
          class: "acc-item__head",
          "aria-expanded": String(s.abierta),
          onclick: () => {
            s.abierta = !s.abierta;
            pintar();
          },
        },
        [el("h3", {}, s.titulo), icon("chevronDown", s.abierta ? "rot" : "")]
      ),
      s.abierta ? el("div", { class: "acc-item__body" }, el("p", {}, s.cuerpo)) : null,
    ]);
  }

  pintar();
  return root;
}
