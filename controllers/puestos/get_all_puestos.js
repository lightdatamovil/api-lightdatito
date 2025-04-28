export async function getAllPuestos() {
    const rows = await executeQuery('SELECT * FROM puestos WHERE eliminado = 0');
    return rows.map(r => PuestoUsuario.fromJson(r));
}