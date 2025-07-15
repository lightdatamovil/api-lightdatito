import { executeQuery } from '../../../db.js';

import CustomException from '../../../models/custom_exception.js';

export async function addPlanMenu(planId, menuId) {
    // 1) Verificar que el plan exista
    const [plan] = await executeQuery(
        `SELECT id FROM planes WHERE id = ? AND eliminado = 0`,
        [planId]
    );
    if (!plan) {
        throw new CustomException({
            title: 'Plan no encontrado',
            message: `No existe un plan con id=${planId}`,
            status: 404
        });
    }

    // 2) Verificar que el menú exista
    const [menu] = await executeQuery(
        `SELECT id FROM menus WHERE id = ? AND eliminado = 0`,
        [menuId]
    );
    if (!menu) {
        throw new CustomException({
            title: 'Menú no encontrado',
            message: `No existe un menú con id=${menuId}`,
            status: 404
        });
    }

    // 3) Insertar la relación
    const result = await executeQuery(
        `INSERT INTO menu_plan (plan_id, menu_id) VALUES (?, ?)`,
        [planId, menuId]
    );

    return {
        id: result.insertId,
        plan_id: planId,
        menu_id: menuId
    };
}
