// controllers/menu/edit_menu.js
import CustomException from '../../models/custom_exception.js';
import { getMenuById } from './get_menu_by_id.js';
import { executeQuery } from '../../db.js';

/**
 * Actualiza un menú existente
 * @param {number} id
 * @param {Object} data - { nombre?: string }
 * @returns {Promise<Menu>}
 */
export async function editMenu(id, data) {
    const fields = Object.keys(data);
    if (!fields.length) {
        throw new CustomException({
            title: 'Sin datos',
            message: 'No se proporcionaron campos para actualizar'
        });
    }
    const setClause = fields.map(f => `${f} = ?`).join(', ');
    const values = fields.map(f => data[f]);
    try {
        await executeQuery(
            `UPDATE menus SET ${setClause} WHERE id = ?`,
            [...values, id]
        );
        return await getMenuById(id);
    } catch (err) {
        throw new CustomException({
            title: 'Error actualizando menú',
            message: err.message,
            stack: err.stack
        });
    }
}
