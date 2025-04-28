export async function getProyectoById(id) {
    const rows = await executeQuery('SELECT * FROM proyectos WHERE id = ?', [id]);
    return rows.length ? Proyecto.fromJson(rows[0]) : null;
}