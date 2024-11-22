-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: recco
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commentdislikes`
--

DROP TABLE IF EXISTS `commentdislikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentdislikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_dislike` (`comment_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `commentdislikes_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `commentdislikes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentdislikes`
--

LOCK TABLES `commentdislikes` WRITE;
/*!40000 ALTER TABLE `commentdislikes` DISABLE KEYS */;
INSERT INTO `commentdislikes` VALUES (9,1,10,'2024-11-16 18:33:32');
/*!40000 ALTER TABLE `commentdislikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentlikes`
--

DROP TABLE IF EXISTS `commentlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentlikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_like` (`comment_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `commentlikes_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `commentlikes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentlikes`
--

LOCK TABLES `commentlikes` WRITE;
/*!40000 ALTER TABLE `commentlikes` DISABLE KEYS */;
INSERT INTO `commentlikes` VALUES (4,16,8,'2024-11-04 03:09:14'),(15,6,10,'2024-11-16 18:33:24'),(16,17,10,'2024-11-21 16:52:52');
/*!40000 ALTER TABLE `commentlikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,101,1,NULL,'Inception is a mind-blowing movie!','','2024-09-29 10:15:00'),(2,101,2,1,'Edited comment','','2024-09-29 10:30:00'),(3,102,2,NULL,'Attack on Titan is my all-time favorite anime!','','2024-09-28 18:00:00'),(4,102,1,3,'The plot twists are insane, especially in Season 4.','','2024-09-28 19:00:00'),(5,102,1,3,'Can\'t wait for the final season!','','2024-09-28 19:15:00'),(6,103,8,NULL,'This is my first edited comment. So exciting!',NULL,'2024-10-23 11:05:38'),(7,103,8,NULL,'Here goes my second edited comment.',NULL,'2024-10-23 11:07:50'),(8,103,8,6,'My first reply! wohooo',NULL,'2024-10-23 11:08:47'),(9,101,8,1,'I agree',NULL,'2024-10-23 11:10:10'),(10,102,8,3,'Just finished the final season and it was so intense!',NULL,'2024-10-23 11:16:12'),(11,102,8,10,'I just did too',NULL,'2024-10-23 11:29:20'),(12,102,8,4,'ikr',NULL,'2024-10-23 11:35:59'),(13,102,8,3,'me too',NULL,'2024-10-23 11:42:52'),(14,101,8,2,'didn\'t see it coming lol',NULL,'2024-10-23 11:43:39'),(15,103,8,8,'another test',NULL,'2024-10-23 11:48:10'),(16,103,7,NULL,'Congrats!',NULL,'2024-10-24 08:18:11'),(17,104,8,NULL,'I\'ve seen this too and it was definitely worth of my time',NULL,'2024-10-24 12:01:18'),(27,104,8,NULL,'sdsdsd',NULL,'2024-11-02 11:32:57'),(38,104,10,27,'hghg',NULL,'2024-11-17 02:06:05'),(41,101,10,2,'a reply to an edited comment',NULL,'2024-11-22 00:58:13');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Action'),(2,'Adventure'),(3,'Comedy'),(4,'Drama'),(5,'Fantasy'),(6,'Horror'),(7,'Mystery'),(8,'Romance'),(9,'Sci-Fi'),(10,'Thriller'),(11,'Supernatural'),(12,'Psychological'),(13,'Historical');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mediums`
--

DROP TABLE IF EXISTS `mediums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mediums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mediums`
--

