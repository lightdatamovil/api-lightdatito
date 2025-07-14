import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";

export async function updateComentario(id, { comentario }) {
    try {
        // Verificar existencia
        const [existing] = await executeQuery(
            `SELECT id FROM comentarios WHERE id = ? AND eliminado = 0`,
            [id], true
        );
        if (!existing) {
            throw new CustomException({
                title: "Comentario no encontrado",
                message: `No existe un comentario con id=${id}`
            });
        }

        // Actualizar texto
        await executeQuery(
            `UPDATE comentarios
         SET contenido = ?
       WHERE id = ?`,
            [comentario, id], true
        );

        // Recuperar actualizado
        const [row] = await executeQuery(
            `SELECT * FROM comentarios WHERE id = ?`,
            [id]
        );
        return Comentario.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: "Error al actualizar comentario",
            message: err.message,
            stack: err.stack
        });
    }
}
