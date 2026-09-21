# Guía Arequipa

Aplicación web local, responsive y orientada a dispositivos móviles que funciona como una guía turística de Arequipa (Perú): lugares para visitar, rutas sugeridas, gastronomía típica e información práctica para el viajero.

Proyecto del curso **Plataformas Emergentes** (UNSA) — Laboratorio 3.

## Tecnologías

- HTML5 + CSS3 (mobile-first, Flexbox/Grid, sin frameworks de UI)
- JavaScript (ES Modules), sin frameworks de frontend
- [Vite](https://vite.dev) como servidor de desarrollo y *bundler* de producción
- `localStorage` para persistir favoritos entre sesiones
- Git / GitHub para control de versiones

No se usan librerías de UI ni de manejo de estado: los componentes (tarjetas, barra de navegación, acordeones) están escritos a mano sobre el DOM para mantener el bundle final liviano.

## Estructura del proyecto

```
guia-arequipa/
├── index.html              # cascarón de la SPA
├── public/                 # activos estáticos (favicon)
├── src/
│   ├── main.js              # punto de entrada: monta shell + registra rutas
│   ├── data/                 # lugares.json, rutas.json (contenido de la guía)
│   ├── components/           # piezas reutilizables (shell, tarjeta de lugar)
│   ├── views/                # una función por vista (inicio, explorar, detalle, rutas, favoritos, info)
│   ├── utils/                # router de hash, store de favoritos, helpers de DOM, iconos SVG
│   └── styles/                # tokens.css, base.css, layout.css, components.css, views.css
├── scripts/
│   └── smoke-test.py         # prueba de humo end-to-end con Playwright (opcional)
└── docs/capturas/            # capturas de pantalla usadas en el informe
```

## Cómo ejecutar el proyecto

Requiere [Node.js](https://nodejs.org) 20.19+ o 22.12+ y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo (http://localhost:5173)
npm run dev

# 3. Generar el build de producción (carpeta dist/)
npm run build

# 4. Previsualizar el build de producción (http://localhost:4173)
npm run preview
```

No requiere backend ni base de datos: todos los datos de lugares y rutas están en `src/data/*.json`, y los favoritos del usuario se guardan en el `localStorage` del propio navegador.

## Funcionalidad

- **6 vistas**: Inicio, Explorar, Detalle de lugar, Rutas sugeridas, Favoritos e Información útil.
- **Navegación** por rutas con hash (`#/explorar`, `#/lugar/:id`, …), sin recargar la página.
- **Contenido dinámico con JavaScript**: filtrado por categoría, búsqueda por texto, ordenamiento, acordeones, y favoritos que persisten con `localStorage` y sincronizan el contador de la barra de navegación en tiempo real.
- **Resultados en tarjetas y listas**, con tarjetas adaptativas (horizontales en pantallas angostas, verticales en pantallas anchas).
- **Responsive**: barra de pestañas inferior en móvil, barra lateral fija en pantallas ≥ 900 px; layout fluido con CSS Grid/Flexbox y `clamp()` para tipografía.

## Pruebas

`scripts/smoke-test.py` recorre las 6 vistas en viewport móvil y de escritorio con [Playwright](https://playwright.dev/python/), interactúa con filtros, búsqueda, favoritos y acordeones, revisa que no haya errores de consola, y guarda capturas de cada paso:

```bash
pip install playwright --break-system-packages
playwright install chromium
npm run build && npm run preview &        # deja el build corriendo en :4173
python3 scripts/smoke-test.py shots/
```

## Integrante

- Hilacondo Begazo, Andre Jimmy — ahilacondo@unsa.edu.pe

## Referencias

El informe en PDF (carpeta `LAB03/` del repositorio del curso) documenta con detalle las decisiones de diseño y desarrollo, junto con las referencias bibliográficas usadas (Vite, MDN, WCAG 2.2, GitHub Flow, Conventional Commits, y fuentes turísticas de Arequipa).
