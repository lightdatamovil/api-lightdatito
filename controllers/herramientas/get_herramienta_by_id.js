import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Herramienta from '../../models/herramienta.js';
import { Status } from '../../models/status.js';

export async function getHerramientaById(req) {
    const id = req.params.id;
    const [rows] = await executeQuery('SELECT * FROM herramientas WHERE id = ? AND eliminado = 0 LIMIT 1', [id]
    );

    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'Herramienta no encontrada',
            message: `No existe un Herramienta con id: ${id}`,
            status: Status.notFound
        });
    }

    return Herramienta.fromJson(rows[0]);

}
