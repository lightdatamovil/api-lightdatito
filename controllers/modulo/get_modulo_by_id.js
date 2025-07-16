// controllers/modulo/get_modulo_by_id.js
import CustomException from '../../models/custom_exception.js';
import Modulo from '../../models/modulo.js';
import { executeQuery } from '../../db.js';
import { Status } from '../../models/status.js';
/**
 * Obtiene un módulo por su ID
 * @param {number} id
 * @returns {Promise<Modulo>}
 */
export async function getModuloById(id) {
    try {
        const [row] = await executeQuery(
            'SELECT * FROM modulos WHERE id = ? AND eliminado = 0 LIMIT 1',
            [id], true, 0
        );
        if (!row) {
            throw new CustomException({
                title: 'No encontrado',
                message: `No existe módulo con id ${id}`,
                status: Status.notFound
            });
        }
        return Modulo.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error obteniendo módulo',
            message: err.message,
            stack: err.stack
        });
    }
}
