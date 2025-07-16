import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";
import { Status } from "../../models/status.js";

export async function updateComentario(id, { comentario }) {
    try {
        // Intento directo de UPDATE y compruebo si afectó alguna fila
        const result = await executeQuery(
            `UPDATE comentarios
          SET contenido = ?
        WHERE id = ?
          AND eliminado = 0`,
            [comentario, id],
            true
        );

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Comentario no encontrado',
                message: `No existe un comentario activo con id=${id}`,
                status: Status.notFound
            });
        }

        // Recuperar y devolver el comentario actualizado
        const [row] = await executeQuery(
            `SELECT * FROM comentarios WHERE id = ?`,
            [id],
            true
        );
        return Comentario.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al actualizar comentario',
            message: err.message,
            stack: err.stack
        });
    }
}