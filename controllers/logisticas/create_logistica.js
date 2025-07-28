import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';

export async function createLogistica(req) {
    const { did, nombre, url_imagen, plan_id, estado_logistica_id, codigo, password_soporte, cuit, email, url_sistema, pais_id, modulo_id } = req.body;

    const queryVerificarSiExiste = `SELECT id AS count FROM logisticas WHERE cuit=? OR did =? OR email =? AND eliminado = 0 LIMIT 1`;
    const logistica = await executeQuery(queryVerificarSiExiste, [cuit, did, email]);
    if (logistica.length > 0) {
        throw new CustomException({
            title: 'Logistica duplicada',
            message: `Ya existe una logistica con nombre ${cuit}, did ${did} o email ${email}`,
            status: Status.conflict
        });
    }

    const queryVerificarPlan = `SELECT id FROM planes WHERE id = ? AND eliminado = 0 LIMIT 1`;
    const [plan] = await executeQuery(queryVerificarPlan, [plan_id]);
    if (!plan) {
        throw new CustomException({
            title: 'Plan inválido',
            message: `No existe un plan con id: ${plan_id}`,
            statis: Status.notFound
        });
    }

    const queryVerificarEstadosLogistica = `SELECT id FROM estados_logistica WHERE id = ? AND eliminado = 0 LIMIT 1`;
    const [estado] = await executeQuery(queryVerificarEstadosLogistica, [estado_logistica_id]);
    if (!estado) {
        throw new CustomException({
            title: 'EstadoLogistica inválido',
            message: `No existe un estado_logistica con id: ${estado_logistica_id}`,
            status: Status.notFound
        });
    }

    const queryVerificarPais = `SELECT id FROM paises WHERE id = ? LIMIT 1`;
    const [pais] = await executeQuery(queryVerificarPais, [pais_id]);
    if (!pais) {
        throw new CustomException({
            title: 'País inválido',
            message: `No existe un país con id: ${pais_id}`,
            status: Status.notFound
        });
    }
    if (modulo_id && modulo_id !== 0 && !Number.isNaN(modulo_id)) {
        const queryVerificarModulo = `SELECT id FROM modulos WHERE id = ? LIMIT 1`;
        const [modulo] = await executeQuery(queryVerificarModulo, [modulo_id]);
        if (!modulo) {
            throw new CustomException({
                title: 'Módulo inválido',
                message: `No existe un módulo con id: ${modulo_id}`,
                status: Status.notFound
            });
        }
    } else {
        modulo_id = null;
    }
    // preguntar: es necesario que se vuelvan a hacer las verrificaacones si existe los emtodos, e problema es qu los metodoos reciben body, como los reutilizo  

    const queryInsertLogistica = `INSERT INTO logisticas
           (did, nombre, url_imagen, plan_id, estado_logistica_id,
            codigo, password_soporte, cuit, email, url_sistema, pais_id, modulo_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const valuesQueryInsertLogistica = [
        did,
        nombre,
        url_imagen,
        plan_id,
        estado_logistica_id,
        codigo,
        password_soporte,
        cuit,
        email,
        url_sistema,
        pais_id,
        modulo_id
    ];
    const result = await executeQuery(queryInsertLogistica, valuesQueryInsertLogistica);

    const newId = result.insertId;

    if (!newId) {
        throw new CustomException({
            title: 'Error al crear logística',
            message: 'No se obtuvo el ID del registro insertado',
            status: Status.internalServerError
        });
    }
    return newId;
}