export async function deleteProyecto(id) {
    await executeQuery('DELETE FROM proyectos WHERE id = ?', [id]);
    return { id };
}