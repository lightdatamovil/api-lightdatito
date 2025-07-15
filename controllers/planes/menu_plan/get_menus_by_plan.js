
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';


export async function getMenusByPlan(planId) {
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

    // 2) Traer todos los menús asignados a ese plan
    return await executeQuery(
        `SELECT m.id, m.nombre, m.fecha_creacion
       FROM menus AS m
  INNER JOIN menu_plan AS mp
          ON m.id = mp.menu_id
      WHERE mp.plan_id = ?
        AND mp.eliminado = 0
        AND m.eliminado = 0`,
        [planId]
    );
}
