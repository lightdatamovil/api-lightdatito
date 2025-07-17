// controllers/menu/edit_menu.js
import CustomException from '../../models/custom_exception.js';
import { executeQuery } from '../../db.js';
import { Status } from '../../models/status.js';

/**
 * Actualiza un menú existente
 * @param {number} id
 * @param {Object} data - { nombre?: string }
 * @returns {Promise<Menu>}
 */


//REVISAR ACA
export async function editMenu(params, body) {
    const id = params;
    const nombre = body;
    try {
        const query = `UPDATE menus SET nombre = ? WHERE id = ? AND eliminado = 0`;
        const result = await executeQuery(query, [nombre, id]);

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Menú no encontrado',
                message: `No existe un menú activo con id: ${id}`,
                status: Status.notFound
            });
        }

        return await { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error actualizando menú',
            message: err.message,
            stack: err.stack
        });
    }
}
