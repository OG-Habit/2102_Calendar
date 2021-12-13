-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2021 at 07:45 AM
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
  `status` enum('deleted','unfinished','ongoing','finished') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`rem_id`, `user_id`, `event_name`, `descript`, `year`, `month`, `day`, `time_start`, `time_end`, `status`) VALUES
(1, 1, 'rem1', 'rem1', 2021, 11, 11, '19:11', '22:15', 'deleted'),
(2, 1, 'rem2', 'rem2', 2021, 11, 11, '18:17', '19:15', 'deleted'),
(3, 1, 'asdfdd', 'rem3d', 2021, 11, 12, '19:16', '19:17', 'deleted'),
(4, 1, 'rem3', 'rem3', 2021, 10, 11, '19:33', '19:36', 'deleted'),
(5, 1, 'rem4', 'rem4', 2022, 10, 11, '19:34', '21:32', 'unfinished'),
(6, 1, 'asd', 'a', 2021, 11, 12, '06:56', '07:09', 'deleted'),
(7, 1, 'aadsfsadf', 'dsafdsf', 2021, 11, 12, '07:07', '07:11', 'deleted'),
(8, 1, 'sadfasdf', 'adsfd', 2021, 11, 12, '07:10', '07:11', 'deleted'),
(9, 1, 'a', 'a', 2021, 11, 12, '12:11', '12:14', 'deleted'),
(10, 1, 'asdf', 'asdf', 2021, 11, 12, '07:17', '07:18', 'deleted'),
(11, 1, 'rem2', 'lkknl', 2021, 11, 12, '07:17', '07:20', 'deleted'),
(12, 1, 'rem1', 'lklk', 2021, 11, 12, '07:14', '19:16', 'deleted'),
(13, 1, 'asdf', 'asdf', 2021, 11, 12, '13:02', '13:03', 'deleted'),
(14, 1, '23234', '412', 2021, 11, 12, '12:00', '13:00', 'deleted'),
(15, 1, 'asd', 'asd', 2021, 11, 12, '07:17', '07:23', 'deleted'),
(16, 22, 'asdfdsfsdfdsfsdaf', 'sdfasfsadfsadfsadfsdaf', 2021, 11, 12, '14:08', '14:09', 'finished'),
(17, 22, 'asdf', 'asdf', 2021, 11, 12, '14:16', '14:19', 'finished'),
(18, 1, 'asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaa', 'asdfdsfa', 2021, 11, 12, '08:50', '23:59', 'deleted'),
(19, 1, 'Ongoing remindersddddddddddddddddddddd', 'asdfasdfafasdasdfasdfsdafdfadsfasfsafasfasdfasdfafasdasdfasdfsdafdfadsfasfsafasfasdfasdfafasdasdfasdfsdafdfadsfasfsafasf', 2021, 11, 13, '08:55', '23:59', 'ongoing'),
(20, 1, 'Unfinished', 'asdfsafsdafsdasfsdafdasdfasfasdfasfd', 2021, 11, 13, '17:58', '20:58', 'unfinished'),
(21, 1, 'adsfsadfdsfafasdfasfasdfasdfasf', 'asdfasdfasdfasdfsadfasdfsdafdsafdafsdfaasdfasdfasdfasdfsadfasdfsdafdsafdafsdfaasdfasdfasdfasdfsadfasdfsdafdsafdafsdfa', 2021, 11, 13, '09:03', '09:59', 'deleted'),
(22, 1, 'Nove rem', 'asdkfmsdomoasdmosdmomsdpmpm', 2021, 10, 11, '10:27', '10:30', 'finished'),
(23, 1, 'jan rem', 'asdkfmosmompsdmpmpmpm', 2021, 0, 11, '10:25', '10:26', 'finished'),
(24, 1, 'april ', 'slkflmmfmfmpofmpem', 2022, 3, 11, '10:25', '22:25', 'unfinished'),
(25, 1, 'aug reminder', 'klsdmfdsmfdmfpmfpdm', 2022, 7, 13, '22:28', '22:28', 'unfinished'),
(26, 1, 'Finished reminder', 'bladhadlmfslkdfsdklfmsldkfm', 2021, 11, 13, '10:39', '10:40', 'finished');

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
('QRaaZ53yl1FSr5_q_63f3KtgsDVTOc88', 1639464234, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-14T06:43:53.141Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":53}'),
('d8Dd2aTwGBKYMhBvFQgfXUaOmLsby9sM', 1639457782, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-12-14T04:56:21.927Z\",\"httpOnly\":true,\"path\":\"/\"},\"userId\":1}');

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
(1, 'Ivan', 'Woogue', 'ivan@gmail.com', 'ivan', 'icon7'),
(2, 'user1', 'user1', 'user1@gmail.com', 'user1', 'icon1');

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
  MODIFY `rem_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
