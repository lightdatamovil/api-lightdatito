import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";
import { Status } from "../../models/status.js";

export async function getAllParticularidadesForLogistica(params) {
    const logistica_id = params.id;
    try {
        const rows = await executeQuery(`SELECT * FROM particularidades WHERE eliminado = 0 AND logistica_id = ?`,
            [logistica_id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: "Particularidades no encontradas",
                message: `No se encontraron particularidades para la logística con ID: ${logistica_id}`,
                statusCode: Status.noContent
            });
        }

        return rows.map(r => Comentario.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: "Error al obtener comentarios",
            message: err.message,
            stack: err.stack
        });
    }
}