LOCK TABLES `mediums` WRITE;
/*!40000 ALTER TABLE `mediums` DISABLE KEYS */;
INSERT INTO `mediums` VALUES (1,'Movie'),(2,'Anime'),(3,'Manga'),(4,'Novel'),(5,'Comic'),(6,'TV Show'),(7,'Video Game'),(8,'Webtoon'),(9,'Light Novel'),(10,'TV Series'),(11,'Movie Series');
/*!40000 ALTER TABLE `mediums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postdislikes`
--

DROP TABLE IF EXISTS `postdislikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postdislikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_dislike` (`post_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `postdislikes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `postdislikes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postdislikes`
--

LOCK TABLES `postdislikes` WRITE;
/*!40000 ALTER TABLE `postdislikes` DISABLE KEYS */;
INSERT INTO `postdislikes` VALUES (1,102,8,'2024-11-03 21:07:36'),(13,104,8,'2024-11-18 20:15:32'),(15,104,10,'2024-11-21 16:52:47'),(20,101,10,'2024-11-21 16:57:43');
/*!40000 ALTER TABLE `postdislikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postgenres`
--

DROP TABLE IF EXISTS `postgenres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postgenres` (
  `post_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`genre_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `postgenres_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `postgenres_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postgenres`
--

LOCK TABLES `postgenres` WRITE;
/*!40000 ALTER TABLE `postgenres` DISABLE KEYS */;
INSERT INTO `postgenres` VALUES (101,1),(101,2),(101,3),(101,4),(101,5),(101,6),(103,2),(103,3),(103,5),(103,8),(104,1),(104,5),(104,7),(109,1),(109,4),(109,7);
/*!40000 ALTER TABLE `postgenres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postlikes`
--

DROP TABLE IF EXISTS `postlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postlikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_like` (`post_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `postlikes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `postlikes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postlikes`
--

LOCK TABLES `postlikes` WRITE;
/*!40000 ALTER TABLE `postlikes` DISABLE KEYS */;
INSERT INTO `postlikes` VALUES (8,103,8,'2024-11-04 02:45:47'),(9,103,7,'2024-11-16 14:14:08'),(10,102,7,'2024-11-16 14:14:15'),(11,101,7,'2024-11-16 15:33:55'),(20,109,10,'2024-11-16 17:15:34'),(25,109,8,'2024-11-18 20:15:28'),(31,102,10,'2024-11-21 17:20:47');
/*!40000 ALTER TABLE `postlikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postmediums`
--

DROP TABLE IF EXISTS `postmediums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postmediums` (
  `post_id` int(11) NOT NULL,
  `medium_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`medium_id`),
  KEY `medium_id` (`medium_id`),
  CONSTRAINT `postmediums_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `postmediums_ibfk_2` FOREIGN KEY (`medium_id`) REFERENCES `mediums` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postmediums`
--

LOCK TABLES `postmediums` WRITE;
/*!40000 ALTER TABLE `postmediums` DISABLE KEYS */;
INSERT INTO `postmediums` VALUES (101,1),(101,2),(101,3),(101,4),(101,5),(101,6),(103,2),(103,3),(103,4),(103,7),(104,2),(104,4),(109,3),(109,10);
/*!40000 ALTER TABLE `postmediums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `title` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `rate` tinyint(4) NOT NULL,
  `synopsis` text DEFAULT NULL,
  `review` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (101,1,'2024-09-28 04:00:00','Inception',1,9,'A mind-bending thriller about dreams within dreams.','An amazing film with stunning visuals and a thought-provoking plot.',''),(102,2,'2024-09-25 07:30:00','Attack on Titan',1,10,'Humans fight for survival against monstrous titans.','A masterpiece in anime with an incredible story and characters.',''),(103,8,'2024-10-20 18:59:03','My First Edited Post',1,7,'This is a synopsis of my edited first post, describing the plot and the exciting','A very engaging post. Loved the action scenes and the character development',NULL),(104,7,'2024-10-24 00:15:45','The Enchanted Forest',1,8,'A thrilling adventure set in a mystical forest where ancient legends come to life. Follow the journey of a brave hero who unravels secrets hidden deep within enchanted woods.','The Enchanted Forest is a mesmerizing tale that masterfully blends fantasy and mystery. The plot twists are unexpected, and the character development keeps you hooked till the end. A highly recommended read for fans of magical adventures!',NULL),(109,10,'2024-11-16 16:54:59','Mystic Chronicles',1,9,'A gripping tale of a young hero uncovering secrets in a world filled with magic and deception.','Mystic Chronicles is an enthralling journey with a well-paced storyline and complex characters. The visual effects were outstanding, and the emotional depth of the narrative truly resonated.',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'movieFan456','movieFan456@example.com','password123','Loves movies and TV shows!','','2024-10-12 12:25:09'),(2,'animeLover','animeLover@example.com','supersecret','Anime enthusiast and reviewer.','','2024-10-12 12:25:09'),(7,'dummyuser','dummyuser@gmail.com','$2a$10$aTD6Sg4i/s/mYy3BUpQlxe5rfmw8Iejxrf3bof.LeruaK9L9gORZy',NULL,NULL,'2024-10-13 03:38:56'),(8,'mae139','mmk@gmail.com','$2a$10$L6vXW/KEGOWBLkNzr1D/reZuMjUrN28h005seoxe5LEdGPpTc7YEG','Random edited bio',NULL,'2024-10-19 21:33:41'),(10,'mockingbird','artem@gmail.com','$2a$10$H0IgDpbDhxTQF41SOa5XIuqwoMFUxsNbNSGO69.iDHSjsSLs9Hf3u','Your movie critic and enthusiast',NULL,'2024-11-16 15:35:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-22  9:39:41
