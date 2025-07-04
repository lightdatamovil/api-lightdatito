// routes/usuarios.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { createUsuario } from '../controllers/usuarios/create_usuario.js';
import { getAllUsuarios } from '../controllers/usuarios/get_all_usuarios.js';
import { getUsuarioById } from '../controllers/usuarios/get_user_by_id.js';
import { updateUsuario } from '../controllers/usuarios/edit_usuario.js';
import { deleteUsuario } from '../controllers/usuarios/delete_usuario.js';
import { getInformeDashboard } from '../controllers/usuarios/get_informe_dashboard.js';
import { getReportesUltimaSemana } from '../controllers/usuarios/get_reportes_dashboard.js';
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAllt.js';
import CustomException from '../models/custom_exception.js';

const router = Router();

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const start = performance.now();
    const requiredBodyFields = ['nombre', 'email', 'password', 'urlImagen', 'tipoUsuarioId',];
    if (!verificarTodo(req, res, requiredBodyFields)) return;
    try {
        const { nombre, email, password, urlImagen, tipoUsuarioId } = req.body;
        const newItem = await createUsuario(nombre, email, password, urlImagen, tipoUsuarioId);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/usuarios: éxito al crear usuario con ID ${newItem.id}`);
    } catch (err) {
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
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
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
        const item = await getUsuarioById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/usuarios/${req.params.id}: éxito al obtener usuario`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`GET /api/usuarios/:id ejecutado en ${performance.now() - start} ms`);
    }
});
// Obtener un usuario por ID
router.get('/:id/informe-dashboard', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const item = await getInformeDashboard(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/usuarios/${req.params.id}/informe-dashboard: éxito al obtener informe`);
    } catch (error) {
        return handleError(req, res, error);
        // if (error instanceof CustomException) {
        //     logRed(`Error 400 en usuarios GET/:id/informe-dashboard: ${error}`);
        //     return res.status(400).json(error);
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
        const rows = await getReportesUltimaSemana(userId);
        res
            .status(200)
            .json({ body: rows, message: "Reportes última semana obtenidos" });
        logGreen(
            `GET /api/reportes/ultima-semana/${userId}: éxito al listar reportes`
        );
    } catch (err) {
        //return handleError(req, res, err);
        if (err instanceof CustomException) {
            logRed(
                `Error 400 GET /api/reportes/ultima-semana/${userId}:`,
                err.toJSON()
            );
            return res.status(400).json(err.toJSON());
        }
        const fatal = new CustomException({
            title: "Internal Server Error",
            message: err.message,
            stack: err.stack
        });
        logRed(
            `Error 500 GET /api/reportes/ultima-semana/${userId}:`,
            fatal.toJSON()
        );
        res.status(500).json(fatal.toJSON());
    } finally {
        logPurple(
            `GET /api/reportes/ultima-semana/:userId ejecutado en ${performance.now() - start
            } ms`
        );
    }
});
// Actualizar un usuario
router.put('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        const updated = await updateUsuario(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/usuarios/${req.params.id}: éxito al actualizar usuario`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`PUT /api/usuarios/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    if (!verificarTodo(req, res, ['id'])) return;
    try {
        await deleteUsuario(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/usuarios/${req.params.id}: éxito al eliminar usuario`);
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(`DELETE /api/usuarios/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;