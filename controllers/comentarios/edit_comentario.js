import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import { Status } from "../../models/status.js";


export async function updateComentario(params, body) {
    const id = params.id;
    const comentario = body.comentario;
    try {
        // Intento directo de UPDATE y compruebo si afectó alguna fila
        const result = await executeQuery(
            `UPDATE comentarios SET contenido = ?  WHERE id = ?  AND eliminado = 0`, [comentario, id], true
        );

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Comentario no encontrado',
                message: `No existe un comentario activo con id: ${id}`,
                status: Status.notFound
            });
        }
        return { id }

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al actualizar comentario',
            message: err.message,
            stack: err.stack
        });
    }
}