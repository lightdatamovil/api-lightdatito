import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";
import Comentario from "../../models/comentario.js";
import { Status } from "../../models/status.js";

export async function getAllComentariosForTicket(req) {
    const ticket_id = req.params.id;

    const res = await executeQuery('SELECT * FROM tickets WHERE id = ? AND eliminado = 0 LIMIT 1', [ticket_id]);

    if (!res || res.length === 0) {
        throw new CustomException({
            title: 'Ticket no encontrado',
            message: `No existe un ticket con id: ${ticket_id}`,
            status: Status.notFound
        });
    }

    const rows = await executeQuery(`SELECT * FROM comentarios WHERE eliminado = 0 AND ticket_id = ?`, [ticket_id]
    );

    if (rows.length === 0) {
        throw new CustomException({
            title: 'No hay comentarios',
            message: `No se encontraron comentarios para el ticket con id: ${ticket_id}`,
            status: Status.noContent
        });
    }
    return rows.map(r => Comentario.fromJson(r));
}