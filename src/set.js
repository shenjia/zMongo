/**
 * set.js
 * ————————————————————————————
 * 提供集合对象
 */

//创建集合对象
function createSet() {
	return {
		_set : {},
		_count : 0,
		push : function ( item ) {
			var set = this._set;
			if ( typeof set[ item ] === 'undefined' ) {
				set[ item ] = 1;
				this._count ++;
			}
		},
		forEach : function ( fun ) {
			for ( var item in this._set ) {
				fun( item );
			}
		},
		count : function() {
			return this._count;
		},
		output : function() {
			for ( var item in this._set ) {
				print( item );
			}
		}
	}
}
