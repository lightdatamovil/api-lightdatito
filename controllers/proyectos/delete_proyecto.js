import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function deleteProyecto(id) {
    try {
        // 1) Verificar que exista el proyecto
        const [row] = await executeQuery(
            'SELECT id FROM proyectos WHERE id = ?',
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'Proyecto no encontrado',
                message: `No existe un proyecto con id=${id}`
            });
        }

        // 2) Eliminar el proyecto
        await executeQuery(
            'DELETE FROM proyectos WHERE id = ?',
            [id]
        );

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar proyecto',
            message: err.message,
            stack: err.stack
        });
    }
}