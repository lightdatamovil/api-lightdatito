import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { verifyAll } from '../src/funciones/verifyParameters.js';
import { getAllTipoUsuario } from '../controllers/tipo_usuario/get_all_tipo_usuario.js';
import { getTipoUsuarioById } from '../controllers/tipo_usuario/get_tipo_usuario_by_id.js';
import { createTipoUsuario } from '../controllers/tipo_usuario/create_tipo_usuario.js';
import { updateTipoUsuario } from '../controllers/tipo_usuario/edit_tipo_usuario.js';

const router = Router();

router.post('/', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, [], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const newItem = await createTipoUsuario(req.body);
        res.status(201).json({ body: newItem, message: 'Creado correctamente' });
        logGreen(`POST /api/tipo-usuario: éxito al crear tipo con ID ${newItem.id}`);
    } catch (error) {
        logRed(`Error POST /api/tipo-usuario: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`POST /api/tipo-usuario ejecutado en ${performance.now() - start} ms`);
    }
});

router.delete('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        await deleteTipoUsuario(req.params.id);
        res.status(200).json({ message: 'Eliminado correctamente' });
        logGreen(`DELETE /api/tipo-usuario/${req.params.id}: éxito al eliminar tipo`);
    } catch (error) {
        logRed(`Error DELETE /api/tipo-usuario/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`DELETE /api/tipo-usuario/:id ejecutado en ${performance.now() - start} ms`);
    }
});

router.put('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const updated = await updateTipoUsuario(req.params.id, req.body);
        res.status(200).json({ body: updated, message: 'Actualizado correctamente' });
        logGreen(`PUT /api/tipo-usuario/${req.params.id}: éxito al actualizar tipo`);
    } catch (error) {
        logRed(`Error PUT /api/tipo-usuario/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`PUT /api/tipo-usuario/:id ejecutado en ${performance.now() - start} ms`);
    }
});

router.get('/:id', async (req, res) => {
    const start = performance.now();
    const missing = verifyAll(req, ['id'], []);
    if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
    try {
        const item = await getTipoUsuarioById(req.params.id);
        res.status(200).json({ body: item, message: 'Registro obtenido' });
        logGreen(`GET /api/tipo-usuario/${req.params.id}: éxito al obtener tipo`);
    } catch (error) {
        logRed(`Error GET /api/tipo-usuario/:id: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/tipo-usuario/:id ejecutado en ${performance.now() - start} ms`);
    }
});

router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllTipoUsuario();
        res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
        logGreen('GET /api/tipo-usuario: éxito al listar tipos');
    } catch (error) {
        logRed(`Error GET /api/tipo-usuario: ${error.stack}`);
        res.status(500).json({ message: 'Error interno' });
    } finally {
        logPurple(`GET /api/tipo-usuario ejecutado en ${performance.now() - start} ms`);
    }
});

export default router;