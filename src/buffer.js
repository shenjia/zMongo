/**
 * buffer.js
 * ————————————————————————————
 * 缓冲区
 */

//创建一个缓冲区
function createBuffer ( collection, size ) {
	if ( typeof size === 'undefined' ) { 
		size = 0; 
	}
	return {
		
		buffer : [],
		collection : collection,
		count : 0,
		size : size,
		
		//增加计数，如果缓冲区满了则输出
		increase : function() {
			this.count ++;
			if ( this.size && this.count > this.size ) {
				this.flush();
			}
		},
		
		//输出缓冲区之前的处理
		beforeFlush : function() {
			if ( this.count > 0 ) {
				print( "\t\t\t\t\t\tflushing [ " + this.collection.getFullName() +' ] buffer...' );
			}
			this.flushStart = new Date().getTime();
			this.flushCount = this.count;
			
		},
		
		//输出缓冲区之后的处理
		afterFlush : function() {
			var seconds = ( new Date().getTime() - this.flushStart ) / 1000;
			if ( this.flushCount > 0 ) {
				print( "\t\t\t\t\t\tCost " + seconds.toFixed( 3 ) + " seconds.\tSpeed rate: " + ( this.flushCount / seconds ).toFixed( 2 ) + ' record/s' );
			}
			this.buffer = [];
			this.count = 0;
		},

		//向缓冲区中添加元素，需要继承实现
		push : function ( doc ) {
			this.buffer.push( doc );
			this.increase();
		},
		
		//输出缓冲区，需要继承实现
		flush : function( doc ) {
			this.beforeFlush();
			var count = this.count;
			var buffer = this.buffer;
			while ( count -- ) {
				print( buffer.pop() );
			}
			this.afterFlush();
		}
	}
}

//插入新记录的缓冲区
function createSaveBuffer ( collection, size ) {
	return mix( createBuffer( collection, size ), {
		flush : function() {
			this.beforeFlush();
			var count = this.count;
			var buffer = this.buffer;
			var collection = this.collection;
			while ( count -- ) {
				collection.save( buffer.pop() );
			}
			this.afterFlush();
		} 
	});
}

//更新统计数字的缓冲区
function createIncreaseBuffer ( collection, size ) {
	return mix( createBuffer( collection, size ), {
		push : function ( id, key, value ) {
			var buffer = this.buffer;
			if ( !id ) {
				return;
			}
			if ( typeof id === 'object' ) { 
				id = id.str;
			}
			if ( ! buffer[ id ] ) {
				buffer[ id ] = {};
			}
			if ( ! buffer[ id ][ key ] ) {
				buffer[ id ][ key ] = 0;
			}
			buffer[ id ][ key ] += value;
			this.increase();
		},
		flush : function() {
			this.beforeFlush();
			var collection = this.collection;
			var buffer = this.buffer;
			for ( var id in buffer ) {
				collection.update( { _id : ObjectId( id ) }, { $inc : buffer[ id ] } );
			}	
			this.afterFlush();
		}
	});
}

//更新记录指定字段的缓冲区
function createSetBuffer ( collection, size ) {
	return mix( createBuffer( collection, size ), {
		push : function ( id, set ) {
			if ( !id ) {
				return;
			}
			if ( typeof id === 'object' ) {
				id = id.str;
			}
			this.buffer[ id ] = set;
			this.increase();
		},
		flush : function () {
			this.beforeFlush();
			var collection = this.collection;
			var buffer = this.buffer;
			for ( var id in buffer ) {
				collection.update( { _id : ObjectId( id ) }, { $set : buffer[ id ] } );
			}	
			this.afterFlush();
		}
	});
}

//删除指定字段的缓冲区
function createUnsetBuffer ( collection, size ) {
	return mix( createBuffer( collection, size ), {
		push : function ( id, unset ) {
			if ( !id ) {
				return;
			}
			if ( typeof id === 'object' ) {
				id = id.str;
			}
			this.buffer[ id ] = unset;
			this.increase();
		},
		flush : function () {
			this.beforeFlush();
			var collection = this.collection;
			var buffer = this.buffer;
			for ( var id in buffer ) {
				collection.update( { _id : ObjectId( id ) }, { $unset : buffer[ id ] } );
			}	
			this.afterFlush();
		}
	});
}