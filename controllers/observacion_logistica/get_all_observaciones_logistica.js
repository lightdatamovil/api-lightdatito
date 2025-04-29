import { executeQuery } from '../../db.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function getAllObservacionesLogisticas() {
    const rows = await executeQuery('SELECT * FROM observaciones_logistica');
    return rows.map(r => ObservacionLogistica.fromJson(r));
}