import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';



//agregar  fecha inico fecha fin 
export async function createProyecto(nombre) {
    try {
        //verificar si ya existe proyecto
        const cleanName = nombre.trim().toLowerCase();
        const [{ count }] = await executeQuery(
            `SELECT ID FROM proyectos WHERE nombre = ? AND ELIMINADO = 0 LIMIT 1`, [cleanName],
            true, 0
        );
        // TODO : TEMINAR ACA  -- AGREGAR A TODOS LOS SELEECT LOWER() -- A LOS DELETE SACAR LOS RETURN
        if (count > 0) {
            throw new CustomException({
                title: 'Proyecto duplicado',
                message: `Ya existe un proyecto con nombre "${nombre}"`,
                status: Status.conflict
            });
        }

        // 1) Insertar
        const result = await executeQuery(`INSERT INTO proyectos (nombre) VALUES (?)`, [nombre]);

        // 2) Obtener el ID recién insertado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear proyecto',
                message: 'No se obtuvo el ID del registro insertado',
                status: Status.internalServerError
            });
        }

        return await { id: newId };
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear proyecto',
            message: err.message,
            stack: err.stack
        });
    }
}
