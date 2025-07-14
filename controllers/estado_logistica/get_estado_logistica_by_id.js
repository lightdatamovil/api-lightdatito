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
        const rows = await executeQuery(
            'SELECT * FROM estados_logistica WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'EstadoLogistica no encontrado',
                message: `No existe un estado_logistica con id=${id}`,
                status: 404
            });
        }

        return EstadoLogistica.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener estado_logistica',
            message: err.message,
            stack: err.stack
        });
    }
}
