import { executeQuery } from '../../db.js';
import Usuario from '../../models/usuario.js';

/**
 * Soft-delete a usuario by ID.
 * @param {number|string} id
 * @returns {{id: number|string}}
 */
export async function deleteUsuario(id) {
    await executeQuery(
        'UPDATE usuarios SET eliminado = 1 WHERE id = ?',
        [id]
    );
    return { id };
}