import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';



//agregar  fecha inico fecha fin 
export async function createProyecto(req) {
    const { nombre, fecha_inicio, fecha_finalizado, descripcion } = req.body;
    //verificar si ya existe proyecto
    const cleanName = nombre.trim().toLowerCase();
    const verify = await executeQuery(
        `SELECT ID FROM proyectos WHERE nombre = LOWER(?) AND ELIMINADO = 0 LIMIT 1`, [cleanName], true
    );
    // TODO : TEMINAR ACA  -- AGREGAR A TODOS LOS SELECT LOWER() -- A LOS DELETE SACAR LOS RETURN
    if (verify.length > 0) {
        throw new CustomException({
            title: 'Proyecto duplicado',
            message: `Ya existe un proyecto con nombre "${nombre}"`,
            status: Status.conflict
        });
    }

    // 1) Insertar
    const result = await executeQuery(`INSERT INTO proyectos (nombre, fecha_creacion, fecha_inicio, fecha_finalizado, descripcion) VALUES (?, NOW(), ?, ?, ?)`, [nombre, fecha_inicio, fecha_finalizado, descripcion]);

    // 2) Obtener el ID recién insertado
    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error al crear proyecto',
            message: 'No se obtuvo el ID del registro insertado',
            status: Status.internalServerError
        });
    }

    return await newId;

}
