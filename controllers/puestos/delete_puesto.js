export async function deletePuesto(id) {
    await executeQuery('UPDATE puestos SET eliminado = 1 WHERE id = ?', [id]);
    return { id };
}
