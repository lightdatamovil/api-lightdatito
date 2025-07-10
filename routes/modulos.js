// routes/modulo.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logGreen, logPurple } from '../src/funciones/logsCustom.js';
import { verificarTodo } from '../src/funciones/verificarAllt.js';
import { handleError } from '../src/funciones/handle_error.js';

import {
    createModulo,
    getAllModulo,
    getModuloById,
    editModulo,
    deleteModulo
} from '../controllers/modulo/index.js';

const router = Router();

// Crear módulo
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], ['nombre', 'menu_id'])) return;
    try {
        const { nombre, menu_id } = req.body;
        const newItem = await createModulo(nombre, menu_id);
        res.status(201).json({ body: newItem, message: 'Módulo creado' });
        logGreen(`POST /api/modulo: id ${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/modulo ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar módulos
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllModulo();
        res.status(200).json({ body: list, message: 'Listado de módulos' });
        logGreen('GET /api/modulo listado');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/modulo ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener módulo por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const item = await getModuloById(Number(req.params.id));
        res.status(200).json({ body: item, message: 'Módulo obtenido' });
        logGreen(`GET /api/modulo/${req.params.id} ok`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/modulo/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar módulo
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const updated = await editModulo(Number(req.params.id), req.body);
        res.status(200).json({ body: updated, message: 'Módulo actualizado' });
        logGreen(`PUT /api/modulo/${req.params.id} ok`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/modulo/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar módulo
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        await deleteModulo(Number(req.params.id));
        res.status(200).json({ message: 'Módulo eliminado' });
        logGreen(`DELETE /api/modulo/${req.params.id} ok`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/modulo/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;
