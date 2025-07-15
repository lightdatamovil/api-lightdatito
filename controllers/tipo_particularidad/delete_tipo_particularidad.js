import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


/**
 * Marca un tipo de particularidad como eliminado
 */
export async function deleteTipoParticularidad(id) {
    try {
        const rows = await executeQuery('SELECT * FROM tipo_particularidad WHERE id = ? AND eliminado = 0', [id], true);
        if (!rows || rows.length === 0) {
            throw new CustomException({
                title: 'Tipo de particularidad no encontrado',
                message: `No existe un tipo de particularidad con id "${id}"`,
                status: Status.conflict
            });
        }
        await executeQuery('UPDATE tipo_particularidad SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?', [id]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error eliminando tipo_particularidad',
            message: err.message,
            stack: err.stack
        });
    }
}
