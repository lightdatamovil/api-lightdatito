import { Router } from 'express';
import { performance } from 'perf_hooks';
import { logRed, logPurple, logGreen } from '../../src/funciones/logsCustom.js';
import { verifyAll } from '../../src/funciones/verifyParameters.js';

const router = Router();

router.get('/', async (req, res) => {
  const start = performance.now();
  const missing = verifyAll(req, [], []);
  if (missing.length) return res.status(400).json({ message: `Faltan parámetros: ${missing.join(', ')}` });
  try {
    // const list = await getAllEmpresas();
    res.status(200).json({ body: list, message: 'Datos obtenidos correctamente' });
    logGreen('GET /api/empresas: éxito al listar empresas');
  } catch (error) {
    logRed(`Error GET /api/empresas: ${error.stack}`);
    res.status(500).json({ message: 'Error interno' });
  } finally {
    logPurple(`GET /api/empresas ejecutado en ${performance.now() - start} ms`);
  }
});

export default router;