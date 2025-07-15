import { Router } from "express";
import { performance } from "perf_hooks";
import { logPurple, logGreen } from "../src/funciones/logsCustom.js";
import { handleError } from '../src/funciones/handle_error.js';
import { verificarTodo } from '../src/funciones/verificarAll.js';
import { createComentario } from "../controllers/comentarios/create_comentario.js";
import { updateComentario } from "../controllers/comentarios/edit_comentario.js";
import { getComentarioById } from "../controllers/comentarios/get_comentario_by_id.js";
import { getAllComentarios } from "../controllers/comentarios/get_all_comentarios.js";
import { deleteComentario } from "../controllers/comentarios/delete_comentario.js";
import { getAllComentariosForTicket } from "../controllers/comentarios/get_all_comentarios_for_ticket.js";
import { Status } from "../models/status.js";

const router = Router();

// Crear comentario
router.post("/", async (req, res) => {
  const requiredBodyFields = ["usuario_id", "ticket_id", "comentario"];
  if (!verificarTodo(req, res, requiredBodyFields)) return;
  try {
    const { usuario_id, ticket_id, comentario } = req.body;
    const newItem = await createComentario(usuario_id, ticket_id, comentario);
    res.status(Status.created).json({ body: newItem, message: "Creado correctamente" });
    logGreen(
      `POST /api/comentarios: éxito al crear comentario ID ${newItem.id}`
    );
  } catch (err) {
    return handleError(req, res, err);
  }
});

// Obtener todos los comentarios 
router.get("/", async (req, res) => {
  try {
    const list = await getAllComentarios();
    res.status(Status.ok).json({ body: list, message: "Comentarios obtenidos" });
    logGreen("GET /api/comentarios: éxito al listar comentarios");
  } catch (err) {
    return handleError(req, res, err);
  }
});


// Obtener todos los comentarios de un ticket 
router.get("/ticket_id/:id", async (req, res) => {
  const start = performance.now();

  try {
    const list = await getAllComentariosForTicket(req.params.id);
    if (list.length === 0) {
      res.status(404).json({ message: "No se encontraron comentarios" });
      logGreen(`GET /api/comentarios/ticket_id/${req.params.id}: sin comentarios`);
      return;
    }
    res.status(Status.ok).json({ body: list, message: "Comentarios obtenidos" });
    logGreen("GET /api/comentarios: éxito al listar comentarios");
  } catch (err) {
    return handleError(req, res, err);
  } finally {
    logPurple(
      `GET /api/comentarios ejecutado en ${performance.now() - start} ms`
    );
  }
});

// coemntario por ID
router.get("/:id", async (req, res) => {
  const start = performance.now();
  if (!verificarTodo(req, res, ['id'])) return;
  try {
    const item = await getComentarioById(req.params.id);
    res.status(Status.ok).json({ body: item, message: "Comentario obtenido" });
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
    res.status(Status.ok).json({ body: updated, message: "Actualizado correctamente" });
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
    res.status(Status.ok).json({ message: "Eliminado correctamente" });
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
