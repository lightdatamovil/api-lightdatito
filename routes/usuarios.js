// routes/usuarios.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen, logCyan } from '../src/funciones/logsCustom.js';
import { createUsuario } from '../controllers/usuarios/create_usuario.js';
import { getAllUsuarios } from '../controllers/usuarios/get_all_usuarios.js';
import { getUsuarioById } from '../controllers/usuarios/get_user_by_id.js';
import { updateUsuario } from '../controllers/usuarios/edit_usuario.js';
import { deleteUsuario } from '../controllers/usuarios/delete_usuario.js';
import { getInformeDashboard } from '../controllers/usuarios/get_informe_dashboard.js';
import { getticketsUltimaSemana } from '../controllers/usuarios/get_tickets_dashboard.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import CustomException from '../models/custom_exception.js';
import { deletePuestoUsuario } from '../controllers/usuarios/puesto_usuario/delete_puesto_usuario.js';
import { getAllPuestosUsuario } from '../controllers/usuarios/puesto_usuario/get_all_puestos_usuario.js';
import { asignarPuestoAUsuario } from '../controllers/usuarios/puesto_usuario/create_puesto_usuario.js';
import { getPuestosByUsuario } from '../controllers/usuarios/puesto_usuario/get_all_puestos_by_usuario.js';
import Campos from '../src/helpers/campos.js';
import { Status } from '../models/status.js';

const router = Router();

/**
 * LISTAR todas las asignaciones activas 
 */
router.get('/puestos-usuario', async (req, res) => {
    const start = performance.now();
    try {
        const rows = await getAllPuestosUsuario();
        res.status(Status.ok).json({ body: rows, message: 'Asignaciones obtenidas correctamente' });
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
 * ASIGNAR un puesto a un usuario
 */
router.post('/:id/puestos', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], ['puestoId'])) return;
    try {
        await asignarPuestoAUsuario(+req.params.id, req.body.puestoId);
        res.status(Status.created).json({ message: 'Puesto asignado correctamente' });
        logGreen(`POST /api/usuarios/${req.params.id}/puestos: asignado`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `POST /api/usuarios/:id/puestos ejecutado en ${performance.now() - start
            } ms`
        );
    }
});


/**
 * ELIMINAR asignación de puesto (soft-delete)
 */
router.delete('/:id/puestos/:puestoId', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id', 'puestoId'], [])) return;
    try {
        await deletePuestoUsuario(+req.params.id, +req.params.puestoId);
        res.status(Status.ok).json({ message: 'Asignación de puesto eliminada' });
        logGreen(
            `DELETE /api/usuarios/${req.params.id}/puestos/${req.params.puestoId}: borrado suave`
        );
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `DELETE /api/usuarios/:id/puestos/:puestoId ejecutado en ${performance.now() - start
            } ms`
        );
    }
});

/**
 * LISTAR los puestos de un usuario
 */
router.get('/:id/puestos', async (req, res) => {
    const start = performance.now();

    //custom exception 
    try {
        const puestos = await getPuestosByUsuario(+req.params.id);
        res
            .status(200)
            .json({ body: puestos, message: 'Puestos obtenidos correctamente' });
        logGreen(`GET /api/usuarios/${req.params.id}/puestos: ok`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/usuarios/:id/puestos ejecutado en ${performance.now() - start
            } ms`
        );
    }
});


const requiredBodyFields = ['nombre', 'email', 'password', 'url_imagen'];


// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, [], requiredBodyFields)) return;
    try {

        const newUser = await createUsuario(req);
        res.status(Status.created).json({ body: newUser, message: 'Creado correctamente' });
        logGreen(`POST /api/usuarios: éxito al crear usuario con ID ${newUser.id}`);
    } catch (err) {
        logCyan(`Error en POST /api/usuarios: ${err.message}`);
        return handleError(req, res, err);
    } finally {
        logPurple(`POST /api/usuarios ejecutado en ${performance.now() - start} ms`);
    }
});

// Listar todos los usuarios
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllUsuarios();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/usuarios: éxito al listar usuarios');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/usuarios ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const item = await getUsuarioById(req);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/usuarios/${req.params.id}: éxito al obtener usuario`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/usuarios/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un usuario por ID- DASHBOARD
router.get('/:id/informe-dashboard', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const item = await getInformeDashboard(req.params.id);
        res.status(Status.ok).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/usuarios/${req.params.id}/informe-dashboard: éxito al obtener informe`);
    } catch (error) {
        return handleError(req, res, error);
        // if (error instanceof CustomException) {
        //     logRed(`Error Status.badRequest en usuarios GET/:id/informe-dashboard: ${error}`);
        //     return res.status(Status.badRequest).json(error);
        // }
        // const customError = new CustomException('Internal Error', error.message, error.stack);
        // logRed(`Error 500 en usuarios GET/:id/informe-dashboard: ${error}`);
        // return res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/usuarios/:id ejecutado en ${performance.now() - start} ms`);
    }
});

router.get("/:userId/ultima-semana", async (req, res) => {
    const start = performance.now();
    const userId = Number(req.params.userId);

    try {
        const rows = await getticketsUltimaSemana(userId);
        res.status(Status.ok).json({ body: rows, message: "tickets última semana obtenidos" });
        logGreen(
            `GET /api/tickets/ultima-semana/${userId}: éxito al listar tickets`
        );
    } catch (err) {
        //return handleError(req, res, err);
        if (err instanceof CustomException) {
            logRed(
                `Error Status.badRequest GET /api/tickets/ultima-semana/${userId}:`,
                err.toJSON()
            );
            return res.status(Status.badRequest).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: "Internal Server Error",
            message: err.message,
            stack: err.stack
        });
        logRed(`Error 500 GET /api/tickets/ultima-semana/${userId}:`, fatal.toJSON()
        );
        res.status(Status.ok).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/tickets/ultima-semana/:userId ejecutado en ${performance.now() - start
            } ms`
        );
    }
});

router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], Campos.usuarios)) return;
    try {
        const usuarioId = req.params.id;


        // 2) Separar tipoPuestoId del resto de los campos
        const { ...userFields } = req.body;
        let updated;

        // 3) Actualizar campos de usuario si existen
        if (Object.keys(userFields).length) {
            updated = await updateUsuario(usuarioId, userFields);
        }
        // 5) Si no se actualizó nada, devolver el usuario igualmente
        if (!updated) {
            updated = await getUsuarioById(usuarioId);
        }
        res.status(Status.ok).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/usuarios/${usuarioId}: éxito al actualizar usuario`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/usuarios/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'], [])) return;
    try {
        await deleteUsuario(req);
        res.status(Status.ok).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/usuarios/${req.params.id}: éxito al eliminar usuario`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/usuarios/:id ejecutado en ${performance.now() - start} ms`);
    }
});



export default router;