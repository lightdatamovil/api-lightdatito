import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function updateParticularidadLogistica(params, body) {
    const { id } = params;
    const { particularidad, es_pago, tipo_particularidad_id } = body;
    try {

        const query = `UPDATE particularidades SET particularidad = ?, es_pago = ?, tipo_particularidad_id = ? WHERE id = ? AND eliminado = 0 `;
        const values = [particularidad, es_pago, tipo_particularidad_id, id];
        const result = await executeQuery(query, values);

        if (result.affectedRows === 0) {
            throw new CustomException({
                title: 'Particularidad no encontrada',
                message: `No se encontró una particularidad con ID: ${id} o ya ha sido eliminada`,
                statusCode: Status.notFound
            })
        }
    } catch (error) {
        throw new CustomException(
            'Error updating particularidad de logistica',
            error.message,
            error.stack
        );
    }
}