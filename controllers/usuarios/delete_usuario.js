import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

/**
 * Soft-delete a usuario by ID.
 * @param {number|string} id
 * @returns {{id: number|string}}
 */
export async function deleteUsuario(req) {
    const id = req.params.id;
    const result = await executeQuery('UPDATE usuarios SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?', [id]
    );
    if (result.affectedRows === 0) {
        throw new CustomException({
            title: 'Usuario no encontrado',
            message: `No existe un usuario con id: ${id}`,
            status: Status.notFound
        });
    }

} 