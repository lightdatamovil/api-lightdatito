
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


/**
 * Marca un menú como eliminado (soft delete)
 * @param {number} id
 */
export async function deleteMenu(id) {
    try {

        const row = await executeQuery(
            'SELECT * FROM menus WHERE id = ? AND eliminado = 0',
            [id], true
        );
        if (!row || row.length === 0) {
            throw new CustomException({
                title: 'Menú no encontrado',
                message: `No existe un menú con ID: ${id}`,
                status: Status.notFound
            });
        }
        await executeQuery('UPDATE menus SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?',
            [id], true
        );

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error eliminando menú',
            message: err.message,
            stack: err.stack
        });
    }
}
