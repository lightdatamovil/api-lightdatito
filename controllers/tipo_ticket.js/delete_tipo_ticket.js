import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function deleteTipoticket(id) {
    const result = await executeQuery(`UPDATE tipo_ticket SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ? AND eliminado = 0`, [id],
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Tipo ticket no encontrado',
            message: `No existe un tipo_ticket con id: ${id} o ya fue eliminado`,
            status: Status.notFound
        });
    }

}
