import { executeQuery } from "../../db.js";
import CustomException from "../../models/custom_exception.js";

// 1. Conteo por fecha
export async function graficosPorFecha(desde, hasta) {
  try {
    const rows = await executeQuery(
      `
          SELECT 
            DATE(autofecha) AS fecha,
            COUNT(*) AS total
          FROM logs_v2
          WHERE autofecha BETWEEN ? AND ?
          GROUP BY fecha
          ORDER BY fecha ASC
        `,
      [desde, hasta]
    );

    const resultado = {};
    const fechaInicio = new Date(desde);
    const fechaFin = new Date(hasta);

    for (
      let f = new Date(fechaInicio);
      f <= fechaFin;
      f.setDate(f.getDate() + 1)
    ) {
      const clave = f.toISOString().slice(0, 10);
      resultado[clave] = 0;
    }

    for (const row of rows) {
      resultado[row.fecha] = row.total;
    }

    return resultado;
  } catch (error) {
    throw new CustomException({
      title: "Error en gráfico por fecha",
      message: error.message,
      stack: error.stack,
    });
  }
}
