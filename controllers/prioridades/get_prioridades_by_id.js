import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import prioridades from '../../models/prioridades.js';

export async function getPrioridadesById(req) {
    const id = req.params.id;
    const rows = await executeQuery('SELECT * FROM prioridades WHERE id = ? AND eliminado = 0 LIMIT 1', [id],
    );

    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'Prioridad no encontrada',
            message: `No existe una prioridad con id=${id}`,
            status: Status.notFound
        });
    }

    return prioridades.fromJson(rows[0]);
}