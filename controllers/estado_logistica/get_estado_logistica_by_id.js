import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';

/**
 * Retrieve a single estado_logistica by ID.
 * @param {number|string} id - The ID of the estado to fetch.
 * @returns {EstadoLogistica|null} The EstadoLogistica instance, or null if not found.
 */
export async function getEstadoLogisticaById(id) {
    try {
        const rows = await executeQuery('SELECT * FROM estados_logistica WHERE id = ?', [id]);
        return rows.length ? EstadoLogistica.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error retrieving estado_logistica',
            error.message,
            error.stack
        );
    }
}