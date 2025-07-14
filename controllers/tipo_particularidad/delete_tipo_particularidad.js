import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';


/**
 * Marca un tipo de particularidad como eliminado
 */
export async function deleteTipoParticularidad(id) {
    try {
        await executeQuery(
            'UPDATE tipo_particularidad SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?',
            [id]
        );
    } catch (err) {
        throw new CustomException({
            title: 'Error eliminando tipo_particularidad',
            message: err.message,
            stack: err.stack
        });
    }
}
