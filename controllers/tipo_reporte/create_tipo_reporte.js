import { executeQuery } from '../../db.js';
import TipoReporte from '../../models/tipo_reporte.js';

export async function createTipoReporte(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createTipoReporte');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO tipo_reporte (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return TipoReporte.fromJson(rows[0]);
}
