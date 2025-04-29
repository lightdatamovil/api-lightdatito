import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function updateTipoUsuario(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateTipoUsuario');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE tipo_usuario SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return getTipoUsuarioById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating tipo_usuario',
            error.message,
            error.stack
        );
    }
}