import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

export async function deleteReporte(id) {
    try {
        // 1) Verificar que el reporte exista y no esté ya eliminado
        const [row] = await executeQuery(
            'SELECT id FROM reportes WHERE id = ? AND eliminado = 0',
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'Reporte no encontrado',
                message: `No existe un reporte activo con id=${id}`
            });
        }

        // 2) Soft-delete
        await executeQuery(
            'UPDATE reportes SET eliminado = 1 WHERE id = ?',
            [id]
        );

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar reporte',
            message: err.message,
            stack: err.stack
        });
    }
}