import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import Pais from '../../models/pais.js';

export async function getPaisById(req) {
    const id = req.params.id;

    const rows = await executeQuery(
        'SELECT * FROM paises WHERE id = ? AND eliminado = 0 LIMIT 1',
        [id]
    );

    if (rows.length === 0) {
        throw new CustomException({
            title: 'País no encontrado',
            message: `No existe un país con id: ${id}`,
            status: Status.notFound
        });
    }

    return Pais.fromJson(rows[0]);
}