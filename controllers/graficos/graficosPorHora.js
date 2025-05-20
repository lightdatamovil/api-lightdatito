import { executeQuery } from "../../db.js";

export async function getHourlyByCompany(tipoQr, start, end) {
  const query = `
  SELECT 
    empresa, 
    HOUR(autofecha) AS hour, 
    COUNT(*) AS cantidad
  FROM logs_v2
  WHERE autofecha >= ? 
    AND autofecha <  ?  /* o <= ? si preferís inclusive */
  GROUP BY empresa, HOUR(autofecha)
`;

  const startDateTime = `${start} 00:00:00`;
  const endDateTime = `${end}   23:59:59`;

  const rows = await executeQuery(
    query,
    [startDateTime, endDateTime],
    true,
    tipoQr
  );
  // Obtener todas las empresas únicas
  const empresasSet = new Set(rows.map((row) => row.empresa));
  const empresas = [...empresasSet].sort(); // ordena para que el resultado sea consistente
  // Crear estructura base con horas 00 a 23
  const result = Array.from({ length: 24 }, (_, h) => {
    const hourLabel = h.toString().padStart(2, "0") + "hs";
    return {
      hour: hourLabel,
      values: empresas.map((empresa) => ({
        company: empresa,
        value: 0,
      })),
    };
  });

  // Insertar los valores reales
  for (const row of rows) {
    const hourIndex = parseInt(row.hour);
    const empresaIndex = empresas.indexOf(row.empresa);
    if (hourIndex >= 0 && empresaIndex >= 0) {
      result[hourIndex].values[empresaIndex].value = row.cantidad;
    }
  }

  return result;
}