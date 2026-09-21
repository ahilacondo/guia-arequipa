// Estado de favoritos, persistido en localStorage.
// Patrón observador simple: las vistas se suscriben para repintar cuando cambia.

const KEY = "guia-arequipa:favoritos";
const listeners = new Set();

function leer() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // localStorage puede fallar (modo privado, cuota, etc.): degradamos a sesión en memoria.
    return [];
  }
}

let favoritos = leer();

function guardar() {
  try {
    localStorage.setItem(KEY, JSON.stringify(favoritos));
  } catch {
    /* noop: si no se puede persistir, la sesión sigue funcionando en memoria */
  }
  listeners.forEach((fn) => fn(favoritos));
}

export const store = {
  getFavoritos: () => favoritos,
  esFavorito: (id) => favoritos.includes(id),
  alternar(id) {
    favoritos = favoritos.includes(id) ? favoritos.filter((f) => f !== id) : [...favoritos, id];
    guardar();
    return favoritos.includes(id);
  },
  vaciar() {
    favoritos = [];
    guardar();
  },
  suscribir(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
