import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ticket from '../../models/reporte.js';
import { Status } from '../../models/status.js';

export async function getAlltickets() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM tickets WHERE eliminado = 0'
        );
        if (!rows || rows.length === 0) {
            throw new CustomException({
                title: 'No tickets found',
                message: 'No active tickets available',
                status: Status.noContent,
            });
        }

        return rows.map(r => ticket.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener tickets',
            message: err.message,
            stack: err.stack
        });
    }
}