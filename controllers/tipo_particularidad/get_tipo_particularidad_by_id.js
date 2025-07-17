import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function getTipoParticularidadById(id) {
    const [row] = await executeQuery('SELECT * FROM tipo_particularidad WHERE id = ? AND eliminado = 0', [id],);
    if (!row) {
        throw new CustomException({
            title: 'No encontrado',
            message: `No existe tipo_particularidad con id: ${id}`,
            status: Status.noContent
        });
    }
    return {
        id: row.id,
        nombre: row.nombre,
        descripcion: row.descripcion
    };

}
