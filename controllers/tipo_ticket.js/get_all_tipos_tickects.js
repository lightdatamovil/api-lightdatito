import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import Tipoticket from '../../models/tipo_ticket.js';

export async function getAllTipoticket() {
    const rows = await executeQuery('SELECT * FROM tipo_ticket where eliminado = 0',);

    if (rows.length === 0) {
        throw new CustomException({
            title: 'No hay tipos de ticket',
            message: 'No se encontraron tipos de ticket activos',
            status: Status.noContent
        });
    }

    return rows.map(r => Tipoticket.fromJson(r));

}
