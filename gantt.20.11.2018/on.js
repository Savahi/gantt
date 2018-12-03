function onWindowLoad() {
	if( 'ontouchstart' in document.documentElement ) { // To confirm it's a touch device or not...
		_touchDevice = true;
	}

	// This is for debugging purposes only!!!!
	if( window.location.search.indexOf('input') >= 0 ) {
		_inputOnly = true;
	} else if( window.location.search.indexOf('gantt') >= 0 ) {
		_inputOnly = false;
	}

	initLayout();
	loadData();
}

function onWindowResize(e) { 
	initLayoutCoords(); 
	displayData(); 
}


function onWindowContextMenu(e) { 
	e.preventDefault(); 
	return(false); 
}


function onWindowMouseUp(e) { 
	if( _ganttCaptured ) { _ganttCaptured = false; } 
	if( _ganttSVG.style.cursor != "default" ) {
		_ganttSVG.style.cursor = "default";
	}
	if( _timeSVG.style.cursor != "default" ) {
		_timeSVG.style.cursor = "default";
	}
	if( _verticalSplitterCaptured ) { 
		_verticalSplitterCaptured = false; 
		initLayoutCoords();
		drawAll();
	} 
	if( _tableScrollCaptured ) { _tableScrollCaptured = false; }
	if( _ganttHScrollCaptured ) { _ganttHScrollCaptured = false; }
	if( _verticalScrollCaptured ) { _verticalScrollCaptured = false; }
 	
	if( _tableSplitterCaptured >= 0 ) {
		let el = document.getElementById('tableSplitter'+_tableSplitterCaptured);
		let newWidth = _data.table[_tableSplitterCaptured].width + e.x - _tableSplitterCapturedAtX;
		if( newWidth < _settings.minTableColumnWidth ) {
			newWidth = _settings.minTableColumnWidth;
		}
		_data.table[_tableSplitterCaptured].width = newWidth;
		setCookie( _data.table[_tableSplitterCaptured].ref + "Width", _data.table[_tableSplitterCaptured].width );
		_tableSplitterCaptured = -1;
		drawTableHeader();
		drawTableContent();
		drawTableScroll();
	}
	if( _tableHeaderColumnSwapperCapturedAtX >= 0 ) { // Table column title has been moved...
		_tableHeaderColumnSwapperCapturedAtX = -1;
		let from = Number(_tableHeaderColumnSwapper.dataset.columnNumber);
		_tableHeaderColumnSwapper.remove();
		_tableHeaderColumnSwapper = null;
		_tableHeaderSVGBkgr.style.cursor = 'default';
		for( let col = 1 ; col < _data.table.length ; col++ ) { // To find the column to swap with...
			let el = document.getElementById( 'tableHeaderColumnNameSVG' + col );
			let x = parseInt( el.getAttributeNS( null, 'x' ) ); 
			let width = parseInt( el.getAttributeNS( null, 'width' ) ); 
			if( e.x > x && e.x < (x + width) ) {
				if( from != col ) {
					moveElementInsideArrayOfObjects(_data.table, from, col );
					drawTableHeader(true);
					drawTableContent(true);					
					for( let cookie = 0 ; cookie < _data.table.length ; cookie++ ) { // Updating cookies according to new column sort order.
						setCookie( _data.table[cookie].ref + "Position", cookie );
					}
				}
				break;
			}
		}
	}
}

