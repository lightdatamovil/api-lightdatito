import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
export async function deletePlanMenu(planId, menuId) {
    // 1) Verificar que exista la relación activa
    const [existing] = await executeQuery(
        `SELECT id
       FROM menu_plan
      WHERE plan_id = ?
        AND menu_id = ?
        AND eliminado = 0`,
        [planId, menuId]
    );
    if (!existing) {
        throw new CustomException({
            title: 'Relación no encontrada',
            message: `No existe un menú id=${menuId} asignado al plan id=${planId}`,
            status: 404
        });
    }

    // 2) Soft-delete
    await executeQuery(
        `UPDATE menu_plan
        SET eliminado = 1,
            fecha_eliminado = NOW()
      WHERE id = ?`,
        [existing.id]
    );

    return { id: existing.id };
}
