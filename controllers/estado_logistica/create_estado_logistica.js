import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import EstadoLogistica from '../../models/estado_logistica.js';
import { Status } from '../../models/status.js';
import { getEstadoLogisticaById } from './get_estado_logistica_by_id.js';

/**
 * Create a new estado_logistica and return the inserted record.
 * @param {Object} data - Fields and values for the new estado.
 * @returns {EstadoLogistica} The created EstadoLogistica instance.
 */
export async function createEstadoLogistica(req) {
    const { nombre, color } = req.body;
    // TERMINAR ACA
    //verificar si ya existe estadoLogistica -- agregarle toLowerCase() en consulta
    const res = await executeQuery(`SELECT id FROM estados_logistica WHERE LOWER(nombre) = LOWER(?) LIMIT 1`, [nombre]
    );
    if (res.length === 1) {
        throw new CustomException({
            title: 'Estado logistica duplicado',
            message: `Ya existe un estado logistica con nombre "${nombre}" `,
            status: Status.conflict
        });
    }

    // 1) Inserción
    const result = await executeQuery(`INSERT INTO estados_logistica (nombre, color) VALUES (?, ?)`, [nombre, color]
    );

    // 2) Obtener el ID recién insertado
    const newId = result.insertId;
    if (!newId) {
        throw new CustomException({
            title: 'Error al crear estado_logistica',
            message: 'No se obtuvo el ID del registro insertado',
            status: Status.internalServerError
        });
    }

    return newId
}