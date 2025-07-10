import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Herramienta from '../../models/herramienta.js';

export async function getAllHerramientas() {
    try {
        const rows = await executeQuery('SELECT * FROM herramientas');
        return rows.map(row => Herramienta.fromJson(row));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener herramientas',
            message: err.message,
            stack: err.stack
        });
    }
}