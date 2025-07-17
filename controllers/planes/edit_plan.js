import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function updatePlan(params, body) {
    const id = params;
    const { nombre, color } = body;
    try {
        // 1) Intento directo de UPDATE de los dos campos
        //    (se asegura que id exista y no esté eliminado)
        const result = await executeQuery(
            `UPDATE planes SET nombre = ?, color  = ?  WHERE id = ? AND eliminado = 0`, [nombre.toLowerCase(), color.toLowerCase(), id], true
        );

        // 2) Si no afectó filas, el plan no existe o ya está eliminado
        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Plan no encontrado',
                message: `No existe un plan con id=${id}`,
                status: Status.notFound
            });
        }

        // 3) Devolver el registro actualizado
        return await { id };

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error actualizando plan',
            message: err.message,
            stack: err.stack
        });
    }
}