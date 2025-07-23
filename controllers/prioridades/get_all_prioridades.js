import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Prioridad from '../../models/prioridades.js';
import { Status } from '../../models/status.js';

export async function getAllPrioridades() {
    const rows = await executeQuery('SELECT * FROM prioridades where eliminado = 0',);

    if (rows.length === 0) {
        throw new CustomException({
            title: 'No hay prioridades',
            message: 'No se encontraron prioridades activas',
            status: Status.noContent
        });
    }

    return rows.map(r => Prioridad.fromJson(r));

}
