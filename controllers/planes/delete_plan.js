import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function deletePlan(params) {
    try {
        const { id } = params;
        // UPDATE directo: sólo marcará si existe y aún no está eliminado
        const result = await executeQuery(`UPDATE planes  SET eliminado  = 1, fecha_eliminado = NOW()  WHERE id = ?  AND eliminado = 0`, [id]);
        // Si no afectó filas, el plan no existía o ya estaba borrado
        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Plan no encontrado',
                message: `No existe un plan activo con id: ${id}`,
                status: Status.notFound
            });
        }

        return { id };

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar plan',
            message: err.message,
            stack: err.stack
        });
    }
}