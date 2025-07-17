import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function updateTipoticket(req) {
    const id = req.params.id;
    const { nombre, color } = req.body;

    const query = 'UPDATE tipo_ticket SET nombre = ?, color = ? WHERE id = ? AND eliminado = 0 LIMIT 1';
    const result = await executeQuery(query, [nombre, color, id]);

    if (!result.affectedRows) {
        throw new CustomException({
            title: 'Tipo ticket no encontrado',
            message: `No existe un tipo_ticket con id: ${id} o ya fue eliminado`,
            status: Status.notFound
        });
    }

}