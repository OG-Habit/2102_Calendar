-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2021 at 04:34 AM
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
  `is_deleted` tinyint(1) NOT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`rem_id`, `user_id`, `event_name`, `descript`, `year`, `month`, `day`, `time_start`, `time_end`, `is_deleted`, `status`) VALUES
(1, 1, 'Event1', 'eveadsfa', 2022, 1, 1, '11:00', '12:00', 0, 0),
(2, 2, 'Event2', 'eveadsfa', 2022, 2, 1, '11:00', '12:00', 1, 0),
(3, 2, 'Event3', 'eveadsfa', 2023, 3, 1, '11:00', '12:00', 0, 0),
(4, 2, 'Event4', 'eveadsfa', 2023, 3, 3, '11:00', '12:00', 1, 0),
(5, 2, 'Event5', 'eveadsfa', 2022, 3, 1, '11:00', '12:00', 0, 0),
(6, 1, 'Event6', 'eveadsfa', 2023, 1, 1, '11:00', '12:00', 0, 0),
(7, 1, 'asfas', 'descriptianfsadfadsf', 2021, 11, 6, '14:17', '02:17', 0, 2),
(8, 1, 'aParytzz', 'dsfasdfsdfsafsadfdsfasdfasdf', 2021, 11, 6, '17:02', '17:23', 0, 2),
(9, 2, 'asdfsadf', 'asdfasdf', 2021, 11, 10, '14:32', '21:17', 0, 2),
(10, 2, 'asa', 'a', 2021, 10, 10, '21:18', '21:18', 0, 2),
(11, 2, 'sadf', 'sadfsdf', 2021, 9, 10, '09:27', '09:26', 0, 2),
(12, 1, 'ads', 'asdf', 2021, 8, 10, '09:26', '10:24', 0, 2),
(13, 1, 'new', 'desc', 2021, 11, 10, '14:39', '14:41', 1, 2),
(14, 1, 'dec 10 new', 'decsad', 2021, 11, 10, '14:42', '14:54', 0, 2),
(15, 1, 'asdf', 'asdfsd', 2021, 11, 10, '03:13', '15:17', 0, 2),
(16, 1, 'afasdf', 'asdfdsf', 2021, 11, 10, '15:29', '21:26', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(255) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `firstname`, `lastname`, `email`, `password`) VALUES
(1, 'Ivan', 'Woogue', 'ivan@gmail.com', 'ivan'),
(2, 'user1', 'user1', 'user1@gmail.com', 'user1'),
(3, 'user2', 'user2', 'user2@gmail.com', 'user2');

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
  MODIFY `rem_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
