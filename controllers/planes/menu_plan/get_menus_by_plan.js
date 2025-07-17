
import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';


export async function getMenusByPlan(planId) {
    const [plan] = await executeQuery(
        `SELECT id FROM planes WHERE id = ? AND eliminado = 0`,
        [planId]
    );
    if (!plan) {
        throw new CustomException({
            title: 'Plan no encontrado',
            message: `No existe un plan con id: ${planId}`,
            status: Status.notFound
        });
    }

    // 2) Traer todos los menús asignados a ese plan
    const row = await executeQuery(
        `SELECT m.id, m.nombre, m.fecha_creacion
        FROM menus AS m
    INNER JOIN menu_plan AS mp
            ON m.id = mp.menu_id
        WHERE mp.plan_id = ?
            AND mp.eliminado = 0
            AND m.eliminado = 0`,
        [planId]
    );

    if (!row || row.length === 0) {
        throw new CustomException({
            title: 'Sin menús asignados',
            message: `No hay menús asignados al plan con id: ${planId}`,
            status: Status.noContent
        });
    }

    return row.map(menu => ({
        id: menu.id,
        nombre: menu.nombre,
        fecha_creacion: menu.fecha_creacion
    }));
}
