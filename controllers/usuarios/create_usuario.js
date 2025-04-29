import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Usuario from '../../models/usuario.js';

/**
 * Create a new usuario and return the full inserted record.
 * @param {Object} data - nombre, url_imagen, tipo_usuario_id, email, etc.
 * @returns {Usuario}
 */
export async function createUsuario(data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for createUsuario');
        const placeholders = fields.map(() => '?').join(', ');
        const query = `INSERT INTO usuarios (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
        const rows = await executeQuery(query, Object.values(data));
        return Usuario.fromJson(rows[0]);
    } catch (error) {
        throw new CustomException(
            'Error creating usuario',
            error.message,
            error.stack
        );
    }
}