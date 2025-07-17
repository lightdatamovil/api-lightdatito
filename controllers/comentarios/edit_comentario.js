import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import { Status } from "../../models/status.js";


export async function updateComentario(req) {
    const id = req.params.id;
    const comentario = req.body.comentario;
    // Intento directo de UPDATE y compruebo si afectó alguna fila
    const result = await executeQuery(`UPDATE comentarios SET contenido = ?  WHERE id = ?  AND eliminado = 0`, [comentario, id], true
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Comentario no encontrado',
            message: `No existe un comentario activo con id: ${id}`,
            status: Status.notFound
        });
    }

}