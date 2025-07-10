import express from "express";

import logisticasRouter from "./logisticas.js";
import planesRouter from "./planes.js";
import estadosLogisticasRouter from "./estados_logisticas.js";
import estadosReporteRouter from "./estados_reporte.js";
import particularidadesLogisticaRouter from "./particularidades_logistica.js";
import usuariosRouter from "./usuarios.js";
import tipoReporteRouter from "./tipo_reporte.js";
import puestosRouter from "./puestos.js";
import proyectosRouter from "./proyectos.js";
import reportesRouter from "./reportes.js";
import comentariosRouter from "./comentarios.js";
import graficosRouter from "./graficos.js";
import paisesRouter from "./paises.js";

const router = express.Router();

router.use("/logisticas", logisticasRouter);
router.use("/planes", planesRouter);
router.use("/estados-logisticas", estadosLogisticasRouter);
router.use("/estados-reporte", estadosReporteRouter);
router.use("/particularidades-logistica", particularidadesLogisticaRouter);
router.use("/usuarios", usuariosRouter);
router.use("/tipo-reporte", tipoReporteRouter);
router.use("/puestos", puestosRouter);
router.use("/proyectos", proyectosRouter);
router.use("/reportes", reportesRouter);
router.use("/comentarios", comentariosRouter);
router.use("/paises", paisesRouter);
router.use("/graficos", graficosRouter);

export default router;
