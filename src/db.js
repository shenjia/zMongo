/**
 * db.js
 * ——————————————————————————
 * 连接数据库
 */
var configDB = db.getSisterDB( 'config' );
var weipaiDB = db.getSisterDB( 'weipai' );
var statDB = db.getSisterDB( 'stat' );
var rankDB = db.getSisterDB( 'rank' );
var msgDB = db.getSisterDB( 'msg' );
var trackerDB = db.getSisterDB( 'tracker' );
var tempDB = db.getSisterDB( 'temp' );