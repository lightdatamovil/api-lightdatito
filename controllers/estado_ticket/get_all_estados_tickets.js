import { executeQuery } from '../../db.js';
import Estadoticket from '../../models/estado_reporte.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function getAllEstadosticket() {

    const rows = await executeQuery('SELECT * FROM estados_ticket where eliminado = 0');
    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'No hay estados de ticket',
            message: 'No se encontraron estados de ticket activos',
            status: Status.noContent
        });
    }
    return rows.map(r => Estadoticket.fromJson(r));

}
