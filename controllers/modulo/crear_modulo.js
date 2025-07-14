// controllers/modulo/create_modulo.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Modulo from '../../models/modulo.js';

/**
 * Crea un nuevo módulo y devuelve el objeto Modulo instanciado.
 * @param {string} nombre
 * @param {number} menu_id
 * @returns {Promise<Modulo>}
 */
export async function createModulo(nombre, menu_id) {
    if (!nombre || typeof nombre !== 'string') {
        throw new CustomException({
            title: 'Datos inválidos',
            message: 'El campo "nombre" es obligatorio y debe ser texto',
            status: 400
        });
    }
    if (typeof menu_id !== 'number') {
        throw new CustomException({
            title: 'Datos inválidos',
            message: 'El campo "menu_id" es obligatorio y debe ser numérico',
            status: 400
        });
    }

    // Verificar existencia del menú padre
    const [menu] = await executeQuery(
        'SELECT id FROM menus WHERE id = ?',
        [menu_id], true, 0
    );
    if (!menu) {
        throw new CustomException({
            title: 'Menu inválido',
            message: `No existe un menú con id ${menu_id}`,
            status: 400
        });
    }

    // Insertar nuevo módulo
    const result = await executeQuery(
        'INSERT INTO modulos (nombre, menu_id) VALUES (?, ?)',
        [nombre.trim(), menu_id],
        true
    );

    // Obtener ID insertado
    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error creando módulo',
            message: 'No se obtuvo el ID del módulo insertado',
            status: 500
        });
    }

    // Recuperar y devolver el registro como Modelo
    const [row] = await executeQuery(
        'SELECT * FROM modulo WHERE id = ? AND eliminado = 0',
        [newId], true, 0
    );
    return Modulo.fromJson(row);
}

