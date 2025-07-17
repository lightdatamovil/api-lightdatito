import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function updatePlan(req) {
    const id = req.params.id;
    const { nombre, color } = req.body;
    const result = await executeQuery(
        `UPDATE planes SET nombre = ?, color  = ?  WHERE id = ? AND eliminado = 0`, [nombre.toLowerCase(), color.toLowerCase(), id], true
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Plan no encontrado',
            message: `No existe un plan con id=${id}`,
            status: Status.notFound
        });
    }

    return await id;
}