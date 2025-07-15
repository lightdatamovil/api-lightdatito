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
        const row = await executeQuery('SELECT id FROM menus WHERE id = ? AND eliminado = 0', [id]);
        if (!row.length) {
            throw new CustomException({
                title: 'Menú no encontrado',
                message: `No existe un menú con id: "${id}"`,
                status: Status.conflict
            });
        }
        const fields = Object.keys(data);
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE menus SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return await getMenuById(id);
    } catch (err) {
        throw new CustomException({
            title: 'Error actualizando menú',
            message: err.message,
            stack: err.stack
        });
    }
}
