import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import { getHerramientaById } from './get_herramienta_by_id.js';

export async function updateHerramienta(id, data) {
    try {
        const fields = Object.keys(data);
        const values = fields.map(f => data[f]);
        const setClause = fields.map(f => `${f} = ?`).join(', ');

        const result = await executeQuery(
            `UPDATE herramientas
          SET ${setClause}
        WHERE id = ?
          AND eliminado = 0`,
            [...values, id],
            true
        );

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Herramienta no encontrada',
                message: `No existe una herramienta activa con id=${id}`,
                status: Status.notFound
            });
        }

        return await getHerramientaById(id);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error actualizando herramienta',
            message: err.message,
            stack: err.stack
        });
    }
}