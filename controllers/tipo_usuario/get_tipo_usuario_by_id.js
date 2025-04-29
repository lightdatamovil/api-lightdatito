import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function getTipoUsuarioById(id) {
    try {
        const rows = await executeQuery('SELECT * FROM tipo_usuario WHERE id = ?', [id]);
        return rows.length ? TipoUsuario.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error creating tipo_usuario',
            error.message,
            error.stack
        );
    }
}