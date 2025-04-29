import { executeQuery } from '../../db.js';
import Usuario from '../../models/usuario.js';

/**
 * Retrieve a usuario by ID.
 * @param {number|string} id
 * @returns {Usuario|null}
 */
export async function getUsuarioById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM usuarios WHERE id = ? AND eliminado = 0',
            [id]
        );
        return rows.length ? Usuario.fromJson(rows[0]) : null;
    } catch (error) {
        throw new CustomException(
            'Error retrieving usuario',
            error.message,
            error.stack
        );
    }
}
