import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Herramienta from '../../models/herramienta.js';
import { Status } from '../../models/status.js';

export async function getAllHerramientas() {
    const rows = await executeQuery('SELECT * FROM herramientas where eliminado = 0');

    if (rows.length === 0) {
        throw new CustomException({
            title: 'No herramientas found',
            message: 'No se encontraron herramientas activas',
            status: Status.noContent
        });
    }

    return rows.map(row => Herramienta.fromJson(row));
}