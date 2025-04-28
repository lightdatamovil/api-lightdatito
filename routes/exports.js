import express from 'express';

import empresasRouter from './empresas.js';
import planesRouter from './planes.js';
import estadosEmpresasRouter from './estados_empresas.js';
import estadosReporteRouter from './estados_reporte.js';
import observacionesEmpresaRouter from './observaciones_empresa.js';
import usuariosRouter from './usuarios.js';
import tipoReporteRouter from './tipo_reporte.js';
import tipoUsuarioRouter from './tipos_usuarios.js';
import puestosRouter from './puestos.js';
import proyectosRouter from './proyectos.js';

const router = express.Router();

router.use('/empresas', empresasRouter);
router.use('/planes', planesRouter);
router.use('/estados-empresas', estadosEmpresasRouter);
router.use('/estados-reporte', estadosReporteRouter);
router.use('/observaciones-empresa', observacionesEmpresaRouter);
router.use('/usuarios', usuariosRouter);
router.use('/tipo-reporte', tipoReporteRouter);
router.use('/tipo-usuario', tipoUsuarioRouter);
router.use('/puestos', puestosRouter);
router.use('/proyectos', proyectosRouter);

export default router;
