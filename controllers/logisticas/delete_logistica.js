import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Logistica from '../../models/logistica.js';

/**
 * Soft-delete an logistica by ID (mark as eliminado).
 * @param {number|string} id - The ID of the logistica to delete.
 * @returns {Object} The ID of the deleted logistica.
 */
export async function deleteLogistica(id) {
    try {
        // 1) Verificar que la logística exista y no esté ya eliminada
        const [row] = await executeQuery(
            'SELECT * FROM logisticas WHERE id = ? AND eliminado = 0',
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'Logística no encontrada',
                message: `No existe una logística activa con id=${id}`,
                status: 404
            });
        }

        // 2) Marcarla como eliminada
        await executeQuery(
            'UPDATE logisticas SET eliminado = 1 WHERE id = ?',
            [id]
        );

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar logística',
            message: err.message,
            stack: err.stack
        });
    }
}
