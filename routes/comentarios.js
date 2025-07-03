import { Router } from "express";
import { performance } from "perf_hooks";
import { logRed, logPurple, logGreen } from "../src/funciones/logsCustom.js";
import { verifyAll } from "../src/funciones/verifyParameters.js";
import CustomException from "../models/custom_exception.js";
import { createComentario } from "../controllers/comentarios/create_comentario.js";
import { getAllComentarios } from "../controllers/comentarios/get_all_comentarios.js";
import { getComentarioById } from "../controllers/comentarios/get_comentario_by_id.js";
import { updateComentario } from "../controllers/comentarios/edit_comentario.js";
import { deleteComentario } from "../controllers/comentarios/delete_comentario.js";
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAllt.js';

const router = Router();

// Crear comentario
router.post("/", async (req, res) => {
  const start = performance.now();
  const missing = verifyAll(req, [], ["reporte_id", "comentario"]);
  if (missing.length) {
    const ex = new CustomException({
      title: "Faltan campos",
      message: `Faltan campos: ${missing.join(",")}`,
    });
    logRed("Error 400 POST /api/comentarios:", ex.toJSON());
    return res.status(400).json(ex.toJSON());
  }

  try {
    const { reporte_id, comentario } = req.body;
    const newItem = await createComentario(reporte_id, comentario);
    res.status(201).json({ body: newItem, message: "Creado correctamente" });
    logGreen(
      `POST /api/comentarios: éxito al crear comentario ID ${newItem.id}`
    );
  } catch (err) {
    if (err instanceof CustomException) {
      logRed("Error 400 POST /api/comentarios:", err.toJSON());
      return res.status(400).json(err.toJSON());
    }
    const fatal = new CustomException({
      title: "Internal Server Error",
      message: err.message,
      stack: err.stack,
    });
    logRed("Error 500 POST /api/comentarios:", fatal.toJSON());
    res.status(500).json(fatal.toJSON());
  } finally {
    logPurple(
      `POST /api/comentarios ejecutado en ${performance.now() - start} ms`
    );
  }
});

// Obtener todos
router.get("/", async (req, res) => {
  const start = performance.now();
  try {
    const list = await getAllComentarios();
    res.status(200).json({ body: list, message: "Comentarios obtenidos" });
    logGreen("GET /api/comentarios: éxito al listar comentarios");
  } catch (err) {
    if (err instanceof CustomException) {
      logRed("Error 400 GET /api/comentarios:", err.toJSON());
      return res.status(400).json(err.toJSON());
    }
    const fatal = new CustomException({
      title: "Internal Server Error",
      message: err.message,
      stack: err.stack,
    });
    logRed("Error 500 GET /api/comentarios:", fatal.toJSON());
    res.status(500).json(fatal.toJSON());
  } finally {
    logPurple(
      `GET /api/comentarios ejecutado en ${performance.now() - start} ms`
    );
  }
});

// Obtener por ID
router.get("/:id", async (req, res) => {
  const start = performance.now();
  if (!verificarTodo(req, res, ['id'])) return;
  try {
    const item = await getComentarioById(req.params.id);
    res.status(200).json({ body: item, message: "Comentario obtenido" });
    logGreen(`GET /api/comentarios/${req.params.id}: éxito`);
  } catch (err) {
    return handleError(req, res, err);
  } finally {
    logPurple(
      `GET /api/comentarios/:id ejecutado en ${performance.now() - start} ms`
    );
  }
});

// Actualizar comentario
router.put("/:id", async (req, res) => {
  const start = performance.now();
  if (!verificarTodo(req, res, ['id'])) return;

  try {
    const updated = await updateComentario(req.params.id, req.body);
    res.status(200).json({ body: updated, message: "Actualizado correctamente" });
    logGreen(`PUT /api/comentarios/${req.params.id}: éxito`);
  } catch (err) {
    return handleError(req, res, err);
  } finally {
    logPurple(
      `PUT /api/comentarios/:id ejecutado en ${performance.now() - start} ms`
    );
  }
});

// Eliminar comentario
router.delete("/:id", async (req, res) => {
  const start = performance.now();
  if (!verificarTodo(req, res, ['id'])) return;

  try {
    await deleteComentario(req.params.id);
    res.status(200).json({ message: "Eliminado correctamente" });
    logGreen(`DELETE /api/comentarios/${req.params.id}: éxito`);
  } catch (err) {
    return handleError(req, res, err);
  } finally {
    logPurple(
      `DELETE /api/comentarios/:id ejecutado en ${performance.now() - start} ms`
    );
  }
});

export default router;
