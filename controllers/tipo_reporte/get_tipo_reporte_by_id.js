import { executeQuery } from '../../db.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function getTipoReporteById(id) {
    const rows = await executeQuery('SELECT * FROM tipo_reporte WHERE id = ?', [id]);
    return rows.length ? TipoReporte.fromJson(rows[0]) : null;
}
