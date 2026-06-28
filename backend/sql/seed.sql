-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 26, 2026 at 07:35 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edms_dev`
--

--
-- Dumping data for table `audit_trail`
--

INSERT INTO `audit_trail` (`id`, `user_id`, `action`, `entity`, `entity_id`, `detail`, `created_at`) VALUES
(1, 1, 'Login', 'session', NULL, 'Seed login event', '2026-06-24 12:06:10'),
(2, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 19:10:57'),
(3, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 19:13:01'),
(4, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 19:21:45'),
(5, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 19:23:09'),
(6, NULL, 'Login', 'session', NULL, 'User logged in', '2026-06-24 19:23:19'),
(7, NULL, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 19:24:28'),
(8, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 19:24:44'),
(9, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 19:26:55'),
(10, NULL, 'Login', 'session', NULL, 'User logged in', '2026-06-24 19:27:04'),
(11, NULL, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 19:27:21'),
(12, NULL, 'Login', 'session', NULL, 'User logged in', '2026-06-24 19:29:37'),
(13, NULL, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 19:29:49'),
(14, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 19:47:00'),
(15, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 19:53:07'),
(16, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 19:55:14'),
(17, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 19:55:43'),
(18, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 20:00:55'),
(19, NULL, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:01:24'),
(20, NULL, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 20:01:30'),
(21, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:01:38'),
(22, 1, 'Create', 'documents', 3, 'Created document KAS PRIA 25', '2026-06-24 20:02:53'),
(23, 1, 'Create', 'documents', 4, 'Created document Paklaring Wahyu Trisna Setiadi', '2026-06-24 20:05:33'),
(24, 1, 'Edit', 'documents', 3, 'Updated document KAS PRIA 25', '2026-06-24 20:10:19'),
(25, 1, 'Delete', 'documents', 3, 'Deleted document KAS PRIA 25', '2026-06-24 20:12:39'),
(26, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 20:13:18'),
(27, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:13:37'),
(28, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 20:20:29'),
(29, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:20:37'),
(30, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 20:20:44'),
(31, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:21:51'),
(32, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 20:22:19'),
(33, NULL, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:24:46'),
(34, NULL, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 20:24:51'),
(35, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:38:15'),
(36, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:39:48'),
(37, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:42:19'),
(38, 1, 'Create', 'documents', 5, 'Created document TEST-DOWNLOAD-1782308539955', '2026-06-24 20:42:19'),
(39, 1, 'Delete', 'documents', 5, 'Deleted document TEST-DOWNLOAD-1782308539955', '2026-06-24 20:42:20'),
(40, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 20:42:55'),
(41, 1, 'Delete', 'documents', 4, 'Deleted document Paklaring Wahyu Trisna Setiadi', '2026-06-24 20:46:04'),
(42, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:00:14'),
(43, 1, 'Create', 'documents', 6, 'Created document FIX-DOC-1782309614166', '2026-06-24 21:00:14'),
(44, 1, 'Delete', 'documents', 6, 'Deleted document FIX-DOC-1782309614166', '2026-06-24 21:00:14'),
(45, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:03:01'),
(46, 1, 'Create', 'documents', 7, 'Created document KAS WANITA 25', '2026-06-24 21:05:27'),
(47, 1, 'Edit', 'documents', 7, 'Updated document KAS WANITA 25', '2026-06-24 21:06:42'),
(48, 1, 'Delete', 'documents', 7, 'Deleted document KAS WANITA 25', '2026-06-24 21:09:33'),
(49, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:21:41'),
(50, 8, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:21:49'),
(51, 8, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:23:40'),
(52, 8, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:23:49'),
(53, 8, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:24:01'),
(54, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:24:12'),
(55, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:24:44'),
(56, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:24:55'),
(57, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:25:02'),
(58, 8, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:25:17'),
(59, 8, 'Create', 'documents', 8, 'Created document 1 Februari 2026', '2026-06-24 21:26:53'),
(60, 8, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:28:51'),
(61, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:28:59'),
(62, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:30:42'),
(63, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:30:51'),
(64, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:31:07'),
(65, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:31:18'),
(66, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:32:22'),
(67, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:32:31'),
(68, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:33:39'),
(69, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:33:48'),
(70, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-24 21:34:55'),
(71, 11, 'Login', 'session', NULL, 'User logged in', '2026-06-24 21:35:03'),
(72, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 11:30:19'),
(73, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 12:00:02'),
(74, 11, 'Login', 'session', NULL, 'User logged in', '2026-06-25 12:50:03'),
(75, 11, 'Create', 'documents', 9, 'Created document 25 Desember 2025', '2026-06-25 12:52:26'),
(76, 11, 'Edit', 'documents', 9, 'Updated document 25 Desember 2025', '2026-06-25 12:52:48'),
(77, 11, 'Edit', 'documents', 9, 'Updated document 25 Desember 2025', '2026-06-25 12:53:43'),
(78, 11, 'Edit', 'documents', 9, 'Updated document 25 Desember 2025', '2026-06-25 12:55:19'),
(79, 11, 'Edit', 'documents', 9, 'Updated document 25 Desember 2025', '2026-06-25 12:55:36'),
(80, 11, 'Edit', 'documents', 9, 'Updated document 25 Desember 2025', '2026-06-25 12:56:22'),
(81, 11, 'Edit', 'documents', 9, 'Updated document Paklaring Wahyu Trisna Setiadi', '2026-06-25 12:58:12'),
(82, 11, 'Edit', 'documents', 9, 'Updated document Surat Keterangan Belum Bekerja Wahyuts 7 Jan 2026', '2026-06-25 12:59:12'),
(83, 11, 'Edit', 'documents', 9, 'Updated document 3 Mei 2026', '2026-06-25 13:00:16'),
(84, 11, 'Edit', 'documents', 9, 'Updated document 3 Mei 20279', '2026-06-25 13:01:00'),
(85, 11, 'Edit', 'documents', 9, 'Updated document 3 Mei 234567', '2026-06-25 13:02:02'),
(86, 11, 'Edit', 'documents', 9, 'Updated document Surat Keterangan Belum Bekerja Wahyuts 7 Jan 2026_signed', '2026-06-25 13:05:02'),
(87, 11, 'Edit', 'documents', 9, 'Updated document surat belum kerja', '2026-06-25 13:07:20'),
(88, 11, 'Edit', 'documents', 9, 'Updated document surat belum kerja', '2026-06-25 13:09:17'),
(89, 11, 'Delete', 'documents', 9, 'Deleted document surat belum kerja', '2026-06-25 13:11:58'),
(90, 11, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 13:12:36'),
(91, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-25 13:13:06'),
(92, 10, 'Create', 'documents', 10, 'Created document PIF 123456', '2026-06-25 13:15:10'),
(93, 10, 'Edit', 'documents', 10, 'Updated document PIF 123456', '2026-06-25 13:26:12'),
(94, 10, 'Delete', 'documents', 10, 'Deleted document PIF 123456', '2026-06-25 13:26:33'),
(95, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 13:27:56'),
(96, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-25 13:28:04'),
(97, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 13:39:22'),
(98, NULL, 'Login', 'session', NULL, 'User logged in', '2026-06-25 13:39:22'),
(99, NULL, 'Login', 'session', NULL, 'User logged in', '2026-06-25 13:39:23'),
(100, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 13:41:07'),
(101, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-25 13:41:50'),
(102, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 13:43:22'),
(103, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-25 13:43:38'),
(104, 10, 'Create', 'documents', 11, 'Created document KAS PRIA 25', '2026-06-25 13:45:24'),
(105, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 13:48:28'),
(106, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-25 13:48:40'),
(107, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 13:53:07'),
(108, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:15:44'),
(109, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 17:16:07'),
(110, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:16:44'),
(111, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 17:16:54'),
(112, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:18:17'),
(113, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 17:20:43'),
(114, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:20:52'),
(115, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 17:22:19'),
(116, 8, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:22:27'),
(117, 8, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 17:25:44'),
(118, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:26:09'),
(119, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 17:32:36'),
(120, 8, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:32:47'),
(121, 1, 'Login', 'session', NULL, 'Seed login event', '2026-06-25 10:39:49'),
(122, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:40:37'),
(123, NULL, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:40:37'),
(124, NULL, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:40:37'),
(125, 8, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 17:43:08'),
(126, 8, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:43:32'),
(127, 8, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 17:45:26'),
(128, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:45:36'),
(129, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 17:47:01'),
(130, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 17:47:08'),
(131, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 18:25:05'),
(132, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-25 18:25:15'),
(133, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 18:28:40'),
(134, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 18:30:33'),
(135, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 18:30:40'),
(136, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 18:41:22'),
(137, 1, 'Delete', 'documents', 11, 'Deleted document KAS PRIA 25', '2026-06-25 18:48:15'),
(138, 1, 'Create', 'documents', 14, 'Created document KAS PRIA 25', '2026-06-25 18:49:27'),
(139, 1, 'Create', 'documents', 15, 'Created document KAS WANITA 25', '2026-06-25 18:52:51'),
(140, 1, 'Delete', 'documents', 14, 'Deleted document KAS PRIA 25', '2026-06-25 18:53:48'),
(141, 1, 'Delete', 'documents', 15, 'Deleted document KAS WANITA 25', '2026-06-25 18:53:52'),
(142, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 18:59:53'),
(143, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 19:00:16'),
(144, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 19:03:33'),
(145, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 19:18:02'),
(146, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 19:29:46'),
(147, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-25 19:29:54'),
(148, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 19:44:02'),
(149, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-25 19:44:16'),
(150, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 19:44:22'),
(151, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 19:44:29'),
(152, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 19:51:26'),
(153, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-25 19:51:38'),
(154, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 19:52:04'),
(155, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 19:52:12'),
(156, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 20:13:26'),
(157, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 20:13:42'),
(158, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 20:28:59'),
(159, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 22:59:52'),
(160, 1, 'Edit', 'documents', 8, 'Updated document 1 Februari 2026', '2026-06-25 23:07:40'),
(161, 1, 'Create', 'documents', 16, 'Created document KAS WANITA 25', '2026-06-25 23:08:55'),
(162, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 23:11:01'),
(163, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-25 23:11:21'),
(164, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 23:11:56'),
(165, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 23:12:25'),
(166, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 23:34:14'),
(167, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-25 23:34:26'),
(168, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-25 23:47:09'),
(169, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-25 23:59:53'),
(170, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-26 08:00:42'),
(171, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-26 08:12:51'),
(172, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 08:53:46'),
(173, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:22:44'),
(174, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:32:15'),
(175, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:32:32'),
(176, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:34:10'),
(177, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:34:49'),
(178, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:38:07'),
(179, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:38:14'),
(180, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:38:55'),
(181, 8, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:39:12'),
(182, 8, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:40:45'),
(183, 11, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:41:17'),
(184, 11, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:42:36'),
(185, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:42:44'),
(186, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:43:59'),
(187, 11, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:44:08'),
(188, 11, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:45:57'),
(189, 11, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:46:14'),
(190, 11, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:46:26'),
(191, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:46:33'),
(192, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:46:48'),
(193, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:46:57'),
(194, 10, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 11:47:56'),
(195, 1, 'Login', 'session', NULL, 'User logged in', '2026-06-26 11:48:02'),
(196, 1, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 12:02:23'),
(197, 11, 'Login', 'session', NULL, 'User logged in', '2026-06-26 12:02:54'),
(198, 11, 'Edit', 'documents', 16, 'Updated document KAS WANITA 25', '2026-06-26 12:24:06'),
(199, 11, 'Edit', 'documents', 8, 'Updated document 1 Februari 2026', '2026-06-26 12:24:22'),
(200, 11, 'Edit', 'documents', 8, 'Updated document 1 Februari 2026', '2026-06-26 12:25:25'),
(201, 11, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 12:26:51'),
(202, 9, 'Login', 'session', NULL, 'User logged in', '2026-06-26 12:27:12'),
(203, 9, 'Logout', 'session', NULL, 'User logged out', '2026-06-26 12:29:22'),
(204, 10, 'Login', 'session', NULL, 'User logged in', '2026-06-26 12:29:29');

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `document_number`, `title`, `description`, `discipline`, `area`, `revision`, `status`, `sla_status`, `sla_due_at`, `sla_started_at`, `repository_id`, `file_path`, `file_name`, `file_size`, `mime_type`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'P-CDU-PFD-001', 'Process Flow Diagram Area 2', 'Process Flow Diagram Area 2', 'PFD', 'CDU', 1, 'Approved', 'Final As-Built', '2026-06-22 09:00:00', '2026-06-22 09:00:00', 1, '\\\\NAS\\LAB\\CDU\\PFD001', 'P-CDU-PFD-001.pdf', 1024000, 'application/pdf', '2026-06-24 12:06:10', '2026-06-24 12:06:10', NULL),
(2, 'P-CDU-PID-010', 'Heater System', 'Heater System', 'PID', 'CDU', 2, 'Client Review', 'At Risk', '2026-06-20 14:32:00', '2026-06-20 14:32:00', 1, '\\\\NAS\\LAB\\CDU\\PID010', 'P-CDU-PID-010.pdf', 2048000, 'application/pdf', '2026-06-24 12:06:10', '2026-06-24 12:06:10', NULL),
(8, '1 Februari 2026', 'oke', 'oke', 'PFD', 'Tangerang', 1, 'Client Review', NULL, '2026-06-26 00:00:00', '2026-06-24 21:26:53', NULL, 'uploads/documents/1-Februari-2026/1-Februari-2026-1782311213791-1-Februari-2026.pdf', '1 Februari 2026.pdf', 71160, 'application/pdf', '2026-06-24 21:26:53', '2026-06-26 12:25:25', NULL),
(16, 'KAS WANITA 25', 'oke', 'oke', 'PFD', 'Tangerang', 1, 'Client Review', NULL, '2026-06-24 00:00:00', '2026-06-25 23:08:55', NULL, 'uploads/documents/KAS-WANITA-25/KAS-WANITA-25-1782403735166-KAS-WANITA-25.pdf', 'KAS WANITA 25.pdf', 131647, 'application/pdf', '2026-06-25 23:08:55', '2026-06-26 12:24:06', NULL);

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `type`, `module`, `target_route`, `target_label`, `is_read`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 1, 'PFD Created', 'KAS WANITA 25 has been created.', 'success', 'document', '/document-register/pfd', 'Open PFD', 1, '2026-06-25 23:08:55', '2026-06-25 23:09:52', NULL);

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `code`, `name`) VALUES
(1, 'document.create', 'Create Document'),
(2, 'document.view', 'View Document'),
(3, 'document.edit', 'Edit Document'),
(4, 'document.delete', 'Delete Document'),
(5, 'document.download', 'Download Document'),
(6, 'document.upload', 'Upload Document'),
(7, 'dashboard.view', 'View Dashboard'),
(8, 'user.view', 'View User'),
(9, 'user.create', 'Create User'),
(10, 'user.edit', 'Edit User'),
(11, 'user.delete', 'Delete User'),
(12, 'escalation.view', 'View Escalation'),
(13, 'audit.view', 'View Audit Trail'),
(14, 'storage.view', 'View Storage Repository'),
(15, 'storage.create', 'Create Storage Repository'),
(16, 'storage.edit', 'Edit Storage Repository'),
(17, 'storage.delete', 'Delete Storage Repository'),
(18, 'notification.view', 'View Notification'),
(19, 'notification.edit', 'Mark Notification Read'),
(20, 'notification.delete', 'Delete Notification');

--
-- Dumping data for table `repositories`
--

INSERT INTO `repositories` (`id`, `name`, `path`, `status`, `storage_type`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'NAS', '\\\\NAS\\LAB', 'Offline', 'NAS', '2026-06-24 12:06:10', '2026-06-24 12:06:10', NULL),
(2, 'Local Uploads', 'uploads', 'Online', 'Local', '2026-06-24 12:06:10', '2026-06-24 12:06:10', NULL);

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'Administrator', 'Full access'),
(2, 'Project Manager', 'Project management access'),
(3, 'Document Controller', 'Document control access'),
(4, 'Engineer', 'Engineering access'),
(5, 'Client', 'Client access');

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 18),
(2, 19),
(2, 20),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(3, 18),
(3, 19),
(3, 20),
(4, 1),
(4, 2),
(4, 3),
(4, 5),
(4, 6),
(4, 7),
(4, 12),
(4, 13),
(4, 14),
(4, 18),
(4, 19),
(4, 20),
(5, 2),
(5, 3),
(5, 5),
(5, 7),
(5, 13),
(5, 14),
(5, 18),
(5, 19),
(5, 20);

--
-- Dumping data for table `sla_rules`
--

INSERT INTO `sla_rules` (`id`, `status_name`, `duration_hours`, `escalation_level`) VALUES
(1, 'Internal Draft', 72, 1),
(2, 'Internal Review', 120, 1),
(3, 'Client Review', 168, 2),
(4, 'Revision Requested', 72, 1),
(5, 'Approved', 0, 0),
(6, 'Final As-Built', 0, 0);

--
-- Dumping data for table `transmittals`
--

INSERT INTO `transmittals` (`id`, `transmittal_number`, `type`, `sender`, `destination`, `transmittal_date`, `status`, `remarks`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'TR-IN-2025-001', 'Incoming', 'Client', NULL, '2025-05-27 09:00:00', 'Received', 'Initial incoming transmittal', '2026-06-24 12:06:10', '2026-06-24 12:06:10', NULL),
(2, 'TR-OUT-2025-001', 'Outgoing', NULL, 'BEUK', '2025-05-27 14:00:00', 'Sent', 'Initial outgoing transmittal', '2026-06-24 12:06:10', '2026-06-24 12:06:10', NULL);

--
-- Dumping data for table `transmittal_documents`
--

INSERT INTO `transmittal_documents` (`id`, `transmittal_id`, `document_id`) VALUES
(1, 1, 1);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `full_name`, `email`, `role_id`, `department`, `status`, `avatar`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'deny', '$2a$10$TQqCIIZyD/4LT.G/y4WKG.PFUsqCs64yvo9zUaHI4MJNJMArnH2si', 'Bpk. Deny', 'deny@sena.local', 1, 'Engineering', 'Active', '', '2026-06-24 12:06:10', '2026-06-24 12:06:10', NULL),
(3, 'api_test_1782305220368', '$2a$10$1VDR0e1wBEWX2SS8q9oIrOz81ZzRg8AlRjEXBYT/zX7W/tOjopIvi', 'API Test User', 'api_test_1782305220368@sena.local', 4, 'QA', 'Active', '', '2026-06-24 19:47:00', '2026-06-24 19:47:00', NULL),
(6, 'testing', '$2a$10$qRefraa5vhzwPpTfAgv.2.JH/69AEBuUwqOQ6ENTIXuI1QPY9OoW.', 'test', 'test@gmail.com', 1, 'Engineering', 'Active', '', '2026-06-24 20:44:35', '2026-06-24 20:45:04', '2026-06-24 20:45:04'),
(8, 'edo', '$2a$10$EzIgHsWCnH.2uRvYpkvkpec0tVdeVMjoEYq4o8w1C7D1kQ3Kdhw0K', 'Edoardo', 'edo@gmail.com', 4, 'Engineering', 'Active', '', '2026-06-24 21:21:31', '2026-06-25 17:21:42', NULL),
(9, 'barrent', '$2a$10$zbWKJxTW6mZteDrIlbyroutNkNl9IP4lMmhb/5x.TRUAC.Y3U2o1e', 'Barren Ganteng', 'barren@gmail.com', 5, 'Engineering', 'Active', '', '2026-06-24 21:30:27', '2026-06-25 19:51:55', NULL),
(10, 'lucys', '$2a$10$fl7lCQyBajFRCcM0kQLTlez1Kw9V/FX/BwIQ7M44OPrBETacnMVOS', 'Lucy Heartfillia', 'lucy@gmail.com', 3, 'Engineering', 'Active', '', '2026-06-24 21:32:13', '2026-06-25 13:43:58', NULL),
(11, 'mega', '$2a$10$CfjRlqn3ekW5MP4egnWZpuuUJgTdhDhscN9NmO6lBKyW1euNk1BJ2', 'Megawati', 'megawati@gmail.com', 2, 'Engineering', 'Active', '', '2026-06-24 21:34:42', '2026-06-24 21:34:42', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
