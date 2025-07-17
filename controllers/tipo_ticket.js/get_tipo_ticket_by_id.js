import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import Tipoticket from '../../models/tipo_ticket.js';

export async function getTipoticketById(id) {
    try {// Aquí rows es el array completo
        const rows = await executeQuery(
            'SELECT * FROM tipo_ticket WHERE id = ? AND eliminado = 0 LIMIT 1',
            [id],
        );

        if (!rows || rows.length === 0) {
            throw new CustomException({
                title: 'Tipo ticket no encontrado',
                message: `No existe un tipo_ticket con id=${id}`,
                status: Status.notFound
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

