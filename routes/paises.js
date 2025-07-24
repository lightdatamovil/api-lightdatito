import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logPurple, logGreen } from '../src/funciones/logsCustom.js';
import { getAllPaises } from '../controllers/paises/get_all_paises.js';
import { handleError } from '../src/funciones/handle_error.js';
import { Status } from '../models/status.js';
import { getPaisById } from '../controllers/paises/get_pais_by_id.js';
import { getAllPaisesEnSistema } from '../controllers/paises/get_paises_existentes_sistema.js';

const router = Router();

// Crear observación de logística
router.get('/', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPaises();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
        logGreen('GET /api/paises: éxito al listar países');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/paises ejecutado en ${performance.now() - start} ms`
        );
    }
});

router.get('/existentes-sistema', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getAllPaisesEnSistema();
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
        logGreen('GET /api/paises/existentes-sistema: éxito al listar países existentes en el sistema');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/paises/existentes-sistema ejecutado en ${performance.now() - start} ms`
        );
    }
});

router.get('/:id', async (req, res) => {
    const start = performance.now();
    try {
        const list = await getPaisById(req);
        res.status(Status.ok).json({ body: list, message: 'Datos obtenidos correctamente', success: true });
        logGreen('GET /api/paises: éxito al listar países');
    } catch (err) {
        return handleError(req, res, err);
    } finally {
        logPurple(
            `GET /api/paises ejecutado en ${performance.now() - start} ms`
        );
    }
});

// Exportar el router
export default router;