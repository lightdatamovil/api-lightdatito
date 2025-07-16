import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import { Status } from "../../models/status.js";

export async function deleteComentario(params) {

    const id = params.id;
    try {
        // Intento directo de soft-delete y compruebo si afectó alguna fila
        const result = await executeQuery(
            `UPDATE comentarios SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ? AND eliminado = 0`, [id], true
        );

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Comentario no encontrado',
                message: `No existe un comentario activo con id=${id}`,
                status: Status.notFound
            });
        }

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar comentario',
            message: err.message,
            stack: err.stack
        });
    }
}
