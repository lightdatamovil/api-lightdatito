import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';

//TERMINAR ACA 
export async function addPlanMenu(moduloId, menu) {
    console.log({ moduloId, menu })
    try {
        // 1) Verificar que el plan exista y no esté eliminado
        const existePlan = await executeQuery(
            `SELECT 1
         FROM planes
        WHERE id = ?
          AND eliminado = 0
        LIMIT 1`,
            [moduloId],
            true
        );
        if (!existePlan || existePlan.length === 0) {
            throw new CustomException({
                title: 'Plan no encontrado',
                message: `No existe un plan con id=${moduloId}`,
                status: Status.notFound
            });
        }

        // 2) Verificar que el plan exista y no esté eliminada
        const existen = await executeQuery(
            `SELECT 1
         FROM menus
        WHERE id = ?
          AND eliminado = 0
        LIMIT 1`,
            [menu.id],
            true
        );
        if (!existePlan || existePlan.length === 0) {
            throw new CustomException({
                title: 'Plan no encontrado',
                message: `No existe un menu con id: ${menu.id}`,
                status: Status.notFound
            });
        }

        // 3) Insertar la relación módulo–herramienta
        const result = await executeQuery(
            `INSERT INTO modulo_herramienta (modulo_id, herramienta_id)
        VALUES (?, ?)`,
            [moduloId, herramientaId],
            true
        );

        return {
            id: result.insertId,
            modulo_id: moduloId,
            herramienta_id: herramientaId
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