import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";

export async function deleteComentario(id) {
    try {
        // Verificar existencia
        const [existing] = await executeQuery(
            `SELECT id FROM comentarios WHERE id = ? AND eliminado = 0`,
            [id]
        );
        if (!existing) {
            throw new CustomException({
                title: "Comentario no encontrado",
                message: `No existe un comentario con id=${id}`,
                status: 404
            });
        }

        // Soft-delete
        await executeQuery(
            `UPDATE comentarios
          SET eliminado = 1
        WHERE id = ?`,
            [id]
        );
        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: "Error al eliminar comentario",
            message: err.message,
            stack: err.stack
        });
    }
}
