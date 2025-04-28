export async function createPlan(data) {
    const fields = Object.keys(data);
    if (!fields.length) throw new Error('No data provided for createPlan');
    const placeholders = fields.map(() => '?').join(', ');
    const query = `INSERT INTO plan (${fields.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const rows = await executeQuery(query, Object.values(data));
    return Plan.fromJson(rows[0]);
}