## Server
### Installation
- Copy `./server/config/config.sample.js` to `./server/config/config.js` and update config values
- Run the following commands

```
cd server
npm install
node index.js
```

## Frontend
### Installation
```
cd client
npm install
npm run start
```

## Database
```
CREATE DATABASE `virgin` DEFAULT CHARACTER SET = `utf8mb4`;
CREATE TABLE `users` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_str` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `screen_name` varchar(100) NOT NULL DEFAULT '',
  `profile_image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
