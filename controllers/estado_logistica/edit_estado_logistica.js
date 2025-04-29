import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';

/**
 * Update an existing estado_logistica by ID.
 * @param {number|string} id - The ID of the estado to update.
 * @param {Object} data - Fields and values to update.
 * @returns {EstadoLogistica|null} The updated EstadoLogistica instance, or null if not found.
 */
export async function updateEstadoLogistica(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateEstadoLogistica');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE estados_logistica SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return getEstadoLogisticaById(id);
    } catch (error) {
        throw new CustomException(
            'Error updating estado_logistica',
            error.message,
            error.stack
        );
    }
}
