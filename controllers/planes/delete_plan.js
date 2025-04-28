export async function deletePlan(id) {
    await executeQuery('UPDATE plan SET eliminado = 1 WHERE id = ?', [id]);
    return { id };
}