import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';

/**
 * Retrieve all estados_logisticas.
 * @returns {Array<EstadoLogistica>} List of EstadoLogistica instances.
 */
export async function getAllEstadosLogisticas() {
    try {
        const rows = await executeQuery('SELECT * FROM estados_logistica');
        return rows.map(r => EstadoLogistica.fromJson(r));
    } catch (error) {
        throw new CustomException(
            'Error retrieving estados_logistica',
            error.message,
            error.stack
        );
    }
}