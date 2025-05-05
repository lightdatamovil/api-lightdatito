import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function getProyectoById(id) {
    try {
        const rows = await executeQuery(
            'SELECT * FROM proyectos WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'Proyecto no encontrado',
                message: `No existe un proyecto con id=${id}`
            });
        }

        return Proyecto.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener proyecto',
            message: err.message,
            stack: err.stack
        });
    }
}