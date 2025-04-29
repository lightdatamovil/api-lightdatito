import { executeQuery } from '../../db.js';
import EstadoLogistica from '../../models/estado_logistica.js';

/**
 * Create a new estado_logistica and return the inserted record.
 * @param {Object} data - Fields and values for the new estado.
 * @returns {EstadoLogistica} The created EstadoLogistica instance.
 */
export async function createEstadoLogistica(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createEstadoLogistica');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO estados_logistica (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return EstadoLogistica.fromJson(rows[0]);
}
