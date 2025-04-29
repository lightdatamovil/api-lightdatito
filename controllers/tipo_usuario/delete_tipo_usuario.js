import { executeQuery } from '../../db.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function deleteTipoUsuario(id) {
    await executeQuery('DELETE FROM tipo_usuario WHERE id = ?', [id]);
    return { id };
}