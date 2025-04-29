import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Logistica from '../../models/logistica.js';

/**
 * Retrieve a single logistica by ID.
 * @param {number|string} id - The ID of the logistica to fetch.
 * @returns {Logistica|null} The Logistica instance, or null if not found.
 */
export async function getLogisticaById(id) {
    try {
        const query = 'SELECT * FROM logisticas WHERE id = ? AND eliminado = 0';
        const rows = await executeQuery(query, [id]);
        if (!rows.length) return null;
        return Logistica.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error retrieving logistica',
            error.message,
            error.stack
        );
    }
}