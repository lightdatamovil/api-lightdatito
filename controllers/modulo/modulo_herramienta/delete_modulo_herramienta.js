import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';

export async function deleteModuloHerramienta(params, body) {
    const { moduloId } = params;
    const { herramientaId } = body;

    try {
        // 1) Intento directo de soft‐delete y compruebo cuántas filas afectó
        const result = await executeQuery(
            `UPDATE modulo_herramienta
          SET eliminado      = 1,
              fecha_eliminado = NOW()
        WHERE modulo_id      = ?
          AND herramienta_id = ?
          AND eliminado      = 0`,
            [moduloId, herramientaId],
            true
        );

        // 2) Si no afectó ninguna fila, esa asignación no existe o ya fue eliminada
        if (result.affectedRows === 0) {
            throw new CustomException({
                title: 'Asignación no encontrada',
                message: `No existe la herramienta id: ${herramientaId} asignada al módulo id=${moduloId}, o ya fue eliminada.`,
                status: Status.notFound
            });
        }

        return {
            message: `Herramienta id: ${herramientaId} desasignada del módulo id: ${moduloId} correctamente`
        };

    } catch (err) {
        if (err instanceof CustomException) throw err;
        throw new CustomException({
            title: 'Error al eliminar asignación módulo_herramienta',
            message: err.message,
            stack: err.stack
        });
    }
}