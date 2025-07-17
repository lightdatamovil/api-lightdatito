import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';


export async function addModuloHerramienta(req) {
    const { moduloId } = req.params;
    const { herramientaId } = req.body;
    // 1) Verificar que el módulo exista y no esté eliminado
    const existsModulo = await executeQuery(
        `SELECT 1 FROM modulos WHERE id = ? AND eliminado = 0  LIMIT 1`,
        [moduloId],
        true
    );
    if (!existsModulo || existsModulo.length === 0) {
        throw new CustomException({
            title: 'Módulo no encontrado',
            message: `No existe un módulo activo con id=${moduloId}`,
            status: Status.notFound
        });
    }

    // 2) Verificar que la herramienta exista y no esté eliminada
    const existsHerramienta = await executeQuery(
        `SELECT 1 FROM herramientas WHERE id = ? AND eliminado = 0 LIMIT 1`,
        [herramientaId], true
    );
    if (!existsHerramienta || existsHerramienta.length === 0) {
        throw new CustomException({
            title: 'Herramienta no encontrada',
            message: `No existe una herramienta activa con id=${herramientaId}`,
            status: Status.notFound
        });
    }

    // 3) Insertar la relación
    const result = await executeQuery(
        `INSERT INTO modulo_herramienta (modulo_id, herramienta_id) VALUES (?, ?)`,
        [moduloId, herramientaId],
        true
    );

    if (!result || !result.insertId) {
        throw new CustomException({
            title: 'Error creando asignación módulo_herramienta',
            message: 'No se pudo guardar la relación',
            status: Status.internalServerError
        });
    }

    return {
        id: result.insertId,
        modulo_id: moduloId,
        herramienta_id: herramientaId
    };


}
