// controllers/proyectos/update_proyecto.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import { getProyectoById } from './get_proyecto_by_id.js';


export async function updateProyecto(params, body) {
    try {
        const { id } = params;
        const { nombre, descripcion, fecha_inicio, fecha_fin } = body;

        // 1) UPDATE directo de los campos permitidos
        const query = `UPDATE proyectos SET nombre  = LOWER(?), descripcion  = LOWER(?), fecha_inicio = ?, fecha_fin  = ?  WHERE id = ? AND eliminado = 0`;
        const values = [
            nombre,
            descripcion,
            fecha_inicio,
            fecha_fin,
            id
        ];
        const result = await executeQuery(query, values);

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