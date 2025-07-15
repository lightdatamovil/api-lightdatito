// controllers/modulo/create_modulo.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Modulo from '../../models/modulo.js';
import { Status } from '../../models/status.js';

/**
 * Crea un nuevo módulo y devuelve el objeto Modulo instanciado.
 * @param {string} nombre
 * @param {number} menu_id
 * @returns {Promise<Modulo>}
 */
export async function createModulo(nombre, menu_id) {


    // Verificar existencia del menú padre
    // Verificar si ya existe un módulo con el mismo nombre y menu_id
    const existing = await executeQuery(
        'SELECT COUNT(*) as count FROM modulos WHERE nombre = ? AND menu_id = ? AND eliminado = 0',
        [nombre.trim(), menu_id], true, 0
    );
    if (existing && existing[0] && existing[0].count > 0) {
        throw new CustomException({
            title: 'Módulo ya existe',
            message: `Ya existe un módulo con el nombre "${nombre}" en el menú con id: ${menu_id}`,
            status: Status.conflict
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
            status: Status.internalServerError
        });
    }

    // Recuperar y devolver el registro como Modelo
    const [row] = await executeQuery(
        'SELECT * FROM modulos WHERE id = ? AND eliminado = 0',
        [newId], true, 0
    );
    return Modulo.fromJson(row);
}

