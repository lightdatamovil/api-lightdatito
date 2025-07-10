import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
export async function deleteTipoReporte(id) {
    try {
        // 1) Verificar que exista el tipo de reporte
        const [row] = await executeQuery(
            'SELECT id FROM tipo_reporte WHERE id = ?',
            [id]
        );
        if (!row) {
            throw new CustomException({
                title: 'TipoReporte no encontrado',
                message: `No existe un tipo_reporte con id=${id}`
            });
        }

        // 2) Eliminar el registro
        await executeQuery(
            'UPDATE tipo_reporte SET eliminado = 1 WHERE id = ?',
            [id]
        );

        return { id };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar tipo_reporte',
            message: err.message,
            stack: err.stack
        });
    }
}