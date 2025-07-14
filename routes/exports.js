import express from "express";

import logisticasRouter from "./logisticas.js";
import planesRouter from "./planes.js";
import estadosLogisticasRouter from "./estados_logisticas.js";
import estadosticketRouter from "./estados_ticket.js";
import particularidadesLogisticaRouter from "./particularidades_logistica.js";
import usuariosRouter from "./usuarios.js";
import tipoticketRouter from "./tipo_ticket.js";
import puestosRouter from "./puestos.js";
import proyectosRouter from "./proyectos.js";
import ticketsRouter from "./tickets.js";
import comentariosRouter from "./comentarios.js";
import graficosRouter from "./graficos.js";
import paisesRouter from "./paises.js";

const router = express.Router();

router.use("/logisticas", logisticasRouter);
router.use("/planes", planesRouter);
router.use("/estados-logisticas", estadosLogisticasRouter);
router.use("/estados-ticket", estadosticketRouter);
router.use("/particularidades-logistica", particularidadesLogisticaRouter);
router.use("/usuarios", usuariosRouter);
router.use("/tipo-ticket", tipoticketRouter);
router.use("/puestos", puestosRouter);
router.use("/proyectos", proyectosRouter);
router.use("/tickets", ticketsRouter);
router.use("/comentarios", comentariosRouter);
router.use("/paises", paisesRouter);
router.use("/graficos", graficosRouter);

export default router;
