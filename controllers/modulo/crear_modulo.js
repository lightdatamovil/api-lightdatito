// controllers/modulo/create_modulo.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

/**
 * Crea un nuevo módulo y devuelve el objeto Modulo instanciado.
 * @param {string} nombre
 * @param {number} menu_id
 * @returns {Promise<Modulo>}
 */
export async function createModulo(req) {
    const { nombre, menu_id } = req.body;
    const nombreLimpio = nombre.trim();

    const rew = await executeQuery('SELECT id FROM menus WHERE id = ? AND eliminado = 0', [menu_id]);
    if (rew.length === 0) {
        throw new CustomException({
            title: 'Menú no encontrado',
            message: `No existe un menú con id: ${menu_id}`,
            status: Status.notFound
        });
    }

    const existing = await executeQuery(
        'SELECT 1 FROM modulos WHERE LOWER(nombre)=? AND eliminado=0 LIMIT 1',
        [nombreLimpio.toLowerCase()],
    );
    if (existing && existing.length > 0) {
        throw new CustomException({
            title: 'Módulo duplicado',
            message: `Ya existe un módulo llamado "${nombreLimpio}" en el menú ${menu_id}`,
            status: Status.conflict
        });
    }

    // 2) Insertar y obtener insertId
    const result = await executeQuery(
        'INSERT INTO modulos (nombre, menu_id) VALUES (?, ?)',
        [nombreLimpio, menu_id]
    );
    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error creando módulo',
            message: 'No se obtuvo el ID del módulo insertado',
            status: Status.internalServerError
        });
    }

    // 3) Devolver objeto directamente sin SELECT extra
    return newId;

}