import { executeQuery } from '../../../db.js';

export async function cambiarPlan(req) {
    const { logisticaId } = req.params;
    const { planId } = req.body;

    const queryVerficar = `SELECT id FROM logistica WHERE id = ? AND eliminado = 0 LIMIT 1`;
    await executeQuery(queryVerficar, [logisticaId]);

    const queryInsert = `SELECT id FROM plan WHERE id = ? AND eliminado = 0 LIMIT 1`;
    await executeQuery(queryInsert, [planId]);

    const insertAsignacion = `UPDATE logisticas SET plan_id = ? WHERE id = ?`;
    await executeQuery(insertAsignacion, [planId, logisticaId]);
}
