import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';


export async function deletePuesto(id) {
    try {
        await executeQuery('UPDATE puestos SET eliminado = 1, fecha_eliminado = NOW() WHERE id = ?', [id]);
        return { id };
    } catch (error) {
        throw new CustomException(
            'Error creating puesto_usuario',
            error.message,
            error.stack
        );
    }
}
