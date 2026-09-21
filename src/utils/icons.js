// Iconos SVG inline (trazo, sin dependencias externas ni fuentes de iconos).
// Basados en formas simples tipo "feather/lucide" dibujadas a mano.

export const icons = {
  home: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2.2 5.2L9 16l2.2-5.2z"/></svg>`,
  route: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5.5" cy="6" r="2"/><circle cx="18.5" cy="18" r="2"/><path d="M5.5 8v3a3 3 0 0 0 3 3h5a3 3 0 0 1 3 3v1"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.8-9C.6 8 2 4.5 5.6 4c2-.3 3.7.7 4.9 2.3.2.3.6.3.8 0C12.5 4.7 14.3 3.7 16.3 4c3.6.5 5 4 3.5 7.5-2.3 4.4-9.8 9-9.8 9z"/></svg>`,
  info: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><circle cx="12" cy="7.5" r="0.6" fill="currentColor" stroke="none"/></svg>`,
  search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
  back: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg>`,
  shuffle: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h3.5L15 18h6"/><path d="M18 4l3 2-3 2"/><path d="M3 18h3.5L11 12"/><path d="M14 8l2-2"/><path d="M18 20l3-2-3-2"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
};

export function icon(name, cls) {
  const span = document.createElement("span");
  span.className = cls ? `icon ${cls}` : "icon";
  span.innerHTML = icons[name] ?? "";
  return span.firstElementChild;
}
