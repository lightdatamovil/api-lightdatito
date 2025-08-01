import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';



export async function updateticket(params, body) {
    const { id } = params;
    const { titulo, descripcion, tipo_ticket_id, observador, proyecto_id, logistica_id } = body;
    try {
        const query = `UPDATE tickets SET (titulo, descripcion, tipo_ticket_id, observador, proyecto_id, logistica_id) = (?, ?, ?, ?, ?, ?) WHERE id = ? AND ELIMINADO = 0`;
        const params = [titulo, descripcion, tipo_ticket_id, observador, proyecto_id, logistica_id, id];
        const result = await executeQuery(query, params);
        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Ticket no encontrado',
                message: `No existe un ticket activo con id: ${id}`,
                status: Status.notFound,
            });
        }
    } catch (error) {
        throw new CustomException({
            title: 'Error updating ticket',
            message: error.message,
            status: Status.internalServerError
        });
    }
}