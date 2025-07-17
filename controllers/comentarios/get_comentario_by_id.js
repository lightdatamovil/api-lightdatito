import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";
import { Status } from "../../models/status.js";

export async function getComentarioById(req) {
    const id = req.params.id;
    const rows = await executeQuery(
        `SELECT * FROM comentarios WHERE id = ? AND eliminado = 0 LIMIT 1`,
        [id]
    );
    if (rows.length === 0) {
        throw new CustomException({
            title: "Comentario no encontrado",
            message: `No existe un comentario con id: ${id}`,
            status: Status.notFound
        });
    }
    return Comentario.fromJson(rows[0]);
}