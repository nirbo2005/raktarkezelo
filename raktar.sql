-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 28. 13:00
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+20:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `raktar`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`username`, `password`) VALUES
('user', 'admin'),
('user2', 'password2'),
('user3', 'password3'),
('user4', 'password4'),
('user5', 'password5');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `keszlet`
--

CREATE TABLE `keszlet` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `gyarto` varchar(255) NOT NULL,
  `lejarat` date NOT NULL,
  `ar` int(11) NOT NULL,
  `mennyiseg` int(11) NOT NULL,
  `parcella` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `keszlet`
--

INSERT INTO `keszlet` (`id`, `nev`, `gyarto`, `lejarat`, `ar`, `mennyiseg`, `parcella`) VALUES
(1, 'Tej 2.8%', 'Mizo', '2025-03-17', 349, 150, 'B3-2'),
(2, 'Kenyér fehér', 'Pékműhely', '2025-04-01', 599, 300, 'A3-1'),
(3, 'Tojás 10 db', 'Biofarm', '2025-05-12', 899, 200, 'B5-3'),
(4, 'Csirkemell filé', 'Bonafarm', '2025-03-25', 1999, 120, 'B2-4'),
(5, 'Alma Golden', 'Gyümölcsös Kert', '2025-06-10', 499, 500, 'A5-1'),
(6, 'Banán', 'Délker', '2025-04-22', 349, 80, 'A1-2'),
(7, 'Tejföl 20%', 'Mizo', '2025-05-30', 299, 500, 'B4-3'),
(8, 'Vaj', 'Pilos', '2025-07-15', 1299, 500, 'B5-2'),
(9, 'Sajt trappista', 'Pannonia', '2025-06-05', 1499, 500, 'A4-1'),
(10, 'Paradicsom', 'Zöldségfarm', '2025-03-10', 799, 300, 'A3-4'),
(11, 'Uborka', 'Zöldségfarm', '2025-03-12', 499, 180, 'A5-2'),
(12, 'Paprika zöld', 'Zöldségfarm', '2025-04-18', 699, 90, 'B2-1'),
(13, 'Krumpli', 'Zöldségfarm', '2025-07-31', 299, 800, 'B4-3'),
(14, 'Répa', 'Zöldségfarm', '2025-06-20', 399, 350, 'A2-2'),
(15, 'Hagyma', 'Zöldségfarm', '2025-05-25', 199, 750, 'B1-1'),
(16, 'Főtt kukorica', 'Bonduelle', '2025-04-30', 599, 100, 'A4-4'),
(17, 'Konzerv bab', 'Bonduelle', '2025-07-10', 499, 450, 'B3-2'),
(18, 'Konzerv borsó', 'Bonduelle', '2025-06-15', 499, 600, 'A5-1'),
(19, 'Rizs', 'Nasi Goreng', '2025-07-20', 899, 700, 'B5-3'),
(20, 'Tészta spagetti', 'Barilla', '2025-08-01', 699, 550, 'A2-2'),
(21, 'Olaj napraforgó', 'Olio', '2025-05-10', 1299, 320, 'A3-1'),
(22, 'Cukor', 'Délker', '2025-06-25', 499, 500, 'B4-3'),
(23, 'Só', 'Morsó', '2025-07-31', 199, 1000, 'A4-2'),
(24, 'Kávé', 'Jacobs', '2025-04-05', 1999, 90, 'B3-1'),
(25, 'Tea fekete', 'Pickwick', '2025-05-20', 599, 130, 'A5-4'),
(26, 'Méz', 'Mézesmanna', '2025-06-30', 1499, 230, 'A2-2'),
(27, 'Müzli', 'Nestlé', '2025-04-15', 999, 120, 'B5-1'),
(28, 'Pékáru kifli', 'Pékműhely', '2025-03-20', 199, 500, 'A4-4'),
(29, 'Pékáru zsemle', 'Pékműhely', '2025-03-22', 199, 350, 'B2-2'),
(30, 'Pékáru bagett', 'Pékműhely', '2025-03-25', 299, 700, 'A3-1'),
(31, 'Margarin', 'Rama', '2025-05-05', 799, 250, 'B3-3'),
(32, 'Juhtúró', 'Magyar Juhtúró', '2025-04-10', 1299, 80, 'A1-2'),
(33, 'Túró', 'Mizo', '2025-05-15', 899, 400, 'B2-1'),
(34, 'Tej 1.5%', 'Mizo', '2025-03-18', 329, 600, 'B4-4'),
(35, 'Jogurt natúr', 'Danone', '2025-04-12', 249, 150, 'A5-3'),
(36, 'Kefir', 'Mizo', '2025-05-08', 279, 90, 'A4-2'),
(37, 'Sajt edami', 'Pannonia', '2025-06-22', 1399, 1000, 'B3-1'),
(38, 'Szalámi', 'Pick', '2025-07-05', 2999, 230, 'A2-4'),
(39, 'Sonka', 'Herz', '2025-04-25', 1899, 75, 'B1-2'),
(40, 'Kolbász', 'Gyulai', '2025-05-18', 1599, 500, 'B5-3'),
(41, 'Virsli', 'Frankfurti', '2025-06-12', 999, 650, 'A3-4'),
(42, 'Hal filé', 'Oceanic', '2025-07-25', 2499, 320, 'B3-2'),
(43, 'Rák', 'Seafood', '2025-05-28', 2999, 100, 'A1-1'),
(44, 'Tintahal', 'Oceanic', '2025-06-18', 2799, 540, 'B4-3'),
(45, 'Lazac', 'Norwegian', '2025-07-08', 3499, 220, 'A5-2'),
(46, 'Tonhal konzerv', 'Rio Mare', '2025-04-20', 899, 450, 'A3-1'),
(47, 'Teljes kiőrlésű penne tészta', 'Don Francesco', '2025-04-15', 500, 300, 'A4-3'),
(48, 'Marha comb darabolt', 'Auchan Kedvenc', '2025-03-20', 2500, 600, 'B2-1'),
(49, '100% almalé', 'Rauch Happy Day', '2025-05-10', 400, 800, 'A5-2'),
(50, 'Babgulyás konzerv', 'Házias Ízek', '2025-06-05', 800, 450, 'B3-4'),
(51, 'Piskótadesszert tejes krémmel', 'Kinder Paradiso', '2025-04-25', 300, 95, 'A1-2'),
(52, 'Rozsos kenyér', 'Vándor', '2025-03-15', 500, 700, 'A4-1'),
(53, 'Szemes pörkölt kávé', 'Caffe Degli Agneli', '2025-07-01', 3000, 130, 'B4-3'),
(54, 'Szeletelt trappista sajt', 'Tolle', '2025-05-20', 1500, 870, 'B2-2'),
(55, 'Marha gulyáshús', 'Auchan Kedvenc', '2025-04-10', 2600, 550, 'B5-1'),
(56, 'Kókuszital UHT', 'Joya Barista', '2025-06-15', 700, 200, 'A3-3'),
(57, 'Szénhidrátcsökkentett cipó', 'Ceres NewLine', '2025-03-30', 600, 750, 'A4-2'),
(58, 'Szűrt almaital', 'Szobi', '2025-03-25', 400, 300, 'A3-1'),
(59, 'Rostos őszibarack ital', 'Szobi', '2025-05-15', 400, 900, 'B2-2'),
(60, 'Szűrt fehérszőlő ital', 'Szobi', '2025-04-05', 400, 650, 'A5-4'),
(61, 'Élőflórás tejföl 25%', 'Auchan Collection', '2025-06-30', 500, 500, 'B4-2'),
(62, 'Szalámi', 'Pick', '2025-07-05', 2999, 270, 'A2-3'),
(63, 'Sonka', 'Herz', '2025-04-25', 1899, 150, 'B3-1'),
(64, 'Kolbász', 'Gyulai', '2025-05-18', 1599, 800, 'A4-2'),
(65, 'Hal filé', 'Oceanic', '2025-07-25', 2499, 120, 'B5-3'),
(66, 'Rák', 'Seafood', '2025-05-28', 2999, 430, 'A1-1'),
(67, 'Tintahal', 'Oceanic', '2025-06-18', 2799, 450, 'B2-3'),
(68, 'Lazac', 'Norwegian', '2025-07-08', 3499, 120, 'A3-2'),
(69, 'Tonhal konzerv', 'Rio Mare', '2025-04-20', 899, 500, 'B1-1'),
(70, 'Szardínia konzerv', 'Nixe', '2025-05-22', 699, 300, 'A5-2'),
(71, 'Füstölt makréla', 'Oceanic', '2025-06-30', 1999, 700, 'B4-3'),
(72, 'Heringfilé paradicsomos', 'EvraFish', '2025-07-15', 799, 250, 'A3-4'),
(73, 'Fagyasztott garnélarák', 'Seafood', '2025-05-10', 3499, 600, 'B5-2'),
(74, 'Füstölt lazac szeletek', 'Norwegian', '2025-06-05', 3999, 150, 'A1-3'),
(75, 'Fagyasztott tintahal karikák', 'Oceanic', '2025-07-20', 2999, 450, 'B2-4'),
(76, 'Füstölt pisztráng', 'FreshFish', '2025-05-25', 2499, 320, 'A3-1'),
(77, 'Fagyasztott tőkehal filé', 'Oceanic', '2025-06-18', 2799, 500, 'B4-3'),
(78, 'Füstölt angolna', 'Seafood', '2025-07-05', 3499, 90, 'A2-1'),
(79, 'Fagyasztott kagylóhús', 'Oceanic', '2025-05-15', 3199, 1000, 'B5-4'),
(80, 'Füstölt hering', 'FreshFish', '2025-06-10', 2299, 800, 'A3-2'),
(81, 'Fagyasztott polip', 'Seafood', '2025-07-25', 3699, 540, 'B1-3'),
(82, 'Füstölt sprotni', 'Oceanic', '2025-05-30', 1899, 130, 'A4-1'),
(83, 'Fagyasztott lazac steak', 'Norwegian', '2025-06-20', 3999, 220, 'B2-2'),
(84, 'Füstölt tőkehal', 'FreshFish', '2025-07-10', 2599, 450, 'A1-4'),
(85, 'Kukoricapehely', 'Kelloggs', '2025-08-10', 899, 870, 'B3-1'),
(86, 'Csokoládé tej', 'Milka', '2025-07-15', 799, 600, 'A5-2'),
(87, 'Gabonapehely', 'Nestlé', '2025-06-05', 999, 350, 'B2-3'),
(88, 'Instant kakaó', 'Nesquik', '2025-05-22', 699, 250, 'A3-4'),
(89, 'Keksz csokis', 'Győri Édes', '2025-04-30', 499, 700, 'B5-1'),
(90, 'Mogyorókrém', 'Nutella', '2025-09-12', 1599, 150, 'A2-2'),
(91, 'Kávékapszula', 'Nespresso', '2025-11-01', 2999, 500, 'B4-2'),
(92, 'Kókusztej', 'Alpro', '2025-10-18', 899, 900, 'A4-1'),
(93, 'Mandulaital', 'Alpro', '2025-09-25', 799, 650, 'B5-2'),
(94, 'Laktózmentes tej', 'Mizo', '2025-08-05', 699, 120, 'A1-3'),
(95, 'Vegán sajt', 'Violife', '2025-12-01', 1399, 1000, 'B3-4'),
(96, 'Barna rizs', 'BioNature', '2025-09-10', 1199, 550, 'A4-3'),
(97, 'Földimogyoró', 'Délker', '2025-06-30', 599, 320, 'A1-1'),
(98, 'Kesudió', 'Naturfood', '2025-05-15', 1499, 250, 'B2-4'),
(99, 'Szárított áfonya', 'Naturfood', '2025-10-08', 1299, 500, 'A4-2'),
(100, 'Mandula', 'Naturfood', '2025-11-20', 1899, 750, 'B5-3'),
(101, 'Vegán joghurt', 'Alpro', '2025-07-10', 799, 100, 'A1-4'),
(102, 'Növényi vaj', 'Flora', '2025-08-30', 899, 600, 'B2-2'),
(103, 'Szójaszósz', 'Kikkoman', '2025-12-15', 1299, 400, 'A3-1'),
(104, 'Chiliszósz', 'Tabasco', '2025-11-05', 999, 150, 'B5-3'),
(105, 'Majonéz', 'Hellmanns', '2025-10-10', 999, 350, 'A1-2'),
(106, 'Ketchup', 'Heinz', '2025-09-15', 799, 900, 'B2-1'),
(107, 'Mustár', 'Globus', '2025-08-05', 499, 275, 'A3-4'),
(108, 'Olívaolaj', 'Bertolli', '2025-07-20', 2499, 1000, 'B4-3'),
(109, 'Balsamico ecet', 'Ponti', '2025-06-10', 1599, 500, 'A1-1'),
(110, 'Leveskocka', 'Knorr', '2025-10-30', 699, 650, 'B2-4'),
(111, 'Instant leves', 'Maggi', '2025-09-20', 599, 750, 'A3-2'),
(112, 'Zabpehely', 'BioNature', '2025-07-05', 699, 850, 'B4-3'),
(113, 'Szezámmag', 'Naturfood', '2025-05-22', 499, 120, 'A1-2'),
(114, 'Napraforgómag', 'Naturfood', '2025-04-30', 599, 560, 'B3-3'),
(115, 'Lenmag', 'BioNature', '2025-03-18', 499, 420, 'A2-4'),
(116, 'Chia mag', 'Naturfood', '2025-02-25', 899, 990, 'B4-1'),
(117, 'Kókuszreszelék', 'Délker', '2025-06-30', 499, 200, 'A3-3'),
(118, 'Aszalt szilva', 'Naturfood', '2025-05-18', 1299, 700, 'B2-4'),
(119, 'Aszalt barack', 'Naturfood', '2025-04-10', 1399, 430, 'A4-2'),
(120, 'Mazsola', 'Délker', '2025-03-20', 599, 380, 'B4-3'),
(121, 'Csicseriborsó', 'BioNature', '2025-09-12', 799, 950, 'A1-4'),
(122, 'Lencse', 'Délker', '2025-08-25', 699, 620, 'B2-2'),
(123, 'Barnarizs', 'BioNature', '2025-07-18', 1199, 830, 'A3-3'),
(124, 'Couscous', 'BioNature', '2025-06-30', 899, 440, 'B4-1'),
(125, 'Quinoa', 'Rapunzel', '2025-05-10', 1999, 210, 'A5-2'),
(126, 'Bulgur', 'Naturfood', '2025-04-15', 999, 780, 'B2-3'),
(127, 'Hajdina', 'BioNature', '2025-03-05', 899, 500, 'A3-4'),
(128, 'Szójatej', 'Alpro', '2025-12-05', 699, 365, 'B4-1'),
(129, 'Rizstej', 'Alpro', '2025-11-22', 799, 630, 'A5-4'),
(130, 'Csirkemell sonka', 'Pápai Hús', '2025-07-25', 1499, 890, 'B1-3'),
(131, 'Töltött csokoládé', 'Lindt', '2025-10-05', 1299, 410, 'A3-2');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `keszlet`
--
ALTER TABLE `keszlet`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `keszlet`
--
ALTER TABLE `keszlet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
