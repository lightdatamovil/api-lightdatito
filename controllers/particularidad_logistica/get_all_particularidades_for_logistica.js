import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";
import { logCyan } from "../../src/funciones/logsCustom.js";

export async function getAllParticularidadesForLogistica(ticket_id) {
    try {
        const rows = await executeQuery(`SELECT * FROM particularidades WHERE eliminado = 0 AND logistica_id = ?`,
            [ticket_id]
        );

        return rows.map(r => Comentario.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        logCyan(`${JSON.stringify(err)}`)
        throw new CustomException({
            title: "Error al obtener comentarios",
            message: err.message,
            stack: err.stack
        });
    }
}
