export async function getAllTipoReporte() {
    const rows = await executeQuery('SELECT * FROM tipo_reporte');
    return rows.map(r => TipoReporte.fromJson(r));
}