function onWindowMouseMove(e) { 
	if( _verticalSplitterCaptured ) {
		if( ( e.x < 20 ) || ( e.x > (window.innerWidth - 20 - _settings.scrollThick) ) ) {
			return;
		}
		_verticalSplitterPosition = (e.x - _verticalSplitterCapturedAtX) / _containerDivWidth + _verticalSplitterPosition;
		_verticalSplitterCapturedAtX = e.x;
		let oldGanttSVGWidth = _ganttSVGWidth;
		initLayoutCoords();
		drawTableScroll();
		drawGanttHScroll();
		setCookie("verticalSplitterPosition",_verticalSplitterPosition);
		return;
	}
	if( _tableSplitterCaptured >= 0 ) { // Table splitter captured - a table column width is being changing...
		let el = document.getElementById('tableSplitter'+_tableSplitterCaptured);

		let newX = e.x
		if( _tableSplitterCaptured > 0 ) { // To ensure not sliding too far to the left...
			let leftEl = document.getElementById( 'tableSplitter'+(_tableSplitterCaptured-1) );
			let leftX = parseInt( leftEl.getAttributeNS(null,'x') );
			if( newX < leftX + _settings.minTableColumnWidth ) {
				newX = leftX + _settings.minTableColumnWidth;
			} 
		}
		el.setAttributeNS(null,'x',newX);
		return;
	}
	if( _tableScrollCaptured ) {
		let maxVisibleLeft = (_tableHeaderOverallWidth > _tableHeaderSVGWidth) ? (_tableHeaderOverallWidth - _tableHeaderSVGWidth) : 0;
		let newSliderX = _tableScrollXAtCapture + (e.x - _tableScrollCapturedAtX);
		let maxSlider = _tableScrollSVGWidth - _tableScrollSVGSlider.getBBox().width;
		if( newSliderX < 0 ) {
			newSliderX = 0;
		} else if( newSliderX > maxSlider ) {
			newSliderX = maxSlider;
		}
		_tableViewBoxLeft = newSliderX * maxVisibleLeft / maxSlider;
		_tableScrollSVGSlider.setAttributeNS( null,'x', newSliderX );
		drawTableHeader(false,true);
		drawTableContent(false,true);
		return;
	}
	if( _ganttHScrollCaptured ) {
		let maxSlider = _ganttHScrollSVGWidth - _ganttHScrollSVGSlider.getBBox().width;
		if( !( maxSlider > 0 ) ) {
			return;
		}
		let newSliderX = _ganttHScrollXAtCapture + (e.x - _ganttHScrollCapturedAtX);
		if( newSliderX < 0 ) {
			newSliderX = 0;
		} else if( newSliderX > maxSlider ) {
			newSliderX = maxSlider;
		}
		_ganttVisibleLeft = _data.visibleMin + newSliderX * (_data.visibleMaxWidth - _ganttVisibleWidth) / maxSlider;
		_ganttHScrollSVGSlider.setAttributeNS( null,'x', newSliderX );
		drawTimeScale();
		drawGantt();
		return;
	}
	if( _verticalScrollCaptured ) {
		let maxSlider = _verticalScrollSVGHeight - _verticalScrollSVGSlider.getBBox().height;
		if( !( maxSlider > 0 ) ) {
			return;
		}
		let newSliderY = _verticalScrollYAtCapture + (e.y - _verticalScrollCapturedAtY);
		if( newSliderY < 0 ) {
			newSliderY = 0;
		} else if( newSliderY > maxSlider ) {
			newSliderY = maxSlider;
		}
		_visibleTop = newSliderY * (_notHiddenOperationsLength - _visibleHeight) / maxSlider;
		setCookie("ganttVisibleTop",_visibleTop);		
		_verticalScrollSVGSlider.setAttributeNS( null,'y', newSliderY );
		drawGantt(false,true);
		drawTableContent(false,true);
		return;
	}
	if( _tableHeaderColumnSwapper != null ) {
		let newX = _tableHeaderColumnSwapperOriginalX + e.x - _tableHeaderColumnSwapperCapturedAtX;
		_tableHeaderColumnSwapper.setAttributeNS(null,'x', newX );
		return;
	}
}


function onVerticalSplitterSVGMouseDown(e) { 
	_verticalSplitterCaptured=true; 
	_verticalSplitterCapturedAtX=e.x; 
};

function onVerticalScrollSVGBkgr(e) {
	let bbox = _verticalScrollSVGSlider.getBBox();
	let mouseYRelative = e.y - _containerDivY - _tableHeaderSVGHeight;
	if( mouseYRelative < bbox.y ) {
		moveYR( -1 );				
	} else if( mouseYRelative > bbox.y + bbox.height ) {
		moveYR( 1 );				
	}
}

function onGanttMouseDown(e) {
	_ganttCaptured = true; 
	_ganttCapturedAtX = e.clientX;			
	_ganttCapturedLeft = _ganttVisibleLeft;			
	_ganttSVG.style.cursor = "pointer";	
	_timeSVG.style.cursor = "pointer";	
}

function onGanttCapturedMouseMove(e) {
	if( !_ganttCaptured ) {
		return;
	}
	let deltaX = _ganttVisibleWidth * (e.clientX - _ganttCapturedAtX) / _ganttSVGWidth;
	_ganttVisibleLeft = validateGanttLeft( _ganttCapturedLeft - deltaX );
	_ganttCapturedLeft = _ganttVisibleLeft;
	_ganttCapturedAtX = e.clientX;
	drawGantt();
	drawTimeScale();
	drawGanttHScroll();
}

function onGanttDblClick(e) {
	zoomX100();
	zoomY100();
	drawGantt();
	drawTimeScale();
	drawGanttHScroll();
	drawTableContent();
	drawVerticalScroll();
}

