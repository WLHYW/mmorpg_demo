-- README：mysql用户名、密码、数据库名称等连接配置在common/db/index.ts文件中，请自行修改
-- 本项目需要执行以下语句创建表

-- Active: 1683434478431@@127.0.0.1@3306@mmodb
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `account` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '密码',
  `created_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`account`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='用户表'

-- Active: 1683434478431@@127.0.0.1@3306@mmodb
CREATE TABLE `actor` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `account` varchar(15) NOT NULL COMMENT '所属账号',
  `scene_id` int DEFAULT NULL COMMENT '场景id',
  `created_time` datetime DEFAULT NULL COMMENT 'Create Time',
  `nickname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名',
  PRIMARY KEY (`id`),
  KEY `account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

