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
        await executeQuery('DELETE FROM estados_logistica WHERE id = ?', [id]);
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error deleting estado_logistica',
            error.message,
            error.stack
        );
    }

}
