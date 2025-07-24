import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ParticularidadLogistica from '../../models/particularidad_logistica.js';
import { Status } from '../../models/status.js';

export async function getParticularidadLogisticaById(req) {
    const id = req.params.id;
    const rows = await executeQuery(
        'SELECT * FROM particularidades WHERE id = ? and eliminado = 0 LIMIT 1',
        [id]
    );

    if (rows.length === 0) {
        throw new CustomException({
            title: 'ParticularidadLogistica no encontrada',
            message: `No existe una particularidad_logistica con id: ${id}`,
            status: Status.notFound
        });
    }

    return ParticularidadLogistica.fromJson(rows[0]);

}