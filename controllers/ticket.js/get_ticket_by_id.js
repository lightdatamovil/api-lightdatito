import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ticket from '../../models/reporte.js';
import { Status } from '../../models/status.js';

export async function getticketById(params) {
    const { id } = params;
    try {
        const rows = await executeQuery(
            'SELECT * FROM tickets WHERE id = ? AND eliminado = 0 LIMIT 1',
            [id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'ticket no encontrado',
                message: `No existe un ticket con id: ${id}`,
                status: Status.notFound
            });
        }

        return ticket.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener ticket',
            message: err.message,
            stack: err.stack
        });
    }
}