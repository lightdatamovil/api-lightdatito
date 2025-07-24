import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';
import { Status } from '../../models/status.js';

/**
 * Retrieve a single estado_logistica by ID.
 * @param {number|string} id - The ID of the estado to fetch.
 * @returns {EstadoLogistica|null} The EstadoLogistica instance, or null if not found.
 */

export async function getEstadoLogisticaById(req) {
    const id = req.params.id;
    const rows = await executeQuery(
        'SELECT * FROM estados_logistica WHERE id = ? AND ELIMINADO = 0 LIMIT 1',
        [id]
    );

    if (rows.length === 0) {
        throw new CustomException({
            title: 'EstadoLogistica no encontrado',
            message: `No existe un estado_logistica con id=${id}`,
            status: Status.notFound
        });
    }

    return EstadoLogistica.fromJson(rows[0]);

}
