import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function deleteHerramienta(req) {
    const id = req.params.id;
    const result = await executeQuery(
        `UPDATE herramientas SET eliminado = 1,  fecha_eliminado = NOW() WHERE id = ?  AND eliminado = 0`, [id]
    );

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Herramienta no encontrada',
            message: `No existe una herramienta activa con id=${id}`,
            status: Status.notFound
        });
    }

    return id;

}