import { executeQuery } from '../../db.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function createTipoUsuario(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createTipoUsuario');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO tipo_usuario (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return TipoUsuario.fromJson(rows[0]);
}