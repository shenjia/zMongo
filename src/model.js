/**
 * model.js
 * ——————————————————————————
 * 集合操作
 */
var model = {
	create : function ( collection, obj ) {
		return mix({
			
			//集合对象
			collection : collection,
			
			//名称
			name : collection.getName(),	
			
			//按条件查找
			find : function ( cond, cols ) {
				if ( cols === undefined ) cols = {};
				return collection.find( cond, cols );
			},
			
			//按id查找
			findById : function ( id, cols ) {
				if ( typeof id === 'undefined' ) return {};
				if ( typeof cols === 'undefined' ) cols = {};
				return collection.findOne( { _id : typeof id === 'object' ? id : ObjectId( id ) }, cols );
			},
			
			//按id获得col
			getColById : function ( id, col ) {
				var cols = {};
				cols[ col ] = 1;
				var record = this.findById( id, cols );
				return record ? record[ col ] : false;
			},

			//按id更新
			setById : function ( id, set ) {
				return collection.update( { _id : typeof id === 'object' ? id : ObjectId( id ) }, { '$set' : set } );
			},
			
			//按id删除属性
			unsetById : function ( id, unset ) {
				return collection.update( { _id : typeof id === 'object' ? id : ObjectId( id ) }, { '$unset' : unset } );
			}
			
		}, obj );
	}
}