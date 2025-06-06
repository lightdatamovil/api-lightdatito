import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';

export async function deletePlan(id) {
    try {
        // 1) Verificar que el plan exista y no esté ya eliminado
        const [row] = await executeQuery(
            `SELECT * FROM plan WHERE id = ? AND eliminado = 0`,
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'Plan no encontrado',
                message: `No existe un plan activo con id=${id}`
            });
        }

        // 2) Marcarlo como eliminado
        await executeQuery(
            `UPDATE plan SET eliminado = 1 WHERE id = ?`,
            [id]
        );

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