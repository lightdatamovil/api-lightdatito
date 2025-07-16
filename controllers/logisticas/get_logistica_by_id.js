import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';

/**
 * Retrieve a single logística by ID.
 * @param {number|string} id - The ID of the logística to fetch.
 * @returns {Object} The plain logística object.
 * @throws {CustomException} If not found or on query error.
 */
export async function getLogisticaById(id) {
    try {
        const sql = `
      SELECT
        l.id,
        l.did,
        l.nombre,
        l.url_imagen,

        -- Objeto PLAN
        JSON_OBJECT(
          'id',     pl.id,
          'nombre', pl.nombre,
          'color',  pl.color
        ) AS plan_json,

        -- Objeto ESTADO
        JSON_OBJECT(
          'id',     el.id,
          'nombre', el.nombre,
          'color',  el.color
        ) AS estado_json,

        l.codigo,
        l.password_soporte,
        l.cuit,
        l.email,
        l.url_sistema,

        -- Objeto PAÍS
        JSON_OBJECT(
          'id',        p.id,
          'nombre',    p.nombre,
          'codigo_iso',p.codigo_iso
        ) AS pais_json
        FROM logisticas l
            INNER JOIN planes            pl ON l.plan_id             = pl.id
            INNER JOIN estados_logistica el ON l.estado_logistica_id  = el.id
            INNER JOIN paises            p  ON l.pais_id             = p.id
            WHERE l.id = ?
            LIMIT 1;
        `;

        const rows = await executeQuery(sql, [id]);

        if (rows.length === 0) {
            throw new CustomException({
                title: 'Logística no encontrada',
                message: `No existe una logística con id=${id}`,
                status: 404
            });
        }

        const row = rows[0];

        // Parseamos JSON de MySQL si viene como string
        const plan = typeof row.plan_json === 'string'
            ? JSON.parse(row.plan_json)
            : row.plan_json;
        const estado = typeof row.estado_json === 'string'
            ? JSON.parse(row.estado_json)
            : row.estado_json;
        const pais = typeof row.pais_json === 'string'
            ? JSON.parse(row.pais_json)
            : row.pais_json;

        // Creamos el objeto plain
        const logistica = {
            id: row.id,
            did: row.did,
            nombre: row.nombre,
            url_imagen: row.url_imagen,
            plan: plan,
            estado_logistica: estado,
            codigo: row.codigo,
            password_soporte: row.password_soporte,
            cuit: row.cuit,
            email: row.email,
            url_sistema: row.url_sistema,
            pais: pais
        };

        return logistica;
    } catch (err) {
        if (err instanceof CustomException) {
            throw err;
        }
        throw new CustomException({
            title: 'Error al obtener logística',
            message: err.message,
            stack: err.stack
        });
    }
}
