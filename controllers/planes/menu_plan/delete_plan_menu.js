import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';



export async function deletePlanMenu(params) {
    const { planId, menuId } = params;

    try {
        // 1) Verificar que exista la relación activa
        const query = `UPDATE menu_plan SET eliminado = 1, fecha_eliminado = NOW() WHERE plan_id = ? AND menu_id = ? AND eliminado = 0`;
        const result = await executeQuery(query, [planId, menuId], true);

        if (result.affectedRows === 0) {
            throw new CustomException({
                title: 'Error update asignacion plan-menu',
                message: 'La asignacion no existe o ya fue eliminada',
                status: Status.notFound
            })
        }

        return { message: `Asignación de menú: ${menuId} al plan: ${planId} eliminada correctamente ` };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error eliminando asignación de menú a plan',
            message: err.message,
            stack: err.stack
        });
    }
}
