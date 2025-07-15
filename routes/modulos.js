// routes/modulo.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logGreen, logPurple } from '../src/funciones/logsCustom.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { handleError } from '../src/funciones/handle_error.js';
import { deleteModuloHerramienta } from '../controllers/modulo/modulo_herramienta/delete_modulo_herramienta.js';
import { addModuloHerramienta } from '../controllers/modulo/modulo_herramienta/add_modulo_herramienta.js';
import { getHerramientasByModulo } from '../controllers/modulo/modulo_herramienta/get-herramientas_by_modulo.js';
import { getAllModuloHerramienta } from '../controllers/modulo/modulo_herramienta/get_all_modulo_herramienta.js';
import { getAllModulos } from '../controllers/modulo/get_all_modulo.js';
import { deleteModulo } from '../controllers/modulo/delete_modulo.js';
import { editModulo } from '../controllers/modulo/edit_modulo.js';
import { getModuloById } from '../controllers/modulo/get_modulo_by_id.js';
import { createModulo } from '../controllers/modulo/crear_modulo.js';
import { Status } from '../models/status.js';

const router = Router();

const bodyFields = ['nombre', 'menu_id'];

/**
 * LISTAR todas las asignaciones módulo→herramienta
 */
router.get('/modulo-herramienta', async (req, res) => {
    const start = performance.now();
    try {
        const rows = await getAllModuloHerramienta();
        res.status(Status.ok).json({ body: rows, message: 'Asignaciones obtenidas' });
        logGreen('GET /api/modulos/modulo-herramienta: listado completo');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/modulos/modulo-herramienta ejecutado en ${performance.now() - start
            } ms`
        );
    }
});

/**
 * LISTAR herramientas de un módulo
 */
router.get('/:id/herramientas', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const list = await getHerramientasByModulo(+req.params.id);
        res.status(Status.ok).json({ body: list, message: 'Herramientas obtenidas' });
        logGreen(`GET /api/modulos/${req.params.id}/herramientas: éxito`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/modulos/:id/herramientas ejecutado en ${performance.now() - start
            } ms`
        );
    }
});

/**
 * ASIGNAR herramienta a un módulo
 */
router.post('/:id/herramientas', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], ['herramientaId'])) return;
    try {
        const rel = await addModuloHerramienta(+req.params.id, req.body.herramientaId);
        res
            .status(201)
            .json({ body: rel, message: 'Herramienta asignada correctamente' });
        logGreen(`POST /api/modulos/${req.params.id}/herramientas: asignado`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `POST /api/modulos/:id/herramientas ejecutado en ${performance.now() - start
            } ms`
        );
    }
});

/**
 * ELIMINAR asignación (soft-delete)
 */
router.delete('/:id/herramientas/:herramientaId', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id', 'herramientaId'], [])) return;
    try {
        await deleteModuloHerramienta(+req.params.id, +req.params.herramientaId);
        res.status(Status.ok).json({ message: 'Asignación eliminada correctamente' });
        logGreen(
            `DELETE /api/modulos/${req.params.id}/herramientas/${req.params.herramientaId}: borrado suave`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/modulos/:id/herramientas/:herramientaId ejecutado en ${performance.now() - start
            } ms`
        );
    }
});

// Crear módulo
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [],)) return;
    try {
        const { nombre, menu_id } = req.body;
        const newItem = await createModulo(nombre, menu_id);
        res.status(Status.created).json({ body: newItem, message: 'Módulo creado' });
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
        const list = await getAllModulos();
        res.status(Status.ok).json({ body: list, message: 'Listado de módulos' });
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
        res.status(Status.ok).json({ body: item, message: 'Módulo obtenido' });
        logGreen(`GET /api/modulo/${req.params.id} ok`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/modulo/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar módulo
router.put('/:id', async (req, res) => {
    console.log('Entrando a PUT /api/modulo/:id');
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], bodyFields)) return;
    try {
        const updated = await editModulo(Number(req.params.id), req.body);
        res.status(Status.ok).json({ body: updated, message: 'Módulo actualizado' });
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
        res.status(Status.ok).json({ message: 'Módulo eliminado' });
        logGreen(`DELETE /api/modulo/${req.params.id} ok`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/modulo/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;
