import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

export async function deleteticket(id) {
    try {
        // 1) Verificar que el ticket exista y no esté ya eliminado
        const [row] = await executeQuery(
            'SELECT id FROM tickets WHERE id = ? AND eliminado = 0',
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'ticket no encontrado',
                message: `No existe un ticket activo con id=${id}`,
                status: 404
            });
        }

        // 2) Soft-delete
        await executeQuery(
            'UPDATE tickets SET eliminado = 1 WHERE id = ?',
            [id]
        );

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar ticket',
            message: err.message,
            stack: err.stack
        });
    }
}