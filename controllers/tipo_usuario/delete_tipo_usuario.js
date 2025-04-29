import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function deleteTipoUsuario(id) {
    try {
        await executeQuery('DELETE FROM tipo_usuario WHERE id = ?', [id]);
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error creating tipo_usuario',
            error.message,
            error.stack
        );
    }
}