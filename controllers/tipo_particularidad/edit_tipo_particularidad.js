import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function editTipoParticularidad(req) {

    const id = req.params.id;
    const { nombre, descripcion } = req.body;

    const query = `UPDATE tipo_particularidad SET nombre = ?, descripcion = ? WHERE id = ? AND eliminado = 0`;
    const result = await executeQuery(query, [nombre, descripcion, id]);

    if (!result.affectedRows) {
        throw new CustomException({
            title: 'Sin datos',
            message: 'No se proporcionaron campos para actualizar',
            status: Status.badRequest
        });
    }
}
