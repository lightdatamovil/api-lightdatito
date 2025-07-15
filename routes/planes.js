import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createPlan } from '../controllers/planes/create_plan.js';
import { getAllPlanes } from '../controllers/planes/get_all_planes.js';
import { getPlanById } from '../controllers/planes/get_plan_by_id.js';
import { updatePlan } from '../controllers/planes/edit_plan.js';
import { deletePlan } from '../controllers/planes/delete_plan.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { getMenusByPlan } from '../controllers/planes/menu_plan/get_menus_by_plan.js';
import { addPlanMenu } from '../controllers/planes/menu_plan/add_plan_menu.js';
import { deletePlanMenu } from '../controllers/planes/menu_plan/delete_plan_menu.js';

const router = Router();



/**
 * LISTAR todos los menús de un plan
 */
router.get('/:id/menus', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const menus = await getMenusByPlan(+req.params.id);
        res
            .status(200)
            .json({ body: menus, message: 'Menús obtenidos correctamente' });
        logGreen(`GET /api/planes/${req.params.id}/menus: éxito`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/planes/:id/menus ejecutado en ${performance.now() - start} ms`
        );
    }
});

/**
 * ASIGNAR un menú a un plan
 */
router.post('/:id/menus', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], ['menuId'])) return;
    try {
        const newRel = await addPlanMenu(+req.params.id, req.body.menuId);
        res
            .status(201)
            .json({ body: newRel, message: 'Menú asignado al plan correctamente' });
        logGreen(`POST /api/planes/${req.params.id}/menus: asignado`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `POST /api/planes/:id/menus ejecutado en ${performance.now() - start} ms`
        );
    }
});

/**
 * ELIMINAR un menú de un plan (soft-delete)
 */
router.delete('/:id/menus/:menuId', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id', 'menuId'], [])) return;
    try {
        await deletePlanMenu(+req.params.id, +req.params.menuId);
        res
            .status(200)
            .json({ message: 'Asignación de menú eliminada correctamente' });
        logGreen(
            `DELETE /api/planes/${req.params.id}/menus/${req.params.menuId}: borrado suave`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/planes/:id/menus/:menuId ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Crear un nuevo plan
router.post('/', async (req, res) => {
    const start = performance.now();
    const requiredBodyFields = ['nombre', 'color'];
    if (!verificarTodo(req, res, requiredBodyFields)) return;

    try {
        const { nombre, color } = req.body;
        const newPlan = await createPlan(nombre, color);
        res.status(201).json({ body: newPlan, message: 'Creado correctamente' });
        logGreen(`POST /api/planes: éxito al crear plan con ID ${newPlan.id}`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/planes ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los planes
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPlanes();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/planes: éxito al listar planes');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/planes ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un plan por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const plan = await getPlanById(req.params.id);
        res.status(Status.ok).json({ body: plan, message: 'Registro obtenido' });
        logGreen(`GET /api/planes/${req.params.id}: éxito al obtener plan`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/planes/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Actualizar un plan
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const updated = await updatePlan(req.params.id, req.body);
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/planes/${req.params.id}: éxito al actualizar plan`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `PUT /api/planes/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Eliminar un plan
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;

    try {
        await deletePlan(req.params.id);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/planes/${req.params.id}: éxito al eliminar plan`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/planes/:id ejecutado en ${performance.now() - start} ms`
        );
    }
});

export default router;
