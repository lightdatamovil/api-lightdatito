import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createProyecto } from '../controllers/proyectos/create_proyecto.js';
import { getAllProyectos } from '../controllers/proyectos/get_all_proyectos.js';
import { getProyectoById } from '../controllers/proyectos/get_proyecto_by_id.js';
import { updateProyecto } from '../controllers/proyectos/edit_proyecto.js';
import { deleteProyecto } from '../controllers/proyectos/delete_proyecto.js';

const router = Router();

// Crear un nuevo proyecto
router.post('/', async (req, res) => {
    const start = performance.now();
    try {
        const errorMessage = verifyAll(req, [], ['nombre']);

        if (errorMessage.length) {
            logRed(`Error en create-estado-logistica: ${errorMessage}`);
            throw new CustomException({
                title: 'Error en create-estado-logistica',
                message: errorMessage
            });
        }

        const { nombre } = req.body;
        const newItem = await createProyecto(nombre);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/proyectos: éxito al crear proyecto con ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en proyectos POST: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en proyectos POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/proyectos ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los proyectos
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllProyectos();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/proyectos: éxito al listar proyectos');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en proyectos GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en proyectos GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/proyectos ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un proyecto por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getProyectoById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/proyectos/${req.params.id}: éxito al obtener proyecto`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en proyectos GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en proyectos GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/proyectos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un proyecto
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], ['nombre']);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updateProyecto(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/proyectos/${req.params.id}: éxito al actualizar proyecto`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en proyectos PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en proyectos PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/proyectos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un proyecto
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteProyecto(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/proyectos/${req.params.id}: éxito al eliminar proyecto`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en proyectos DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en proyectos DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/proyectos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;