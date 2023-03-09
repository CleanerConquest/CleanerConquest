SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

INSERT INTO `roles` (`id`, `name`) VALUES
(2, 'ADMIN');

INSERT INTO `users` (`id`, `email`, `password`, `username`) VALUES
(1, 'akurdi202@gmail.com', '$2a$10$SK26bOqJPC9bFagLyTcSpeAb43eym2nsIBAezbEVgtPjHhGnMtxlW', 'amr');

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 2);
COMMIT;
