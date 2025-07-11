// controllers/logistica_plan/create_logistica_plan.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

/**
 * Asigna un plan a un menú (inserta en tabla menu_plan).
 * @param {number} menuId - ID del menú
 * @param {number} planId - ID del plan a asignar
 */
export async function createLogisticaPlan(menuId, planId) {
    // 1) Verificar existencia del menú
    const [menu] = await executeQuery(
        'SELECT id FROM menus WHERE id = ? AND eliminado = 0',
        [menuId], true, 0
    );
    if (!menu) {
        throw new CustomException({
            title: 'Menú inválido',
            message: `No existe un menú con id ${menuId}`,
            status: 400
        });
    }

    // 2) Verificar existencia del plan
    const [plan] = await executeQuery(
        'SELECT id FROM planes WHERE id = ? AND eliminado = 0',
        [planId], true, 0
    );
    if (!plan) {
        throw new CustomException({
            title: 'Plan inválido',
            message: `No existe un plan con id ${planId}`,
            status: 400
        });
    }

    // 3) Insertar asignación
    await executeQuery(
        'INSERT INTO menu_plan (menu_id, plan_id) VALUES (?, ?)',
        [menuId, planId]
    );
}
