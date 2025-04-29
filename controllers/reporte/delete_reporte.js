import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Reporte from '../../models/Reporte.js';

export async function deleteReporte(id) {
    try {
        // Soft-delete
        await executeQuery(
            'UPDATE reportes SET eliminado = 1 WHERE id = ?',
            [id]
        );
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}