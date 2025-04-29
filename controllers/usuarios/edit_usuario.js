import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Usuario from '../../models/usuario.js';

/**
 * Update an existing usuario by ID.
 * @param {number|string} id
 * @param {Object} data - fields to update
 * @returns {Usuario|null}
 */
export async function updateUsuario(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateUsuario');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(
            `UPDATE usuarios SET ${setClause} WHERE id = ?`,
            [...Object.values(data), id]
        );
        return getUsuarioById(id);
    } catch (error) {
        throw new CustomException(
            'Error updating usuario',
            error.message,
            error.stack
        );
    }
}