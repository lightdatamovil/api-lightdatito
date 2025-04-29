import { executeQuery } from '../../db.js';
import Logistica from '../../models/logistica.js';

/**
 * Update an existing logistica by ID.
 * @param {number|string} id - The ID of the logistica to update.
 * @param {Object} data - Fields and values to update.
 * @returns {Logistica|null} The updated Logistica instance, or null if not found.
 */
export async function updateLogistica(id, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    if (fields.length === 0) {
        throw new Error('No data provided for updateLogistica');
    }
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE logisticas SET ${setClause} WHERE id = ?`;
    await executeQuery(query, [...values, id]);
    return getLogisticaById(id);
}