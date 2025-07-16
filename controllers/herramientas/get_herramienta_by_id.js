import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Herramienta from '../../models/herramienta.js';
import { Status } from '../../models/status.js';

export async function getHerramientaById(id) {
    try {
        const [rows] = await executeQuery('SELECT * FROM herramientas WHERE id = ? AND eliminado = 0 LIMIT 1', [id], true
        );

        if (!rows || rows.length === 0) {
            throw new CustomException({
                title: 'Herramienta no encontrada',
                message: `No existe un Herramienta con id: ${id}`,
                status: Status.notFound
            });
        }

        return Herramienta.fromJson(rows[0]);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener Herramienta',
            message: err.message,
            stack: err.stack
        });
    }
}
