/**
 * Create a new usuario and return the full inserted record.
 * @param {Object} data - nombre, url_imagen, tipo_usuario_id, email, etc.
 * @returns {Usuario}
 */
export async function createUsuario(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createUsuario');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO usuarios (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return Usuario.fromJson(rows[0]);
}