import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Tipoticket from '../../models/tipo_ticket.js';

export async function getTipoticketById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM tipo_ticket WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'Tipoticket no encontrado',
                message: `No existe un tipo_ticket con id=${id}`,
                status: 404
            });
        }

        return Tipoticket.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener tipo_ticket',
            message: err.message,
            stack: err.stack
        });
    }
}