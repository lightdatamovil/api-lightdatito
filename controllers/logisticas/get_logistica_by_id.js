import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import Logistica from '../../models/logistica.js';

/**
 * Retrieve a single logistica by ID.
 * @param {number|string} id - The ID of the logistica to fetch.
 * @returns {Logistica|null} The Logistica instance, or null if not found.
 */
export async function getLogisticaById(id) {
    try {
        const rows = await executeQuery(
            ` SELECT
        l.id,
        l.did,
        l.nombre,
        l.url_imagen,

        -- PLAN
        pl.id   AS plan_id,
        pl.nombre AS plan_nombre,
        pl.color  AS plan_color,

        -- ESTADO
        el.id     AS estado_logistica_id,
        el.nombre AS estado_nombre,
        el.color  AS estado_color,

        l.codigo,
        l.password_soporte,
        l.cuit,
        l.email,
        l.url_sistema,

        -- PAIS
        p.id        AS pais_id,
        p.nombre    AS pais_nombre,
        p.codigo_iso AS pais_codigo_iso
      FROM logisticas l
        LEFT JOIN planes            pl ON l.plan_id               = pl.id
        LEFT JOIN estados_logistica el ON l.estado_logistica_id    = el.id
        LEFT JOIN paises            p  ON l.pais_id               = p.id
      WHERE l.id = ?
      LIMIT 1;
`,
            [id]
        );

        if (rows.length === 0) {
            throw new CustomException({
                title: 'Logística no encontrada',
                message: `No existe una logística con id=${id}`,
                status: 404
            });
        }

        return rows[0];
    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al obtener logística',
            message: err.message,
            stack: err.stack
        });
    }
}