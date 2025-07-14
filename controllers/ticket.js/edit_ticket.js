import { executeQuery } from '../../db.js';
import CustomException from '../../models/custom_exception.js';
import { getTipoticketById } from '../tipo_ticket.js/get_tipo_ticket_by_id.js';



export async function updateticket(id, data) {
    try {
        const fields = Object.keys(data);
        if (!fields.length) throw new CustomException('No data provided for updateticket');
        const setClause = fields.map(f => `${f} = ?`).join(', ');
        await executeQuery(
            `UPDATE tickets SET ${setClause} WHERE id = ?`,
            [...Object.values(data), id]
        );
        return getTipoticketById(id);
    } catch (error) {
        throw new CustomException(
            'Error creating estado_logistica',
            error.message,
            error.stack
        );
    }
}