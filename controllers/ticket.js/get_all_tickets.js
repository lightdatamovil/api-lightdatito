import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ticket from '../../models/ticket.js';

export async function getAlltickets() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM tickets WHERE eliminado = 0'
        );
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