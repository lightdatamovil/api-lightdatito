import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';
import { Status } from '../../models/status.js';



//agregar  fecha inico fecha fin 
export async function createProyecto(nombre) {
    try {
        //verificar si ya existe proyecto
        const cleanName = nombre.trim().toLowerCase();
        const [{ count }] = await executeQuery(
            `SELECT COUNT(*) AS count FROM proyectos WHERE nombre = ?`,
            [cleanName],
            true, 0
        );
        if (count > 0) {
            throw new CustomException({
                title: 'Proyecto duplicado',
                message: `Ya existe un proyecto con nombre "${nombre}"`,
                status: Status.conflict
            });
        }

        // 1) Insertar 
        const result = await executeQuery(
            `INSERT INTO proyectos (nombre) VALUES (?)`,
            [nombre], true
        );

        // 2) Obtener el ID recién insertado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear proyecto',
                message: 'No se obtuvo el ID del registro insertado',
                status: Status.internalServerError
            });
        }

        // 3) Recuperar el proyecto completo
        const [row] = await executeQuery(
            `SELECT * FROM proyectos WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear proyecto',
                message: `No se pudo recuperar el proyecto con id=${newId}`,
                status: Status.internalServerError
            });
        }

        return Proyecto.fromJson(row);
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al crear proyecto',
            message: err.message,
            stack: err.stack
        });
    }
}
