-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-02-2025 a las 22:53:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inmobiliaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `Nombre` varchar(150) NOT NULL COMMENT 'Nombre completo del cliente',
  `Email` varchar(100) NOT NULL COMMENT 'correo del cliente',
  `telefono` int(12) NOT NULL COMMENT 'numero de telefono usuario',
  `direccion` varchar(250) NOT NULL COMMENT 'Direccion actal del cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `Nombre`, `Email`, `telefono`, `direccion`) VALUES
(8, 'guayaba', 'guabaya@gmal.com', 2147483647, 'jbsjhcaskz cksa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `usuario` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`usuario`, `password`) VALUES
('Guayaba', 'guayaba123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lots`
--

CREATE TABLE `lots` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lots`
--

INSERT INTO `lots` (`id`, `name`) VALUES
(1, 'Lote 1'),
(2, 'Lote 2'),
(3, 'Lote 3'),
(4, 'Lote 4'),
(5, 'Lote 5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plots`
--

CREATE TABLE `plots` (
  `id` int(11) NOT NULL,
  `lot_id` int(11) NOT NULL,
  `plot_name` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL,
  `size` decimal(50,3) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plots`
--

INSERT INTO `plots` (`id`, `lot_id`, `plot_name`, `location`, `size`, `status`) VALUES
(11, 1, 'Terreno 1', 'Ubicación A', 100.000, 'Disponible'),
(12, 1, 'Terreno 2', 'Ubicación B', 150.000, 'Vendido'),
(13, 2, 'Terreno 3', 'Ubicación C', 200.000, 'Apartado'),
(14, 2, 'Terreno 4', 'Ubicación D', 120.000, 'Disponible'),
(15, 3, 'Terreno 5', 'Ubicación E', 180.000, 'Vendido'),
(16, 3, 'Terreno 6', 'Ubicación F', 90.000, 'Disponible'),
(17, 4, 'Terreno 7', 'Ubicación G', 110.000, 'Apartado'),
(18, 4, 'Terreno 8', 'Ubicación H', 130.000, 'Disponible'),
(19, 5, 'Terreno 9', 'Ubicación I', 140.000, 'Vendido'),
(20, 5, 'Terreno 10', 'Ubicación J', 160.000, 'Disponible');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `lots`
--
ALTER TABLE `lots`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plots`
--
ALTER TABLE `plots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lot_id` (`lot_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `lots`
--
ALTER TABLE `lots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `plots`
--
ALTER TABLE `plots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `plots`
--
ALTER TABLE `plots`
  ADD CONSTRAINT `plots_ibfk_1` FOREIGN KEY (`lot_id`) REFERENCES `lots` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
