import { executeQuery } from '../../db.js';
import ObservacionEmpresa from '../../models/observacion_empresa.js';

export async function getObservacionEmpresaById(id) {
    const rows = await executeQuery('SELECT * FROM observaciones_logistica WHERE id = ?', [id]);
    return rows.length ? ObservacionEmpresa.fromJson(rows[0]) : null;
}