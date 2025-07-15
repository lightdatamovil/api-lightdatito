import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function deletePuesto(id) {
    try {
        const puesto = await executeQuery('SELECT id FROM puestos WHERE id = ? AND eliminado = 0', [id]);
        if (!puesto.length) {
            throw new CustomException({
                title: 'Puesto no encontrado',
                message: `No existe un puesto con id "${id}"`,
                status: Status.conflict
            });
        }
        await executeQuery('UPDATE puestos SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?', [id]);
        return { id };
    } catch (error) {
        if (error instanceof CustomException) throw error;
        throw new CustomException({
            title: 'Error al eliminar puesto',
            message: error.message,
            stack: error.stack
        });
    }
}
