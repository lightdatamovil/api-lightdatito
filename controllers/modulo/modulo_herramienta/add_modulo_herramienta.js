import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';


export async function addModuloHerramienta(moduloId, herramientaId) {
    // 1) Verificar que el módulo exista (y no esté eliminado)
    const [modulo] = await executeQuery(
        `SELECT id FROM modulos WHERE id = ? AND eliminado = 0`,
        [moduloId]
    );
    if (!modulo) {
        throw new CustomException
            ({
                title: 'Módulo no encontrado',
                message: `No existe un módulo con id=${moduloId}`,
                status: Status.notFound
            });
    }

    // 2) Verificar que la herramienta exista (y no esté eliminada)
    const [herramienta] = await executeQuery(
        `SELECT id FROM herramientas WHERE id = ? AND eliminado = 0`,
        [herramientaId]
    );
    if (!herramienta) {
        throw new CustomException({
            title: 'Herramienta no encontrada',
            message: `No existe una herramienta con id=${herramientaId}`,
            status: Status.notFound
        });
    }

    // 3) Insertar la relación
    const result = await executeQuery(
        `INSERT INTO modulo_herramienta (modulo_id, herramienta_id) VALUES (?, ?)`,
        [moduloId, herramientaId]
    );

    return {
        id: result.insertId,
        modulo_id: moduloId,
        herramienta_id: herramientaId
    };
}
