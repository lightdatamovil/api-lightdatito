import { executeQuery } from '../../db.js';
import ObservacionEmpresa from '../../models/observacion_empresa.js';

export async function deleteObservacionEmpresa(id) {
    await executeQuery('DELETE FROM observaciones_logistica WHERE id = ?', [id]);
    return { id };
}