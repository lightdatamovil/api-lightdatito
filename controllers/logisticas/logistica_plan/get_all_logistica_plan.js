// controllers/logistica_plan/get_all_logistica_plan.js
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';

/**
 * Devuelve todas las asignaciones activas de menu_plan (soft delete = 0).
 * @returns {Promise<Array<{menu_id: number, plan_id: number, fecha_creacion: string}>>}
 */
export async function getAllLogisticaPlan() {
    try {
        return await executeQuery(
            'SELECT * FROM menu_plan WHERE eliminado = 0',
            []
        );
    } catch (err) {
        throw new CustomException({
            title: 'Error obteniendo asignaciones menu_plan',
            message: err.message,
            stack: err.stack
        });
    }
}
