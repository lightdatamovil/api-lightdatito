import { executeQuery } from '../../db.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function updateTipoUsuario(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for updateTipoUsuario');
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    await executeQuery(`UPDATE tipo_usuario SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
    return getTipoUsuarioById(id);
}