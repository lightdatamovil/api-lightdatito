
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';


/**
 * Marca un menú como eliminado (soft delete)
 * @param {number} id
 */
export async function deleteMenu(id) {
    try {
        await executeQuery(
            'UPDATE menus SET eliminado = 1 WHERE id = ?',
            [id]
        );
    } catch (err) {
        throw new CustomException({
            title: 'Error eliminando menú',
            message: err.message,
            stack: err.stack
        });
    }
}
