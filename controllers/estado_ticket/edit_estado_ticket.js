import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function updateEstadoticket(req) {

    const id = req.params.id;
    const { nombre, color } = req.body;

    // 1) Ejecutar UPDATE y comprobar si se afectó alguna fila
    const result = await executeQuery(`UPDATE estados_ticket  SET nombre = ?, color  = ? WHERE id = ? AND eliminado = 0`, [nombre, color, id],
    );

    // 2) Si no hay filas afectadas, el registro no existe o está eliminado
    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Estado de ticket no encontrado',
            message: `No existe un estado_ticket activo con id: ${id}`,
            status: Status.notFound
        });
    }

}