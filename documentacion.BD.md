# 📚 Documentación de la Base de Datos `lightdatito`

---

## Índice

1. [Visión General](#visión-general)
2. [Configuración Inicial](#configuración-inicial)
3. [Tablas y Columnas](#tablas-y-columnas)

   * [Patrón Soft‑Delete](#patrón-soft‑delete)
4. [Relaciones e Índices](#relaciones-e-índices)
5. [Triggers](#triggers)

   * [Metadatos de Países](#metadatos-de-países)
   * [Soft‑Delete en Logísticas](#soft‑delete-en-logísticas)
   * [Historial de Cambios](#historial-de-cambios)
6. [Procedimientos Almacenados](#procedimientos-almacenados)
7. [Consultas de Ejemplo](#consultas-de-ejemplo)
8. [Versionado y Migraciones](#versionado-y-migraciones)

---

## 1. Visión General

El esquema **`lightdatito`** está diseñado para gestionar:

* Usuarios, proyectos y tickets
* Datos de logísticas y sus estados/planes
* Menús, módulos y herramientas de la interfaz segun plan
* Auditoría de cambios (historial)
* Soft‑delete (eliminación lógica) en todas las entidades críticas

## 2. Configuración Inicial

Antes de crear el esquema o aplicar migraciones, se realizan ajustes para asegurar integridad y consistencia:

1. **Desactivación temporal de comprobaciones**

   ```sql
   SET @OLD_UNIQUE_CHECKS      = @@UNIQUE_CHECKS,       UNIQUE_CHECKS      = 0;
   SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,  FOREIGN_KEY_CHECKS = 0;
   ```
2. **Modo SQL estricto**

   ```sql
   SET @OLD_SQL_MODE = @@SQL_MODE;
   SET SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
   ```
3. **Creación del esquema**

   ```sql
   CREATE SCHEMA IF NOT EXISTS `lightdatito` DEFAULT CHARACTER SET utf8;
   USE `lightdatito`;
   ```
4. **Restauración al final**

   ```sql
   SET SQL_MODE            = @OLD_SQL_MODE;
   SET FOREIGN_KEY_CHECKS  = @OLD_FOREIGN_KEY_CHECKS;
   SET UNIQUE_CHECKS       = @OLD_UNIQUE_CHECKS;
   ```

## 3. Tablas y Columnas

El esquema incluye tablas para:

* **usuarios**, **proyectos**, **tickets** (gestión de incidencias)
* **logisticas**, **paises**, **planes**, **estados\_logistica** (catálogos de logisticas)
* **menus**, **modulos**, **herramientas** (estructura de interfaz contratada)
* **particularidades**, **comentarios**, **historiales** (datos auxiliares)

### Patrón Soft‑Delete

* Cada tabla clave dispone de las columnas:

  * `eliminado` (TINYINT): 0 = activo, 1 = eliminado
  * `fecha_eliminado` (DATETIME): timestamp de la baja lógica
* Las operaciones DELETE físicas no se utilizan en tablas con historial: se marca `eliminado = 1`.
* Las consultas principales deben incluir siempre `WHERE eliminado = 0`.

## 4. Relaciones e Índices

* **Integridad referencial** via InnoDB y claves foráneas:

  * `logisticas.pais_id → paises.id`, `logisticas.plan_id → planes.id`
  * `tickets.logistica_id → logisticas.id`, `ticket.proyecto_id → proyectos.id`
  * Tablas junction: `menu_plan`, `modulo_herramienta`, `puestos_usuario`
* **Índices**: cada FK y campo de búsqueda frecuente dispone de índice (`idx_*`) para mejorar rendimiento.

## 5. Triggers

Para enriquecer metadatos y auditar cambios se usan triggers minimalistas:

### Metadatos de Países

* **INSERT / reactivación** en `logisticas`: si `existe_en_sistema = 0`, se actualiza a `1`.
* **UPDATE soft-delete** (`eliminado: 0 → 1`): si era el último activo y `existe_en_sistema = 1`, se pone a `0`.

### Soft‑Delete en Logísticas

* **Trigger AFTER UPDATE** en `logisticas`: detecta cambio `eliminado` y limpia `paises.existe_en_sistema` cuando corresponda.

### Historial de Cambios

Cada operación crítica escribe en su tabla de historial solo si realmente cambió el valor:

| Área                    | AFTER INSERT                         | AFTER UPDATE                       |
| ----------------------- | ------------------------------------ | ---------------------------------- |
| **Nombre Logística**    | Inserta con `nombre_anterior = NULL` | Si cambia `nombre`                 |
| **Estado Logística**    | Inserta estado inicial               | Si cambia `estado_logistica_id`    |
| **Plan Logística**      | Inserta plan inicial                 | Si cambia `plan_id`                |
| **Particularidades**    | —                                    | Si cambia `tipo_particularidad_id` |
| **Ticket – Estado**     | Inserta estado inicial               | Si cambia `estado_ticket_id`       |
| **Ticket – Prioridad**  | Inserta prioridad inicial            | Si cambia `prioridad_ticket_id`    |
| **Ticket – Asignación** | Inserta asignación inicial           | Si cambia `usuario_asignado_id`    |

## 6. Procedimientos Almacenados

Se incluyen procedimientos para facilitar mantenimiento y carga masiva:

* **`poblar_paises()`**: inserta catálogo completo (con `ON DUPLICATE KEY UPDATE`).
* **`poblar_estados_logistica()`**, **`poblar_planes()`**, **`poblar_estados_ticket()`**, **`poblar_puestos()`**: carga valores base.
* **`poblar_logisticas()`**: ejemplo de carga masiva de proveedores.
* **`truncate_all_tables()`**: limpia todas las tablas en orden, desactivando/activando FKs.

## 7. Consultas de Ejemplo

```sql
-- Listar proveedores activos de un país
SELECT l.*
FROM logisticas l
WHERE l.pais_id = ? AND l.eliminado = 0;

-- Obtener historial de estado de un ticket
SELECT *
FROM historial_estados_ticket
WHERE ticket_id = ?
ORDER BY fecha_cambio DESC;

-- Contar logística por país para actualizar manualmente
SELECT pais_id, COUNT(*)
FROM logisticas
WHERE eliminado = 0
GROUP BY pais_id;
```

## 8. Versionado 

* **Forward Engineering**: todo el DDL se exporta en scripts en este repositorio en **`lightdatitosql.md`**
* **Rollback y limpieza**: `truncate_all_tables()` para entornos de pruebas




