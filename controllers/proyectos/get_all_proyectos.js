import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function getAllProyectos() {
    try {
        const rows = await executeQuery('SELECT * FROM proyectos');
        return rows.map(row => Proyecto.fromJson(row));
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener proyectos',
            message: err.message,
            stack: err.stack
        });
    }
}