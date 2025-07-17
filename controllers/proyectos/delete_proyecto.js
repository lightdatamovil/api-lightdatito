import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function deleteProyecto(id) {
    try {
        const result = await executeQuery(
            `UPDATE proyectos SET eliminado  = 1,  fecha_eliminado = NOW() WHERE id = ?   AND eliminado = 0`, [id]
        );

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Proyecto no encontrado',
                message: `No existe un proyecto con id: ${id}`,
                status: Status.notFound
            });
        }

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