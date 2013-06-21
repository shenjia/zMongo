/**
 * time.js
 * ——————————————————————————
 * 时间函数库
 */

//时间区间对应的天数
var range = { 'day' : 1, 'week' : 7, 'month' : 30, 'year' : 365 };

//生成当前时间
function now() {
	var date = new Date();
	return date2day( date ) + ' ' + date2time( date ); 
}

//生成当前的时间戳
function now2timestamp() {
	return date2timestamp( new Date() );
}

//将日期对象转为时间戳
function date2timestamp ( date ) {
	return Math.floor( date.getTime() / 1000 );
}

//将时间戳转为日期对象
function timestamp2date ( timestamp ) {
	return new Date( timestamp * 1000 );
}

//将时间戳转为日期字符串
function timestamp2day ( timestamp ) {
	return date2day( timestamp2date( timestamp ) );
}

//将日期字符串转为时间戳
function day2timestamp ( day ) {
	return date2timestamp( day2date( day ) );
}

//将日期对象转为日期字符串
function date2day ( date ) {
	return date.getFullYear() + 
		'/' + ( '0' + ( date.getMonth() + 1 ) ).substr( -2 ) + 
		'/' + ( '0' + date.getDate() ).substr( -2 );
}

//将日期对象转为时间字符串
function date2time ( date ) {
	return date.getHours() + ':' + ( '0' + date.getMinutes() ).substr( -2 ) + ':' + ( '0' + date.getSeconds() ).substr( -2 );
}

//将日期字符串转为日期对象
function day2date ( day ) {
	return new Date( Date.parse( day ) );
}

//生成当天的日期字符串
function today() {
	return date2day( new Date() );
}

//生成指定日期前一天的日期字符串
function yesterday ( day ) {
	if ( typeof day === 'undefined' ) day = today();
	return passdays( -1, day );
}

//生成指定日期后一天的日期字符串
function tommorow ( day ) {
	if ( typeof day === 'undefined' ) day = today();
	return passdays ( 1, day );
}

//生成指定日期之前或之后的日期字符串
function passdays ( days, day ) {
	if ( typeof day === 'undefined' ) day = today();
	var date = day2date( day );
	date.setDate( date.getDate() + days );
	return date2day( date );
}

//获得某个周期之前的某天对应的日期字符串
function last ( period ) {
	return passdays( -range[ period ] );
}

//返回mongo查询条件：从某日到某日
function sinceTo ( startDay, endDay ) {
 	return mix( since( startDay ), until( endDay ) );
}

//返回mongo查询条件：从某日开始
function since ( day ) {
 	return { '$gt' : day2timestamp( day ) };
}

//返回mongo查询条件：到某日为止
function until ( day ) {
	return { '$lt' : day2timestamp( day ) };
}

//返回mongo查询条件：某日全天
function whole ( day ) {
	return {
		'$gt' : day2timestamp( day ),
		'$lt' : day2timestamp( tommorow( day ) )
	};
}

//返回某个周期中的所有天对应的日期字符串
function getDays ( period ) {
	return getRecentDays( range[ period ] );
}

//返回最近数天的日期字符串
function getRecentDays ( i ) {
	var now = today();
	var days = [];
	while ( i-- ) {
		now = passdays( -1, now );
		days.push( now );
	}
	return days;
}

//返回从指定日期之间的所有日期字符串
function getSinceToDays ( since, to ) {
	var day = timestamp2day( Math.min( day2timestamp( since ), day2timestamp( to ) ) );
	var until = timestamp2day( Math.max( day2timestamp( since ), day2timestamp( to ) ) );
	var days = [];
	while ( day <= until ) {
		days.push( day );
		day = passdays( 1, day );
	}
	return days;
}