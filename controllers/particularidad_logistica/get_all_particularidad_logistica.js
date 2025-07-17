import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import ParticularidadLogistica from '../../models/particularidad_logistica.js';
import { Status } from '../../models/status.js';

export async function getAllParticularidadesLogisticas() {
    const rows = await executeQuery(
        'SELECT * FROM particularidades WHERE eliminado = 0'
    );
    if (rows.length === 0) {
        throw new CustomException({
            title: 'No se encontraron particularidades de logística',
            message: 'No hay registros disponibles',
            statusCode: Status.noContent
        });
    }
    return rows.map(r => ParticularidadLogistica.fromJson(r));

}