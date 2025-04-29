import { executeQuery } from '../db.js';
import Reporte from '../models/Reporte.js';

export async function getAllReportes() {
    const rows = await executeQuery(
        'SELECT * FROM reportes WHERE eliminado = 0'
    );
    return rows.map(r => Reporte.fromJson(r));
}