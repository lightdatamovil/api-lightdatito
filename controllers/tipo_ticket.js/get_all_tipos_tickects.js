import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Tipoticket from '../../models/tipo_ticket.js';

export async function getAllTipoticket() {
    try {
        const rows = await executeQuery('SELECT * FROM tipo_ticket where eliminado = 0', [], true);
        return rows.map(r => Tipoticket.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener tipos de ticket',
            message: err.message,
            stack: err.stack
        });
    }
}
