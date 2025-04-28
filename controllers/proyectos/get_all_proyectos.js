export async function getAllProyectos() {
    const rows = await executeQuery('SELECT * FROM proyectos');
    return rows.map(r => Proyecto.fromJson(r));
}