// controllers/logistica_plan/get_planes_by_logistica.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';

/**
 * Devuelve todos los planes asignados a una logística.
 * @param {number} logisticaId - ID de la logística
 * @returns {Promise<Plan[]>}
 */
export async function getPlanesByLogistica(logisticaId) {
    try {
        // Verificar existencia de la logística
        const [logistica] = await executeQuery(
            'SELECT id FROM logistica WHERE id = ? AND eliminado = 0',
            [logisticaId], true, 0
        );
        if (!logistica) {
            throw new CustomException({
                title: 'Logística inválida',
                message: `No existe una logística con id ${logisticaId}`,
                status: 400
            });
        }

        // Obtener los planes relacionados
        const rows = await executeQuery(
            `SELECT p.*
       FROM planes p
       JOIN logistica_plan lp ON lp.plan_id = p.id
       WHERE lp.logistica_id = ?
         AND p.eliminado = 0
         AND lp.eliminado = 0`,
            [logisticaId]
        );
        return rows.map(r => Plan.fromJson(r));
    } catch (err) {
        throw new CustomException({
            title: 'Error obteniendo planes por logística',
            message: err.message,
            stack: err.stack
        });
    }
}
