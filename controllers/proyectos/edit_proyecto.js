// controllers/proyectos/update_proyecto.js
import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function updateProyecto(req) {
    const id = req.params.id;
    const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;

    const query = `UPDATE proyectos SET nombre  = ?, descripcion  = ?, fecha_creacion = ?, fecha_finalizado  = ?  WHERE id = ? AND eliminado = 0`;
    const values = [
        nombre,
        descripcion,
        fecha_inicio,
        fecha_fin,
        id
    ];
    const result = await executeQuery(query, values);

    if (!result || result.affectedRows === 0) {
        throw new CustomException({
            title: 'Proyecto no encontrado',
            message: `No existe un proyecto con id=${id}`,
            status: Status.notFound
        });
    }


}
