import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/views.css";

import { montarMarca, montarNav } from "./components/shell.js";
import { iniciarRouter, ruta, alCambiarRuta } from "./utils/router.js";
import { vistaInicio } from "./views/inicio.js";
import { vistaExplorar } from "./views/explorar.js";
import { vistaDetalle } from "./views/detalle.js";
import { vistaRutas } from "./views/rutas.js";
import { vistaFavoritos } from "./views/favoritos.js";
import { vistaInfo } from "./views/info.js";

montarMarca();
const pintarNav = montarNav();

ruta("/", vistaInicio);
ruta("/explorar", vistaExplorar);
ruta("/lugar/:id", vistaDetalle);
ruta("/rutas", vistaRutas);
ruta("/favoritos", vistaFavoritos);
ruta("/info", vistaInfo);

alCambiarRuta((path) => pintarNav(path.split("?")[0]));

iniciarRouter(document.getElementById("main"));
