import { executeQuery } from '../../db.js';
import EstadoLogistica from '../../models/estado_logistica.js';

/**
 * Retrieve all estados_logisticas.
 * @returns {Array<EstadoLogistica>} List of EstadoLogistica instances.
 */
export async function getAllEstadosLogisticas() {
    const rows = await executeQuery('SELECT * FROM estados_logistica');
    return rows.map(r => EstadoLogistica.fromJson(r));
}