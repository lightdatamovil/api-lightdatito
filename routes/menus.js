import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logGreen, logPurple } from '../src/funciones/logsCustom.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { handleError } from '../src/funciones/handle_error.js';
import { deleteMenu } from '../controllers/menu/delete_menu.js';
import { getAllMenuModulo } from '../controllers/menu/menu_modulo/get_all_menu_modulo.js';
import { getModulosByMenu } from '../controllers/menu/menu_modulo/get_modulos_by_menu.js';
import { addMenuModulo } from '../controllers/menu/menu_modulo/add_menu_modulo.js';
import { deleteMenuModulo } from '../controllers/menu/menu_modulo/delete_menu_modulo.js';
import { Status } from '../models/status.js';
import { createMenu } from '../controllers/menu/create_menu.js';
import { getAllMenu } from '../controllers/menu/get_all_menu.js';
import { getMenuById } from '../controllers/menu/get_menu_by_id.js';
import { editMenu } from '../controllers/menu/edt_menu.js';


const router = Router();
const requiredBodyFields = ['nombre'];


// LISTAR todas las asignaciones módulo–menú
router.get('/menu-modulos', async (req, res) => {
    const start = performance.now();
    try {
        const rows = await getAllMenuModulo();
        res.status(Status.ok).json({ body: rows, message: 'Módulos listados correctamente' });
        logGreen('GET /api/menus/menu-modulos: listado completo');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/menus/menu-modulos ejecutado en ${performance.now() - start} ms`);
    }
});

// LISTAR módulos de un menú
router.get('/:id/modulos', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        const modules = await getModulosByMenu(+req.params.id);
        res.status(Status.ok).json({ body: modules, message: 'Módulos obtenidos correctamente' });
        logGreen(`GET /api/menus/${req.params.id}/modulos: ok`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/menus/:id/modulos ejecutado en ${performance.now() - start} ms`);
    }
});

// ASIGNAR (crear) un módulo en un menú
router.post('/:id/modulos', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], ['nombre'])) return;
    try {
        const newMod = await addMenuModulo(+req.params.id, req.body.nombre);
        res.status(Status.created).json({ body: newMod, message: 'Módulo creado correctamente' });
        logGreen(`POST /api/menus/${req.params.id}/modulos: creado`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/menus/:id/modulos ejecutado en ${performance.now() - start} ms`);
    }
});

// ELIMINAR un módulo de un menú (soft-delete)
router.delete('/:id/modulos/:moduloId', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id', 'moduloId'], [])) return;
    try {
        await deleteMenuModulo(+req.params.id, +req.params.moduloId);
        res.status(Status.ok).json({ message: 'Módulo eliminado correctamente' });
        logGreen(`DELETE /api/menus/${req.params.id}/modulos/${req.params.moduloId}: borrado`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/menus/:id/modulos/:moduloId ejecutado en ${performance.now() - start} ms`);
    }
});


// Crear menú
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const newItem = await createMenu(req);
        res.status(Status.created).json({ body: newItem, message: 'Menú creado' });
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
        res.status(Status.ok).json({ body: list, message: 'Listado de menús' });
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
        const item = await getMenuById(req.params);
        res.status(Status.ok).json({ body: item, message: 'Menú obtenido' });
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
        const updated = await editMenu(req.params, req.body);
        res.status(Status.ok).json({ body: updated, message: 'Menú actualizado' });
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
        await deleteMenu(req.params);
        res.sendStatus(Status.noContent);
        logGreen(`DELETE /api/menus/${req.params.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/menus/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;