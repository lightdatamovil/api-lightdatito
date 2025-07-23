import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logGreen, logPurple } from '../src/funciones/logsCustom.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { handleError } from '../src/funciones/handle_error.js';
import { deleteMenu } from '../controllers/menu/delete_menu.js';
import { Status } from '../models/status.js';
import { createMenu } from '../controllers/menu/create_menu.js';
import { getAllMenu } from '../controllers/menu/get_all_menu.js';
import { getMenuById } from '../controllers/menu/get_menu_by_id.js';
import { editMenu } from '../controllers/menu/edt_menu.js';


const router = Router();
const requiredBodyFields = ['nombre'];

// Crear menú
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const newItem = await createMenu(req);
        res.status(Status.created).json({ body: newItem, message: 'Menú creado', success: true });
        logGreen(`POST /api/menus id=${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/menus ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los menús
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllMenu();
        res.status(Status.ok).json({ body: list, message: 'Listado de menús', success: true });
        logGreen('GET /api/menus');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/menus ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un menú por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const item = await getMenuById(req);
        res.status(Status.ok).json({ body: item, message: 'Menú obtenido', success: true });
        logGreen(`GET /api/menus/${req.params.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/menus/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un menú
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;
    try {
        const updated = await editMenu(req);
        res.status(Status.ok).json({ body: updated, message: 'Menú actualizado', success: true });
        logGreen(`PUT /api/menus/${req.params.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/menus/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un menú (soft-delete)
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        await deleteMenu(req);
        res.status(Status.ok).json({ message: 'Módulo eliminado', success: true });
        logGreen(`DELETE /api/menus/${req.params.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/menus/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;