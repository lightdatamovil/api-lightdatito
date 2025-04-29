import { executeQuery } from '../../db.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function getAllTipoUsuario() {
    const rows = await executeQuery('SELECT * FROM tipo_usuario');
    return rows.map(r => TipoUsuario.fromJson(r));
}