import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function createTipoUsuario(nombre) {
    try {
        const query = `INSERT INTO tipo_usuario (nombre) VALUES (?) RETURNING *`;
        const rows = await executeQuery(query, [nombre]);
        return TipoUsuario.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating tipo_usuario',
            error.message,
            error.stack
        );
    }
}