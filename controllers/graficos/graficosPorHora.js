import { executeQuery } from "../../db.js";
import { logCyan } from "../../src/funciones/logsCustom.js";

export async function getHourlyByCompany(tipoQr, start, end, logisticasElegidas) {
  logCyan(`getHourlyByCompany tipoQr: ${tipoQr}, start: ${start}, end: ${end}, logisticasElegidas: ${logisticasElegidas}`);
  let q = '';
  let params = [`${start} 00:00:00`, `${end} 23:59:59`];

  if (logisticasElegidas && logisticasElegidas.length > 0) {
    q = `AND empresa IN (${logisticasElegidas.map(() => '?').join(', ')})`;
    params = params.concat(logisticasElegidas);
  }

  let query = `
  SELECT 
    empresa, 
    HOUR(autofecha) AS hour, 
    COUNT(*) AS cantidad
  FROM logs_v2
  WHERE autofecha >= ? 
  AND autofecha <= ?
  AND exito = 1
  AND resultado like "%true%"
  ${q}
  GROUP BY empresa, HOUR(autofecha)
  `;

  const rows = await executeQuery(
    query,
    params,
    true,
    tipoQr
  );

  // Obtener todas las empresas únicas
  const empresasSet = new Set(rows.map((row) => row.empresa));
  const empresas = [...empresasSet].sort();

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
