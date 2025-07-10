import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';

export async function createPlan(nombre, color) {

    //verificar si ya existe plan

    const [{ count }] = await executeQuery(
        `SELECT COUNT(*) AS count FROM plan WHERE nombre = ? and color = ?`,
        [nombre, color],
        true, 0
    );
    if (count > 0) {
        throw new CustomException({
            title: 'Plan duplicado',
            message: `Ya existe un plan con nombre "${nombre}"`,
            status: 400
        });
    }

    // 1) Insertar 
    const result = await executeQuery(`INSERT INTO plan (nombre, color) VALUES (?, ?)`, [nombre, color], true
    );

    // 2) Obtener el ID recién insertado
    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error al crear plan',
            message: 'No se obtuvo el ID del registro insertado'
        });
    }

    // 3) Recuperar el registro completo
    const [row] = await executeQuery(
        `SELECT * FROM plan WHERE id = ?`,
        [newId]
    );
    if (!row) {
        throw new CustomException({
            title: 'Error al crear plan',
            message: `No se pudo recuperar el registro con id=${newId}`
        });
    }

    return Plan.fromJson(row);

}