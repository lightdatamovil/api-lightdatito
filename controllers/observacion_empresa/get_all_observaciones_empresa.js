import { executeQuery } from '../../db.js';
import ObservacionEmpresa from '../../models/observacion_empresa.js';

export async function getAllObservacionesEmpresas() {
    const rows = await executeQuery('SELECT * FROM observaciones_logistica');
    return rows.map(r => ObservacionEmpresa.fromJson(r));
}