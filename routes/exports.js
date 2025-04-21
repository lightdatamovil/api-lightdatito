import express from 'express';

import {
    getAllEmpresas, getEmpresaById
} from './empresas/_exports.js';
import planesRouter from './planes/_exports.js';
import estadosEmpresasRouter from './estados_empresas/_exports.js';
import observacionesEmpresaRouter from './observaciones_empresa/_exports.js';
import usuariosRouter from './usuarios/_exports.js';
import tipoUsuarioRouter from './tipos_usuarios/_exports.js';
import puestosRouter from './puestos/_exports.js';
import proyectosRouter from './proyectos/_exports.js';

const router = express.Router();

router.use('/empresas', empresasRouter);
router.use('/planes', planesRouter);
router.use('/estados-empresas', estadosEmpresasRouter);
router.use('/observaciones-empresa', observacionesEmpresaRouter);
router.use('/usuarios', usuariosRouter);
router.use('/tipo-usuario', tipoUsuarioRouter);
router.use('/puestos', puestosRouter);
router.use('/proyectos', proyectosRouter);

export default router;
