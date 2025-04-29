import { executeQuery } from '../../db.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function deleteObservacionLogistica(id) {
    await executeQuery('DELETE FROM observaciones_logistica WHERE id = ?', [id]);
    return { id };
}