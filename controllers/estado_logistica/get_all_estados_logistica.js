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
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al listar estados_logistica',
            message: error.message,
            stack: error.stack
        });
    }
}