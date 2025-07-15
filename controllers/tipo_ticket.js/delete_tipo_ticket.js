import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
export async function deleteTipoticket(id) {
    try {
        // 1) Verificar que exista el tipo de ticket
        const [row] = await executeQuery(
            'SELECT id FROM tipo_ticket WHERE id = ?',
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'Tipo ticket no encontrado',
                message: `No existe un tipo_ticket con id=${id}`,
                status: Status.notFound
            });
        }

        // 2) Eliminar el registro
        await executeQuery(
            'UPDATE tipo_ticket SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?',
            [id]
        );

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar tipo_ticket',
            message: err.message,
            stack: err.stack
        });
    }
}