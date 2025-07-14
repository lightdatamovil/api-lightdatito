import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';

export async function getModulosByMenu(menuId) {
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

    // 2) Traer todos los módulos de ese menú
    return await executeQuery(
        `SELECT id, nombre, fecha_creacion
       FROM modulos
      WHERE menu_id = ? AND eliminado = 0`,
        [menuId]
    );
}
