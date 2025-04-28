export async function createObservacionEmpresa(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createObservacionEmpresa');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO observaciones_logistica (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return ObservacionEmpresa.fromJson(rows[0]);
}