import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function deletePrioridades(req) {
    const id = req.params.id;
    const result = await executeQuery(`UPDATE prioridades SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ? AND eliminado = 0`, [id],
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Tipo ticket no encontrado',
            message: `No existe un prioridades con id: ${id} o ya fue eliminado`,
            status: Status.notFound
        });
    }

}
