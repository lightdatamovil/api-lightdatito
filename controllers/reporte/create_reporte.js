import { executeQuery } from '../db.js';
import Reporte from '../models/Reporte.js';

export async function createReporte(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createReporte');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO reportes (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return Reporte.fromJson(rows[0]);
}