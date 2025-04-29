import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Logistica from '../../models/logistica.js';

/**
 * Create a new logistica (logistica) and return the full inserted record.
 * Uses RETURNING * to fetch the inserted row in one statement.
 * @param {Object} data - Fields and values for the new logistica.
 * @returns {Logistica} The created Logistica instance.
 */
export async function createLogistica(data) {
    try {
        const fields = Object.keys(data);
        const values = Object.values(data);
        if (fields.length === 0) {
            throw new CustomException('No data provided for createLogistica');
        }
        const placeholders = fields.map(() => '?').join(', ');
        const query = `INSERT INTO logisticas (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const rows = await executeQuery(query, values);
        // rows[0] contains the inserted record
        return Logistica.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating logistica',
            error.message,
            error.stack
        );
    }
}