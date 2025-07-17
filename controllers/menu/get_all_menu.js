// controllers/menu/get_all_menu.js
import CustomException from '../../models/custom_exception.js';
import Menu from '../../models/menu.js';
import { executeQuery } from '../../db.js';
import { Status } from '../../models/status.js';

/**
 * Obtiene todos los menús activos
 * @returns {Promise<Menu[]>}
 */
export async function getAllMenu() {

    const rows = await executeQuery(
        'SELECT * FROM menus WHERE eliminado = 0',
    );

    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'No se encontraron menús',
            message: 'No hay menús activos',
            status: Status.noContent
        });
    }
    return rows.map(r => Menu.fromJson(r));
}