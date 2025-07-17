import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';

export async function asignarPlanALogistica(menuId, planId) {
    const queryVerificarExistencia = `SELECT id FROM menus WHERE id = ? AND eliminado = 0`;
    const [menu] = await executeQuery(queryVerificarExistencia, [menuId]);
    if (!menu) {
        throw new CustomException({
            title: 'Menú inválido',
            message: `No existe un menú con id ${menuId}`,
            status: Status.badRequest
        });
    }

    const [plan] = await executeQuery(
        'SELECT id FROM planes WHERE id = ? AND eliminado = 0',
        [planId], true, 0
    );
    if (!plan) {
        throw new CustomException({
            title: 'Plan inválido',
            message: `No existe un plan con id ${planId}`,
            status: Status.badRequest
        });
    }

    await executeQuery(
        'INSERT INTO menu_plan (menu_id, plan_id) VALUES (?, ?)',
        [menuId, planId]
    );
}
