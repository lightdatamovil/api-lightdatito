import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { createPuesto } from '../controllers/puestos/create_puesto.js';
import { getAllPuestos } from '../controllers/puestos/get_all_puestos.js';
import { getPuestoById } from '../controllers/puestos/get_puesto_by_id.js';
import { updatePuesto } from '../controllers/puestos/edit_puesto.js';
import { deletePuesto } from '../controllers/puestos/delete_puesto.js';

const router = Router();

// Crear un nuevo puesto
router.post('/', async (req, res) => {
    const start = performance.now();
    try {
        const errorMessage = verifyAll(req, [], ['nombre']);
        if (errorMessage.length) {
            logRed(`Error en create-puesto: ${errorMessage}`);
            throw new CustomException({
                title: 'Error en creación de puesto',
                message: errorMessage
            });
        }
        const { nombre } = req.body;
        const newItem = await createPuesto(nombre);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/puestos: éxito al crear puesto con ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en puestos POST: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en puestos POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/puestos ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los puestos
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPuestos();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/puestos: éxito al listar puestos');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en puestos GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en puestos GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/puestos ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un puesto por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getPuestoById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/puestos/${req.params.id}: éxito al obtener puesto`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en puestos GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en puestos GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/puestos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un puesto
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], ['nombre']);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updatePuesto(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/puestos/${req.params.id}: éxito al actualizar puesto`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en puestos PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en puestos PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/puestos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un puesto
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deletePuesto(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/puestos/${req.params.id}: éxito al eliminar puesto`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en puestos DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en puestos DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/puestos/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;