// controllers/menu/edit_menu.js
import CustomException from '../../models/custom_exception.js';
import { getMenuById } from './get_menu_by_id.js';
import { executeQuery } from '../../db.js';
import { Status } from '../../models/status.js';

/**
 * Actualiza un menú existente
 * @param {number} id
 * @param {Object} data - { nombre?: string }
 * @returns {Promise<Menu>}
 */


//REVISAR ACA
export async function editMenu(id, data) {
    try {
        const fields = Object.keys(data);
        const values = fields.map(f => data[f]);
        const setClause = fields.map(f => `${f} = ?`).join(', ');

        const result = await executeQuery(
            `UPDATE menus
          SET ${setClause}
        WHERE id = ?
          AND eliminado = 0`,
            [...values, id],
            true
        );

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Menú no encontrado',
                message: `No existe un menú activo con id=${id}`,
                status: Status.notFound
            });
        }

        return await getMenuById(id);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error actualizando menú',
            message: err.message,
            stack: err.stack
        });
    }
}
