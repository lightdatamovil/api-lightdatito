import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";
import { Status } from "../../models/status.js";

export async function getAllParticularidadesForLogistica(req) {
    const logistica_id = req.params.id;
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

}
