import { executeQuery } from '../../db.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function getAllTipoReporte() {
    const rows = await executeQuery('SELECT * FROM tipo_reporte');
    return rows.map(r => TipoReporte.fromJson(r));
}