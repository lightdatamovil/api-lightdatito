import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function deleteEstadoticket(req) {
    const { id } = req.params;
    // 1) Intento directo de soft-delete y compruebo cuántas filas afectó
    const result = await executeQuery(`UPDATE estados_ticket SET eliminado = 1, fecha_eliminado = NOW()  WHERE id = ? AND eliminado = 0`, [id]);

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Estado ticket no encontrado',
            message: `No existe un estado_ticket activo con id: ${id}`,
            status: Status.notFound
        });
    }
    // 3) Devuelvo sólo el id para confirmar el soft-delete
    return id;


}