// controllers/menu/get_menu_by_id.js
import CustomException from '../../models/custom_exception.js';
import Menu from '../../models/menu.js';
import { executeQuery } from '../../db.js';

/**
 * Obtiene un menú por ID
 * @param {number} id
 * @returns {Promise<Menu>}
 */
export async function getMenuById(id) {
    try {
        const [row] = await executeQuery(
            'SELECT * FROM menu WHERE id = ? AND eliminado = 0',
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'No encontrado',
                message: `No existe menú con id ${id}`,
                status: 404
            });
        }
        return Menu.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error obteniendo menú',
            message: err.message,
            stack: err.stack
        });
    }
}