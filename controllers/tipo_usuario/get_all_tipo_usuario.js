import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function getAllTipoUsuario() {
    try {
        const rows = await executeQuery('SELECT * FROM tipo_usuario');
        return rows.map(r => TipoUsuario.fromJson(r));
    } catch (error) {
        throw new CustomException(
            'Error creating tipo_usuario',
            error.message,
            error.stack
        );
    }
}