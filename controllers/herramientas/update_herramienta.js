import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function updateHerramienta(params, body) {
    const id = params.id;
    const { nombre, modulo_prncipal } = body;
    try {
        const query = `UPDATE herramientas SET nombre = ?, modulo_principal = ? WHERE id = ? AND eliminado = 0`;
        const result = await executeQuery(query, [nombre, modulo_prncipal, id]);

        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Herramienta no encontrada',
                message: `No existe una herramienta activa con id: ${id}`,
                status: Status.notFound
            });
        }

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error actualizando herramienta',
            message: err.message,
            stack: err.stack
        });
    }
}

