-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 17, 2026 at 02:36 PM
-- Server version: 8.0.42-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hikv_person_ac`
--

--
-- Dumping data for table `device`
--

INSERT INTO `device` (`id`, `name`, `ip`, `username`, `password`, `loc`, `channel`, `last_event_sync`, `last_user_sync`, `port`, `isActive`, `status`, `useSSL`, `locationId`, `direction`, `deviceType`, `serialNumber`) VALUES
(2, 'Xpass_Gate 2.1---out', '10.10.2.113', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.445', '2026-03-19 19:04:00.445', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084682'),
(3, 'Scan Card_546084687', '10.10.2.120', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.449', '2026-03-19 19:04:00.449', 51211, 1, 'disconnected', 0, 1, 'in', NULL, '546084687'),
(4, 'Xpass_Gate 3.2---out', '10.10.2.114', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.453', '2026-03-19 19:04:00.453', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084700'),
(5, 'Xpass_Gate 2.1---in', '10.10.2.121', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.456', '2026-03-19 19:04:00.456', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084701'),
(6, 'Xpass_Gate 3.3---in', '10.10.2.116', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.460', '2026-03-19 19:04:00.460', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084702'),
(7, 'Xpass_Gate 1.3---in', '10.10.2.105', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.463', '2026-03-19 19:04:00.463', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084703'),
(8, 'Xpass_Gate 1.1---in', '10.10.2.111', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.466', '2026-03-19 19:04:00.466', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084704'),
(9, 'Xpass_Gate 2.2---in', '10.10.2.104', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.470', '2026-03-19 19:04:00.470', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084705'),
(10, 'Xpass_Gate 3.2---in', '10.10.2.125', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.473', '2026-03-19 19:04:00.473', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084706'),
(11, 'Xpass_Gate 2.3---in', '10.10.2.119', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.476', '2026-03-19 19:04:00.476', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084707'),
(12, 'Xpass_Gate 1.3---out', '10.10.2.115', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.480', '2026-03-19 19:04:00.480', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084708'),
(13, 'Xpass_Gate 3.3---out', '10.10.2.123', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.483', '2026-03-19 19:04:00.483', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084709'),
(14, 'Xpass_Gate 2.5---out', '10.10.2.110', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.487', '2026-03-19 19:04:00.487', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084710'),
(15, 'Xpass_Gate 2.3---out', '10.10.2.102', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.490', '2026-03-19 19:04:00.490', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084711'),
(16, 'Xpass_Gate 2.4---out', '10.10.2.112', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.494', '2026-03-19 19:04:00.494', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084712'),
(17, 'Xpass_Gate 2.4---in', '10.10.2.122', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.497', '2026-03-19 19:04:00.497', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084713'),
(18, 'Xpass_Gate 1.1---out', '10.10.2.109', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.500', '2026-03-19 19:04:00.500', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084714'),
(19, 'Xpass_Gate 1.2---out', '10.10.2.118', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.504', '2026-03-19 19:04:00.504', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084715'),
(20, 'Xpass_Gate 3.1---out', '10.10.2.107', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.507', '2026-03-19 19:04:00.507', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084716'),
(21, 'Xpass_Gate 1.2---in', '10.10.2.103', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.511', '2026-03-19 19:04:00.511', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084717'),
(22, 'Xpass_Gate 2.2---out', '10.10.2.106', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.514', '2026-03-19 19:04:00.514', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084718'),
(23, 'Xpass_Gate 3.1---in', '10.10.2.117', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.518', '2026-03-19 19:04:00.518', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084719'),
(24, 'Xpass_Gate 2.5---in', '10.10.2.101', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.522', '2026-03-19 19:04:00.522', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546084720'),
(25, 'Xpass_Gate 4.3---in', '10.10.2.130', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.525', '2026-03-19 19:04:00.525', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546166483'),
(26, 'Xpass_Gate 4.1---out', '10.10.2.126', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.529', '2026-03-19 19:04:00.529', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546173324'),
(27, 'Xpass_Gate 4.1---in', '10.10.2.127', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.532', '2026-03-19 19:04:00.532', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546173333'),
(28, 'Xpass_Gate 4.4---Out', '10.10.2.131', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.536', '2026-03-19 19:04:00.536', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546173336'),
(29, 'Xpass_Gate 4.3---out', '10.10.2.132', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.539', '2026-03-19 19:04:00.539', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546173337'),
(30, 'Xpass_Gate 4.2---out', '10.10.2.128', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.542', '2026-03-19 19:04:00.542', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546173339'),
(31, 'Xpass_Gate 4.2---in', '10.10.2.129', NULL, NULL, NULL, NULL, '2026-03-19 19:04:00.546', '2026-03-19 19:04:00.546', 51211, 1, 'disconnected', 0, NULL, 'in', NULL, '546174123');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
