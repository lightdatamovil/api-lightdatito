import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function deleteTicket(req) {
    const id = req.params.id;
    const result = await executeQuery(`UPDATE tickets SET eliminado  = 1, fecha_eliminado = NOW() WHERE id = ? AND eliminado = 0`, [id],
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Ticket no encontrado',
            message: `No existe un ticket activo con id: ${id}`,
            status: Status.notFound
        });
    }
    return { id };
}
