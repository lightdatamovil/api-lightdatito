import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";

export async function getComentarioById(id) {
    try {
        const rows = await executeQuery(
            `SELECT * FROM comentarios WHERE id = ? AND eliminado = 0`,
            [id]
        );
        if (rows.length === 0) {
            throw new CustomException({
                title: "Comentario no encontrado",
                message: `No existe un comentario con id=${id}`,
                status: 404
            });
        }
        return Comentario.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: "Error al obtener comentario",
            message: err.message,
            stack: err.stack
        });
    }
}
