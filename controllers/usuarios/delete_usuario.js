import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

/**
 * Soft-delete a usuario by ID.
 * @param {number|string} id
 * @returns {{id: number|string}}
 */
export async function deleteUsuario(id) {

    const [user] = await executeQuery('SELECT id FROM usuarios WHERE eliminado = 0 and id = ?', [id], true,
    );
    if (!user) {
        throw new CustomException({
            title: 'Usuario inválido',
            message: `No existe un usuario con id ${id}`,
            status: Status.badRequest
        });
    }
    await executeQuery(
        'UPDATE usuarios SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?',
        [id]
    );
    return id;
}