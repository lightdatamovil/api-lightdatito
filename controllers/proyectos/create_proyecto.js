import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Proyecto from '../../models/proyecto.js';

export async function createProyecto(nombre) {
    try {
        //verificar si ya existe proyecto
            const [{ count }] = await executeQuery(
                `SELECT COUNT(*) AS count FROM proyectos WHERE nombre = ?`,
                [nombre].trim().toLowerCase(),
                true, 0
            );
            if (count > 0) {
                throw new CustomException({
                title:   'Proyecto duplicado',
                message: `Ya existe un proyecto con nombre "${nombre}"`,
                status:  400
            });
            }

        // 1) Insertar sin RETURNING
        const result = await executeQuery(
            `INSERT INTO proyectos (nombre) VALUES (?)`,
            [nombre]
        );

        // 2) Obtener el ID recién insertado
        const newId = result.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear proyecto',
                message: 'No se obtuvo el ID del registro insertado'
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
                message: `No se pudo recuperar el proyecto con id=${newId}`
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