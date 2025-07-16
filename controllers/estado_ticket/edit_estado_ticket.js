import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Estadoticket from '../../models/estado_reporte.js';
import { Status } from '../../models/status.js';

export async function updateEstadoticket(id, nombre, color) {
    try {
        // 1) Ejecutar UPDATE y comprobar si se afectó alguna fila
        const result = await executeQuery(
            `UPDATE estados_ticket
          SET nombre = ?,
              color  = ?
        WHERE id = ?
          AND eliminado = 0`,
            [nombre, color, id],
            true
        );

        // 2) Si no hay filas afectadas, el registro no existe o está eliminado
        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Estado de ticket no encontrado',
                message: `No existe un estado_ticket activo con id=${id}`,
                status: Status.notFound
            });
        }

        // 3) Recuperar el registro actualizado
        const [row] = await executeQuery(
            `SELECT * FROM estados_ticket WHERE id = ?`,
            [id],
            true
        );

        return Estadoticket.fromJson(row);

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error actualizando estado_ticket',
            message: err.message,
            stack: err.stack
        });
    }
}