import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Plan from '../../models/plan.js';
import { Status } from '../../models/status.js';

export async function createPlan(nombre, color) {

    try {
        // 1) Verificar duplicado de forma eficiente
        const exists = await executeQuery(
            `SELECT 1 FROM planes WHERE nombre = LOWER(?) LIMIT 1`, [nombre.toLowerCase().trim()], true
        );
        if (exists && exists.length > 0) {
            throw new CustomException({
                title: 'Plan duplicado',
                message: `Ya existe un plan con nombre "${nombre}" `,
                status: Status.conflict
            });
        }
        // 2) Insertar
        const insertResult = await executeQuery(
            `INSERT INTO planes (nombre, color) VALUES (?, ?)`,
            [nombre, color],
            true
        );
        const newId = insertResult.insertId;
        if (!newId) {
            throw new CustomException({
                title: 'Error al crear plan',
                message: 'No se obtuvo el ID del registro insertado',
                status: Status.internalServerError
            });
        }

        // 3) Recuperar y devolver el registro completo
        const [row] = await executeQuery(
            `SELECT * FROM planes WHERE id = ?`,
            [newId]
        );
        if (!row) {
            throw new CustomException({
                title: 'Error al crear plan',
                message: `No se pudo recuperar el registro con id=${newId}`,
                status: Status.internalServerError
            });
        }

        return Plan.fromJson(row);

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error creando plan',
            message: err.message,
            stack: err.stack
        });
    }
}