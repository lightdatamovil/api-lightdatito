import { executeQuery } from '../../db.js';
import Empresa from '../../models/empresa.js';

/**
 * Create a new empresa (logistica) and return the full inserted record.
 * Uses RETURNING * to fetch the inserted row in one statement.
 * @param {Object} data - Fields and values for the new empresa.
 * @returns {Empresa} The created Empresa instance.
 */
export async function createEmpresa(data) {
    const fields = Object.keys(data);
    const values = Object.values(data);
    if (fields.length === 0) {
        throw new Error('No data provided for createEmpresa');
    }
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO logisticas (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, values);
    // rows[0] contains the inserted record
    return Empresa.fromJson(rows[0]);
}