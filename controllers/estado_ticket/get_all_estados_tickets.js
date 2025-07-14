import { executeQuery } from '../../db.js';
import Estadoticket from '../../models/estado_reporte.js';
import CustomException from '../../models/custom_exception.js';

export async function getAllEstadosticket() {
    try {
        const rows = await executeQuery('SELECT * FROM estados_ticket');
        return rows.map(r => Estadoticket.fromJson(r));
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al listar estado_ticket',
            message: error.message,
            stack: error.stack
        });
    }
}
