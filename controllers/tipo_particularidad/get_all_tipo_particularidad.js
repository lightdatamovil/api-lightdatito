
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';



// controllers/tipo_particularidad/get_all_tipo_particularidad.js
/**
 * Obtiene todos los tipos de particularidad activos
 */
export async function getAllTipoParticularidad() {
    try {
        const rows = await executeQuery(
            'SELECT * FROM tipo_particularidad WHERE eliminado = 0',
            [], true, 0
        );
        return rows;
    } catch (err) {
        throw new CustomException({
            title: 'Error listando tipo_particularidad',
            message: err.message,
            stack: err.stack
        });
    }
}
