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
export async function createModulo(body) {
    const { nombre, menu_id } = body;
    const nombreLimpio = nombre.trim();

    try {
        // 1) Verificar duplicado
        const existing = await executeQuery(
            'SELECT 1 FROM modulos WHERE LOWER(nombre)=? AND menu_id=? AND eliminado=0 LIMIT 1',
            [nombreLimpio.toLowerCase(), menu_id],
            true
        );
        if (existing && existing.length > 0) {
            throw new CustomException({
                title: 'Módulo duplicado',
                message: `Ya existe un módulo llamado "${nombreLimpio}" en el menú ${menu_id}`,
                status: Status.badRequest
            });
        }

        // 2) Insertar y obtener insertId
        const result = await executeQuery(
            'INSERT INTO modulos (nombre, menu_id) VALUES (?, ?)',
            [nombreLimpio, menu_id],
            true
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
        return { newId }
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear módulo',
            message: err.message,
            stack: err.stack,
            status: Status.internalServerError
        });
    }
}