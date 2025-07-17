import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function updatePuesto(req) {
    const id = req.params.id;
    const nombre = req.body.nombre;

    // 1) UPDATE directo de nombre
    const result = await executeQuery(`UPDATE puestos SET nombre = LOWER(?) WHERE id = ?  AND eliminado = 0`, [nombre, id]);

    // 2) Si no afectó ninguna fila, el id no existe o ya está eliminado
    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Puesto no encontrado',
            message: `No existe un puesto con id: ${id}`,
            status: Status.notFound
        });
    }
}