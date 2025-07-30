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
import { deletePlanMenu } from '../controllers/planes/menu_plan/delete_plan_menu.js';
import { Status } from '../models/status.js';
import { getAllMenuPlanes } from '../controllers/planes/menu_plan/get_all_menus_plan.js';
import { addPlanMenu } from '../controllers/planes/menu_plan/create_plan_menu.js';

const router = Router();

/**
 * LISTAR todas las asignaciones activas 
 */
router.get('/menus', async (req, res) => {
    const start = performance.now();
    try {
        const rows = await getAllMenuPlanes();
        res.status(Status.ok).json({ body: rows, message: 'Asignaciones obtenidas correctamente', success: true });
        logGreen('GET /api/usuarios/puestos_usuario: listado completo');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/usuarios/puestos_usuario ejecutado en ${performance.now() - start
            } ms`
        );
    }
});


/**
 * LISTAR todos los menús de un plan
 */
router.get('/:id/menus', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const menus = await getMenusByPlan(req);
        res.status(Status.ok).json({ body: menus, message: 'Menús obtenidos correctamente', success: true });
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
    //  const menu_id = req.body.menuId;
    if (!verificarTodo(req, res, ['id'], ['menu_id'])) return;
    try {
        const newRel = await addPlanMenu(req);
        res.status(Status.created).json({ body: newRel, message: 'Menú asignado al plan correctamente', success: true });
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

// todo preguntar a gonzalo como va el router 
router.delete('/:id/menus/:menu_id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id', 'menu_id'], [])) return;
    try {
        await deletePlanMenu(req);
        res.status(Status.created).json({ message: 'Asignación de menú eliminada correctamente', success: true });
        logGreen(
            `DELETE /api/planes/${req.params.id}/menus/${req.params.menu_id}: borrado suave`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/planes/:id/menus/:menuId ejecutado en ${performance.now() - start} ms`
        );
    }
});


const requiredBodyFields = ['nombre', 'color'];

// Crear un nuevo plan
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {
        const newPlan = await createPlan(req);
        res.status(Status.created).json({ body: newPlan, message: 'Creado correctamente', success: true });
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
        res.status(Status.created).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
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
        const plan = await getPlanById(req);
        res.status(Status.created).json({ body: plan, message: 'Registro obtenido', success: true });
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
    if (!verificarTodo(req, res, ['id'], requiredBodyFields)) return;
    try {
        const updated = await updatePlan(req);
        res.status(Status.created).json({ body: updated, message: 'Actualizado correctamente', success: true });
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
        await deletePlan(req);
        res.status(Status.created).json({ message: 'Eliminado correctamente', success: true });
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
