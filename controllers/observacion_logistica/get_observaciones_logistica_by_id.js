import { executeQuery } from '../../db.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function getObservacionLogisticaById(id) {
    const rows = await executeQuery('SELECT * FROM observaciones_logistica WHERE id = ?', [id]);
    return rows.length ? ObservacionLogistica.fromJson(rows[0]) : null;
}