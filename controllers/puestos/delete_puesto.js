import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function deletePuesto(req) {
    const id = req.params.id;
    const result = await executeQuery(`UPDATE puestos SET eliminado  = 1, fecha_eliminado = NOW() WHERE id = ? AND eliminado = 0`, [id],
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Puesto no encontrado',
            message: `No existe un puesto con id: ${id} o ya fue eliminado`,
            status: Status.notFound
        });
    }

    return id;
}
