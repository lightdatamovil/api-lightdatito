import { executeQuery } from '../../db.js';
import EstadoEmpresa from '../../models/estado_empresa.js';

/**
 * Create a new estado_empresa and return the inserted record.
 * @param {Object} data - Fields and values for the new estado.
 * @returns {EstadoEmpresa} The created EstadoEmpresa instance.
 */
export async function createEstadoEmpresa(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createEstadoEmpresa');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO estados_logistica (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return EstadoEmpresa.fromJson(rows[0]);
}
