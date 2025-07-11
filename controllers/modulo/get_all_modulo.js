// controllers/modulo/get_all_modulo.js
import CustomException from '../../models/custom_exception.js';
import Modulo from '../../models/modulo.js';
import { executeQuery } from '../../db.js';
/**
 * Obtiene todos los módulos activos
 * @returns {Promise<Modulo[]>}
 */
export async function getAllModulo() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM modulos WHERE eliminado = 0',
            [], true, 0
        );
        return rows.map(r => Modulo.fromJson(r));
    } catch (err) {
        throw new CustomException({
            title: 'Error listando módulos',
            message: err.message,
            stack: err.stack
        });
    }
}
