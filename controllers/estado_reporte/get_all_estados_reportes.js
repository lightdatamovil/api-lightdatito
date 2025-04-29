import { executeQuery } from '../../db.js';
import EstadoReporte from '../../models/estado_reporte.js';

export async function getAllEstadosReporte() {
    const rows = await executeQuery('SELECT * FROM estados_reporte');
    return rows.map(r => EstadoReporte.fromJson(r));
}
