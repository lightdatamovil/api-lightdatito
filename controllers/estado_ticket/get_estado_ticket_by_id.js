import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Estadoticket from '../../models/estado_reporte.js';
import { Status } from '../../models/status.js';

// services/estado_ticket.js
export async function getEstadoticketById(params) {
    const { id } = params;
    const rows = await executeQuery('SELECT * FROM estados_ticket WHERE id = ? and eliminado = 0 LIMIT 1', [id]
    );
    if (rows.length === 0) {
        throw new CustomException({
            title: 'Estado ticket no encontrado',
            message: `No existe un estado_ticket con id: ${id}`,
            status: Status.notFound
        });
    }
    return Estadoticket.fromJson(rows[0]);
}
