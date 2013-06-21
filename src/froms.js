/**
 * froms.js
 * ————————————————————————
 * 提供企业id列表
 */

var froms = [];
var names = {};

configDB.companys_config.find( {}, { 'com_id' : 1, 'cname' : 1 } ).forEach( function ( doc ) {
	froms.push( doc.com_id );
	names[ doc.com_id ] = doc.cname;
} );
