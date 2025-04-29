import { executeQuery } from '../../db.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function updateObservacionLogistica(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updateObservacionLogistica');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(`UPDATE observaciones_logistica SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
    return getObservacionLogisticaById(id);
}