import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';

/**
 * Delete an estado_logistica by ID.
 * @param {number|string} id - The ID of the estado to delete.
 * @returns {{id: number|string}} The ID of the deleted estado.
 */
export async function deleteEstadoLogistica(id) {
    try {
        // 1) Verificar que exista el registro
        const [row] = await executeQuery(
            `SELECT * FROM estados_logistica WHERE id = ?`,
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'EstadoLogistica no encontrado',
                message: `No existe un estado_logistica con id=${id}`
            });
        }

        // 2) Eliminarlo
        await executeQuery(
            `DELETE FROM estados_logistica WHERE id = ?`,
            [id]
        );

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar estado_logistica',
            message: err.message,
            stack: err.stack
        });
    }
}