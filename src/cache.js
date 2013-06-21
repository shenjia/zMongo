/**
 * cache.js
 * ————————————————————————————
 * 提供缓存
 */

var cache = {
		
	_cache : {},
	
	//从缓存中取值
	get : function ( key ) {
		return ( typeof this._cache[ key ] !== 'undefined' ) ? this._cache[ key ] : undefined;
	},
	
	//向缓存中存值
	set : function ( key, value ) {
		this._cache[ key ] = value;
		return value;
	},
	
	//删除一个值
	unset : function ( key ) {
		delete this._cache[ key ];
	},
	
	//清空缓存
	clear : function() {
		this._cache = {};
	}
}