import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';

// TODO: TERMINAR ACA 
export async function addPlanMenu(planId, menu_id) {
    console.log({ planId, menu_id });
    try {
        // 1) Verificar que el plan exista y no esté eliminado
        const existePlan = await executeQuery(
            `SELECT 1
         FROM planes
        WHERE id = ?
          AND eliminado = 0
        LIMIT 1`,
            [planId],
            true
        );
        if (!existePlan || existePlan.length === 0) {
            throw new CustomException({
                title: 'Plan no encontrado',
                message: `No existe un plan con id: ${planId}`,
                status: Status.notFound
            });
        }

        // 2) Verificar que el plan exista y no esté eliminada
        const existeMenu = await executeQuery(
            `SELECT 1
         FROM menus
        WHERE id = ?
          AND eliminado = 0
        LIMIT 1`,
            [menu_id],
            true
        );
        if (!existeMenu || existeMenu.length === 0) {
            throw new CustomException({
                title: 'Menu no encontrado',
                message: `No existe un menu con id: ${menu_id}`,
                status: Status.notFound
            });
        }

        // 3) Insertar la relación módulo–menú
        const result = await executeQuery(
            `INSERT INTO menu_plan (menu_id, plan_id)
        VALUES (?, ?)`,
            [menu_id, planId],
            true
        );

        return {
            id: result.insertId,
            plan_id: planId,
            menu_id: menu_id
        };

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error asignando herramienta al módulo',
            message: err.message,
            stack: err.stack
        });
    }
}