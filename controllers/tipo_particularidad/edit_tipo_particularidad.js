import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function editTipoParticularidad(params, body) {
    try {
        const id = params;
        const data = body;
        const { nombre, descripcion } = data;
        const query = `UPDATE tipo_particularidad SET nombre = ?, descripcion = ? WHERE id = ? AND eliminado = 0`;
        const result = await executeQuery(query, [nombre, descripcion, id]);

        if (!result.affectedRows) {
            throw new CustomException({
                title: 'Sin datos',
                message: 'No se proporcionaron campos para actualizar',
                status: Status.badRequest
            });
        }
    } catch (err) {
        throw new CustomException({
            title: 'Error actualizando tipo_particularidad',
            message: err.message,
            stack: err.stack
        });
    }
}
