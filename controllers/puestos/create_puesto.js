export async function createPuesto(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createPuesto');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO puestos (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return PuestoUsuario.fromJson(rows[0]);
}