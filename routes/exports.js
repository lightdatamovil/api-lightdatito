import express from 'express';

import logisticasRouter from './logisticas.js';
import planesRouter from './planes.js';
import estadosLogisticasRouter from './estados_logisticas.js';
import estadosReporteRouter from './estados_reporte.js';
import observacionesLogisticaRouter from './observaciones_logistica.js';
import usuariosRouter from './usuarios.js';
import tipoReporteRouter from './tipo_reporte.js';
import tipoUsuarioRouter from './tipos_usuarios.js';
import puestosRouter from './puestos.js';
import proyectosRouter from './proyectos.js';
import reportesRouter from './reportes.js';

const router = express.Router();

router.use('/logisticas', logisticasRouter);
router.use('/planes', planesRouter);
router.use('/estados-logisticas', estadosLogisticasRouter);
router.use('/estados-reporte', estadosReporteRouter);
router.use('/observaciones-logistica', observacionesLogisticaRouter);
router.use('/usuarios', usuariosRouter);
router.use('/tipo-reporte', tipoReporteRouter);
router.use('/tipo-usuario', tipoUsuarioRouter);
router.use('/puestos', puestosRouter);
router.use('/proyectos', proyectosRouter);
router.use('/reportes', reportesRouter);

export default router;
