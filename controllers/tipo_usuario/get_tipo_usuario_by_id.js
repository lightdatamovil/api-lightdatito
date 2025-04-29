import { executeQuery } from '../../db.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function getTipoUsuarioById(id) {
    const rows = await executeQuery('SELECT * FROM tipo_usuario WHERE id = ?', [id]);
    return rows.length ? TipoUsuario.fromJson(rows[0]) : null;
}