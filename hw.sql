/*
Navicat MySQL Data Transfer

Source Server         : sy
Source Server Version : 50719
Source Host           : 47.52.24.191:3308
Source Database       : hw

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2017-07-25 21:39:28
*/

SET FOREIGN_KEY_CHECKS=0;


-- ----------------------------
-- Table structure for `hw_activity`
-- ----------------------------
DROP TABLE IF EXISTS `hw_activity`;
CREATE TABLE `hw_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(300) DEFAULT NULL,
  `link_url` varchar(2000) DEFAULT NULL COMMENT '跳转到图文的链接',
  `image_url` varchar(2000) DEFAULT NULL COMMENT '活动图片链接',
  `start_time` int(11) DEFAULT NULL COMMENT '活动开始时间',
  `end_time` int(11) DEFAULT NULL COMMENT '活动结束时间',
  `registrate_end_time` int(11) DEFAULT NULL COMMENT '活动报名截止时间',
  `limit_num` int(11) DEFAULT NULL COMMENT '报名人数限制',
  `location` varchar(300) DEFAULT NULL COMMENT '活动地点',
  `leader_name_alias` varchar(200) DEFAULT NULL COMMENT '领队的花名',
  `success` tinyint(4) DEFAULT NULL COMMENT '是否成功发对，1成功，0未发队',
  `points` int(11) NOT NULL COMMENT '积分',
  `seq` int(11) DEFAULT NULL COMMENT '显示顺序',
  `admin_id` int(11) DEFAULT NULL COMMENT '所属于会员的id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of hw_activity
-- ----------------------------
INSERT INTO `hw_activity` VALUES ('1', '徽行古道徒步', 'http://www.baidu.com', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1');

-- ----------------------------
-- Table structure for `hw_admin`
-- ----------------------------
DROP TABLE IF EXISTS `hw_admin`;
CREATE TABLE `hw_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) DEFAULT '' COMMENT '管理员名',
  `mobile` varchar(32) DEFAULT NULL COMMENT '手机号',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `pwd` varchar(50) DEFAULT NULL COMMENT '密码',
  `club_name` varchar(100) DEFAULT NULL COMMENT '俱乐部名称',
  `club_address` varchar(200) DEFAULT NULL COMMENT '俱乐部地址',
  `contact_name` varchar(100) DEFAULT NULL COMMENT '联系人姓名',
  `contact_mobile` varchar(32) DEFAULT NULL COMMENT '联系人手机',
  `contact_email` varchar(100) DEFAULT NULL COMMENT '联系人邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of hw_admin
-- ----------------------------

-- ----------------------------
-- Table structure for `hw_join`
-- ----------------------------
DROP TABLE IF EXISTS `hw_join`;
CREATE TABLE `hw_join` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) DEFAULT '' COMMENT '姓名',
  `user_name_alias` varchar(100) DEFAULT NULL COMMENT '户外花名',
  `sex` tinyint(4) DEFAULT '1' COMMENT '0女，1男',
  `mobile` varchar(32) DEFAULT NULL COMMENT '手机号码',
  `down_payment` int(11) DEFAULT NULL COMMENT '定金，单位是角，1元为100',
  `extra` varchar(200) DEFAULT NULL COMMENT '其他信息',
  `activity_id` int(11) DEFAULT NULL COMMENT '活动Id，见hw_activity 表',
  `created_at` int(11) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of hw_join
-- ----------------------------
