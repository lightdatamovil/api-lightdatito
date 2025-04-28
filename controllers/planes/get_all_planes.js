export async function getAllPlanes() {
    const rows = await executeQuery('SELECT * FROM plan WHERE eliminado = 0');
    return rows.map(r => Plan.fromJson(r));
}