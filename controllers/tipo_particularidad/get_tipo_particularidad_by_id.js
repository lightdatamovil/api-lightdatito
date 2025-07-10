import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';


/**
 * Obtiene un tipo de particularidad por su ID
 */
export async function getTipoParticularidadById(id) {
    try {
        const [row] = await executeQuery(
            'SELECT * FROM tipo_particularidad WHERE id = ? AND eliminado = 0',
            [id], true, 0
        );
        if (!row) {
            throw new CustomException({
                title: 'No encontrado',
                message: `No existe tipo_particularidad con id ${id}`,
                status: 404
            });
        }
        return row;
    } catch (err) {
        throw new CustomException({
            title: 'Error obteniendo tipo_particularidad',
            message: err.message,
            stack: err.stack
        });
    }
}
