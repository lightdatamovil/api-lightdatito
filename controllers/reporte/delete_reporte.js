import { executeQuery } from '../../db.js';
import Reporte from '../../models/Reporte.js';

export async function deleteReporte(id) {
    // Soft-delete
    await executeQuery(
        'UPDATE reportes SET eliminado = 1 WHERE id = ?',
        [id]
    );
    return { id };
}