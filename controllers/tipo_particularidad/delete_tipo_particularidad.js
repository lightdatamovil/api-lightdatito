import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


/**
 * Marca un tipo de particularidad como eliminado
 */
export async function deleteTipoParticularidad(req) {

    const id = req.params.id;
    const rows = await executeQuery('UPDATE tipo_particularidad SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?', [id]);

    if (rows.affectedRows === 0) {
        throw new CustomException({
            title: 'Tipo de particularidad no encontrado',
            message: `No existe un tipo de particularidad con id: "${id}" o ya fue eliminado`,
            status: Status.notFound
        });
    }
}
