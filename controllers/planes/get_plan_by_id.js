export async function getPlanById(id) {
    const rows = await executeQuery('SELECT * FROM plan WHERE id = ? AND eliminado = 0', [id]);
    return rows.length ? Plan.fromJson(rows[0]) : null;
}