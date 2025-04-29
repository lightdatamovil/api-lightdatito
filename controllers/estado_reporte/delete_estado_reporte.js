import { executeQuery } from '../../db.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function deleteEstadoReporte(id) {
    await executeQuery('DELETE FROM estados_reporte WHERE id = ?', [id]);
    return { id };
}