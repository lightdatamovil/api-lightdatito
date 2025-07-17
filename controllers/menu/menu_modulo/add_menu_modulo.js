import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';


// ! MENU MODULO NO EXISTE LA TABLA 
export async function addMenuModulo(menuId, nombre) {
    // 1) Verificar que el menú exista
    const [menu] = await executeQuery(
        `SELECT id FROM menu WHERE id = ? AND eliminado = 0`,
        [menuId]
    );
    if (!menu) {
        throw new CustomException({
            title: 'Menú no encontrado',
            message: `No existe un menú con id=${menuId}`,
            status: 404
        });
    }

    // 2) Insertar nuevo módulo bajo ese menú
    const result = await executeQuery(
        `INSERT INTO modulos (nombre, menu_id) VALUES (?, ?)`,
        [nombre, menuId]
    );

    return {
        id: result.insertId,
        nombre,
        menu_id: menuId
    };
}