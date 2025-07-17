// controllers/logistica_plan/delete_logistica_plan.js
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';

/**
 * Desasigna (soft delete) un plan de un menú en la tabla intermedia menu_plan.
 * @param {number} menuId - ID del menú
 * @param {number} planId - ID del plan a desasignar
 */
export async function deleteLogisticaPlan(menuId, planId) {
    try {
        await executeQuery(
            'UPDATE menu_plan SET eliminado = 1, fecha_eliminado = NOW() WHERE menu_id = ? AND plan_id = ?',
            [menuId, planId]
        );
    } catch (err) {
        throw new CustomException({
            title: 'Error desasignando plan',
            message: err.message,
            stack: err.stack
        });
    }
}
