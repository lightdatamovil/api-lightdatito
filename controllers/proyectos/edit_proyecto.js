// controllers/proyectos/update_proyecto.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { getProyectoById } from './get_proyecto_by_id.js';

// Define aquí los campos que sí puedes actualizar
const ALLOWED_FIELDS = ['nombre', 'descripcion', 'fecha_inicio', 'fecha_fin'];

export async function updateProyecto(id, data) {
    try {
        // 1) Filtrar sólo los campos permitidos
        const entries = Object.entries(data)
            .filter(([key]) => ALLOWED_FIELDS.includes(key));
        if (!entries.length) {
            throw new CustomException({
                title: 'Sin datos válidos',
                message: 'No hay campos permitidos para actualizar',
                status: Status.badRequest
            });
        }

        // 2) Construir SET dinámico a partir de los entries
        const setClause = entries.map(([k]) => `${k} = ?`).join(', ');
        const values = entries.map(([, v]) => v);

        // 3) Ejecutar UPDATE
        await executeQuery(
            `UPDATE proyectos SET ${setClause} WHERE id = ?`,
            [...values, id]
        );

        // 4) Devolver el recurso actualizado
        return getProyectoById(id);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error actualizando proyecto',
            message: err.message,
            stack: err.stack
        });
    }
}