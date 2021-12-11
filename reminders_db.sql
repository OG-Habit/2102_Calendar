-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2021 at 10:28 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reminders_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `rem_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `descript` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `month` tinyint(4) NOT NULL,
  `day` tinyint(4) NOT NULL,
  `time_start` varchar(15) NOT NULL,
  `time_end` varchar(15) NOT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`rem_id`, `user_id`, `event_name`, `descript`, `year`, `month`, `day`, `time_start`, `time_end`, `status`) VALUES
(17, 1, 'rem1', 'emasdfsdfasdfsadfasdfasdfsadfsadfsafasfsadfasdfasfsafdsafasf', 2021, 11, 11, '15:39', '19:38', 1),
(18, 1, 'rem2', 'remasdfsd', 2021, 11, 11, '15:50', '15:51', 2),
(19, 1, 'b', 'bbbbb', 2021, 11, 11, '16:54', '17:54', 1),
(20, 1, 'rem1', 'rem1', 2021, 11, 11, '16:21', '18:20', 1),
(21, 1, 'rem2', 'rem2', 2022, 11, 11, '16:23', '19:20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('A-vjhLApJPXX0SYGOAg2D3FRrOXCTjHD', 1639300353, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-12T07:28:13.420Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":1}'),
('PrG0d7VHJfujbghk0HeKD-QXQOcRUSmK', 1639283483, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-12T03:46:12.293Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":6}'),
('dVHnVtnWXXq2i6VGpCu0zYPMcfvxyo_W', 1639291085, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-12T06:38:04.562Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":1}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(255) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `icon` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `firstname`, `lastname`, `email`, `password`, `icon`) VALUES
(1, 'Ivan', 'Woogue', 'ivan@gmail.com', 'ivan', 'icon1'),
(2, 'user1', 'user1', 'user1@gmail.com', 'user1', 'icon1'),
(3, 'user2', 'user2', 'user2@gmail.com', 'user2', 'icon1'),
(6, 'Jayyyyd', 'Rosales', 'j@gmail.com', '1234', 'icon8'),
(7, 'user3', 'user3', 'user3@gmail.com', 'user3', 'icon1'),
(9, 'ivan', 'ivan', 'ivan@gmai', '', 'icon1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`rem_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `rem_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
