// routes/menu.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logGreen, logPurple } from '../src/funciones/logsCustom.js';
import { createMenu, getAllMenu, getMenuById, editMenu } from '../controllers/menu';
import { verificarTodo } from '../src/funciones/verificarAllt.js';
import { handleError } from '../src/funciones/handle_error.js';
import { deleteMenu } from '../controllers/menu/delete_menu.js';



const router = Router();

// POST /api/menu
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], ['nombre'])) return;
    try {
        const { nombre } = req.body;
        const newItem = await createMenu(nombre);
        res.status(201).json({ body: newItem, message: 'Menú creado' });
        logGreen(`POST /api/menu id=${newItem.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/menu executed in ${performance.now() - start} ms`);
    }
});

// GET /api/menu
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllMenu();
        res.status(200).json({ body: list, message: 'Listado de menús' });
        logGreen('GET /api/menu');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/menu executed in ${performance.now() - start} ms`);
    }
});

// GET /api/menu/:id
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const item = await getMenuById(Number(req.params.id));
        res.status(200).json({ body: item, message: 'Menú obtenido' });
        logGreen(`GET /api/menu/${req.params.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/menu/:id executed in ${performance.now() - start} ms`);
    }
});

// PUT /api/menu/:id
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const updated = await editMenu(Number(req.params.id), req.body);
        res.status(200).json({ body: updated, message: 'Menú actualizado' });
        logGreen(`PUT /api/menu/${req.params.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/menu/:id executed in ${performance.now() - start} ms`);
    }
});


// DELETE /api/menu/:id
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        await deleteMenu(Number(req.params.id));
        res.status(200).json({ message: 'Menú eliminado correctamente' });
        logGreen(`DELETE /api/menu/${req.params.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/menu/:id executed in ${performance.now() - start} ms`);
    }
});

export default router;
