import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';


export async function createEstadoticket(req) {
    const { nombre, color } = req.body;
    const nombre_limpio = nombre.trim().toLowerCase();

    const verify = await executeQuery(`SELECT id FROM estados_ticket WHERE nombre = LOWER(?) LIMIT 1`,
        [nombre_limpio],
    );
    if (verify.length === 1) {
        throw new CustomException({
            title: 'Estado ticket duplicado',
            message: `Ya existe un estado con nombre "${nombre_limpio}" `,
            status: Status.conflict
        });
    }

    const result = await executeQuery(
        `INSERT INTO estados_ticket (nombre, color) VALUES (?, ?)`,
        [nombre, color]
    );

    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error al crear estado_ticket',
            message: 'No se obtuvo el ID del registro insertado',
            status: Status.internalServerError
        });
    }
    return newId;
}
