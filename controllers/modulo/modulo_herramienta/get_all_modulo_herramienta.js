import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';

export async function getAllModuloHerramienta() {
    const result = await executeQuery(
        `SELECT  id, modulo_id, herramienta_id, fecha_creacion  FROM modulo_herramienta  WHERE eliminado = 0`
    );

    if (!result || result.length === 0) {
        throw new CustomException({
            title: 'No hay asignaciones de módulo a herramienta',
            message: 'No se encontraron registros de asignaciones',
            status: Status.notFound.nocontent
        });
    }

    return result;
}
