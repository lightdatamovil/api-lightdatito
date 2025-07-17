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
export async function getModuloById(req) {

    const id = req.params.id;
    const [row] = await executeQuery(
        'SELECT * FROM modulos WHERE id = ? AND eliminado = 0 LIMIT 1',
        [id]
    );
    if (!row) {
        throw new CustomException({
            title: 'No encontrado',
            message: `No existe módulo con id ${id}`,
            status: Status.notFound
        });
    }
    return Modulo.fromJson(row);

}
