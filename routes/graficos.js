import { Router } from "express";
import { performance } from "perf_hooks";
import { logRed, logPurple, logGreen, logYellow } from "../src/funciones/logsCustom.js";

import CustomException from "../models/custom_exception.js";

import { getHourlyByCompany } from "../controllers/graficos/graficosPorHora.js";
import { getAverageResponseTime } from "../controllers/graficos/graficoTiempo.js";

const router = Router();

// Crear un nuevo puesto

// Listar todos los puestos
router.post("/:tipoQr", async (req, res) => {
  const startTime = performance.now();
  try {
    const { tipoQr } = req.params;
    const { start, end, logisticasElegidas } = req.body;

    logYellow(`GET /api/puestos: Listando puestos de tipo ${tipoQr} desde ${start} hasta ${end}...`);

    const grafico = await getHourlyByCompany(tipoQr, start, end, logisticasElegidas);

    res
      .status(200)
      .json({ body: grafico, message: "Datos obtenidos correctamente" });
    logGreen("GET /api/puestos: éxito al listar puestos");
  } catch (error) {
    if (error instanceof CustomException) {
      logRed(`Error 400 en puestos GET: ${error}`);
      return res.status(400).json(error);
    }
    const customError = new CustomException(
      "Internal Error",
      error.message,
      error.stack
    );
    logRed(`Error 500 en puestos GET: ${error}`);
    res.status(500).json(customError);
  } finally {
    logPurple(`GET /api/puestos ejecutado en ${performance.now() - startTime} ms`);
  }
});


router.get("/tiempo/:tipoQr", async (req, res) => {
  const { tipoQr } = req.params;
  const startTime = performance.now();
  try {
    const grafico = await getAverageResponseTime(tipoQr);

    res
      .status(200)
      .json({ body: grafico, message: "Datos obtenidos correctamente" });
    logGreen("GET /api/puestos: éxito al listar puestos");
  } catch (error) {
    if (error instanceof CustomException) {
      logRed(`Error 400 en puestos GET: ${error}`);
      return res.status(400).json(error);
    }
    const customError = new CustomException(
      "Internal Error",
      error.message,
      error.stack
    );
    logRed(`Error 500 en puestos GET: ${error}`);
    res.status(500).json(customError);
  } finally {
    logPurple(`GET /api/puestos ejecutado en ${performance.now() - startTime} ms`);
  }
});


// Obtener un puesto por ID

export default router;
