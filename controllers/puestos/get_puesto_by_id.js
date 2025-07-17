import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import PuestoUsuario from '../../models/puesto_usuario.js';
import { Status } from '../../models/status.js';

export async function getPuestoById(req) {
    const id = req.params.id;
    const [rows] = await executeQuery('SELECT * FROM puestos WHERE id = ? AND eliminado = 0 LIMIT 1', id);

    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'Puesto no encontrado',
            message: `No existe un puesto con id: ${id}`,
            status: Status.notFound

        });
    }

    return PuestoUsuario.fromJson(rows);
}
