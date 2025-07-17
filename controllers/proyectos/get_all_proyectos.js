import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';
import { Status } from '../../models/status.js';

export async function getAllProyectos() {
    const rows = await executeQuery('SELECT * FROM proyectos where eliminado = 0',);
    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'No hay proyectos',
            message: 'No se encontraron proyectos activos',
            status: Status.noContent
        });
    }
    return rows.map(r => Proyecto.fromJson(r));
}