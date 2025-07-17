import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

/**
 * Retrieve a single logística by ID, including its history of previous names, plans, and estados.
 * @param {number|string} id - The ID of the logística to fetch.
 * @returns {Object} The plain logística object with nested fields and history.
 * @throws {CustomException} If not found or on query error.
 */
export async function getLogisticaById(req) {
  const { id } = req.params;
  const sql = `
      SELECT
        l.id,
        l.did,
        l.nombre,
        l.url_imagen,
        l.codigo,
        l.password_soporte,
        l.cuit,
        l.email,
        l.url_sistema,

        -- Objeto PLAN actual
        JSON_OBJECT(
          'id',     pl.id,
          'nombre', pl.nombre,
          'color',  pl.color
        ) AS plan_json,

        -- Objeto ESTADO actual
        JSON_OBJECT(
          'id',     el.id,
          'nombre', el.nombre,
          'color',  el.color
        ) AS estado_json,

        -- Objeto PAÍS
        JSON_OBJECT(
          'id',        p.id,
          'nombre',    p.nombre,
          'codigo_iso',p.codigo_iso
        ) AS pais_json,

        -- Historial de nombres
        (
          SELECT CONCAT(
            '[',
            IFNULL(
              GROUP_CONCAT(
                JSON_QUOTE(hn.nombre_anterior)
                ORDER BY hn.fecha_cambio
                SEPARATOR ','
              ),
              ''
            ),
            ']'
          )
          FROM historial_nombres_logistica hn
          WHERE hn.logisticas_id = l.id
        ) AS historial_nombres_json,

        -- Historial de planes
        (
          SELECT CONCAT(
            '[',
            IFNULL(
              GROUP_CONCAT(
                JSON_OBJECT(
                  'plan_anterior', ppa.nombre,
                  'plan_nuevo',    ppn.nombre,
                  'fecha_cambio',  DATE_FORMAT(hp.fecha_cambio, '%Y-%m-%d %H:%i:%s')
                )
                ORDER BY hp.fecha_cambio SEPARATOR ','
              ),
              ''
            ),
            ']'
          )
          FROM historial_plan_logistica hp
          LEFT JOIN planes ppa ON hp.plan_anterior_id = ppa.id
          LEFT JOIN planes ppn ON hp.plan_nuevo_id    = ppn.id
          WHERE hp.logisticas_id = l.id
        ) AS historial_planes_json,

        -- Historial de estados
        (
          SELECT CONCAT(
            '[',
            IFNULL(
              GROUP_CONCAT(
                JSON_OBJECT(
                  'estado_anterior', ea.nombre,
                  'estado_nuevo',    en.nombre,
                  'fecha_cambio',     DATE_FORMAT(he.fecha_cambio, '%Y-%m-%d %H:%i:%s')
                )
                ORDER BY he.fecha_cambio SEPARATOR ','
              ),
              ''
            ),
            ']'
          )
          FROM historial_estado_logistica he
          LEFT JOIN estados_logistica ea ON he.estado_anterior_id = ea.id
          LEFT JOIN estados_logistica en ON he.estado_nuevo_id    = en.id
          WHERE he.logisticas_id = l.id
        ) AS historial_estados_json

      FROM logisticas l
      LEFT JOIN planes             pl ON l.plan_id             = pl.id
      LEFT JOIN estados_logistica  el ON l.estado_logistica_id  = el.id
      LEFT JOIN paises             p  ON l.pais_id             = p.id
      WHERE l.id = ?
      LIMIT 1;
    `;

  const rows = await executeQuery(sql, [id]);
  if (rows.length === 0) {
    throw new CustomException({
      title: 'Logística no encontrada',
      message: `No existe una logística con id=${id}`,
      status: Status.notFound
    });
  }

  const row = rows[0];

  // Parseo de campos JSON
  const plan = typeof row.plan_json === 'string' ? JSON.parse(row.plan_json) : row.plan_json;
  const estado = typeof row.estado_json === 'string' ? JSON.parse(row.estado_json) : row.estado_json;
  const pais = typeof row.pais_json === 'string' ? JSON.parse(row.pais_json) : row.pais_json;
  const nombres = typeof row.historial_nombres_json === 'string' ? JSON.parse(row.historial_nombres_json) : row.historial_nombres_json;
  const planesHist = typeof row.historial_planes_json === 'string' ? JSON.parse(row.historial_planes_json) : row.historial_planes_json;
  const estadosHist = typeof row.historial_estados_json === 'string' ? JSON.parse(row.historial_estados_json) : row.historial_estados_json;

  // Construcción del objeto plain con anidación y historiales
  return {
    id: row.id,
    did: row.did,
    nombre: row.nombre,
    url_imagen: row.url_imagen,
    plan_id: plan,
    estado_logistica_id: estado,
    codigo: row.codigo,
    password_soporte: row.password_soporte,
    cuit: row.cuit,
    email: row.email,
    url_sistema: row.url_sistema,
    pais: pais,
    historial_nombres: nombres,
    historial_planes: planesHist,
    historial_estados: estadosHist
  };
}

