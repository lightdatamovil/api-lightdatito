import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';

export async function getHerramientasByModulo(moduloId) {
    // 1) Verificar que el módulo exista
    const [modulo] = await executeQuery(
        `SELECT id FROM modulos WHERE id = ? AND eliminado = 0`,
        [moduloId]
    );
    if (!modulo) {
        throw new CustomException({
            title: 'Módulo no encontrado',
            message: `No existe un módulo con id=${moduloId}`,
            status: 404
        });
    }

    // 2) Traer las herramientas asignadas
    return await executeQuery(
        `SELECT 
       h.id, 
       h.nombre, 
       h.fecha_creacion
     FROM herramientas AS h
     INNER JOIN modulo_herramienta AS mh
       ON h.id = mh.herramienta_id
     WHERE mh.modulo_id = ?
       AND mh.eliminado = 0
       AND h.eliminado = 0`,
        [moduloId]
    );
}
