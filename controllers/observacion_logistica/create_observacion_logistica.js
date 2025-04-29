import { executeQuery } from '../../db.js';
import ObservacionLogistica from '../../models/observacion_logistica.js';

export async function createObservacionLogistica(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createObservacionLogistica');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO observaciones_logistica (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return ObservacionLogistica.fromJson(rows[0]);
}