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
        const query = 'UPDATE logisticas SET eliminado = 1 WHERE id = ?';
        await executeQuery(query, [id]);
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error deleting logistica',
            error.message,
            error.stack
        );
    }
}
