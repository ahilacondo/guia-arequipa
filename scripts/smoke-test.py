# Prueba de humo de extremo a extremo (móvil + escritorio) con Playwright.
# Requiere: npm run build && npm run preview  (en otra terminal, puerto 4173)
# Uso:      pip install playwright --break-system-packages && playwright install chromium
#           python3 scripts/smoke-test.py [carpeta_salida]
import sys, os
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:4173"
OUT = sys.argv[1] if len(sys.argv) > 1 else "shots"
os.makedirs(OUT, exist_ok=True)

errors = []

with sync_playwright() as p:
    b = p.chromium.launch()

    # ---- MÓVIL ----
    mob = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    pm = mob.new_page()
    pm.on("pageerror", lambda e: errors.append(f"pageerror(movil): {e}"))
    pm.on("console", lambda m: errors.append(f"console.error(movil): {m.text}") if m.type == "error" else None)

    pm.goto(f"{BASE}/#/")
    pm.wait_for_timeout(300)
    pm.screenshot(path=f"{OUT}/m1_inicio.png", full_page=True)

    pm.goto(f"{BASE}/#/explorar")
    pm.wait_for_timeout(300)
    pm.screenshot(path=f"{OUT}/m2_explorar.png", full_page=True)

    # click categoría "Gastronomía"
    pm.get_by_role("button", name="Gastronomía").click()
    pm.wait_for_timeout(200)
    pm.screenshot(path=f"{OUT}/m2b_explorar_filtro.png", full_page=True)

    # buscar
    pm.get_by_role("button", name="Todos").click()
    pm.fill('input[type="search"]', "yanahuara")
    pm.wait_for_timeout(200)
    pm.screenshot(path=f"{OUT}/m2c_explorar_busqueda.png", full_page=True)
    pm.fill('input[type="search"]', "")

    # click en tarjeta -> detalle
    pm.click('a[href="#/lugar/yanahuara"]')
    pm.wait_for_timeout(300)
    pm.screenshot(path=f"{OUT}/m3_detalle.png", full_page=True)

    # favorito desde detalle (centrar el elemento evita que el header sticky lo tape)
    pm.eval_on_selector(".fav-btn--lg", "el => el.scrollIntoView({block: 'center'})")
    pm.click(".fav-btn--lg")
    pm.wait_for_timeout(250)
    pm.screenshot(path=f"{OUT}/m3b_detalle_favorito.png", full_page=True)

    pm.goto(f"{BASE}/#/rutas")
    pm.wait_for_timeout(300)
    pm.screenshot(path=f"{OUT}/m4_rutas.png", full_page=True)
    pm.get_by_role("button", name="Miradores y campiña").click()
    pm.wait_for_timeout(200)
    pm.screenshot(path=f"{OUT}/m4b_rutas_abierta.png", full_page=True)

    pm.goto(f"{BASE}/#/favoritos")
    pm.wait_for_timeout(300)
    pm.screenshot(path=f"{OUT}/m5_favoritos.png", full_page=True)

    pm.goto(f"{BASE}/#/info")
    pm.wait_for_timeout(300)
    pm.screenshot(path=f"{OUT}/m6_info.png", full_page=True)
    pm.get_by_role("button", name="Clima y mejor época").click()
    pm.wait_for_timeout(200)
    pm.screenshot(path=f"{OUT}/m6b_info_abierta.png", full_page=True)

    mob.close()

    # ---- ESCRITORIO ----
    desk = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    pd = desk.new_page()
    pd.on("pageerror", lambda e: errors.append(f"pageerror(desktop): {e}"))
    pd.on("console", lambda m: errors.append(f"console.error(desktop): {m.text}") if m.type == "error" else None)

    pd.goto(f"{BASE}/#/")
    pd.wait_for_timeout(300)
    pd.screenshot(path=f"{OUT}/d1_inicio.png")

    pd.goto(f"{BASE}/#/explorar")
    pd.wait_for_timeout(300)
    pd.screenshot(path=f"{OUT}/d2_explorar.png")

    pd.click('a[href="#/lugar/plaza-de-armas"]')
    pd.wait_for_timeout(300)
    pd.screenshot(path=f"{OUT}/d3_detalle.png")

    pd.goto(f"{BASE}/#/favoritos")
    pd.wait_for_timeout(300)
    pd.screenshot(path=f"{OUT}/d5_favoritos_vacio.png")

    # ---- tablet ----
    tab = b.new_context(viewport={"width": 834, "height": 1112}, device_scale_factor=2)
    pt = tab.new_page()
    pt.goto(f"{BASE}/#/explorar")
    pt.wait_for_timeout(300)
    pt.screenshot(path=f"{OUT}/t2_explorar.png")
    tab.close()

    desk.close()
    b.close()

if errors:
    print("ERRORES ENCONTRADOS:")
    for e in errors:
        print(" -", e)
else:
    print("Sin errores de consola/página.")
