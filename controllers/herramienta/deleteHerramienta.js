import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

export async function deleteHerramienta(id) {
    try {
        const [row] = await executeQuery(
            `SELECT * FROM herramientas WHERE id = ? AND eliminado = 0`,
            [id]
        );

        if (!row) {
            throw new CustomException({
                title: 'Herramienta no encontrado',
                message: `No existe una herramienta con id=${id}`,
                status: 404
            });
        }

        await executeQuery('UPDATE herramientas SET eliminado = 1 WHERE id = ?', [id]);

        return { id };
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al eliminar estado_ticket',
            message: error.message,
            stack: error.stack
        });
    }
}