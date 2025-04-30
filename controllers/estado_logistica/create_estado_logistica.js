import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';

/**
 * Create a new estado_logistica and return the inserted record.
 * @param {Object} data - Fields and values for the new estado.
 * @returns {EstadoLogistica} The created EstadoLogistica instance.
 */
export async function createEstadoLogistica(nombre, color) {
    try {
        const query = `INSERT INTO estados_logistica (nombre, color) VALUES (?, ?) RETURNING *`;
        const rows = await executeQuery(query, [nombre, color]);
        return EstadoLogistica.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}
