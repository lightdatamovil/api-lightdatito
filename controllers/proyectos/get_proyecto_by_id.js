import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';
import { Status } from '../../models/status.js';

export async function getProyectoById(req) {
    const id = req.params.id;

    const rows = await executeQuery(
        'SELECT * FROM proyectos WHERE id = ? AND ELIMINADO = 0 LIMIT 1',
        [id]
    );

    if (rows.length === 0) {
        throw new CustomException({
            title: 'Proyecto no encontrado',
            message: `No existe un proyecto con id: ${id}`,
            status: Status.notFound
        });
    }

    return Proyecto.fromJson(rows[0]);
}