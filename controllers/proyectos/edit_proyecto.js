// controllers/proyectos/update_proyecto.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import { getProyectoById } from './get_proyecto_by_id.js';

// Define aquí los campos que sí puedes actualizar
const ALLOWED_FIELDS = ['nombre', 'descripcion', 'fecha_inicio', 'fecha_fin'];

export async function updateProyecto(id, data) {
    try {
        // 1) UPDATE directo de los campos permitidos
        const result = await executeQuery(
            `UPDATE proyectos
          SET nombre       = ?,
              descripcion  = ?,
              fecha_inicio = ?,
              fecha_fin    = ?
        WHERE id = ?
          AND eliminado = 0`,
            [
                data.nombre,
                data.descripcion,
                data.fecha_inicio,
                data.fecha_fin,
                id
            ],
            true
        );

        // 2) Si no afectó filas, el proyecto no existe o ya está eliminado
        if (!result || result.affectedRows === 0) {
            throw new CustomException({
                title: 'Proyecto no encontrado',
                message: `No existe un proyecto con id=${id}`,
                status: Status.notFound
            });
        }

        // 3) Devolver el recurso actualizado
        return await getProyectoById(id);

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error actualizando proyecto',
            message: err.message,
            stack: err.stack
        });
    }
}