import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import prioridades from '../../models/prioridades.js';

export async function getAllPrioridades() {
    try {
        const rows = await executeQuery('SELECT * FROM prioridades where eliminado = 0',);
        return rows.map(r => prioridades.fromJson(r));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener tipos de ticket',
            message: err.message,
            stack: err.stack
        });
    }
}
