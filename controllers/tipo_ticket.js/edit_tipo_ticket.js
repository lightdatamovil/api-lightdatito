import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { Status } from '../../models/status.js';
import { getTipoticketById } from './get_tipo_ticket_by_id.js';


export async function updateTipoticket(id, data) {
    try {
        // 1) Verificar que exista el tipo de ticket
        const [row] = await executeQuery('SELECT id FROM tipo_ticket WHERE id = ?', [id], true);
        if (!row) {
            throw new CustomException({
                title: 'Tipo ticket no encontrado',
                message: `No existe un tipo_ticket con id=${id}`,
                status: Status.badRequest
            });
        }
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateTipoticket');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(`UPDATE tipo_ticket SET ${setClause} WHERE id = ?`, [...Object.values(data), id]);
        return getTipoticketById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}