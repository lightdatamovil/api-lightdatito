import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import TipoUsuario from '../../models/tipo_usuario.js';

export async function createTipoUsuario(data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for createTipoUsuario');
        const placeholders = fields.map(() => '?').join(', ');
        const query = `INSERT INTO tipo_usuario (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const rows = await executeQuery(query, Object.values(data));
        return TipoUsuario.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating tipo_usuario',
            error.message,
            error.stack
        );
    }
}