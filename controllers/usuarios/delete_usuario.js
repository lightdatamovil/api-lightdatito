import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

/**
 * Soft-delete a usuario by ID.
 * @param {number|string} id
 * @returns {{id: number|string}}
 */
export async function deleteUsuario(id) {
    try {
        await executeQuery(
            'UPDATE usuarios SET eliminado = 1 WHERE id = ?',
            [id]
        );
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error deleting usuario',
            error.message,
            error.stack
        );
    }
}