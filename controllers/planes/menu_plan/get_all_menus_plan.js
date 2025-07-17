import { executeQuery } from '../../../db.js';
import CustomException from "../../../models/custom_exception.js";
import { Status } from "../../../models/status.js";


export async function getAllMenuPlanes() {
    const rows = await executeQuery(
        `SELECT 
         m.id   AS modulo_id,
         m.nombre AS modulo_nombre,
         h.id   AS herramienta_id,
         h.nombre AS herramienta_nombre
       FROM modulos m
       JOIN modulo_herramienta mh 
         ON mh.modulo_id = m.id 
        AND mh.eliminado = 0
       JOIN herramientas h 
         ON h.id = mh.herramienta_id 
        AND h.eliminado = 0
      WHERE m.eliminado = 0`,
        [],
        true
    );

    if (!rows || rows.length === 0) {
        throw new CustomException({
            title: 'Sin asociaciones módulo–herramienta',
            message: 'No se encontraron relaciones entre módulos y herramientas',
            status: Status.noContent
        });
    }

    return rows;  // Array de { modulo_id, modulo_nombre, herramienta_id, herramienta_nombre }

}