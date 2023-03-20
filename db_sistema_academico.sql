-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-03-2023 a las 01:09:18
-- Versión del servidor: 10.8.4-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sistema_academico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumnos` char(20) NOT NULL,
  `codigo` char(10) NOT NULL,
  `nombre` char(20) NOT NULL,
  `direccion` char(200) NOT NULL,
  `dui` char(15) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`idAlumnos`, `codigo`, `nombre`, `direccion`, `dui`) VALUES
('186f6f9a7a4', 'USIS038521', 'Erick Tiznado', 'San Miguel', '12345678-9'),
('186f718ddea', 'USIS038421', 'Alex', 'Usulutan', '12345678-9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE `docentes` (
  `idDocente` varchar(16) NOT NULL,
  `codigo` int(3) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `fecha` varchar(200) NOT NULL,
  `direccion` char(200) NOT NULL,
  `municipio` char(200) NOT NULL,
  `departamento` char(200) NOT NULL,
  `telefono` char(9) NOT NULL,
  `dui` char(10) NOT NULL,
  `sexo` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `docentes`
--

INSERT INTO `docentes` (`idDocente`, `codigo`, `nombre`, `fecha`, `direccion`, `municipio`, `departamento`, `telefono`, `dui`, `sexo`) VALUES
('186f734424c', 321, 'Erick', '10/06/2002', 'San Miguel', 'San Miguel', 'San Miguel', '7083-0446', '12345678-9', 'Masculino'),
('186f735a044', 321, 'Luis', '10/06/2002', 'San Miguel', 'San Miguel', 'San Miguel', '1234-5678', '98765432-1', 'Masculino'),
('186f7920670', 321, 'Erick', '10/06/2002', 'San Miguel', 'San Miguel', 'San Miguel', '7083-0446', '98765432-1', 'Masculino'),
('186f7a67979', 321, 'Alex', '10/06/2002', 'San Miguel', 'San Miguel', 'San Miguel', '7083-0446', '98765432-1', 'Masculino'),
('186f7ab0d79', 321, 'Erick Mauricio', '10/06/2002', 'San Miguel', 'San Miguel', 'San Miguel', '7083-0446', '98765432-1', 'Masculino'),
('186f7ad2119', 543, 'Erick Mauricio', '10/06/2002', 'San Miguel', 'San Miguel', 'Usulutan', '0000-0000', '98765432-1', 'Masculino'),
('186fa29aa6b', 111, 'Milu', '10/06/2002', 'San Miguel', 'San Miguel', 'San Miguel', '7083-0446', '98765432-1', 'Masculino'),
('186fa29e33b', 111, 'Milu', '10/06/2002', 'San Miguel', 'San Miguel', 'San Miguel', '7083-0446', '98765432-1', 'Masculino'),
('186fa7db236', 555, 'Fran', '10/06/2002', 'San Miguel', 'San Miguel', 'Usulutan', '7083-0446', '98765432-1', 'Masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `idMateria` varchar(20) NOT NULL,
  `codigo` int(3) NOT NULL,
  `materia` varchar(20) NOT NULL,
  `docente` varchar(70) NOT NULL,
  `de` time NOT NULL,
  `a` time NOT NULL,
  `dia` varchar(20) NOT NULL,
  `Aula` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`idMateria`, `codigo`, `materia`, `docente`, `de`, `a`, `dia`, `Aula`) VALUES
('186fb70ba5b', 432, 'Progra', 'Erick', '17:59:00', '18:00:00', 'Jueves', 'Lab');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matriculas`
--

CREATE TABLE `matriculas` (
  `idMatricula` char(20) NOT NULL,
  `alumno` char(75) NOT NULL,
  `fecha` date NOT NULL,
  `pago` char(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `matriculas`
--

INSERT INTO `matriculas` (`idMatricula`, `alumno`, `fecha`, `pago`) VALUES
('186fc018d9a', 'Erick Tiznado', '2023-03-08', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumnos`);

--
-- Indices de la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`idDocente`);

--
-- Indices de la tabla `matriculas`
--
ALTER TABLE `matriculas`
  ADD PRIMARY KEY (`idMatricula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
