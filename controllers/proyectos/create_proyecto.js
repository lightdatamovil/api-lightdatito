import { executeQuery } from '../../db.js';
import Proyecto from '../../models/proyecto.js';

export async function createProyecto(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createProyecto');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO proyectos (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return Proyecto.fromJson(rows[0]);
}