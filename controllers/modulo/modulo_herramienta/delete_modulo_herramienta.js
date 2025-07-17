import { executeQuery } from '../../../db.js';
import CustomException from '../../../models/custom_exception.js';
import { Status } from '../../../models/status.js';

export async function deleteModuloHerramienta(req) {
    const { moduloId } = req.params;
    const { herramientaId } = req.body;

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


}