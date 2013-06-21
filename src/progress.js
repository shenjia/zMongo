/**
 * progress.js
 * ————————————————————————
 * 进度监控
 */
var progress = {
	
	//最小输出时间间隔
	check_per_milliseconds : 3000,
	
	//最小输出记录条数
	check_per_records : 100,
	
	//实例化进度条
	create : function ( total ) {
		
		timer.start( 'progress' );
		return {
			timer : new Date().getTime(),
			total : total,
			count : 0,
			pass : function () {
				var time = new Date().getTime();
				if ( ( ++this.count % progress.check_per_records == 0 ) && ( time - this.timer > progress.check_per_milliseconds ) ) {
					print( "\t" + this.count + ' / ' + this.total + "\t" + ( this.count / this.total * 100 ).toFixed( 2 ) + '%' );
					this.timer = time;
				}
			},
			done : function () {
				var seconds = timer.stop( 'progress', false );
				var finish = "\t" + this.total + ' / ' + this.total + "\t100.00%\t\tCost " + seconds.toFixed( 3 ) + " seconds.";
				if ( this.total > 0 ) {
					finish = finish + ' Speed rate: ' + ( this.total / seconds ).toFixed( 2 ) + ' record/s';
				}
				print( finish );
			}
		}
		timer.stop( 'progress' );
	}
}

//对指定的记录进行遍历，并使用进度监控
function scan ( iterator, fun ) {
	var p = progress.create( iterator.count() );
	iterator.forEach( function ( doc ) {
		fun( doc );
		p.pass();
	} );
	p.done();
}
