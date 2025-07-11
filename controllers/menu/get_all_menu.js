// controllers/menu/get_all_menu.js
import CustomException from '../../models/custom_exception.js';
import Menu from '../../models/menu.js';
import { executeQuery } from '../../db.js';

/**
 * Obtiene todos los menús activos
 * @returns {Promise<Menu[]>}
 */
export async function getAllMenu() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM menus WHERE eliminado = 0',
            []
        );
        return rows.map(r => Menu.fromJson(r));
    } catch (err) {
        throw new CustomException({
            title: 'Error listando menús',
            message: err.message,
            stack: err.stack
        });
    }
}