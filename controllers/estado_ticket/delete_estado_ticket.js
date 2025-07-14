import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

export async function deleteEstadoticket(id) {
    try {
        const [row] = await executeQuery(
            `SELECT * FROM estados_ticket WHERE id = ?`,
            [id]
        );

        if (!row) {
            throw new CustomException({
                title: 'Estado ticket no encontrado',
                message: `No existe un estado_ticket con id=${id}`,
                status: 404
            });
        }

        await executeQuery('UPDATE estados_ticket SET eliminado = 1 WHERE id = ?', [id]);

        return { id };
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al eliminar estado_ticket',
            message: error.message,
            stack: error.stack
        });
    }
}