function onTableHeaderMouseDown(e) {
	_tableHeaderColumnSwapper = this.cloneNode(true);
	_tableHeaderSVG.appendChild(_tableHeaderColumnSwapper);
	_tableHeaderColumnSwapperCapturedAtX = e.x;
	_tableHeaderColumnSwapperOriginalX = parseInt( _tableHeaderColumnSwapper.getAttributeNS(null,'x') );	
	_tableHeaderColumnSwapper.setAttributeNS(null,'opacity',0.5);
	_tableHeaderColumnSwapper.style.cursor = 'col-resize';
	_tableHeaderSVGBkgr.style.cursor = 'col-resize';
}

function onTableColumnSplitterMouseDown(e) {
	_tableSplitterCaptured=Number(this.dataset.columnNumber); _tableSplitterCapturedAtX=e.x;
}

function onGanttHScrollSVGBkgr(e) {
	let x = parseInt( _ganttHScrollSVGSlider.getAttributeNS(null,'x') ) + parseInt( _ganttHScrollSVG.getAttributeNS(null,'x') ) + _containerDivX;
	let step = _ganttVisibleWidth * _settings.timeScaleScrollStep;
	if( e.x < x ) {
		moveX( -step );		
	} else if( e.x > x + parseInt( _ganttHScrollSVGSlider.getAttributeNS(null,'width') ) ) {
		moveX( step );		
	}
}

function onGanttHScrollSVGSlider(e) {
	_ganttHScrollCaptured = true;
	_ganttHScrollCapturedAtX = e.x;
	_ganttHScrollXAtCapture = this.getBBox().x;
}


function onVerticalScrollSVGSlider(e) {
	_verticalScrollCaptured = true;
	_verticalScrollCapturedAtY = e.y;
	_verticalScrollYAtCapture = this.getBBox().y;
}

 
function onTableScrollSVGBkgr(e) {
	let bbox = _tableScrollSVGSlider.getBBox();
	let mouseXRelative = e.x - _containerDivX;
	let moveTo = 0;
	if( mouseXRelative < bbox.x ) {
		moveTo = -1;
	} else if( mouseXRelative > bbox.x + bbox.width ) {
		moveTo = 1;
	}
	if( moveTo == 0 ) {
		return;
	}
	let step = _tableContentSVGWidth * _settings.tableScrollStep;
	let maxVisibleLeft = (_tableHeaderOverallWidth > _tableHeaderSVGWidth) ? (_tableHeaderOverallWidth - _tableHeaderSVGWidth) : 0;
	if( !(maxVisibleLeft > 0.0) ) {
		return;
	}
	_tableViewBoxLeft = parseInt(_tableViewBoxLeft + step * moveTo);
	if( _tableViewBoxLeft > maxVisibleLeft ) {
		_tableViewBoxLeft = maxVisibleLeft;
	} else if( _tableViewBoxLeft < 0 ) {
		_tableViewBoxLeft = 0;
	}
	newSliderX = _tableViewBoxLeft * (_tableScrollSVGWidth - _tableScrollSVGSlider.getBBox().width) / maxVisibleLeft;
	_tableScrollSVGSlider.setAttributeNS( null,'x', newSliderX );
	drawTableHeader(false,true);
	drawTableContent(false,true);
}


function onGanttWheel(e) {
	let delta = e.deltaY || e.detail || e.wheelDelta;
	if( e.shiftKey ) {
		let zoomFactorChange;
		if( delta < 0 ) {
			zoomFactorChange = _settings.zoomFactor;
		} else {
			zoomFactorChange = -_settings.zoomFactor;
		}		
		let y = e.clientY - getElementPosition(_containerDiv).y - _ganttSVG.getAttributeNS(null,'y');
		zoomYR( zoomFactorChange, y / _ganttSVGHeight );
	} else {
		let positionChange;
		if( delta > 0 ) {
			positionChange = 1;
		} else {
			positionChange = -1;
		}		
		moveYR( positionChange );
	}
}

function onTimeWheel(e) {
	let delta = e.deltaY || e.detail || e.wheelDelta;
	let zoomFactorChange;
	if( e.shiftKey ) {
		if( delta > 0 ) {
			zoomFactorChange = _settings.zoomFactor;
		} else {
			zoomFactorChange = -_settings.zoomFactor;
		}
		zoomXR( zoomFactorChange, (e.clientX - _ganttSVG.getAttributeNS(null,'x')) / _ganttSVGWidth );
	} else {
		let change = _ganttVisibleWidth * _settings.timeScaleScrollStep;
		if( delta < 0 ) {
			change = -change;
		}
		moveX( change );		
	}
}


