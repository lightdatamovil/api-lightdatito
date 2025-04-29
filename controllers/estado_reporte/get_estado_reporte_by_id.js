import { executeQuery } from '../../db.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function getEstadoReporteById(id) {
    const rows = await executeQuery('SELECT * FROM estados_reporte WHERE id = ?', [id]);
    return rows.length ? EstadoReporte.fromJson(rows[0]) : null;
}