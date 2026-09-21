// Helpers mínimos para construir DOM sin plantillas ni frameworks.

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null || c === false) continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

export function fragFromHTML(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content;
}

export function toast(msg) {
  const region = document.getElementById("toast");
  const node = el("div", { class: "toast", role: "status" }, msg);
  region.replaceChildren(node);
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => region.replaceChildren(), 2200);
}

export const CATEGORIA_LABEL = { historia: "Historia", naturaleza: "Naturaleza", gastronomia: "Gastronomía" };
