-- MySQL Workbench Forward Engineering

-- 1) Guardamos el valor actual de UNIQUE_CHECKS
SET 
  @OLD_UNIQUE_CHECKS       = @@UNIQUE_CHECKS,
  UNIQUE_CHECKS            = 0;

-- 2) Guardamos el valor actual de FOREIGN_KEY_CHECKS
SET
  @OLD_FOREIGN_KEY_CHECKS  = @@FOREIGN_KEY_CHECKS,
  FOREIGN_KEY_CHECKS       = 0;

-- 3) Guardamos el SQL_MODE actual
SET
  @OLD_SQL_MODE            = @@SQL_MODE,
  SQL_MODE                 = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema lightdatito
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `lightdatito`;
CREATE SCHEMA IF NOT EXISTS `lightdatito` DEFAULT CHARACTER SET utf8;
USE `lightdatito`;

-- -----------------------------------------------------
-- Table `usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id`             INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre`         VARCHAR(45) NOT NULL,
  `email`          VARCHAR(45) NULL,
  `password`       VARCHAR(256)NOT NULL,
  `url_imagen`     VARCHAR(256)NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`      TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `proyectos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectos` (
  `id`     INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `fecha_creacion`  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_finalizado` datetime,
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-------------------------------------------------------
-- Table `tipo_ticket`
-------------------------------------------------------
CREATE TABLE IF NOT EXISTS `tipo_ticket` (
  `id`     INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `color`  VARCHAR(7)  NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-------------------------------------------------------
-- Table `prioridades`
-------------------------------------------------------
CREATE TABLE IF NOT EXISTS `prioridades` (
  `id`     INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `color`  VARCHAR(7)  NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `estados_logistica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estados_logistica` (
  `id`     INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `color`  VARCHAR(7)  NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `paises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paises` (
  `id`        INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre`    VARCHAR(45) NOT NULL,
  `codigo_iso` VARCHAR(45)NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `planes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `planes` (
  `id`            INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre`        VARCHAR(45) NOT NULL,
  `color`         VARCHAR(7)  NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Tabla `menus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `menus` (
  `id`     INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--------------------------------------------------------
-- Junction `menu_plan`
-- Relaciona N menus ↔ N planes
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS `menu_plan` (
  `id` INT(11) NOT NULL,
  `menu_id` INT(11) NOT NULL,
  `plan_id` INT(11) NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_mp_plan` (`plan_id`),
  INDEX `idx_mp_menu` (`menu_id`),
  CONSTRAINT `fk_mp_menu` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_mp_plan` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Tabla `modulo`
-- Cada módulo pertenece a un único menú (1–N)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `modulos` (
  `id`       INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre`   VARCHAR(45) NOT NULL,
  `menu_id`  INT(11)     NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_mod_menu` (`menu_id`),
  CONSTRAINT `fk_mod_menu` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Tabla `herramientas`
-- Cada herramienta pertenece a un único módulo (1–N)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `herramientas` (
  `id`         INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre`     VARCHAR(45) NOT NULL,
  `modulo_principal`  INT(11)  NOT NULL DEFAULT 0,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_her_mod` (`modulo_principal`),
  CONSTRAINT `fk_mod_herramienta` FOREIGN KEY (`modulo_principal`) REFERENCES `modulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Relaciona N menus ↔ N planes
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `modulo_herramienta` (
  `id`         INT(11)     NOT NULL AUTO_INCREMENT,
  `modulo_id` INT(11) NOT NULL,
  `herramienta_id` INT(11) NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_eliminado` DATETIME DEFAULT NULL,
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `idx_mp_modulo` (`modulo_id`),
  INDEX `idx_mp_herramienta` (`herramienta_id`),
  CONSTRAINT `fk_mp_modulo` FOREIGN KEY (`modulo_id`) REFERENCES `modulo` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_mp_herramienta` FOREIGN KEY (`herramienta_id`) REFERENCES `herramienta` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Table `tipo_particularidad`
CREATE TABLE IF NOT EXISTS `tipo_particularidad` (
  `id`     INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `color`  VARCHAR(7)  NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table `particularidades`
CREATE TABLE IF NOT EXISTS `particularidades` (
  `id`                     INT(11)     NOT NULL AUTO_INCREMENT,
  `logistica_id`          INT(11)     NOT NULL,
  `es_pago`                TINYINT(1)  NOT NULL DEFAULT 0,
  `particularidad`         VARCHAR(256),
  `tipo_particularidad_id` INT(11)     NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_part_logistica` (`logistica_id`),
  INDEX `idx_part_tipo`      (`tipo_particularidad_id`),
  CONSTRAINT `fk_part_logistica` FOREIGN KEY (`logistica_id`) REFERENCES `logisticas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_part_tipo` FOREIGN KEY (`tipo_particularidad_id`) REFERENCES `tipo_particularidad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table `historial_particularidades`
CREATE TABLE IF NOT EXISTS `historial_particularidades` (
  `id`                       INT(11)     NOT NULL AUTO_INCREMENT,
  `particularidad_id`        INT(11)     NOT NULL,
  `fecha_cambio`             DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo_particularidad_ant`  INT(11)     NULL,
  `tipo_particularidad_new`  INT(11)     NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_hp_part`         (`particularidad_id`),
  INDEX `idx_hp_ant`          (`tipo_particularidad_ant`),
  INDEX `idx_hp_new`          (`tipo_particularidad_new`),
  CONSTRAINT `fk_hp_part`
    FOREIGN KEY (`particularidad_id`) REFERENCES `particularidades` (`id`)
      ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_hp_part_ant`
    FOREIGN KEY (`tipo_particularidad_ant`) REFERENCES `tipo_particularidad` (`id`)
      ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_hp_part_new`
    FOREIGN KEY (`tipo_particularidad_new`) REFERENCES `tipo_particularidad` (`id`)
      ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--------------------------------------------------------
-- Table `logisticas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `logisticas` (
  `id`                 INT(11)     NOT NULL AUTO_INCREMENT,
  `did`                INT(11)     NULL,
  `nombre`             VARCHAR(45) NULL,
  `url_imagen`         VARCHAR(256)NULL,
  `plan_id`            INT(11)     NOT NULL,
  `estado_logistica_id` INT(11)    NOT NULL,
  `codigo`             VARCHAR(6)  NULL,
  `password_soporte`   VARCHAR(45) NULL,
  `cuit`               VARCHAR(45) NULL,
  `email`              VARCHAR(45) NULL,
  `url_sistema`        VARCHAR(256)NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`          TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  `pais_id`            INT(11)     NOT NULL,
  `tipo_particularidad_id`   INT(11)      NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_log_plan` (`plan_id`),
  INDEX `idx_log_estado` (`estado_logistica_id`),
  INDEX `idx_log_pais`   (`pais_id`),
  INDEX `idx_log_particularidad`  (`tipo_particularidad_id`),
  CONSTRAINT `fk_log_plan`
    FOREIGN KEY (`plan_id`) REFERENCES `planes` (`id`),
  CONSTRAINT `fk_log_estado`
    FOREIGN KEY (`estado_logistica_id`) REFERENCES `estados_logistica` (`id`),
  CONSTRAINT `fk_log_pais`
    FOREIGN KEY (`pais_id`) REFERENCES `paises` (`id`),
  CONSTRAINT `fk_log_particularidad`
    FOREIGN KEY (`tipo_particularidad_id`) REFERENCES `tipo_particularidad` (`id`)
      ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Table `estados_ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estados_ticket` (
  `id`     INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `color`  VARCHAR(7)  NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_eliminado` DATETIME DEFAULT NULL,
  `eliminado`  tinyint(1)  NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `tickets`
-- -----------------------------------------------------
CREATE TABLE `tickets` (
  `id`                   INT(11)      NOT NULL AUTO_INCREMENT,
  `titulo`               VARCHAR(45)  NULL,
  `descripcion`          VARCHAR(45)  NULL,
  `fecha_creacion`       TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP(),
  `fecha_limite`         TIMESTAMP    NULL,
  `tipo_ticket_id`       INT(11)      NOT NULL,
  `observador`           INT(11)      NOT NULL,
  `proyecto_id`          INT(11)      NOT NULL,
  `logistica_id`         INT(11)      NOT NULL,
  `eliminado`            TINYINT(1)   NOT NULL DEFAULT 0,
  `fecha_eliminado`      DATETIME     DEFAULT NULL,
  `estado_ticket_id`     INT(11)      NOT NULL DEFAULT 1,
  `prioridad_ticket_id`  INT(11)      NOT NULL DEFAULT 1,
  `usuario_asignado_id`  INT(11)      NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_rep_tipo`    (`tipo_ticket_id`),
  INDEX `idx_rep_obs`     (`observador`),
  INDEX `idx_rep_proj`    (`proyecto_id`),
  INDEX `idx_rep_log`     (`logistica_id`),
  INDEX `idx_rep_estado`  (`estado_ticket_id`),
  INDEX `idx_rep_prio`    (`prioridad_ticket_id`),
  INDEX `idx_asig_resp`   (`usuario_asignado_id`),
  CONSTRAINT `fk_rep_tipo`     FOREIGN KEY (`tipo_ticket_id`)       REFERENCES `tipo_ticket`    (`id`),
  CONSTRAINT `fk_rep_obs`      FOREIGN KEY (`observador`)           REFERENCES `usuarios`        (`id`),
  CONSTRAINT `fk_rep_proj`     FOREIGN KEY (`proyecto_id`)          REFERENCES `proyectos`       (`id`),
  CONSTRAINT `fk_rep_log`      FOREIGN KEY (`logistica_id`)         REFERENCES `logisticas`      (`id`),
  CONSTRAINT `fk_rep_estado`   FOREIGN KEY (`estado_ticket_id`)     REFERENCES `estados_ticket`   (`id`),
  CONSTRAINT `fk_rep_prio`     FOREIGN KEY (`prioridad_ticket_id`)  REFERENCES `prioridades`      (`id`),
  CONSTRAINT `fk_asig_resp`    FOREIGN KEY (`usuario_asignado_id`)   REFERENCES `usuarios`        (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--------------------------------------------------------
-- Table comentarios
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id`             INT(11)      NOT NULL AUTO_INCREMENT,
  `usuario_id`     INT(11)      NOT NULL,
  `ticket_id`     INT(11)      NOT NULL,
  `fecha_creacion` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `contenido`      VARCHAR(255) NOT NULL,
  `eliminado`      TINYINT(1)   NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_com_usuario` (`usuario_id`),
  INDEX `idx_com_ticket` (`ticket_id`),
  CONSTRAINT `fk_com_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_com_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- -----------------------------------------------------
-- Tables historial_asignaciones
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `historial_asignaciones` (
  `id`               INT(11)   NOT NULL AUTO_INCREMENT,
  `ticket_id`    INT(11)   NOT NULL,
  `fecha_cambio`     DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_anterior_id` INT(11)   NULL,
  `usuario_nuevo_id`    INT(11)   NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_ha_asig` (`ticket_id`),
  INDEX `idx_ha_uant`(`usuario_anterior_id`),
  INDEX `idx_ha_unew`(`usuario_nuevo_id`),
  CONSTRAINT `fk_ha_asig`
    FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  CONSTRAINT `fk_ha_uant`
    FOREIGN KEY (`usuario_anterior_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_ha_unew`
    FOREIGN KEY (`usuario_nuevo_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Table `puestos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puestos` (
  `id`            INT(11)     NOT NULL AUTO_INCREMENT,
  `nombre`        VARCHAR(45) NOT NULL,
  `fecha_creacion` TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Junction `puestos_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `puestos_usuario` (
  `usuario_id` INT(11) NOT NULL,
  `puesto_id`  INT(11) NOT NULL,
  `eliminado`     TINYINT(1)  NOT NULL DEFAULT 0,
  `fecha_eliminado` DATETIME DEFAULT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`usuario_id`,`puesto_id`),
  INDEX `idx_pu_usuario` (`usuario_id`),
  INDEX `idx_pu_puesto`  (`puesto_id`),
  CONSTRAINT `fk_pu_usuario`
    FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_pu_puesto`
    FOREIGN KEY (`puesto_id`) REFERENCES `puestos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -----------------------------------------------------
-- Tables for historiales existentes
-- -----------------------------------------------------
-- historial_estado_logistica
CREATE TABLE IF NOT EXISTS `historial_estado_logistica` (
  `id`                   INT(11)     NOT NULL AUTO_INCREMENT,
  `logisticas_id`        INT(11)     NOT NULL,
  `fecha_cambio`         DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_anterior_id`   INT(11)     NULL,
  `estado_nuevo_id`      INT(11)     NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_hl_log`        (`logisticas_id`),
  INDEX `idx_hl_eant`       (`estado_anterior_id`),
  INDEX `idx_hl_enew`       (`estado_nuevo_id`),
  CONSTRAINT `fk_hl_log` 
    FOREIGN KEY (`logisticas_id`) REFERENCES `logisticas` (`id`),
  CONSTRAINT `fk_hl_eant`
    FOREIGN KEY (`estado_anterior_id`) REFERENCES `estados_logistica` (`id`),
  CONSTRAINT `fk_hl_enew`
    FOREIGN KEY (`estado_nuevo_id`) REFERENCES `estados_logistica` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- historial_nombres_logistica
CREATE TABLE IF NOT EXISTS `historial_nombres_logistica` (
  `id`                 INT(11)     NOT NULL AUTO_INCREMENT,
  `logisticas_id`      INT(11)     NOT NULL,
  `fecha_cambio`       DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nombre_anterior`    VARCHAR(255) NULL,
  `nombre_nuevo`       VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_hnl_log`   (`logisticas_id`),
  CONSTRAINT `fk_hnl_log`
    FOREIGN KEY (`logisticas_id`) REFERENCES `logisticas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- historial_plan_logistica
CREATE TABLE IF NOT EXISTS `historial_plan_logistica` (
  `id`                 INT(11)   NOT NULL AUTO_INCREMENT,
  `logisticas_id`      INT(11)   NOT NULL,
  `fecha_cambio`       DATETIME  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `plan_anterior_id`   INT(11)   NULL,
  `plan_nuevo_id`      INT(11)   NOT NULL,
  `fecha_creacion` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  INDEX `idx_hpl_log`   (`logisticas_id`),
  INDEX `idx_hpl_pant`  (`plan_anterior_id`),
  INDEX `idx_hpl_pnew`  (`plan_nuevo_id`),
  CONSTRAINT `fk_hpl_log`
    FOREIGN KEY (`logisticas_id`) REFERENCES `logisticas` (`id`),
  CONSTRAINT `fk_hpl_pant`
    FOREIGN KEY (`plan_anterior_id`) REFERENCES `planes` (`id`),
  CONSTRAINT `fk_hpl_pnew`
    FOREIGN KEY (`plan_nuevo_id`) REFERENCES `planes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- historial_estados_ticket
CREATE TABLE IF NOT EXISTS `historial_estados_ticket` (
  `id`                         INT(11)     NOT NULL AUTO_INCREMENT,
  `ticket_id`                 INT(11)     NOT NULL,
  `fecha_cambio`               DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_ticket_anterior_id` INT(11)     NULL,
  `estado_ticket_nuevo_id`    INT(11)     NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_herp_rep`           (`ticket_id`),
  INDEX `idx_herp_eant`          (`estado_ticket_anterior_id`),
  INDEX `idx_herp_enew`          (`estado_ticket_nuevo_id`),
  CONSTRAINT `fk_herp_rep`
    FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  CONSTRAINT `fk_herp_eant`
    FOREIGN KEY (`estado_ticket_anterior_id`) REFERENCES `estados_ticket` (`id`),
  CONSTRAINT `fk_herp_enew`
    FOREIGN KEY (`estado_ticket_nuevo_id`) REFERENCES `estados_ticket` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- historial_prioridades
CREATE TABLE IF NOT EXISTS `historial_prioridades` (
  `id`                         INT(11)     NOT NULL AUTO_INCREMENT,
  `ticket_id`                 INT(11)     NOT NULL,
  `fecha_cambio`               DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prioridad_ticket_anterior_id` INT(11)     NULL,
  `prioridad_ticket_nuevo_id`    INT(11)     NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_herp_rep`           (`ticket_id`),
  INDEX `idx_herp_eant`          (`prioridad_ticket_anterior_id`),
  INDEX `idx_herp_enew`          (`prioridad_ticket_nuevo_id`),
  CONSTRAINT `fk_hprio_ticket`      FOREIGN KEY (`ticket_id`)                           REFERENCES `tickets`            (`id`),
  CONSTRAINT `fk_hprio_old_prio`    FOREIGN KEY (`prioridad_ticket_anterior_id`)       REFERENCES `prioridades`        (`id`),
  CONSTRAINT `fk_hprio_new_prio`    FOREIGN KEY (`prioridad_ticket_nuevo_id`)          REFERENCES `prioridades`        (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- USE `lightdatito`;
SET
  @OLD_FOREIGN_KEY_CHECKS  = @@FOREIGN_KEY_CHECKS,
  FOREIGN_KEY_CHECKS       = 0;

-- -----------------------------------------------------
-- procedure poblar_paises
-- -----------------------------------------------------
DELIMITER $$
--  USE `lightdatito` $$
DROP PROCEDURE IF EXISTS poblar_paises $$
CREATE DEFINER = `root`@`localhost` PROCEDURE `poblar_paises`() BEGIN
INSERT
    IGNORE INTO paises (id, nombre, codigo_iso)
VALUES
      (1, 'Australia', 'AU'),
    (2, 'Austria', 'AT'),
    (3, 'Azerbaiyán', 'AZ'),
    (4, 'Anguilla', 'AI'),
    (5, 'Argentina', 'AR'),
    (6, 'Armenia', 'AM'),
    (7, 'Bielorrusia', 'BY'),
    (8, 'Belice', 'BZ'),
    (9, 'Bélgica', 'BE'),
    (10, 'Bermudas', 'BM'),
    (11, 'Bulgaria', 'BG'),
    (12, 'Brasil', 'BR'),
    (13, 'Reino Unido', 'GB'),
    (14, 'Hungría', 'HU'),
    (15, 'Vietnam', 'VN'),
    (16, 'Haiti', 'HT'),
    (17, 'Guadalupe', 'GP'),
    (18, 'Alemania', 'DE'),
    (19, 'Países Bajos, Holanda', 'NL'),
    (20, 'Grecia', 'GR'),
    (21, 'Georgia', 'GE'),
    (22, 'Dinamarca', 'DK'),
    (23, 'Egipto', 'EG'),
    (24, 'Israel', 'IL'),
    (25, 'India', 'IN'),
    (26, 'Irán', 'IR'),
    (27, 'Irlanda', 'IE'),
    (28, 'España', 'ES'),
    (29, 'Italia', 'IT'),
    (30, 'Kazajstán', 'KZ'),
    (31, 'Camerún', 'CM'),
    (32, 'Canadá', 'CA'),
    (33, 'Chipre', 'CY'),
    (34, 'Kirguistán', 'KG'),
    (35, 'China', 'CN'),
    (36, 'Costa Rica', 'CR'),
    (37, 'Kuwait', 'KW'),
    (38, 'Letonia', 'LV'),
    (39, 'Libia', 'LY'),
    (40, 'Lituania', 'LT'),
    (41, 'Luxemburgo', 'LU'),
    (42, 'México', 'MX'),
    (43, 'Moldavia', 'MD'),
    (44, 'Mónaco', 'MC'),
    (45, 'Nueva Zelanda', 'NZ'),
    (46, 'Noruega', 'NO'),
    (47, 'Polonia', 'PL'),
    (48, 'Portugal', 'PT'),
    (49, 'Reunión', 'RE'),
    (50, 'Rusia', 'RU'),
    (51, 'El Salvador', 'SV'),
    (52, 'Eslovaquia', 'SK'),
    (53, 'Eslovenia', 'SI'),
    (54, 'Surinam', 'SR'),
    (55, 'Estados Unidos', 'US'),
    (56, 'Tadjikistan', 'TJ'),
    (57, 'Turkmenistan', 'TM'),
    (58, 'Islas Turcas y Caicos', 'TC'),
    (59, 'Turquía', 'TR'),
    (60, 'Uganda', 'UG'),
    (61, 'Uzbekistán', 'UZ'),
    (62, 'Ucrania', 'UA'),
    (63, 'Finlandia', 'FI'),
    (64, 'Francia', 'FR'),
    (65, 'República Checa', 'CZ'),
    (66, 'Suiza', 'CH'),
    (67, 'Suecia', 'SE'),
    (68, 'Estonia', 'EE'),
    (69, 'Corea del Sur', 'KR'),
    (70, 'Japón', 'JP'),
    (71, 'Croacia', 'HR'),
    (72, 'Rumanía', 'RO'),
    (73, 'Hong Kong', 'HK'),
    (74, 'Indonesia', 'ID'),
    (75, 'Jordania', 'JO'),
    (76, 'Malasia', 'MY'),
    (77, 'Singapur', 'SG'),
    (78, 'Taiwan', 'TW'),
    (79, 'Bosnia y Herzegovina', 'BA'),
    (80, 'Bahamas', 'BS'),
    (81, 'Chile', 'CL'),
    (82, 'Colombia', 'CO'),
    (89, 'Perú', 'PE'),
    (110, 'Paraguay', 'PY'),
    (111, 'Uruguay', 'UY'),
    (246, 'Puerto Rico', 'PR'),
    (112, 'Congo (Brazzaville)', 'CG'),
    (113, 'Cuba', 'CU'),
    (114, 'Albania', 'AL'),
    (115, 'Nigeria', 'NG'),
    (116, 'Zambia', 'ZM'),
    (117, 'Mozambique', 'MZ'),
    (119, 'Angola', 'AO'),
    (120, 'Sri Lanka', 'LK'),
    (121, 'Etiopía', 'ET'),
    (122, 'Túnez', 'TN'),
    (123, 'Bolivia', 'BO'),
    (124, 'Panamá', 'PA'),
    (125, 'Malawi', 'MW'),
    (126, 'Liechtenstein', 'LI'),
    (127, 'Bahrein', 'BH'),
    (128, 'Barbados', 'BB'),
    (130, 'Chad', 'TD'),
    (131, 'Man, Isla de', 'IM'),
    (132, 'Jamaica', 'JM'),
    (133, 'Malí', 'ML'),
    (134, 'Madagascar', 'MG'),
    (135, 'Senegal', 'SN'),
    (136, 'Togo', 'TG'),
    (137, 'Honduras', 'HN'),
    (138, 'República Dominicana', 'DO'),
    (139, 'Mongolia', 'MN'),
    (140, 'Irak', 'IQ'),
    (141, 'Sudáfrica', 'ZA'),
    (142, 'Aruba', 'AW'),
    (143, 'Gibraltar', 'GI'),
    (144, 'Afganistán', 'AF'),
    (145, 'Andorra', 'AD'),
    (147, 'Antigua y Barbuda', 'AG'),
    (149, 'Bangladesh', 'BD'),
    (151, 'Benín', 'BJ'),
    (152, 'Bután', 'BT'),
    (154, 'Islas Virgenes Británicas', 'VG'),
    (155, 'Brunéi', 'BN'),
    (156, 'Burkina Faso', 'BF'),
    (157, 'Burundi', 'BI'),
    (158, 'Camboya', 'KH'),
    (159, 'Cabo Verde', 'CV'),
    (164, 'Comores', 'KM'),
    (165, 'Congo (Kinshasa)', 'CD'),
    (166, 'Cook, Islas', 'CK'),
    (168, 'Costa de Marfil', 'CI'),
    (169, 'Djibouti, Yibuti', 'DJ'),
    (171, 'Timor Oriental', 'TL'),
    (172, 'Guinea Ecuatorial', 'GQ'),
    (173, 'Eritrea', 'ER'),
    (175, 'Feroe, Islas', 'FO'),
    (176, 'Fiyi', 'FJ'),
    (178, 'Polinesia Francesa', 'PF'),
    (180, 'Gabón', 'GA'),
    (181, 'Gambia', 'GM'),
    (184, 'Granada', 'GD'),
    (185, 'Guatemala', 'GT'),
    (186, 'Guernsey', 'GG'),
    (187, 'Guinea', 'GN'),
    (188, 'Guinea-Bissau', 'GW'),
    (189, 'Guyana', 'GY'),
    (193, 'Jersey', 'JE'),
    (195, 'Kiribati', 'KI'),
    (196, 'Laos', 'LA'),
    (197, 'Lesotho', 'LS'),
    (198, 'Liberia', 'LR'),
    (200, 'Maldivas', 'MV'),
    (201, 'Martinica', 'MQ'),
    (202, 'Mauricio', 'MU'),
    (205, 'Myanmar', 'MM'),
    (206, 'Nauru', 'NR'),
    (207, 'Antillas Holandesas', 'AN'),
    (208, 'Nueva Caledonia', 'NC'),
    (209, 'Nicaragua', 'NI'),
    (210, 'Níger', 'NE'),
    (212, 'Norfolk Island', 'NF'),
    (213, 'Omán', 'OM'),
    (215, 'Isla Pitcairn', 'PN'),
    (216, 'Qatar', 'QA'),
    (217, 'Ruanda', 'RW'),
    (218, 'Santa Elena', 'SH'),
    (219, 'San Cristobal y Nevis', 'KN'),
    (220, 'Santa Lucía', 'LC'),
    (221, 'San Pedro y Miquelón', 'PM'),
    (222, 'San Vincente y Granadinas', 'VC'),
    (223, 'Samoa', 'WS'),
    (224, 'San Marino', 'SM'),
    (225, 'San Tomé y Príncipe', 'ST'),
    (226, 'Serbia y Montenegro', 'CS'),
    (227, 'Sierra Leona', 'SL'),
    (228, 'Islas Salomón', 'SB'),
    (229, 'Somalia', 'SO'),
    (232, 'Sudán', 'SD'),
    (234, 'Swazilandia', 'SZ'),
    (235, 'Tokelau', 'TK'),
    (236, 'Tonga', 'TO'),
    (237, 'Trinidad y Tobago', 'TT'),
    (239, 'Tuvalu', 'TV'),
    (240, 'Vanuatu', 'VU'),
    (241, 'Wallis y Futuna', 'WF'),
    (242, 'Sáhara Occidental', 'EH'),
    (243, 'Yemen', 'YE'),
    (246, 'Puerto Rico', 'PR') ON DUPLICATE KEY
UPDATE
    nombre =
VALUES
    (nombre);

END $$

DROP PROCEDURE IF EXISTS poblar_estados_logistica$$
CREATE PROCEDURE poblar_estados_logistica()
BEGIN
  INSERT INTO estados_logistica (nombre, color) VALUES
    ('BAJA',       'E4D1FF'),
    ('BLOQUEADO',  'C093FF'),
    ('ALTA',       '44A900');
END$$

DROP PROCEDURE IF EXISTS poblar_planes$$
CREATE PROCEDURE poblar_planes()
BEGIN
  INSERT INTO planes (nombre, color, eliminado) VALUES
    ('BASICO',        'E4D1FF', 0),
    ('PLUS',          'C093FF', 0),
    ('ESTANDAR',      '7B2CEB', 0),
    ('PREMIUM',       '5003BD', 0),
    ('GRAN LOGISTICA','2F0073', 0);
END$$

DROP PROCEDURE IF EXISTS poblar_estados_ticket$$
CREATE PROCEDURE poblar_estados_ticket()
BEGIN
  INSERT INTO estados_ticket (nombre, color, eliminado) VALUES
    ('pendiente',  'E4D1FF',      0),
    ('en curso',   'C093FF',      0),
    ('realizado',  '7B2CEB',      0);
END$$


DROP PROCEDURE IF EXISTS poblar_puestos$$
CREATE PROCEDURE poblar_puestos()
BEGIN
  INSERT INTO puestos (nombre, eliminado) VALUES
    ('desarrollo',       0),
    ('soporte',          0),
    ('ventas',           0),
    ('rrhh',             0);
END$$

DROP PROCEDURE IF EXISTS poblar_logisticas $$
CREATE PROCEDURE poblar_logisticas() BEGIN
INSERT INTO
    logisticas (
        did,
        nombre,
        url_imagen,
        plan_id,
        estado_logistica_id,
        codigo,
        password_soporte,
        cuit,
        email,
        url_sistema,
        eliminado,
        pais_id
    )
VALUES
    (
        2,
        'MegaPack',
        'https://megapack.lightdata.com.ar/app-assets/images/logo/logo.png',
        3,
        3,
        'RF546k',
        '75sd33MN7a',
        '20223502270',
        'megapackenvios@gmail.com',
        'https://megapack.lightdata.com.ar/',
        0,
        5
    ),
    (
        4,
        'ProCourrier',
        'https://procourrier.lightdata.com.ar/app-assets/images/logo/logo.png',
        5,
        3,
        'h3wa3m',
        'nuriaquejona',
        '20304077795',
        NULL,
        'https://procourrier.lightdata.com.ar/',
        0,
        5
    ),
    (
        12,
        'Planet',
        'https://planet.lightdata.com.ar/app-assets/images/logo/logo.png',
        4,
        3,
        '5vy4Wc',
        'barbanegra',
        '30715232177',
        'proveedoresplanet@gmail.com',
        'https://planet.lightdata.com.ar/',
        0,
        5
    ),
    (
        17,
        'ExpressFlex',
        'https://expressflex.lightdata.com.ar/app-assets/images/logo/logo.png',
        3,
        3,
        'k5Y4Qb',
        '8v0zOuh8',
        '',
        NULL,
        'https://expressflex.lightdata.com.ar/',
        0,
        5
    ),
    (
        20,
        'Rabion Flex',
        'https://rabionflex.lightdata.com.ar/app-assets/images/logo/logo.png',
        5,
        3,
        'WCLovZ',
        'estaesmejor',
        '30717180948',
        NULL,
        'https://rabionflex.lightdata.com.ar/',
        0,
        5
    ),
    (
        22,
        'Tornus/E3',
        'https://tornus.lightdata.com.ar/app-assets/images/logo/logo.png',
        5,
        3,
        'o5kf6M',
        'soylela',
        '',
        NULL,
        'https://tornus.lightdata.com.ar/',
        0,
        5
    ),
    (
        24,
        'Thesend',
        'https://thesend.lightdata.com.ar/app-assets/images/logo/logo.png',
        3,
        3,
        '6wzwbb',
        'fds234DSF',
        '',
        NULL,
        'https://thesend.lightdata.com.ar/',
        0,
        5
    ),
    (
        34,
        'RM logistics',
        'https://rmlogistics.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'gibeDy',
        'pororo',
        '',
        NULL,
        'https://rmlogistics.lightdata.com.ar/',
        0,
        5
    ),
    (
        41,
        'GT PACk',
        'https://gtpack.lightdata.com.ar/app-assets/images/logo/logo.png',
        3,
        3,
        'x6i546',
        'caperusita',
        '',
        NULL,
        'https://gtpack.lightdata.com.ar/',
        0,
        5
    ),
    (
        42,
        'Sobre alas',
        'https://sobrealas.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'RkPJSr',
        'pinocho',
        '',
        NULL,
        'https://sobrealas.lightdata.com.ar/',
        0,
        5
    ),
    (
        47,
        'GoFlexpress',
        'https://goflexpress.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'DhfzjX',
        'zanahoria',
        '27957076802',
        NULL,
        'https://goflexpress.lightdata.com.ar/',
        0,
        5
    ),
    (
        49,
        'Mamut Logistica',
        'https://mamutlogistica.lightdata.com.ar/app-assets/images/logo/logo.png',
        4,
        3,
        'T9g9nQ',
        'mamutchino',
        '27387897327',
        NULL,
        'https://mamutlogistica.lightdata.com.ar/',
        0,
        5
    ),
    (
        51,
        'JN Logistica',
        'https://jnlogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'jnhuYH',
        'pelado',
        '',
        NULL,
        'https://jnlogistica.lightdata.app/',
        0,
        5
    ),
    (
        54,
        'PapExpress',
        'https://papexpress.lightdata.com.ar/app-assets/images/logo/logo.png',
        4,
        3,
        'wqXq8E',
        'boxitracio',
        '',
        NULL,
        'https://papexpress.lightdata.com.ar/',
        0,
        5
    ),
    (
        55,
        'Zuiden',
        'https://zuiden.lightdata.com.ar/app-assets/images/logo/logo.png',
        4,
        3,
        'hkZiyY',
        'amobox',
        '30717044882',
        NULL,
        'https://zuiden.lightdata.com.ar/',
        0,
        5
    ),
    (
        69,
        'MFEnvios',
        'https://mfenvios.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'k2Lmi7',
        'nuriaselva',
        '',
        NULL,
        'https://mfenvios.lightdata.com.ar/',
        0,
        5
    ),
    (
        72,
        'Wyn Flex',
        'https://wynflex.lightdata.com.ar/app-assets/images/logo/logo.png',
        4,
        3,
        'qeeS3L',
        'chrisbala',
        '',
        NULL,
        'https://wynflex.lightdata.com.ar/',
        0,
        5
    ),
    (
        76,
        'TransportMG',
        'https://transportmg.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'K3eC69',
        'salisidro',
        '',
        NULL,
        'https://transportmg.lightdata.com.ar/',
        0,
        5
    ),
    (
        79,
        'Entregoya',
        'https://entregoya.lightdata.com.ar/app-assets/images/logo/logo.png',
        4,
        3,
        'qXE2M9',
        'culoconcaspa',
        '',
        NULL,
        'https://entregoya.lightdata.com.ar/',
        0,
        5
    ),
    (
        81,
        'morphconsultoria',
        'https://morphconsultores.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'voCfSg',
        'chetaje',
        '',
        NULL,
        'https://morphconsultores.lightdata.com.ar/',
        0,
        5
    ),
    (
        82,
        'DeliveryBox',
        'https://deliverybox.lightdata.com.ar/app-assets/images/logo/logo.png',
        5,
        3,
        'MGqFcR',
        'peppapig',
        '33716966599',
        NULL,
        'https://deliverybox.lightdata.com.ar/',
        0,
        5
    ),
    (
        87,
        'NexoFlex',
        'https://nexoflex.lightdata.com.ar/app-assets/images/logo/logo.png',
        4,
        3,
        'RNHA8e',
        'perrotrolo',
        '',
        NULL,
        'https://nexoflex.lightdata.com.ar/',
        0,
        5
    ),
    (
        90,
        'FlexGo / nefelogistica',
        'https://nefelogistica.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'aKWM3y',
        'culoconcaspa',
        '30717064867',
        NULL,
        'https://nefelogistica.lightdata.com.ar/',
        0,
        5
    ),
    (
        94,
        'A G LogisticaExpress',
        'https://aglogisticaexpress.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'x8CSKo',
        'nuriachanta',
        '',
        NULL,
        'https://aglogisticaexpress.lightdata.com.ar/',
        0,
        5
    ),
    (
        97,
        'EnBox',
        'https://enbox.lightdata.com.ar/app-assets/images/logo/logo.png',
        4,
        3,
        'KVSkxS',
        'sensodelorto',
        '',
        NULL,
        'https://enbox.lightdata.com.ar/',
        0,
        5
    ),
    (
        102,
        'InmediatoLogistica',
        'https://inmediatologistica.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'rTpxCd',
        'churrinche',
        '',
        NULL,
        'https://inmediatologistica.lightdata.com.ar/',
        0,
        5
    ),
    (
        103,
        'LM Servicio Logistico',
        'https://lmserviciologistico.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        '5DUvAC',
        'culartonio',
        '',
        NULL,
        'https://lmserviciologistico.lightdata.com.ar/',
        0,
        5
    ),
    (
        104,
        'startshipping',
        'https://startshipping.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'U4FDVo',
        'wachiwua',
        '',
        NULL,
        'https://startshipping.lightdata.app/',
        0,
        5
    ),
    (
        105,
        'lambda logistica',
        'https://lambda.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'Jp7V5T',
        'yotomocerveza',
        '23955668189',
        NULL,
        'https://lambda.lightdata.app/',
        0,
        5
    ),
    (
        109,
        'Leanic (Sinlog)',
        'https://sinlog.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'oQUyeF',
        'caradenada',
        '',
        NULL,
        'https://sinlog.lightdata.app/',
        0,
        5
    ),
    (
        110,
        'Dac Logistica',
        'https://daclogistica.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'k8QVGk',
        'alfinsol',
        '',
        NULL,
        'https://daclogistica.lightdata.app/',
        0,
        5
    ),
    (
        114,
        'Jetflex',
        'https://jetflex.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'jYmaFp',
        'meponecachonda',
        '',
        NULL,
        'https://jetflex.lightdata.app/',
        0,
        5
    ),
    (
        115,
        'DualFLex',
        'https://dualflex.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '6wwfK7',
        'nuriacapa',
        '',
        NULL,
        'https://dualflex.lightdata.app/',
        0,
        5
    ),
    (
        117,
        'Baires Mensajeria',
        'https://bairesmensajeria.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        '7w72Xt',
        'boxmalaonda',
        '',
        NULL,
        'https://bairesmensajeria.lightdata.app/',
        0,
        5
    ),
    (
        120,
        'Falco',
        'https://falco.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'rvKm4u',
        'tuprimaun4',
        '',
        NULL,
        'https://falco.lightdata.app/',
        0,
        5
    ),
    (
        124,
        'FB Flex',
        'https://fbflex.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        '7cwTEi',
        'undedoenelorto',
        '',
        NULL,
        'https://fbflex.lightdata.app/',
        0,
        5
    ),
    (
        125,
        'Flexit',
        'https://flexit.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'Lsmtmm',
        'cariocajugo',
        '',
        NULL,
        'https://flexit.lightdata.app/',
        0,
        5
    ),
    (
        130,
        'EntregaEnELDía - Logisflex',
        'https://logisflex.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'Sozvcz',
        'nuevosrumbos',
        '30716272466',
        NULL,
        'https://logisflex.lightdata.app/',
        0,
        5
    ),
    (
        131,
        'SyM / Milla Sur',
        'https://millasur.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'goTI89',
        'lasbendis',
        '',
        NULL,
        'https://millasur.lightdata.app/',
        0,
        5
    ),
    (
        132,
        'IntiExpress',
        'https://intiexpress.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'fPoK85',
        'returbina',
        '',
        NULL,
        'https://intiexpress.lightdata.app/',
        0,
        5
    ),
    (
        134,
        'Paquetetraje',
        'https://paquetetrajelogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'g85YHb',
        'nuriapanqueque',
        '',
        NULL,
        'https://paquetetrajelogistica.lightdata.app/',
        0,
        5
    ),
    (
        135,
        'FullTrans',
        'https://fulltrans.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'mniOP3',
        '',
        '',
        NULL,
        'https://fulltrans.lightdata.app/',
        0,
        5
    ),
    (
        136,
        'E-envios',
        'https://eenvio.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        '78TY45',
        'paparoel',
        '',
        NULL,
        'https://eenvio.lightdata.app/',
        0,
        5
    ),
    (
        137,
        'JMK logistica',
        'https://jmklogistica.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'ko56RE',
        'cotorrahablante',
        '',
        NULL,
        'https://jmklogistica.lightdata.app/',
        0,
        5
    ),
    (
        144,
        'Cyro Flex envios',
        'https://cyroflexenvios.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'VRA25G',
        'curaenternezido',
        '',
        NULL,
        'https://cyroflexenvios.lightdata.app/',
        0,
        5
    ),
    (
        146,
        'solucioneslogisticas.sur',
        'https://solucioneslogisticassur.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'trA56a',
        'corralonmaca',
        '',
        NULL,
        'https://solucioneslogisticassur.lightdata.app/',
        0,
        5
    ),
    (
        154,
        'Nsa Mensajeria',
        'https://nsa.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'troTsk',
        'laparteentres',
        '',
        NULL,
        'https://nsa.lightdata.app/',
        0,
        5
    ),
    (
        157,
        'ValentinoMensajeria',
        'https://logisticavalentino.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'buYhG6',
        'pedicura',
        '',
        NULL,
        'https://valentinomensajeria.lightdata.app/',
        0,
        5
    ),
    (
        159,
        'SEAN UNIDOS',
        'https://logisticaseanunidos.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'gOp9Ku',
        'mamotreto',
        '',
        NULL,
        'https://logisticaseanunidos.lightdata.app/',
        0,
        5
    ),
    (
        162,
        'Flex a envios',
        'https://flexaenvios.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'pxFvd3',
        'mafalda',
        '',
        NULL,
        'https://flexaenvios.lightdata.app/',
        0,
        5
    ),
    (
        164,
        'CreadoLogistica',
        'https://logIsticacreado.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'h7j8us',
        'pilafina',
        '',
        NULL,
        'https://logisticacreado.lightdata.app/',
        0,
        5
    ),
    (
        165,
        'LIONNES LOGISTICA',
        'https://Lionneslogydist.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'ovb7hd',
        'marioneta',
        '',
        NULL,
        'https://lionneslogydist.lightdata.app/',
        0,
        5
    ),
    (
        167,
        'JLS Logistica',
        'https://jlslogistica.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '0olpik',
        'pilafina',
        '',
        NULL,
        'https://jlslogistica.lightdata.app/',
        0,
        5
    ),
    (
        170,
        'FM mensajeria',
        'https://fmmensajeria.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '0oiug8',
        'chupacabra',
        '',
        NULL,
        'https://fmmensajeria.lightdata.app/',
        0,
        5
    ),
    (
        174,
        'Teamwork',
        'https://teamwork.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '9iumJ2',
        'dameunchow',
        '',
        NULL,
        'https://teamwork.lightdata.app/',
        0,
        5
    ),
    (
        175,
        'Oeste Flex',
        'https://primelogistik.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'reTjyd',
        'megustalasflores',
        '',
        NULL,
        'https://oesteflex.lightdata.app/',
        0,
        5
    ),
    (
        176,
        'YENDING',
        'https://yending.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'yenRft',
        'quisiyo',
        '',
        NULL,
        'https://yending.lightdata.app/',
        0,
        5
    ),
    (
        177,
        'ConfiableEntregas',
        'https://confiable.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'conFg8',
        'teladejoadentro',
        '',
        NULL,
        'https://confiable.lightdata.app/',
        0,
        5
    ),
    (
        178,
        'Rueddo',
        'https://rueddo.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'prarud',
        'pacotillo',
        '',
        NULL,
        'https://rueddo.lightdata.app/',
        0,
        5
    ),
    (
        182,
        'Envios Q',
        'https://logisticaenviosq.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'tRaM4',
        'nudodeglobo',
        '',
        NULL,
        'https://logisticaenviosq.lightdata.app/',
        0,
        5
    ),
    (
        188,
        'Logistica Llego / Logistipack',
        'https://logisticallego.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'LS2dv8',
        'mamala',
        '',
        NULL,
        'https://logisticallego.lightdata.app/',
        0,
        5
    ),
    (
        191,
        'MailingExpress',
        'https://me.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        '9NE1Ss',
        'kj78HG45OL / cortisol',
        '',
        NULL,
        'https://mailingexpress.lightdata.app/',
        0,
        5
    ),
    (
        192,
        'LogHormiga',
        'https://loghormiga.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'CP5d5k',
        'lisoform',
        '',
        NULL,
        'https://loghormiga.lightdata.app/',
        0,
        5
    ),
    (
        194,
        'Fingerinc',
        'https://fingerinc.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '6Fv35P',
        'dedomocho',
        '',
        NULL,
        'https://fingerinc.lightdata.app/',
        0,
        5
    ),
    (
        195,
        'Brat Logística',
        'https://bratlogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'TTp35P',
        'naranjoenflor',
        '',
        NULL,
        'https://bratlogistica.lightdata.app/',
        0,
        5
    ),
    (
        196,
        'LowShip',
        'https://lowship.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        '8DA3ce',
        'quetequieroverde',
        '',
        NULL,
        'https://lowship.lightdata.app/',
        0,
        5
    ),
    (
        198,
        'Envios QP',
        'https://qpenvios.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '23SnUI',
        'serendipia',
        '',
        NULL,
        'https://qpenvios.lightdata.app/',
        0,
        5
    ),
    (
        200,
        'Pricemania',
        'https://pricemania.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        '985Ydg',
        'precioslocos',
        '',
        NULL,
        'https://pricemania.lightdata.app/',
        0,
        5
    ),
    (
        201,
        'Riders',
        'https://riders.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'pra678',
        'tacayo',
        '',
        NULL,
        'https://riders.lightdata.app/',
        0,
        5
    ),
    (
        202,
        'Fletestore',
        'https://fletestore.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'zZd8yt',
        'pocoyo',
        '',
        NULL,
        'https://fletestore.lightdata.app/',
        0,
        5
    ),
    (
        203,
        'AmbaLogistica',
        'https://ambalogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'z8Tyui',
        'caracas',
        '',
        NULL,
        'https://ambalogistica.lightdata.app/',
        0,
        5
    ),
    (
        204,
        'RAPIFLEX / Dar logistica',
        'https://logisticarapiflex.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'M675k3',
        'tangonada',
        '',
        NULL,
        'https://logisticarapiflex.lightdata.app/',
        0,
        5
    ),
    (
        205,
        'Simplex',
        'https://simplexexpress.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '1Dq15D',
        'tragametierra',
        '',
        NULL,
        'https://simplexexpress.lightdata.app/',
        0,
        5
    ),
    (
        206,
        'CG Envios',
        'https://cgenvios.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'z3nL5x',
        'margarita',
        '',
        NULL,
        'https://cgenvios.lightdata.app/',
        0,
        5
    ),
    (
        208,
        'Rubenjuve',
        'https://rubenjuve.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '2Ac67u',
        'robinhood',
        '',
        NULL,
        'https://rubenjuve.lightdata.app/',
        0,
        5
    ),
    (
        211,
        'Zeta Motos',
        'https://zetaenvios.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '3cDw6V',
        'donquijote',
        '',
        NULL,
        'https://zetaenvios.lightdata.app/',
        0,
        5
    ),
    (
        213,
        'alclogistica',
        'https://alclogistica.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        '3zo8BG',
        'miope',
        '',
        NULL,
        'https://alclogistica.lightdata.app/',
        0,
        5
    ),
    (
        214,
        'Bh Flex',
        'https://bhflex.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'VB2h4t',
        'batterylow',
        '',
        NULL,
        'https://bhflex.lightdata.app/',
        0,
        5
    ),
    (
        215,
        'Motosduo',
        'https://motosduo.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '16vsSD',
        'ponelaagnc',
        '',
        NULL,
        'https://motosduo.lightdata.app/',
        0,
        5
    ),
    (
        217,
        'YaEnvios',
        'https://yaenvios.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'pra78f',
        'bascula',
        '',
        NULL,
        'https://yaenvios.lightdata.app/',
        0,
        5
    ),
    (
        220,
        'HOP!',
        'https://covedia.lightdata.app/app-assets/images/logo/logo.png',
        5,
        3,
        '9h3D8C',
        'dolio',
        '',
        NULL,
        'https://covedia.lightdata.app/',
        0,
        5
    ),
    (
        224,
        'FullPack',
        'https://fullpack.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '31v4ND',
        'fieraenlatada',
        '',
        NULL,
        'https://fullpack.lightdata.app/',
        0,
        5
    ),
    (
        226,
        'Excellent envios',
        'https://excellent.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'Vb55s3',
        'olvidadisa',
        '',
        NULL,
        'https://excellent.lightdata.app/',
        0,
        5
    ),
    (
        229,
        'Zequeira',
        'https://zequeira.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'O5d4fe',
        'bananaspijama',
        '',
        NULL,
        'https://zequeira.lightdata.app/',
        0,
        5
    ),
    (
        230,
        'Hogareño',
        'https://hogareno.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'F9fE03',
        'pirulin',
        '',
        NULL,
        'https://hogareno.lightdata.app/',
        0,
        5
    ),
    (
        231,
        'Cev Logistica',
        'https://cevlogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'rvA26L',
        'metgrogay',
        '',
        NULL,
        'https://cevlogistica.lightdata.app/',
        0,
        5
    ),
    (
        232,
        'FLETLUC',
        'https://fletluc.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '5N3bwa',
        'playerosdelorto',
        '',
        NULL,
        'https://fletluc.lightdata.app/',
        0,
        5
    ),
    (
        233,
        'Alito',
        'https://logisticaalito.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'g23nfL',
        'kinesiologosexy',
        '',
        NULL,
        'https://logisticaalito.lightdata.app/',
        0,
        5
    ),
    (
        234,
        'Vip Express',
        'https://logisticavipexpress.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'M4w6Fd',
        'uncafeporlomenos',
        '',
        NULL,
        'https://logisticavipexpress.lightdata.app/',
        0,
        5
    ),
    (
        237,
        'Boxiflex',
        'https://enviosflex.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '2B89sv',
        'sequetienesunnuevoamor',
        '',
        NULL,
        'https://enviosflex.lightdata.app/',
        0,
        5
    ),
    (
        238,
        'OZ Shipping',
        'https://ozshipping.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '2s9d8A',
        'cacatua',
        '',
        NULL,
        'https://ozshipping.lightdata.app/',
        0,
        5
    ),
    (
        239,
        'LBS mensajeria',
        'https://lbsmensajeria.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'm99dzA',
        'paracomplejico',
        '',
        NULL,
        'https://lbsmensajeria.lightdata.app/',
        0,
        5
    ),
    (
        241,
        'RDZ logistica',
        'https://rdzlogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'rdzd8A',
        'macaquejona',
        '',
        NULL,
        'https://rdzlogistica.lightdata.app/',
        0,
        5
    ),
    (
        242,
        'Llegue',
        'https://llegue.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '52s65f',
        'papaya',
        '',
        NULL,
        'https://llegue.lightdata.app/',
        0,
        5
    ),
    (
        243,
        'JJ Logistica',
        'https://jjlogistica.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        '6ZD3r7',
        'pocaplata',
        '',
        NULL,
        'https://jjlogistica.lightdata.app/',
        0,
        5
    ),
    (
        247,
        'Shipment',
        'https://shipment.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'B6Z4r7',
        'alapipetua',
        '',
        NULL,
        'https://shipment.lightdata.app/',
        0,
        5
    ),
    (
        249,
        'Seven Express',
        'https://sevenexpress.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '3CA2s4',
        'pedosdelentejas',
        '',
        NULL,
        'https://sevenexpress.lightdata.app/',
        0,
        5
    ),
    (
        250,
        'Masco',
        'https://mascoentregas.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        '98a3s4',
        'hipococodrilico',
        '',
        NULL,
        'https://mascoentregas.lightdata.app/',
        0,
        5
    ),
    (
        251,
        'Logistica Neez',
        'https://logisticaneez.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '2cYD3a',
        'avefenix',
        '',
        NULL,
        'https://logisticaneez.lightdata.app/',
        0,
        5
    ),
    (
        253,
        'MercadoPacks',
        'https://mercadopacks.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '2ZdwZb',
        'elmariachiloco',
        '',
        NULL,
        'https://mercadopacks.lightdata.app/',
        0,
        5
    ),
    (
        254,
        'Henu logistica',
        'https://henulogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '2Zz95q',
        'anodanino',
        '',
        NULL,
        'https://henulogistica.lightdata.app/',
        0,
        5
    ),
    (
        255,
        'DEVOTO EXPRESS',
        'https://devotoexpress.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'x9W5rq',
        'shitoelpito',
        '',
        NULL,
        'https://devotoexpress.lightdata.app/',
        0,
        5
    ),
    (
        256,
        'Fara',
        'https://logisticafara.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'x3iAq6',
        'picaflor',
        '',
        NULL,
        'https://logisticafara.lightdata.app/',
        0,
        5
    ),
    (
        257,
        'Transtech',
        'https://transtech.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        '32Lsw5',
        'uncorteyunaquebrada',
        '',
        NULL,
        'https://transtech.lightdata.app/',
        0,
        5
    ),
    (
        258,
        'Oliden',
        'https://oliden.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '3k4sH5',
        'doschorizos',
        '',
        NULL,
        'https://oliden.lightdata.app/',
        0,
        5
    ),
    (
        260,
        'ECOFLEX',
        'https://ecoflex.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '62DV3m',
        '2huevos',
        '',
        NULL,
        'https://ecoflex.lightdata.app/',
        0,
        5
    ),
    (
        261,
        'E-BOX',
        'https://depositoebox.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '6Jy2Em',
        'boquitapintada',
        '',
        NULL,
        'https://depositoebox.lightdata.app/',
        0,
        5
    ),
    (
        262,
        'Bool',
        'https://bool.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'S2K7sv',
        'paquitalas2',
        '',
        NULL,
        'https://bool.lightdata.app/',
        0,
        5
    ),
    (
        263,
        'EnviosFlex',
        'https://enviosflexlogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'm7vBL5',
        'rastamandita',
        '',
        NULL,
        'https://enviosflexlogistica.lightdata.app/',
        0,
        5
    ),
    (
        264,
        'Peleco',
        'https://peleco.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '0v5xB2',
        'estuveconel',
        '',
        NULL,
        'https://peleco.lightdata.app/',
        0,
        5
    ),
    (
        265,
        'Premier',
        ' https://premiermensajeria.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '0vh7h2',
        'cotorraerrante',
        '',
        NULL,
        'https://premiermensajeria.lightdata.app/',
        0,
        5
    ),
    (
        266,
        'Entregas del Sur',
        'https://edslogistica.lightdata.app//app-assets/images/logo/logo.png',
        1,
        3,
        'pvN6h7',
        'corazondenaranja',
        '',
        NULL,
        'https://edslogistica.lightdata.app/',
        0,
        5
    ),
    (
        267,
        'ADN-DGROUP',
        'https://ADN-DGROUP.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'K4yC5t',
        'latetamedina',
        '',
        NULL,
        'https://ADN-DGROUP.lightdata.app/',
        0,
        5
    ),
    (
        268,
        'MULTI CANNING',
        'https://multicanning.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'Bt665G',
        'mafangulo',
        '',
        NULL,
        'https://multicanning.lightdata.app/',
        0,
        5
    ),
    (
        173,
        'UltraJet',
        'https://ultrajet.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'pier87',
        'unavidaparati',
        '',
        NULL,
        'https://ultrajet.lightdata.app/',
        0,
        5
    ),
    (
        270,
        'Wigou test',
        'https://wigou.lightdata.app/app-assets/images/logo/logo.png',
        5,
        3,
        '3b4MQd',
        'hermosamania',
        '',
        NULL,
        'https://wigou.lightdata.app/',
        0,
        5
    ),
    (
        271,
        'Envios Ya',
        'https://enviosYa.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        '3V6vO6',
        'paracetamolanal',
        '',
        NULL,
        'https://enviosya.lightdata.app/',
        0,
        5
    ),
    (
        272,
        'Log tac',
        'https://logtac.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'f4OuA6',
        'lucesitaabrillar',
        '',
        NULL,
        'https://logtac.lightdata.app/',
        0,
        5
    ),
    (
        273,
        'dzn',
        'https://dzn.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'K5d3Z6',
        'melareseca',
        '',
        NULL,
        'https://dzn.lightdata.app/',
        0,
        5
    ),
    (
        274,
        'Diaz Home',
        'https://diazhome.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '3hr3Dx',
        'besameelanillo',
        '',
        NULL,
        'https://diazhome.lightdata.app/',
        0,
        5
    ),
    (
        275,
        'DEMO PROPIO',
        'https://demo.lightdata.app/app-assets/images/logo/logo.png',
        5,
        3,
        'cogote',
        'latenesadentro',
        '',
        NULL,
        'https://demo.lightdata.app/',
        0,
        5
    ),
    (
        277,
        'Logistica JM',
        'https://logisticajm.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '5F23n2',
        'muelitasnoduele',
        '',
        NULL,
        'https://logisticajm.lightdata.app/',
        0,
        5
    ),
    (
        278,
        'kchi',
        'https://logisticakchi.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'D03nBE',
        'milfanwich',
        '',
        NULL,
        'https://logisticakchi.lightdata.app/',
        0,
        5
    ),
    (
        280,
        'J&L',
        'https://logisticaintegral.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '67m2z1',
        'painkiller',
        '',
        NULL,
        'https://logisticaintegral.lightdata.app/',
        0,
        5
    ),
    (
        281,
        'Lumaya',
        'https://lumaya.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'D067cy',
        'crazitrain',
        '',
        NULL,
        'https://lumaya.lightdata.app/',
        0,
        5
    ),
    (
        282,
        'Quality',
        'https://quality.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'plm2U1',
        'symphoniofdestruction',
        '',
        NULL,
        'https://quality.lightdata.app/',
        0,
        5
    ),
    (
        111,
        'FastCorreo',
        'https://fastcorreo.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'gf5d6X',
        'nomoretears',
        '',
        NULL,
        'https://fastcorreo.lightdata.app/',
        0,
        5
    ),
    (
        283,
        'Enex / logisticanexus',
        'https://logisticanexus.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '4bdSw1',
        'sweetdreams',
        '',
        NULL,
        'https://logisticanexus.lightdata.app/',
        0,
        5
    ),
    (
        284,
        'Logistica maruja',
        'https://logisticamaruja.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'S2n6dx',
        'excaliburro',
        '',
        NULL,
        'https://logisticamaruja.lightdata.app/',
        0,
        5
    ),
    (
        286,
        'Urbik',
        'https://logisticaurbik.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '2F9nGR',
        'chimichanga',
        '',
        NULL,
        'https://logisticaurbik.lightdata.app/',
        0,
        5
    ),
    (
        287,
        'New Garden',
        'https://newgarden.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        '9c4opR',
        'lavaelautoxfa',
        '',
        NULL,
        'https://newgarden.lightdata.app/',
        0,
        5
    ),
    (
        288,
        'King flex',
        'https://kingflex.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'f4zj6w',
        'londoncalling',
        '',
        NULL,
        'https://kingflex.lightdata.app/',
        0,
        5
    ),
    (
        289,
        'Sz',
        'https://logisticasz.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '3FNx34',
        'damecremita',
        '',
        NULL,
        'https://logisticasz.lightdata.app/',
        0,
        5
    ),
    (
        291,
        'Box envios',
        'https://ebox.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '2M7hv8',
        'lonelyday',
        '',
        NULL,
        'https://ebox.lightdata.app/',
        0,
        5
    ),
    (
        293,
        'Grupo Elite',
        'https://logisticagrupoelite.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '3Fc424',
        'miramamasinmanos',
        '',
        NULL,
        'https://logisticact.lightdata.app/',
        0,
        5
    ),
    (
        294,
        'Logistica CT',
        'https://ctlogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'v34T6h',
        'endrogarse',
        '',
        NULL,
        'https://logisticact.lightdata.app/',
        0,
        5
    ),
    (
        296,
        'Antola',
        'https://logisticaantola.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '4fGV5Z',
        'morfina',
        '',
        NULL,
        'https://logisticaantola.lightdata.app/',
        0,
        5
    ),
    (
        297,
        'Colucci',
        'https://envioscolucci.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'XB4ft1',
        'efedrina',
        '',
        NULL,
        'https://envioscolucci.lightdata.app/',
        0,
        5
    ),
    (
        108,
        'Logistica S3',
        'https://logisticas3.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'BSenVC',
        'ketamina',
        '',
        NULL,
        'https://logisticas3.lightdata.app/',
        0,
        5
    ),
    (
        298,
        'Postdata',
        'https://postdatamensajeria.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'SB6j6q',
        'fentanilo',
        '',
        NULL,
        'https://postdata.lightdata.app/',
        0,
        5
    ),
    (
        299,
        'ecomsolutions',
        'https://ecomsolutions.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'SV8GdE',
        'poposaurio',
        '',
        NULL,
        'https://ecomsolutions.lightdata.app/',
        0,
        5
    ),
    (
        301,
        'APL',
        'https://aplsollog.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        '7KBtr5',
        'popodrilo',
        '',
        NULL,
        'https://aplsollog.lightdata.app/',
        0,
        5
    ),
    (
        302,
        'Logística Nasere',
        'https://logisticanasere.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'SD7da2',
        'poponesa',
        '',
        NULL,
        'https://logisticanasere.lightdata.app/',
        0,
        5
    ),
    (
        303,
        'Mensajeria Tonny',
        'https://mensajeriatonny.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'C3fyb4',
        'popostada',
        '',
        NULL,
        'https://mensajeriatonny.lightdata.app/',
        0,
        5
    ),
    (
        304,
        'Genesis',
        'https://logisticagenesis.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        '3heJF3',
        'lacocasarly',
        '',
        NULL,
        'https://logisticagenesis.lightdata.app/',
        0,
        5
    ),
    (
        306,
        'Mt Logistica',
        'https://mtlogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'zcp2AS',
        'repampanosbatman',
        '',
        NULL,
        'https://mtlogistica.lightdata.app/',
        0,
        5
    ),
    (
        307,
        'Mensajeria fede',
        'https://mensajeriafede.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '3rHsA7',
        'motomomo',
        '',
        NULL,
        'https://mensajeriafede.lightdata.app/',
        0,
        5
    ),
    (
        308,
        'Mensajeria Roca',
        'https://mensajeriaroca.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        '3r6gA7',
        'desagradecidos',
        '',
        NULL,
        'https://mensajeriaroca.lightdata.app/',
        0,
        5
    ),
    (
        309,
        'App express',
        'https://appexpress.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '9kSF3m',
        'desagradecidos',
        '',
        NULL,
        'https://appexpress.lightdata.app/',
        0,
        5
    ),
    (
        310,
        'YIP',
        'https://yip.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'Xp4vnV',
        'movpelvico',
        '',
        NULL,
        'https://yip.lightdata.app/',
        0,
        5
    ),
    (
        311,
        'FletesFlex',
        'https://fletesflex.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        '95Hcq7',
        'lasvenasabiertas',
        '',
        NULL,
        'https://fletesflex.lightdata.app/',
        0,
        5
    ),
    (
        312,
        'Via Urbana',
        'https://viaurbana.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'n349Pb',
        'besoarcoiris',
        '',
        NULL,
        'https://viaurbana.lightdata.app/',
        0,
        5
    ),
    (
        313,
        'CargoXpres',
        'https://logisticacx.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '2rgp78',
        'quilmesrock',
        '',
        NULL,
        'https://logisticacx.lightdata.app/',
        0,
        5
    ),
    (
        314,
        'Rueddo Rosario',
        'https://rueddorosario.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '2DDb5k',
        'comegatos',
        '',
        NULL,
        'https://rueddorosario.lightdata.app/',
        0,
        5
    ),
    (
        315,
        'MOOVEX',
        'https://moovex.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '3j6mHF',
        'lolamerluza',
        '',
        NULL,
        'https://moovex.lightdata.app/',
        0,
        5
    ),
    (
        316,
        'Dahe Logistica',
        'https://dahelogistica.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '3Lz5e4',
        'thepapaflow',
        '',
        NULL,
        'https://dahelogistica.lightdata.app/',
        0,
        5
    ),
    (
        317,
        'New Track Co',
        'https://netcoar.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        '22VLo4',
        'siracusa',
        '',
        NULL,
        'https://netcoar.lightdata.app/',
        0,
        5
    ),
    (
        318,
        'Logistica Fa',
        'https://logisticafa.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'mU5ao4',
        'estoesfa',
        '',
        NULL,
        'https://logisticafa.lightdata.app/',
        0,
        5
    ),
    (
        319,
        'Mi Pack',
        'https://mipack.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'mBW64j',
        'martestrece',
        '',
        NULL,
        'https://mipack.lightdata.app/',
        0,
        5
    ),
    (
        320,
        'Turbo entregas',
        'https://turboentregas.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'a5zi7f',
        'groguisindestilar',
        '',
        NULL,
        'https://turboentregas.lightdata.app/',
        0,
        5
    ),
    (
        321,
        'Logística Integración',
        'https://integracion.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'i4bgY2',
        'chrisvolveporfavor',
        '',
        NULL,
        'https://logisticaintegracion.lightdata.app/',
        0,
        5
    ),
    (
        61,
        'AlphaGroup',
        'https://alphagroup.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'UsV6Vf',
        'parafina',
        '',
        'alphagroupcl@gmail.com',
        'https://alphagroup.lightdata.com.ar/',
        0,
        81
    ),
    (
        67,
        'DespachaloChile/EnviosTeorx',
        'https://enviosteorx.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'MEkVbn',
        'pimpoyo',
        '',
        NULL,
        'https://enviosteorx.lightdata.app/',
        0,
        81
    ),
    (
        58,
        'Zuiden Cl',
        'https://zuidencl.lightdata.com.ar/app-assets/images/logo/logo.png',
        1,
        3,
        'ihiB3B',
        'serenisima',
        '',
        NULL,
        'https://zuidencl.lightdata.com.ar/',
        0,
        81
    ),
    (
        141,
        'TrepanChile',
        'https://trepanchile.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        've78JU',
        'colonoscopia',
        '',
        NULL,
        'https://trepanchile.lightdata.app/',
        0,
        81
    ),
    (
        183,
        'Tu motorizado',
        'https://tumotorizadocl.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'pFb5r8',
        'peripio',
        '',
        NULL,
        'https://tumotorizadocl.lightdata.app/',
        0,
        81
    ),
    (
        219,
        'Full envios',
        'https://logisticafullenvios.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        '1Vobf3',
        'pimpoyo',
        '',
        NULL,
        'https://fullenvios.lightdata.app/',
        0,
        81
    ),
    (
        221,
        'Stgo Courier',
        'https://stgocourier.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'B8f3S6',
        'teparatres',
        '',
        NULL,
        'https://stgocourier.lightdata.app/',
        0,
        81
    ),
    (
        235,
        'Despachando Express',
        'https://despachandoexpress.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'b3FS38',
        'abuelasalome',
        '',
        NULL,
        'https://despachandoexpress.lightdata.app/',
        0,
        81
    ),
    (
        236,
        'DriverPo',
        'https://driverpo.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'hhFS75',
        'besomulti',
        '',
        NULL,
        'https://driverpo.lightdata.app/',
        0,
        81
    ),
    (
        252,
        'move24',
        'https://moveultimamilla.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'Ehyc2T',
        'quierebailar',
        '',
        NULL,
        'https://moveultimamilla.lightdata.app/',
        0,
        81
    ),
    (
        259,
        'Te lo tenemos/rapidflex',
        'https://telotenemos.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '9Ag423',
        'telapongo',
        '',
        NULL,
        'https://telotenemos.lightdata.app/',
        0,
        81
    ),
    (
        279,
        'N Rutas',
        'https://nrutas.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'S39fL3',
        'duralaroca',
        '',
        NULL,
        'https://nrutas.lightdata.app/',
        0,
        81
    ),
    (
        285,
        'Bla delivery',
        'https://bladelivery.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'z8jYs5',
        'plascalbad',
        '',
        NULL,
        'https://bladelivery.lightdata.app/',
        0,
        81
    ),
    (
        305,
        'Transporte ZM',
        'https://transportezm.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        'C3nr6J',
        'picaso',
        '',
        NULL,
        'https://transportezm.lightdata.app/',
        0,
        81
    ),
    (
        160,
        'PlanetExpress',
        'https://planetexpress.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'muY89d',
        'salchipapa',
        '',
        NULL,
        'https://planetexpress.lightdata.app/',
        0,
        111
    ),
    (
        225,
        'Optimus',
        'https://optimusenvios.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        'Mzx10a',
        'lluevethor',
        '',
        NULL,
        'https://optimusenvios.lightdata.app/',
        0,
        111
    ),
    (
        227,
        'happyhouse',
        'https://happyhouse.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '216VXd',
        'piromaniaca',
        '',
        NULL,
        'https://happyhouse.lightdata.app/',
        0,
        111
    ),
    (
        246,
        'ExpressFlex',
        'https://expressflexmontevideo.lightdata.app/app-assets/images/logo/logo.png',
        1,
        3,
        '3vMrz8',
        'analflex',
        '',
        NULL,
        'https://expressflexmontevideo.lightdata.app/',
        0,
        111
    ),
    (
        240,
        'GF Logistica',
        'https://gflogistica.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'PE7Ac3',
        'macacapa',
        '',
        NULL,
        'https://gflogistica.lightdata.app/',
        0,
        89
    ),
    (
        223,
        'Rocha Store',
        'https://derochaexpres.lightdata.app/app-assets/images/logo/logo.png',
        5,
        3,
        'C09ASx',
        'papotaexpress',
        '',
        NULL,
        'https://derochaexpres.lightdata.app/',
        0,
        82
    ),
    (
        244,
        'Urra Mensajeria',
        'https://urra.lightdata.app/app-assets/images/logo/logo.png',
        5,
        3,
        'a93aV3',
        'analstacia',
        '',
        NULL,
        'https://urra.lightdata.app/',
        0,
        82
    ),
    (
        245,
        'CHUCHO EXPRESS',
        'https://chuchoexpressmensajeria.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '3CD9be',
        'quecachucha',
        '',
        NULL,
        'https://chuchoexpressmensajeria.lightdata.app/',
        0,
        82
    ),
    (
        290,
        'Fast Solution',
        'https://fastsolutionmensajerias.lightdata.app/app-assets/images/logo/logo.png',
        4,
        3,
        '23hChn',
        'laquehizochocarachano',
        '',
        NULL,
        'https://fastsolutionmensajerias.lightdata.app/',
        0,
        82
    ),
    (
        295,
        'Quinde',
        'https://enviosquinde.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'G4Thy6',
        'daikiridekiwi',
        '',
        NULL,
        'https://enviosquinde.lightdata.app/',
        0,
        82
    ),
    (
        300,
        'Red Logistica',
        'https://redlogisticane.lightdata.app/app-assets/images/logo/logo.png',
        2,
        3,
        'Vyr35q',
        'elpaponostro',
        '',
        NULL,
        'https://redlogisticane.lightdata.app/',
        0,
        82
    ),
    (
        292,
        'Metoo',
        'https://metoo.lightdata.app/app-assets/images/logo/logo.png',
        3,
        3,
        'EF2g24',
        'reinablanca',
        '',
        NULL,
        'https://metoo.lightdata.app/',
        0,
        42
    );

END $$


-- AGREGAR TRIGGERS DE METADATA
-- TRIGGER HISTORIAL ESTADOS LOGISTICA
CREATE TRIGGER `trg_logisticas_ai`
AFTER INSERT ON `lightdatito`.`logisticas`
FOR EACH ROW
BEGIN
  INSERT INTO `lightdatito`.`historial_estado_logistica`
    (`logisticas_id`, `estado_anterior_id`, `estado_nuevo_id`,`fecha_cambio`)
  VALUES
    (NEW.id,
     NULL,
     NEW.estado_logistica_id, now());
END$$

CREATE TRIGGER `trg_logisticas_au`
AFTER UPDATE ON `lightdatito`.`logisticas`
FOR EACH ROW
BEGIN
  IF OLD.estado_logistica_id <> NEW.estado_logistica_id THEN
    INSERT INTO `lightdatito`.`historial_estado_logistica`
      (`logisticas_id`, `estado_anterior_id`, `estado_nuevo_id`,`fecha_cambio`)
    VALUES
      (NEW.id,
       OLD.estado_logistica_id,
       NEW.estado_logistica_id,
       now());
  END IF;
END$$


-- TRIGGER HISTORIAL NOMBRE LOGISTICA
-- es necesario un que lo inserte el primer nombre si es un historial de cambios? la primera vez no hay cambios
CREATE TRIGGER `trg_logisticas_nombre_ai`
AFTER INSERT ON `lightdatito`.`logisticas`
FOR EACH ROW
BEGIN
  INSERT INTO `lightdatito`.`historial_nombres_logistica`
    (`logisticas_id`, `nombre_anterior`, `nombre_nuevo`,`fecha_cambio`)
  VALUES
    (NEW.id,
     NULL,
     NEW.nombre, now());
END$$


CREATE TRIGGER `trg_logisticas_nombre_au`
AFTER UPDATE ON `lightdatito`.`logisticas`
FOR EACH ROW
BEGIN
  IF OLD.nombre <> NEW.nombre THEN
    INSERT INTO `lightdatito`.`historial_nombres_logistica`
      (`logisticas_id`, `nombre_anterior`, `nombre_nuevo`,`fecha_cambio`)
    VALUES
      (NEW.id, OLD.nombre, NEW.nombre, now());
  END IF;
END$$

-- TRIGGER ESTADOS ticketS
-- 1) Al insertar un nuevo ticket, registra el estado inicial (por defecto 1)
CREATE TRIGGER `trg_tickets_estado_ai`
AFTER INSERT ON `lightdatito`.`tickets`
FOR EACH ROW
BEGIN
  INSERT INTO `lightdatito`.`historial_estados_ticket`
    (`ticket_id`, `estado_ticket_anterior_id`, `estado_ticket_nuevo_id`,`fecha_cambio`)
  VALUES
    (NEW.id,
     NULL,                 -- no había estado anterior
     NEW.estado_ticket_id, now());  -- que por defecto será 1
END$$

CREATE TRIGGER `trg_tickets_estado_au`
AFTER UPDATE ON `lightdatito`.`tickets`
FOR EACH ROW
BEGIN
  IF OLD.estado_ticket_id <> NEW.estado_ticket_id THEN
    INSERT INTO `lightdatito`.`historial_estados_ticket`
      (`ticket_id`, `estado_ticket_anterior_id`, `estado_ticket_nuevo_id`,`fecha_cambio`)
    VALUES
      (NEW.id,
       OLD.estado_ticket_id,
       NEW.estado_ticket_id, now());
  END IF;
END$$

---- TRIGGER HISTORIAL PRIORIDAD TICKETS
CREATE TRIGGER `trg_tickets_prioridades_ai`
AFTER INSERT ON `tickets`
FOR EACH ROW
BEGIN
  INSERT INTO `historial_prioridades`
    (`ticket_id`,
     `prioridad_ticket_anterior_id`,
     `prioridad_ticket_nuevo_id`,
     `fecha_cambio`)
  VALUES
    (NEW.`id`,
     NULL,                       -- no había prioridad anterior
     NEW.`prioridad_ticket_id`,
     NOW());
END$$

CREATE TRIGGER `trg_tickets_prioridades_au`
AFTER UPDATE ON `tickets`
FOR EACH ROW
BEGIN
  IF OLD.`prioridad_ticket_id` <> NEW.`prioridad_ticket_id` THEN
    INSERT INTO `historial_prioridades`
      (`ticket_id`,
       `prioridad_ticket_anterior_id`,
       `prioridad_ticket_nuevo_id`,
       `fecha_cambio`)
    VALUES
      (NEW.`id`,
       OLD.`prioridad_ticket_id`,
       NEW.`prioridad_ticket_id`,
       NOW());
  END IF;
END$$

-- -- TRIGGER HISTORIAL PLANES LOGISTICA
CREATE TRIGGER `trg_logisticas_plan_ai`
AFTER INSERT ON `lightdatito`.`logisticas`
FOR EACH ROW
BEGIN
  INSERT INTO `lightdatito`.`historial_plan_logistica`
    (`logisticas_id`, `plan_anterior_id`, `plan_nuevo_id`,`fecha_cambio`)
  VALUES
    (NEW.id,
     NULL,
     NEW.plan_id, now());
END$$

CREATE TRIGGER `trg_logisticas_plan_au`
AFTER UPDATE ON `lightdatito`.`logisticas`
FOR EACH ROW
BEGIN
  IF OLD.plan_id <> NEW.plan_id THEN
    INSERT INTO `lightdatito`.`historial_plan_logistica`
      (`logisticas_id`, `plan_anterior_id`, `plan_nuevo_id`,`fecha_cambio`)
    VALUES
      (NEW.id,
       OLD.plan_id,
       NEW.plan_id, now());
  END IF;
END$$


-- TRIGGER PARA HISTORIAL ASIGNACIONES
CREATE TRIGGER `trg_logisticas_asignaciones_ai`
AFTER INSERT ON `lightdatito`.`tickets`
FOR EACH ROW
BEGIN
  INSERT INTO `lightdatito`.`historial_asignaciones`
    (`ticket_id`, `usuario_anterior_id`, `usuario_nuevo_id`,`fecha_cambio`)
  VALUES
    (NEW.id,
     NULL,
     NEW.usuario_asignado_id, now());
END$$


CREATE TRIGGER `trg_logisticas_asignaciones_au`
AFTER UPDATE ON `lightdatito`.`tickets`
FOR EACH ROW
BEGIN
  IF OLD.usuario_asignado_id <> NEW.usuario_asignado_id THEN
    INSERT INTO `lightdatito`.`historial_asignaciones`
      (`ticket_id`,`usuario_anterior_id`, `usuario_nuevo_id`,`fecha_cambio`)
    VALUES
      (NEW.id, OLD.usuario_asignado_id, NEW.usuario_asignado_id, now());
  END IF;
END$$


-- TRIGGER PARA HISTORIAL PARTICULARIDADES PENSARLO BIEN REVISAR SOLO UPDATEA
DROP TRIGGER IF EXISTS `trg_logisticas_particularidad_au`$$
CREATE TRIGGER `trg_logisticas_particularidad_au`
AFTER UPDATE ON `logisticas`
FOR EACH ROW
BEGIN
  -- Sólo registra en el historial si cambió la particularidad
  IF OLD.tipo_particularidad_id <> NEW.tipo_particularidad_id THEN
    INSERT INTO `historial_particularidades`
      (`logisticas_id`, `fecha_cambio`, `tipo_particularidad_ant`, `tipo_particularidad_new`)
    VALUES
      (NEW.id,
       NOW(),
       OLD.tipo_particularidad_id,
       NEW.tipo_particularidad_id);
  END IF;
END$$




CREATE DEFINER = `root`@`localhost` PROCEDURE `truncate_all_tables`() BEGIN -- 1) Desactivar temporalmente las FKs
SET
    FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `comentarios`;
  TRUNCATE TABLE `historial_asignaciones`;
  TRUNCATE TABLE `historial_estados_logistica`;
  TRUNCATE TABLE `historial_nombres_logistica`;
  TRUNCATE TABLE `historial_plan_logistica`;
  TRUNCATE TABLE `historial_estados_ticket`;
  TRUNCATE TABLE `historial_particularidades`;
  TRUNCATE TABLE `historial_prioridades`;

  TRUNCATE TABLE `logisticas_observaciones`;
  TRUNCATE TABLE `observaciones_logistica`;
  TRUNCATE TABLE `particularidades`;
  TRUNCATE TABLE `tipo_particularidad`;

  TRUNCATE TABLE `modulo_herramienta`;
  TRUNCATE TABLE `herramienta`;
  TRUNCATE TABLE `modulo`;
  TRUNCATE TABLE `menu_plan`;
  TRUNCATE TABLE `menu`;

  TRUNCATE TABLE `tickets`;
  TRUNCATE TABLE `estados_ticket`;
  TRUNCATE TABLE `logisticas`;
  TRUNCATE TABLE `prioridades`;

  TRUNCATE TABLE `plan`;
  TRUNCATE TABLE `paises`;
  TRUNCATE TABLE `estados_logistica`;
  TRUNCATE TABLE `tipo_ticket`;
  TRUNCATE TABLE `proyectos`;

  TRUNCATE TABLE `puestos_usuario`;
  TRUNCATE TABLE `puestos`;

  TRUNCATE TABLE `usuarios`;
  
  
  SET
    FOREIGN_KEY_CHECKS = 1;

END$$


DELIMITER ;
SET
    SQL_MODE = @OLD_SQL_MODE;

SET
    FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET
    UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
    
