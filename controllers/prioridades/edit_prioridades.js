import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function updatePrioridades(req) {
    const id = req.params.id;
    const { nombre, color } = req.body;

    const query = 'UPDATE prioridades SET nombre = ?, color = ? WHERE id = ? AND eliminado = 0 LIMIT 1';
    const result = await executeQuery(query, [nombre, color, id]);

    if (!result.affectedRows) {
        throw new CustomException({
            title: 'Tipo ticket no encontrado',
            message: `No existe un prioridades con id: ${id} o ya fue eliminado`,
            status: Status.notFound
        });
    }

}
