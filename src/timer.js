/**
 * timer.js
 * ————————————————————————
 * 计时器
 */

var timers = {};
var timer = {
		
	//开始计时
	start : function ( name ) {
		if ( typeof name === 'undefined' ) name = 'script';
		return timers[ name ] = new Date().getTime();
	},

	//终止计时
	stop : function ( name, output ) {
		if ( typeof name === 'undefined' ) name = 'script';
		if ( typeof output === 'undefined' ) output = true;
		var seconds = ( new Date().getTime() - timers[ name ] ) / 1000;
		if ( output ) print( "\t" + name + ' cost ' + seconds.toFixed( 3 ) + ' seconds.' ); 
		delete timers[ name ];
		return seconds;
	}
		
};

//脚本开始
timer.start( 'script' );

//完成脚本
function Done () {
	var seconds = timer.stop( 'script', false );
	print( "---------------------------------------------------------------------------------" );
	print( 'All Done. Total cost ' + seconds.toFixed( 3 ) + ' seconds. (' + now() + ")\n" );
}