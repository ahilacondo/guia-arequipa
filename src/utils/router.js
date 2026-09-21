// Router muy pequeño basado en el hash de la URL (sin dependencias).
// Cada ruta se registra con un patrón tipo "/lugar/:id" y un manejador que
// recibe los parámetros y debe devolver un nodo DOM para pintar en <main>.

const rutas = [];

export function ruta(patron, manejador) {
  const nombres = [];
  const regex = new RegExp(
    "^" +
      patron.replace(/:[^/]+/g, (m) => {
        nombres.push(m.slice(1));
        return "([^/]+)";
      }) +
      "$"
  );
  rutas.push({ regex, nombres, manejador });
}

function actual() {
  const hash = location.hash.slice(1) || "/";
  return hash.startsWith("/") ? hash : "/" + hash;
}

export function navegar(hash) {
  if (location.hash !== "#" + hash) location.hash = hash;
  else despachar();
}

let contenedor = null;
let cambioRutaCb = null;

export function alCambiarRuta(fn) {
  cambioRutaCb = fn;
}

function despachar() {
  const full = actual();
  const path = full.split("?")[0]; // el patrón de ruta ignora la cadena de consulta (?cat=…)
  for (const r of rutas) {
    const m = path.match(r.regex);
    if (m) {
      const params = {};
      r.nombres.forEach((n, i) => (params[n] = decodeURIComponent(m[i + 1])));
      const nodo = r.manejador(params);
      contenedor.replaceChildren(nodo);
      contenedor.scrollTop = 0;
      window.scrollTo(0, 0);
      if (cambioRutaCb) cambioRutaCb(path);
      return;
    }
  }
  // sin coincidencia: volvemos a la home
  navegar("/");
}

export function iniciarRouter(el) {
  contenedor = el;
  window.addEventListener("hashchange", despachar);
  despachar();
}
