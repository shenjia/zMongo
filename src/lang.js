/**
 * lang.js
 * ——————————————————————————————
 * 语言功能增强
 */
var global = this;

//融合所有参数为一个对象
function mix ( obj ) {
    var args = Array.apply( [], arguments );
    var i = 1;
    while ( item = args[ i++ ] ){
        for ( key in item ) {
            if ( item.hasOwnProperty( key ) ) {
                obj[ key ] = item[ key ];
            }
        }
    }
    return obj;
}

//判断是否为空对象
function isEmpty ( obj ) {
	for ( var name in obj ) {
		return false;
	}
	return true;
}

//生成缩进
function tabs ( level ) {
	var tabs = '';
	while ( level -- ) tabs += "\t";
	return tabs;
}