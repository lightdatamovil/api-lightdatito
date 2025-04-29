import { executeQuery } from '../../db.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function deleteTipoReporte(id) {
    await executeQuery('DELETE FROM tipo_reporte WHERE id = ?', [id]);
    return { id };
}