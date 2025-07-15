// controllers/menu/create_menu.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Menu from '../../models/menu.js';
import { Status } from '../../models/status.js';

/**
 * Crea un nuevo menú y devuelve el objeto Menu.
 * @param {string} nombre - Nombre del menú
 * @returns {Promise<Menu>} Menú creado
 */
export async function createMenu(nombre) {
    try {
        // Verificar duplicado
        const [{ count }] = await executeQuery(
            'SELECT COUNT(*) AS count FROM menus WHERE LOWER(nombre) = ? AND eliminado = 0',
            [nombre],
            true,
            0
        );
        if (count > 0) {
            throw new CustomException({
                title: 'Menú duplicado',
                message: `Ya existe un menú con nombre "${nombre}"`,
                status: Status.conflict
            });
        }

        // Insertar nuevo menú
        const result = await executeQuery(
            'INSERT INTO menus (nombre) VALUES (?)',
            [nombre]
        );
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear menú',
                message: 'No se obtuvo el ID del menú insertado',
                status: Status.internalServerError
            });
        }

        // Recuperar registro recién creado
        const [row] = await executeQuery(
            'SELECT * FROM menus WHERE id = ? AND eliminado = 0',
            [newId]
        );
        return Menu.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear menú',
            message: err.message,
            stack: err.stack
        });
    }
}
