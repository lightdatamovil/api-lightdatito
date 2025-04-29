import { executeQuery } from '../db.js';
import Reporte from '../models/Reporte.js';

export async function getReporteById(id) {
    const rows = await executeQuery(
        'SELECT * FROM reportes WHERE id = ? AND eliminado = 0',
        [id]
    );
    return rows.length ? Reporte.fromJson(rows[0]) : null;
}