import { executeQuery } from '../../db.js';
import Empresa from '../../models/empresa.js';

/**
 * Update an existing empresa by ID.
 * @param {number|string} id - The ID of the empresa to update.
 * @param {Object} data - Fields and values to update.
 * @returns {Empresa|null} The updated Empresa instance, or null if not found.
 */
export async function updateEmpresa(id, data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    if (fields.length === 0) {
        throw new Error('No data provided for updateEmpresa');
    }
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE logisticas SET ${setClause} WHERE id = ?`;
    await executeQuery(query, [...values, id]);
    return getEmpresaById(id);
}