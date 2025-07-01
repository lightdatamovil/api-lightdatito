// routes/tipoUsuario.js
import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import CustomException from '../models/custom_exception.js';
import { getAllTipoUsuario } from '../controllers/tipo_usuario/get_all_tipo_usuario.js';
import { getTipoUsuarioById } from '../controllers/tipo_usuario/get_tipo_usuario_by_id.js';
import { createTipoUsuario } from '../controllers/tipo_usuario/create_tipo_usuario.js';
import { updateTipoUsuario } from '../controllers/tipo_usuario/edit_tipo_usuario.js';
import { deleteTipoUsuario } from '../controllers/tipo_usuario/delete_tipo_usuario.js';

const router = Router();

// Crear un nuevo tipo de usuario
router.post('/', async (req, res) => {
    const start = performance.now();
    try {
        const errorMessage = verifyAll(req, [], ['nombre']);

        if (errorMessage.length) {
            logRed(`Error en create-tipo-usuario: ${errorMessage}`);
            throw new CustomException({
                title: 'Error en creación de tipo de usuario',
                message: errorMessage
            });
        }

        const { nombre } = req.body;

        const newItem = await createTipoUsuario(nombre);

        res.status(201).json({ body: newItem, message: 'Creado correctamente' });

        logGreen(`POST /api/tipo-usuario: éxito al crear tipo con ID ${newItem.id}`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-usuario POST: ${error.toJsonString()}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-usuario POST: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`POST /api/tipo-usuario ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener todos los tipos de usuario
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllTipoUsuario();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/tipo-usuario: éxito al listar tipos');
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-usuario GET: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-usuario GET: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/tipo-usuario ejecutado en ${performance.now() - start} ms`);
    }
});

// Obtener un tipo por ID
router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        const item = await getTipoUsuarioById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/tipo-usuario/${req.params.id}: éxito al obtener tipo`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-usuario GET/:id: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-usuario GET/:id: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`GET /api/tipo-usuario/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Actualizar un tipo de usuario
router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], ['nombre']);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        const updated = await updateTipoUsuario(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/tipo-usuario/${req.params.id}: éxito al actualizar tipo`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-usuario PUT: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-usuario PUT: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`PUT /api/tipo-usuario/:id ejecutado en ${performance.now() - start} ms`);
    }
});

// Eliminar un tipo de usuario
router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) {
        return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    }
    try {
        await deleteTipoUsuario(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/tipo-usuario/${req.params.id}: éxito al eliminar tipo`);
    } catch (error) {
        if (error instanceof CustomException) {
            logRed(`Error 400 en tipo-usuario DELETE: ${error}`);
            return res.status(400).json(error);
        }
        const customError = new CustomException('Internal Error', error.message, error.stack);
        logRed(`Error 500 en tipo-usuario DELETE: ${error}`);
        res.status(500).json(customError);
    } finally {
        logPurple(`DELETE /api/tipo-usuario/:id ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;
