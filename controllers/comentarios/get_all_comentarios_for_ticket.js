import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";
import { logCyan } from "../../src/funciones/logsCustom.js";
import { Status } from "../../models/status.js";

export async function getAllComentariosForTicket(ticket_id) {
    try {
        const rows = await executeQuery(
            `SELECT * FROM comentarios WHERE eliminado = 0 AND ticket_id = ?`, [ticket_id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'No hay comentarios',
                message: `No se encontraron comentarios para el ticket con id: ${ticket_id}`,
                status: Status.noContent
            });
        }
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
