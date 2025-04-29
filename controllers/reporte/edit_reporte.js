import { executeQuery } from '../../db.js';
import Reporte from '../../models/Reporte.js';

export async function updateReporte(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updateReporte');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(
        `UPDATE reportes SET ${setClause} WHERE id = ?`,
        [...Object.values(data), id]
    );
    return getReporteById(id);
}