// controllers/modulo/get_all_modulo.js
import CustomException from '../../models/custom_exception.js';
import Modulo from '../../models/modulo.js';
import { executeQuery } from '../../db.js';
import { Status } from '../../models/status.js';
/**
 * Obtiene todos los módulos activos
 * @returns {Promise<Modulo[]>}
 */
export async function getAllModulos() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM modulos WHERE eliminado = 0',
            [], true
        );
        if (!rows || rows.length === 0) {
            throw new CustomException({
                title: 'No se encontraron módulos',
                message: 'No hay módulos activos',
                status: Status.noContent
            });
        }
        return rows.map(r => Modulo.fromJson(r));
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error listando módulos',
            message: error.message,
            stack: error.stack
        });
    }
}