
var NS = "http://www.w3.org/2000/svg";

var _data;

var _settings = {
	ganttOperation0Color:'#2f8f2f', ganttOperation0Opacity:0.75,
	ganttOperation100Color:'#7f7f7f', ganttOperation100Opacity:0.75,
	ganttPhaseColor:'#0f7f07f', ganttPhaseOpacity:0.75, ganttCriticalColor:'#bf2f2f', 
	ganttCompareColor:'#cfcfdf', ganttCompareOpacity:0.75,
	ganttFontColor:'#4f4f4f', timeScaleFontColor:'#4f4f4f', timeScaleFillColor:'#cfcfdf', timeScaleStrokeColor:'#afafaf',
	ganttLinkStrokeColor:'#000000',	ganttLinkStrokeWidth:1, ganttLinkStrokeDashArray:null, 
	ganttLinkOpacity:0.4, ganttLinkArrowWidth:10, ganttLinkArrowHeight:10,
	tableHeaderFontColor:'#4f4f4f',	tableHeaderFillColor:'#cfcfdf',	tableHeaderStrokeColor:'#4f4f4f', 
	tableHeaderBorderColor:'#cfcfdf', tableHeaderActiveBorderColor:'#8f8f9f', 
	tableContentFontColor:'#4f4f4f', tableContentFillColor:'#ffffff', tableContentStrokeColor:'#4f4f4f', 
	tableMaxFontSize:12, expandMaxFontSize:32,
	scrollBkgrColor:'#cfcfcf', scrollRectColor:'#afafaf', scrollSliderColor:'#8f8f8f', scrollSliderActiveColor:'#000000',
	gridColor:"#bfbfbf", gridStrokeWidth:0.5, gridOpacity:1, gridStrokeDashArray:'2,2', gridCurrentTimeColor:"#bf2f2f",
	editedColor:"#bf2f2f",
	ganttChartLeftMargin:8, ganttChartRightMargin:8, 
	ganttRectTopMargin:0.7, ganttRectBottomMargin:0.0, ganttRectTopMarginTitleFree:0.5, ganttRectBottomMarginTitleFree:0.0,
	ganttCompareTopMargin:0.5, ganttCompareBottomMargin:0.3, ganttCompareTopMarginTitleFree:0.1, ganttCompareBottomMarginTitleFree:0.5,
	ganttRectBracketRelHeight:0.25,	ganttRectBracketThick:5,
	scrollThick:8, scrollSliderSize:10, timeScaleScrollStep:0.1, tableScrollStep:0.1, verticalSplitterInitialPosition:0.25,
	zoomFactor:0.25, containerHPadding:2,
	minDayWidthOnTimeScale:12, minVisibleFontSize:6, minTableColumnWidth:4
}

var _terms = { 
	'en': { operation:'Operation', phase:'Phase', status:'Status', resourse:'Resourse(s)', version: 'Version',
		expandColumn:'[]', Level:'Level', Name:'Name', Code:'Code', Start:'Start', Fin:'Finish', 
		CostTotal:'Cost', VolSum:'Volume', DurSumD:'Duration', 
		Notes:'Notes',status0:'Not started', status100:'Finished', statusNotFinished:'Under way',
		gantt:'Gantt', help:'Help', 
		monthNames:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		helpTitle:'Help',
		helpText:'<b>Zoom in / Zoom out</b>: &lt;shift+mouse wheel&gt;<br/><b>Zoom 100%</b>: &lt;double click over the gantt canvas&gt;<br/><b>Edit</b>: <i>clicking on an operation or phase opens a dialog box to let you enter data.</i><br/><b>Swap columns in the table</b>: <i>hold and drag a column with the mouse.</i>',
		settingTitle:'Settings',
		tableSettingsTitle:'Table Settings',
		waitDataText:'PLEASE WAIT WHILE LOADING DATA...',
		waitSaveUserDataText:'PLEASE WAIT WHILE SAVING DATA...',
		errorLoadingData:'ERROR LOADING DATA...',
		errorParsingData:'DATA LOADED ARE INVALID...',
		errorParsingUserData:'DATA LOADED ARE INVALID...', 
		enterUserDataMessage: 'ENTER USER DATA HERE',
		errorUserData:'The data you\'ve entered are corrupted. Please contact your system administrator!',
		synchronizedMessage: 'All the data presented are synchronized with Spider Project',
		unsynchronizedMessage: 'The data you entered has not been uploaded into Spider Project yet!' },
	'ru': { operation:'Операция', phase:'Фаза', status:'Состояние', resourse:'Ресурс(ы)', version: 'Версия',
		expandColumn:'[]', Level:'Уровень', Name:'Название', Code:'Код', Start:'Старт', Fin:'Финиш', 
		CostTotal:'Стоимость', VolSum:'Объем', DurSumD:'Длительность', 
		Notes:'Комментарий', status0:'Не начато', status100:'Завершено', statusNotFinished:'Не завершено',
		gantt:'Гантт', help:'Справка', 
		monthNames:['Янв','Фев','Мар','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Ноя','Дек'], 
		helpTitle:'Справка',
		helpText:'<b>Zoom in / Zoom out</b>: &lt;shift+mouse wheel&gt;<br/><b>Zoom 100%</b>: &lt;double click over the gantt canvas&gt;<br/><b>Edit</b>: <i>clicking on an operation or phase opens a dialog box to let you enter data.</i><br/><b>Swap columns in the table</b>: <i>hold and drag a column with the mouse.</i>',
		settingsTitle:'Наcтройки',
		tableSettingsTitle:'Настройки таблицы',
		waitDataText:'ПОЖАЛУЙСТА ПОДОЖДИТЕ, ПОКА ЗАГРУЖАЮТСЯ ДАННЫЕ...',
		waitSaveUserDataText:'ПОЖАЛУЙСТА, ПОДОЖДИТЕ ПОКА СОХРАНЯЮТСЯ ДАННЫЕ...',
		errorLoadingData:'ОШИБКА ПРИ ЗАГРУЗКЕ ДАННЫХ...',
		errorParsingData:'ЗАГРУЖЕННЫЕ ДАННЫЕ ИСКАЖЕНЫ...',
		errorParsingUserData:'ЗАГРУЖЕННЫЕ ДАННЫЕ ИСКАЖЕНЫ...',
		enterUserDataMessage: 'USER DATA ВВОДЯТСЯ СЮДА',
		errorUserData:'Введенные вами данные были скажены. Обратитесь к системному администратору!',
		synchronizedMessage: 'Все данные синхронизированы со Spider Project',
		unsynchronizedMessage: 'Данные, которые вы ввели, еще не были загружены в Spider Project!' }
};

var _files = { gantt:"gantt.php", logout:"logout.php", userDataFile: "gantt_user_data.php", userDataSave:"gantt_save_user_data.php" };

var _blackOutBoxDiv = null;
var _messageBoxDiv = null;
var _messageBoxTextDiv = null;
var _editBoxDiv = null;
var _editBoxDetailsElem = null;
var _editBoxOperationCodeElem = null;
var _editBoxUserDataElem = null;
var _editBoxOperationIndexElem = null;
var _zoomGanttHorizontalInput = null;
var _zoomGanttVerticalInput = null; 
var _displayLinksCheckbox = null; 

var _containerDiv = null;
var containerSVG = null;
var timeSVG = null;
var ganttSGV = null;
var tableContentSVG = null;
var tableContentSVGContainer = null;
var tableHeaderSVG = null;
var verticalSplitterSVG = null;
var tableScrollSVG = null;
var ganttHScrollSVG = null;
var verticalScrollSVG = null;

var _containerDivX, _containerDivY, _containerDivHeight, _containerDivWidth;

var ganttSVGWidth;
var ganttSVGHeight;
var ganttVisibleLeft;
var ganttVisibleWidth;
var ganttVisibleTop;
var ganttVisibleHeight;
var ganttSVGBkgr = null;

var timeSVGWidth;
var timeSVGHeight;
var timeSVGBkgr=null;

var tableContentSVGWidth;
var tableContentSVGHeight;
var tableContentSVGBkgr=null;

var tableHeaderSVGWidth;
var tableHeaderSVGHeight;
var tableHeaderSVGBkgr=null;
var tableHeaderOverallWidth=0;

var tableVisibleLeft=0;

var timeCaptured=false;
var timeCapturedAtX;

var ganttCaptured=false;
var ganttCapturedAtX;
var ganttCapturedLeft;

var verticalSplitterSVGWidth;
var verticalSplitterSVGHeight;
var verticalSplitterSVGBkgr=null;
var verticalSplitterCaptured=false;
var verticalSplitterCapturedAtX;
var verticalSplitterPosition = null;

var tableSplitterCaptured = -1;
var tableSplitterCapturedAtX = -1;

var timeScaleToGrid = [];

var tableScrollSVGWidth, tableScrollSVGHeight;
var tableScrollCaptured = false;
var tableScrollCapturedAtX = -1;
var tableScrollXAtCapture = -1;
var tableScrollSVGSlider=null;
var tableScrollSVGBkgr=null;

var ganttHScrollSVGWidth, ganttHScrollSVGHeight;
var ganttHScrollCaptured = false;
var ganttHScrollCapturedAtX = -1;
var ganttHScrollXAtCapture = -1;
var ganttHScrollSVGSlider=null;
var ganttHScrollSVGBkgr=null;

var verticalScrollSVGWidth, verticalScrollSVGHeight;
var verticalScrollCaptured = false;
var verticalScrollCapturedAtY = -1;
var verticalScrollYAtCapture = -1;
var verticalScrollSVGSlider=null;
var verticalScrollSVGBkgr=null;

var ganttScrollSVGWidth, ganttScrollSVGHeight;
var verticalScrollSVGWidth, verticalScrollSVGHeight;

var tableHeaderColumnSwapper = null;
var tableHeaderColumnSwapperCapturedAtX = -1;
var tableHeaderColumnSwapperOriginalX = -1;

window.onload = function() {
	initLayout();
	loadData();
};

window.addEventListener( "contextmenu", function(event) { event.preventDefault(); return(false); } );

window.addEventListener( "resize", function(e) { initLayoutCoords(); displayData(); } );

window.addEventListener( "wheel", function(event) {
	if( event.ctrlKey ) {
		event.preventDefault();//prevent zoom
	}
});

window.addEventListener( 'mouseup', function(e) { 
	if( timeCaptured ) { timeCaptured = false; } 
	if( ganttCaptured ) { ganttCaptured = false; } 
	if( ganttSVG.style.cursor != "default" ) {
		ganttSVG.style.cursor = "default";
	}
	if( verticalSplitterCaptured ) { 
		verticalSplitterCaptured = false; 
		initLayoutCoords();
		drawAll();
	} 
	if( tableScrollCaptured ) { tableScrollCaptured = false; }
	if( ganttHScrollCaptured ) { ganttHScrollCaptured = false; }
	if( verticalScrollCaptured ) { verticalScrollCaptured = false; }
 	
	if( tableSplitterCaptured >= 0 ) {
		let el = document.getElementById('tableSplitter'+tableSplitterCaptured);
		let newWidth = _data.table[tableSplitterCaptured].width + e.x - tableSplitterCapturedAtX;
		if( newWidth < _settings.minTableColumnWidth ) {
			newWidth = _settings.minTableColumnWidth;
		}
		_data.table[tableSplitterCaptured].width = newWidth;
		setCookie( _data.table[tableSplitterCaptured].ref + "Width", _data.table[tableSplitterCaptured].width );
		tableSplitterCaptured = -1;
		drawTableContent();
		drawTableHeader();
	}
	if( tableHeaderColumnSwapperCapturedAtX >= 0 ) { // Table column title has been moved...
		tableHeaderColumnSwapperCapturedAtX = -1;
		let from = Number(tableHeaderColumnSwapper.dataset.columnNumber);
		tableHeaderColumnSwapper.remove();
		tableHeaderColumnSwapper = null;
		tableHeaderSVGBkgr.style.cursor = 'default';
		for( let col = 1 ; col < _data.table.length ; col++ ) { // To find the column to swap with...
			let el = document.getElementById( 'tableHeaderColumnNameSVG' + col );
			let x = parseInt( el.getAttributeNS( null, 'x' ) ); 
			let width = parseInt( el.getAttributeNS( null, 'width' ) ); 
			if( e.x > x && e.x < (x + width) ) {
				if( from != col ) {
					moveElementInsideArray(_data.table, from, col );
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
}, true );

window.addEventListener( 'mousemove', function(e) { 
	if( verticalSplitterCaptured ) {
		if( ( e.x < 20 ) || ( e.x > (window.innerWidth - 20 - _settings.scrollThick) ) ) {
			return;
		}
		verticalSplitterPosition = (e.x - verticalSplitterCapturedAtX) / _containerDivWidth + verticalSplitterPosition;
		verticalSplitterCapturedAtX = e.x;
		let oldGanttSVGWidth = ganttSVGWidth;
		initLayoutCoords();
		drawTableScroll();
		drawGanttHScroll();
		ganttVisibleWidth *= (ganttSVGWidth / oldGanttSVGWidth);
		setCookie("verticalSplitterPosition",verticalSplitterPosition);
		return;
	}
	if( tableSplitterCaptured >= 0 ) { // Table splitter captured - a table column width is being changing...
		let el = document.getElementById('tableSplitter'+tableSplitterCaptured);

		let newX = e.x
		if( tableSplitterCaptured > 0 ) { // To ensure not sliding too far to the left...
			let leftEl = document.getElementById( 'tableSplitter'+(tableSplitterCaptured-1) );
			let leftX = parseInt( leftEl.getAttributeNS(null,'x') );
			if( newX < leftX + _settings.minTableColumnWidth ) {
				newX = leftX + _settings.minTableColumnWidth;
			} 
		}
		el.setAttributeNS(null,'x',newX);
		return;
	}
	if( tableScrollCaptured ) {
		let maxVisibleLeft = (tableHeaderOverallWidth > tableHeaderSVGWidth) ? (tableHeaderOverallWidth - tableHeaderSVGWidth) : 0;
		let newSliderX = tableScrollXAtCapture + (e.x - tableScrollCapturedAtX);
		let maxSlider = tableScrollSVGWidth - tableScrollSVGSlider.getBBox().width;
		if( newSliderX < 0 ) {
			newSliderX = 0;
		} else if( newSliderX > maxSlider ) {
			newSliderX = maxSlider;
		}
		tableVisibleLeft = newSliderX * maxVisibleLeft / maxSlider;
		tableScrollSVGSlider.setAttributeNS( null,'x', newSliderX );
		drawTableHeader();
		drawTableContent();
		return;
	}
	if( ganttHScrollCaptured ) {
		let maxSlider = ganttHScrollSVGWidth - ganttHScrollSVGSlider.getBBox().width;
		if( !( maxSlider > 0 ) ) {
			return;
		}
		let newSliderX = ganttHScrollXAtCapture + (e.x - ganttHScrollCapturedAtX);
		if( newSliderX < 0 ) {
			newSliderX = 0;
		} else if( newSliderX > maxSlider ) {
			newSliderX = maxSlider;
		}
		ganttVisibleLeft = _data.visibleMin + newSliderX * (_data.visibleMaxWidth - ganttVisibleWidth) / maxSlider;
		ganttHScrollSVGSlider.setAttributeNS( null,'x', newSliderX );
		drawTimeScale();
		drawGantt();
		return;
	}
	if( verticalScrollCaptured ) {
		let maxSlider = verticalScrollSVGHeight - verticalScrollSVGSlider.getBBox().height;
		if( !( maxSlider > 0 ) ) {
			return;
		}
		let newSliderY = verticalScrollYAtCapture + (e.y - verticalScrollCapturedAtY);
		if( newSliderY < 0 ) {
			newSliderY = 0;
		} else if( newSliderY > maxSlider ) {
			newSliderY = maxSlider;
		}
		ganttVisibleTop = newSliderY * (_data.operations.length - ganttVisibleHeight) / maxSlider;
		verticalScrollSVGSlider.setAttributeNS( null,'y', newSliderY );
		drawGantt();
		drawTableContent();
		return;
	}
	if( tableHeaderColumnSwapper != null ) {
		let newX = tableHeaderColumnSwapperOriginalX + e.x - tableHeaderColumnSwapperCapturedAtX;
		tableHeaderColumnSwapper.setAttributeNS(null,'x', newX );
		return;
	}

} );


function loadData() {
	if( document.location.host ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 ) {
		    	if( this.status == 200) {
			    	let errorParsingData = false;
			    	try{
				        _data = JSON.parse(this.responseText);
			    	} catch(e) {
			    		errorParsingData = true;
			    	}
			    	if( errorParsingData ) {
			    		alert(this.responseText);
						displayMessageBox( _terms['en'].errorParsingData ); 
			    	} else if( !('editables' in _data) ) {
					    hideMessageBox();		    
						initData();
						displayData();		 
			        } else {
			        	createEditBoxInputs();
			        	_data.synchronized = null; // To assign later with a synchronization status.
				        var xmlhttpUserData = new XMLHttpRequest();
						xmlhttpUserData.onreadystatechange = function() {
				    		if (this.readyState == 4 ) {
				    			if( this.status == 200) {		    				
				    				let errorParsingUserData = false;
				    				let userData;
				    				try {
				    					userData = JSON.parse(this.responseText);
				    				} catch(e) {
				    					errorParsingUserData = true;
				    				}
				    				if( errorParsingUserData ) {
						        		_data.synchronized = -1;
					        		} else {
					      				_data.synchronized = 0;
					        			setUserData( userData );
					        		}
					        	} else if( status == 404 ) {
					        		_data.synchronized = 1;
					        	}
					        	displaySynchronizedStatus( _data.synchronized ); 
							    hideMessageBox();		    
								initData();
								displayData();		 
				        	} 
				        }
				        xmlhttpUserData.open("GET", _files.userDataFile, true);
				        xmlhttpUserData.setRequestHeader("Cache-Control", "no-cache");
						xmlhttpUserData.send();
				    }
				} else {
					displayMessageBox( _terms['en'].errorLoadingData ); 
				}
		    }
		};
		xmlhttp.open("GET", _files.gantt, true);
		xmlhttp.setRequestHeader("Cache-Control", "no-cache");
		xmlhttp.send();
		displayMessageBox( _terms['en'].waitDataText ); 
	} 
}

function displayData() {	
	zoomX(null, null);
	zoomY(null, null);
	displayLayoutHeader();	
	drawAll();
}

function drawAll() {
	drawTableContent(true);
	drawTableHeader(true);
	drawTimeScale();
	drawGantt(true);
	drawTableScroll( true );
	drawGanttHScroll( true );
	drawVerticalScroll( true );			
}

function initData() {
	_data.userName = ( typeof(userName) !== 'undefined' ) ? userName : null;

	var curTimeParsed = parseDate( _data.proj.CurTime );
	if( curTimeParsed != null ) {
		_data.proj.curTimeInSeconds = curTimeParsed.timeInSeconds;
	} else {
		_data.proj.curTimeInSeconds = parseInt(Date.now()/1000);		
	}

	// Retrieving dates of operations, calculating min. and max. dates.
	_data.startMinInSeconds = -1;
	_data.finMaxInSeconds = -1;
	_data.startFinSeconds = -1

	var parsed;
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		let d = _data.operations[i];
		parsed = parseDate( d.AsapStart );
		if( parsed !== null ) {
			_data.startMinInSeconds = reassignBoundaryValue( _data.startMinInSeconds, parsed.timeInSeconds, false );
			d.AsapStartInSeconds = parsed.timeInSeconds;
		} else {
			d.AsapStartInSeconds = -1;
		}
		parsed = parseDate( d.AsapFin );
		if( parsed !== null ) {
			_data.finMaxInSeconds = reassignBoundaryValue( _data.finMaxInSeconds, parsed.timeInSeconds, true );
			d.AsapFinInSeconds = parsed.timeInSeconds;
		} else {
			d.AsapFinInSeconds = -1;
		}
		parsed = parseDate( d.FactStart );
		if( parsed !== null ) {
			_data.startMinInSeconds = reassignBoundaryValue( _data.startMinInSeconds, parsed.timeInSeconds, false );
			d.FactStartInSeconds = parsed.timeInSeconds;
		} else {
			d.FactStartInSeconds = -1;
		}
		parsed = parseDate( d.FactFin );
		if( parsed !== null ) {
			_data.finMaxInSeconds = reassignBoundaryValue( _data.finMaxInSeconds, parsed.timeInSeconds, true );
			d.FactFinInSeconds = parsed.timeInSeconds;
		} else {
			d.FactFinInSeconds = -1;
		}
		parsed = parseDate( d.Start_COMP );
		if( parsed !== null ) {
			_data.startMinInSeconds = reassignBoundaryValue( _data.startMinInSeconds, parsed.timeInSeconds, false );			
			d.Start_COMPInSeconds = parsed.timeInSeconds;			
		} else {
			d.Start_COMPInSeconds = -1;
		}
		parsed = parseDate( d.Fin_COMP );
		if( parsed !== null ) {
			_data.finMaxInSeconds = reassignBoundaryValue( _data.finMaxInSeconds, parsed.timeInSeconds, true );			
			d.Fin_COMPInSeconds = parsed.timeInSeconds;			
		} else {
			d.Fin_COMPInSeconds = -1;
		}
		parsed = parseDate( d.alapStart );
		if( parsed !== null ) {
			_data.startMinInSeconds = reassignBoundaryValue( _data.startMinInSeconds, parsed.timeInSeconds, false );			
			d.alapStartInSeconds = parsed.timeInSeconds;			
		} else {
			d.alapStartInSeconds = -1;
		}

		// Start and finish
		if( d.FactFin ) {
			d.status = 100; // finished
			d.displayStartInSeconds = d.FactStartInSeconds; 
			d.displayFinInSeconds = d.FactFinInSeconds;
			d.displayUnfinishedInSeconds = null; 
		} else {
			if( !d.FactStart ) { // Hasn't been started yet
				d.status = 0; // not started 
				d.displayStartInSeconds = d.AsapStartInSeconds; 
				d.displayFinInSeconds = d.AsapFinInSeconds;
				d.displayUnfinishedInSeconds = null;
			} else { // started but not finished
				let divisor = d.AsapFinInSeconds - d.FactStartInSeconds;
				if( divisor > 0 ) {
					d.status = parseInt( (d.AsapStartInSeconds - d.FactStartInSeconds) * 100 / divisor); 
				} else {
					d.status = 50;
				}
				d.displayStartInSeconds = d.FactStartInSeconds; 
				d.displayFinInSeconds = d.AsapFinInSeconds;
				d.displayUnfinishedInSeconds = d.AsapStartInSeconds;
			}
		}
		if( 'f_ColorCom' in d ) {
			if( d.f_ColorCom ) {
				if( digitsOnly(d.f_ColorCom) ) {
					let r = (d.f_ColorCom & 0xFF0000) >> 16;
					let g = (d.f_ColorCom & 0x00FF00) >> 8;
					let b = (d.f_ColorCom & 0x0000FF);					
					d.color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
				}
			}
		}
		if( !('color' in d ) ) {
			d.color = _settings.ganttOperation0Color;
		}
/*
r = (c & 0xFF0000) >> 16;
g = (c & 0x00FF00) >> 8;
b = (c & 0x0000FF);
*/
		//console.log( JSON.stringify(d) );
		if( typeof( d.Level ) === 'string' ) {
			if( digitsOnly(d.Level) ) {
				d.Level = parseInt(d.Level);
			}
		}
	}
	_data.startFinSeconds = _data.finMaxInSeconds - _data.startMinInSeconds;
	_data.visibleMin = _data.startMinInSeconds; // - (_data.finMaxInSeconds-_data.startMinInSeconds)/20.0;
	_data.visibleMax = _data.finMaxInSeconds; // + (_data.finMaxInSeconds-_data.startMinInSeconds)/20.0;
	_data.visibleMaxWidth = _data.visibleMax - _data.visibleMin;

	// Initializing the parent-children structure 
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		_data.operations[i].id = 'ganttRect' + i; // Id
		initParents(i);
	}

	// Marking 'expandables'
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		let hasChild = false;
		for( let j = i+1 ; j < _data.operations.length ; j++ ) {
			for( let k = 0 ; k < _data.operations[j].parents.length ; k++ ) {
				if( _data.operations[j].parents[k] == i ) { // If i is a parent of j
					hasChild = true;
					break;
				}
			}
			if( hasChild ) {
				break;
			}
		}
		if( hasChild ) {
			_data.operations[i].expanded = true;
			_data.operations[i].expandable = true;
		} else {
			_data.operations[i].expanded = true;			
			_data.operations[i].expandable = false;
		}
		_data.operations[i].visible = true;
	}

	// Reading cookies to init interface elements. 
	for( let col = 0 ; col < _data.table.length ; col++ ) {
		let widthValue = getCookie( _data.table[col].ref+"Width", 'int' );
		if( widthValue ) {
			_data.table[col].width = widthValue;
		}
	}
	// Reading and assigning the positions of columns.
	let failed=false;
	for( let col = 0 ; col < _data.table.length ; col++ ) {
		let pos = getCookie( _data.table[col].ref+"Position", 'int' );
		if( pos == null ) {
			failed = true;
			break;			
		}
		if( pos >= _data.table.length ) {
			failed = true;
			break;
		}
	}
	if( !failed ) { // If all the positions for every column have been found in cookies...
		let moveTo = _data.table.length-1;
		for( let col = 0 ; col < _data.table.length ; col++ ) {
			for( let cookie = 0 ; cookie < _data.table.length ; cookie++ ) { // Searching for the column to be moved to 'moveTo' position...
				let pos = getCookie( _data.table[cookie].ref+"Position", 'int' );
				if( pos == moveTo ) {
					moveElementInsideArray( _data.table, cookie, moveTo );
					moveTo -= 1;
					break;
				}
			}
		}
	} else { // Deleting all the cookies that stores positions of columns...
		for( let cookie = 0 ; cookie < _data.table.length ; cookie++ ) {
			let cname = _data.table[cookie].ref+"Position";
			if( getCookie(cname) != null ) {
				deleteCookie( cname );
			}
		}
	}
}


function initParents( iOperation ) {
	_data.operations[iOperation].parents = []; // Initializing "parents"
	for( let i = iOperation-1 ; i >= 0 ; i-- ) {
		let l = _data.operations[iOperation].parents.length;
		let currentLevel;
		if( l == 0 ) {
			currentLevel = _data.operations[iOperation].Level;
		} else {
			let lastPushedIndex = _data.operations[iOperation].parents[l-1];
			currentLevel = _data.operations[lastPushedIndex].Level;
		}
		if( currentLevel === null ) { // Current level is an operation
			if( typeof(_data.operations[i].Level) === 'number' ) {
				_data.operations[iOperation].parents.push(i);
			}
		} else if( typeof(currentLevel) === 'number' ) { // Current level is a phase
			if( typeof(_data.operations[i].Level) === 'number' ) {
				if( _data.operations[i].Level < currentLevel ) { // _data.operations[iOperation].Level ) {
					_data.operations[iOperation].parents.push(i);
				}
			}
		} else if( typeof(currentLevel) === 'string' ) { // Current level is a team or resourse
			if( _data.operations[i].Level === null ) { // The upper level element is an operation
				_data.operations[iOperation].parents.push(i);
			} else if( currentLevel == 'R' ) {
				if( _data.operations[i].Level === 'T' ) { // The upper level element is an operation
					_data.operations[iOperation].parents.push(i);
				}
			}
		}
	}	
}


function initLayout() {
	_blackOutBoxDiv = document.getElementById("blackOutBox");
	_messageBoxDiv = document.getElementById("messageBox");
	_messageBoxTextDiv = document.getElementById("messageBoxText");
	_editBoxDiv = document.getElementById('editBox');			
	_editBoxDetailsElem = document.getElementById('editBoxDetails');			
	_editBoxOperationCodeElem = document.getElementById('editBoxOperationCode');			
	_editBoxUserDataElem = document.getElementById('editBoxUserData');			
	_editBoxOperationIndexElem = document.getElementById('editBoxOperationIndex');			
	_zoomGanttHorizontalInput = document.getElementById('toolboxHScale');
	_zoomGanttVerticalInput = document.getElementById('toolboxVScale'); 
	_displayLinksCheckbox = document.getElementById('toolboxDisplayLinks'); 

	_containerDiv = document.getElementById("containerDiv");
	containerSVG = document.getElementById("containerSVG");
	tableHeaderSVG = document.getElementById('tableHeaderSVG');
	tableContentSVG = document.getElementById('tableContentSVG');
	ganttSVG = document.getElementById("ganttSVG");
	timeSVG = document.getElementById("timeSVG");
	verticalSplitterSVG = document.getElementById("verticalSplitterSVG");
	tableScrollSVG = document.getElementById("tableScrollSVG");
	ganttHScrollSVG = document.getElementById("ganttScrollSVG");
	verticalScrollSVG = document.getElementById("verticalScrollSVG");

	let value = getCookie( "verticalSplitterPosition", 'float' );
	if( value ) {
		if( value > 0.0 && value < 1.0 ) {
			_settings.verticalSplitterInitialPosition = value;
		}
	}	
	verticalSplitterPosition = _settings.verticalSplitterInitialPosition;

	initLayoutCoords();

	_containerDiv.addEventListener('selectstart', function() { event.preventDefault(); return false; } );
	_containerDiv.addEventListener('selectend', function() { event.preventDefault(); return false; } );

	// Vertical splitter
	verticalSplitterSVGBkgr = createRect( 0, 0, verticalSplitterSVGWidth, verticalSplitterSVGHeight, 
			{ stroke:_settings.tableContentStrokeColor, strokeWidth:1,  fill:_settings.tableContentFillColor } ); 	// backgroud rect
	verticalSplitterSVG.setAttributeNS(null,'cursor','col-resize');	
	verticalSplitterSVG.appendChild( verticalSplitterSVGBkgr );			
	verticalSplitterSVG.onmousedown = function(e) { verticalSplitterCaptured=true; verticalSplitterCapturedAtX=e.x; };

	// Gantt chart
	ganttSVG.addEventListener( "mousemove", onGanttCapturedMouseMove );
	ganttSVG.addEventListener( "dblclick", onGanttDblClick );
	ganttSVG.addEventListener( "mousedown", function(e) { 
		// For right key use: "if( e.button == 2 )" 
		ganttCaptured = true; 
		ganttCapturedAtX = e.clientX;			
		ganttCapturedLeft = ganttVisibleLeft;			
		ganttSVG.style.cursor = "hand";
	} );	
	addOnMouseWheel( ganttSVG, onGanttWheel );
	ganttSVG.style.cursor = "default";

	// Time scale
	timeSVG.style.cursor = "pointer";
	timeSVG.onmousedown = function(e) { timeCaptured = true; timeCapturedAtX = e.clientX; };
	timeSVG.onmousemove = onTimeCapturedMouseMove;
	addOnMouseWheel( timeSVG, onTimeWheel );	

	// zoom tools
	_zoomGanttHorizontalInput.oninput = function(e) { 
		zoomXR( (parseInt(this.value) - parseInt(_data.visibleMaxWidth * 100.0 / ganttVisibleWidth + 0.5)) / 100.0, null );
	};
	_zoomGanttVerticalInput.oninput = function(e) { 
		zoomYR( (parseInt(this.value) - parseInt(_data.operations.length *100.0 / ganttVisibleHeight + 0.5)) / 100.0, null); 
	};
	_displayLinksCheckbox.onchange = function() { drawGantt(); };

	createDefs( containerSVG );
	return true;
}

function initLayoutCoords() {
	_containerDivY = getElementPosition(_containerDiv).y;
	_containerDivHeight = window.innerHeight - _containerDivY - 24;

	_containerDiv.style.height = _containerDivHeight;
	_containerDiv.style.width = window.innerWidth;
	_containerDivX = _settings.containerHPadding;
	_containerDivWidth = window.innerWidth - _settings.containerHPadding*2;
	_containerDiv.style.padding=`0px ${_settings.containerHPadding}px 0px ${_settings.containerHPadding}px`;

	containerSVG.setAttributeNS(null, 'x', 0 );
	containerSVG.setAttributeNS(null, 'y', 0 ); 
	containerSVG.setAttributeNS(null, 'width', _containerDivWidth ); // window.innerWidth-1  );
	containerSVG.setAttributeNS(null, 'height', _containerDivHeight ); 

	// Table Header
	tableHeaderSVG.setAttributeNS(null, 'x', 0 );
	tableHeaderSVG.setAttributeNS(null, 'y', 0 ); 
	tableHeaderSVGWidth = _containerDivWidth * verticalSplitterPosition;
	tableHeaderSVG.setAttributeNS(null, 'width', tableHeaderSVGWidth ); // window.innerWidth * 0.1 );
	tableHeaderSVGHeight = _containerDivHeight * 0.1;
	tableHeaderSVG.setAttributeNS(null, 'height', tableHeaderSVGHeight ); 

	// Table Content
	tableContentSVG.setAttributeNS(null, 'x', 0 );
	tableContentSVG.setAttributeNS(null, 'y', tableHeaderSVGHeight ); 
	tableContentSVGWidth = tableHeaderSVGWidth;
	tableContentSVG.setAttributeNS(null, 'width', tableContentSVGWidth ); // window.innerWidth * 0.1 );
	tableContentSVGHeight = _containerDivHeight - tableHeaderSVGHeight - _settings.scrollThick;
	tableContentSVG.setAttributeNS(null, 'height', tableContentSVGHeight ); 

	// Vertical Splitter
	verticalSplitterSVG.setAttributeNS(null, 'x', tableContentSVGWidth );
	verticalSplitterSVG.setAttributeNS(null, 'y', 0 ); 
	verticalSplitterSVGWidth = 3; //_containerDivWidth * 0.005;
	verticalSplitterSVG.setAttributeNS(null, 'width', verticalSplitterSVGWidth ); // window.innerWidth * 0.9 );
	verticalSplitterSVGHeight = _containerDivHeight - _settings.scrollThick;
	verticalSplitterSVG.setAttributeNS(null, 'height', _containerDivHeight ); //window.innerHeight/2 ); 

	// Gantt chart
	ganttSVG.setAttributeNS(null, 'x', tableContentSVGWidth + verticalSplitterSVGWidth );
	ganttSVG.setAttributeNS(null, 'y', tableHeaderSVGHeight ); 
	ganttSVGWidth = _containerDivWidth - (tableContentSVGWidth + verticalSplitterSVGWidth) - _settings.scrollThick;
	ganttSVG.setAttributeNS(null, 'width', ganttSVGWidth ); // window.innerWidth * 0.9 );
	ganttSVGHeight = tableContentSVGHeight;
	ganttSVG.setAttributeNS(null, 'height', ganttSVGHeight ); //window.innerHeight/2 );

	// Time scale
	timeSVG.setAttributeNS(null, 'x', tableContentSVGWidth + verticalSplitterSVGWidth );
	timeSVG.setAttributeNS(null, 'y', 0 ); 
	timeSVGWidth = ganttSVGWidth;
	timeSVG.setAttributeNS(null, 'width', timeSVGWidth ); // window.innerWidth * 0.9 );
	timeSVGHeight = tableHeaderSVGHeight;
	timeSVG.setAttributeNS(null, 'height', timeSVGHeight ); //window.innerHeight/2 );

	// Table scrolling tool
	tableScrollSVG.setAttributeNS(null, 'x', 0 )
	tableScrollSVG.setAttributeNS(null, 'y', tableHeaderSVGHeight + tableContentSVGHeight ); 
	tableScrollSVGWidth = tableHeaderSVGWidth;
	tableScrollSVG.setAttributeNS(null, 'width', tableContentSVGWidth ); // window.innerWidth * 0.1 );
	tableScrollSVGHeight = _settings.scrollThick;
	tableScrollSVG.setAttributeNS(null, 'height', tableContentSVGHeight ); 

	// Gantt horizontal scrolling tool
	ganttHScrollSVG.setAttributeNS(null, 'x', tableContentSVGWidth + verticalSplitterSVGWidth )
	ganttHScrollSVG.setAttributeNS(null, 'y', tableHeaderSVGHeight + tableContentSVGHeight ); 
	ganttHScrollSVGWidth = ganttSVGWidth;
	ganttHScrollSVG.setAttributeNS(null, 'width', ganttHScrollSVGWidth );
	ganttHScrollSVGHeight = _settings.scrollThick;
	ganttHScrollSVG.setAttributeNS(null, 'height', ganttHScrollSVGHeight ); 

	// Vertical scrolling tool
	verticalScrollSVG.setAttributeNS(null, 'x', tableContentSVGWidth + verticalSplitterSVGWidth + ganttSVGWidth )
	verticalScrollSVG.setAttributeNS(null, 'y', tableHeaderSVGHeight ); 
	verticalScrollSVGWidth = _settings.scrollThick;
	verticalScrollSVG.setAttributeNS(null, 'width', verticalScrollSVGWidth );
	verticalScrollSVGHeight = ganttSVGHeight; // _containerDivHeight;
	verticalScrollSVG.setAttributeNS(null, 'height', verticalScrollSVGHeight ); 
}

function displayLayoutHeader() {
	let projectName = document.getElementById('projectName');
	projectName.innerText = _data.proj.Name;

	let timeAndVersion = _data.proj.CurTime + " | " + _terms[_data.lang].version + ": " + _data.proj.ProjVer;
	document.getElementById('projectTimeAndVersion').innerText = timeAndVersion;
	if( _data.userName !== null ) {
		let el = document.getElementById('projectUser');
		el.innerHTML = _data.userName + "<br/><a href='" + _files.logout + "' title='Logout'>[&rarr;]</a>";
	}

	document.getElementById('helpTitle').innerText = _terms[_data.lang].helpTitle; // Initializing help text	
	document.getElementById('helpText').innerHTML = _terms[_data.lang].helpText; // Initializing help text	
	
	//document.getElementById('settingsTableTitle').innerHTML = _terms[_data.lang].tableSettingsTitle; // Initializing settings text	
}


function calcVisibleOperations() {
	let numVisible = 0;
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		if( _data.operations[i].visible ) {
			numVisible += 1;
		}
	}
	return numVisible;
}


function drawGantt( init ) {
	if( !init ) {
		init = false;
	}
	if( init ) {
		while (ganttSVG.hasChildNodes()) {
			ganttSVG.removeChild(ganttSVG.lastChild);
		}		
		ganttSVGBkgr = createRect( 0, 0, ganttSVGWidth, ganttSVGHeight, {fill:'url(#ganttGradient)'} );
		ganttSVG.appendChild(ganttSVGBkgr);		

	} else {
		ganttSVGBkgr.setAttributeNS(null,'width',ganttSVGWidth);		
	}

	let displayLinks = _displayLinksCheckbox.checked; // Display links?

	// Drawing grid...
  	for( let i = 0 ;  ; i++ ) {
		let el = document.getElementById( 'ganttGrid' + i );
		if( !el ) {
			break;
		}
		ganttSVG.removeChild(el);
	}
	let gridLineProperties = { stroke:_settings.gridColor, strokeWidth:_settings.gridStrokeWidth, strokeDasharray:_settings.gridStrokeDashArray }; 
	let gridMaxY = operToScreen(_data.operations.length);
	for( let i = 0 ; i < timeScaleToGrid.length ; i++ ) {
		let x = timeToScreen( timeScaleToGrid[i] );
		gridLineProperties.id = 'ganttGrid' + i;
		let line = createLine( x, 0, x, gridMaxY, gridLineProperties );
		ganttSVG.appendChild(line);
	}		
	let gridXNow = timeToScreen( _data.proj.curTimeInSeconds );
	gridLineProperties.id = 'ganttGrid' + timeScaleToGrid.length;
	gridLineProperties.stroke = _settings.gridCurrentTimeColor;
	gridLineProperties.strokeDasharray = null;
	let gridLine = createLine( gridXNow, 0, gridXNow, gridMaxY, gridLineProperties );
	ganttSVG.appendChild(gridLine);
	// ...the grid is done.

	// Calculating the coordinates...
	let fontSize = (operToScreen(_settings.ganttCompareTopMargin) - operToScreen(0)) * 0.75;	
	let rectBottomMargin = (fontSize > _settings.minVisibleFontSize) ? _settings.ganttRectBottomMargin : _settings.ganttRectBottomMarginTitleFree;
	let rectTopMargin = (fontSize > _settings.minVisibleFontSize) ? _settings.ganttRectTopMargin : _settings.ganttRectTopMarginTitleFree;
	let compareBottomMargin = (fontSize > _settings.minVisibleFontSize) ? _settings.ganttCompareBottomMargin : _settings.ganttCompareBottomMarginTitleFree;
	let compareTopMargin = (fontSize > _settings.minVisibleFontSize) ? _settings.ganttCompareTopMargin : _settings.ganttCompareTopMarginTitleFree;
	let rectCounter = 0;
	_data.operationDims = {}; // To store recalculated values such as : rectangle width and height etc
	_data.operationDims.height = operToScreen(1) - operToScreen(0);
	_data.operationDims.rectHeight = operToScreen(1.0 - rectBottomMargin) - operToScreen(rectTopMargin);
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		if( !_data.operations[i].visible ) {
			continue;
		}
		_data.operations[i].left = timeToScreen( _data.operations[i].displayStartInSeconds );
		_data.operations[i].right = timeToScreen( _data.operations[i].displayFinInSeconds );
		_data.operations[i].width = _data.operations[i].right - _data.operations[i].left;
		_data.operations[i].top = operToScreen(rectCounter);
		_data.operations[i].bottom = operToScreen(rectCounter + 1);
		_data.operations[i].rectTop = operToScreen(rectCounter + rectTopMargin);
		_data.operations[i].rectBottom = operToScreen(rectCounter + 1.0 - rectBottomMargin);
		_data.operations[i].rectVMiddle = _data.operations[i].rectTop + _data.operations[i].rectHeight/2;
		rectCounter++;
	}

	// Drawing gantt links...
	let lineProperties = { stroke:_settings.ganttLinkStrokeColor, strokeWidth:_settings.ganttLinkStrokeWidth, 
		opacity:_settings.ganttLinkOpacity };
	let arrowLineProperties = { stroke:_settings.ganttLinkStrokeColor, 
		strokeWidth:1, opacity:_settings.ganttLinkOpacity, endingArrow:true };
	for( let i = 0 ; i < _data.links.length ; i++ ) {

		let PredCode = _data.links[i].PredCode;
		let SuccCode = _data.links[i].SuccCode;
		let predOp = null;
		let succOp = null;
		for( let op = 0 ; op < _data.operations.length ; op++ ) {
			if( !predOp ) { 
				if( _data.operations[op].Code == PredCode ) { predOp = op; }
			}
			if( !succOp ) {
				if( _data.operations[op].Code == SuccCode ) { succOp = op; }
			}
			if( predOp && succOp ) {
				break;
			}
		}

		if( predOp && succOp ) {
			let line, arrowLine, lineX1, lineY1, lineX2, lineY2, arrowY, lineArrowY;
			if( _data.links[i].TypeSF2 == 'SS' || _data.links[i].TypeSF2 == 'SF' ) {
				lineX1 = _data.operations[predOp].left;
			} else {
				lineX1 = _data.operations[predOp].right;				
			}
			if( _data.operations[predOp].top < _data.operations[succOp].top ) {
				lineY1 = _data.operations[predOp].rectBottom;
				lineY2 = _data.operations[succOp].rectTop - _settings.ganttLinkArrowHeight;
				arrowY = _data.operations[succOp].rectTop;
			} else {
				lineY1 = _data.operations[predOp].rectTop;
				lineY2 = _data.operations[succOp].rectBottom + _settings.ganttLinkArrowHeight;
				arrowY = _data.operations[succOp].rectBottom;
			}
			if( _data.links[i].TypeSF2 == 'SF' || _data.links[i].TypeSF2 == 'FF' ) {
				lineX2 = _data.operations[succOp].left;
			} else {
				lineX2 = _data.operations[succOp].right;				
			}

			if( init ) {
				lineProperties.id = 'ganttLine'+i;
				line = createLine( lineX1, lineY1, lineX2, lineY2, lineProperties );
				arrowLineProperties.id = 'ganttLineArrow'+i;
				arrowLine = createLine( lineX2, lineY2, lineX2, arrowY, arrowLineProperties );
				ganttSVG.appendChild(line);				
				ganttSVG.appendChild(arrowLine);				
			} else {
				line = document.getElementById( 'ganttLine'+i );
				line.setAttributeNS(null,'x1',lineX1);
				line.setAttributeNS(null,'x2',lineX2);
				line.setAttributeNS(null,'y1',lineY1);
				line.setAttributeNS(null,'y2',lineY2);
				arrowLine = document.getElementById( 'ganttLineArrow'+i );
				arrowLine.setAttributeNS(null,'x1',lineX2);
				arrowLine.setAttributeNS(null,'x2',lineX2);
				arrowLine.setAttributeNS(null,'y1',lineY2);
				arrowLine.setAttributeNS(null,'y2',arrowY);
			}
			if( !_data.operations[predOp].visible || !_data.operations[succOp].visible || !displayLinks ) {
				line.setAttributeNS(null,'display','none');
				arrowLine.setAttributeNS(null,'display','none');
			} else {				
				line.setAttributeNS(null,'display','block');				
				arrowLine.setAttributeNS(null,'display','block');				
			}
		}
	}	

	// Drawing main gantt visual elements...
	let op0Properties = { fill:_settings.ganttOperation0Color, stroke:_settings.ganttOperation0StrokeColor, 
		strokeWidth:_settings.ganttOperationStrokeWidth, opacity:_settings.ganttOperation0Opacity };
	let op100Properties = { fill:_settings.ganttOperation100Color, stroke:_settings.ganttOperation100StrokeColor, 
		strokeWidth:_settings.ganttOperationStrokeWidth, opacity:_settings.ganttOperation100Opacity };
	let opCompareProperties = { fill:_settings.ganttCompareColor, stroke:_settings.ganttCompareStrokeColor, 
		strokeWidth:_settings.ganttCompareStrokeWidth, opacity:_settings.ganttCompareOpacity };
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		if( !_data.operations[i].visible ) { // Optimizing.
			document.getElementById('ganttGroup'+i).setAttributeNS(null,'display','none');
			continue;
		}

		let rectStart = _data.operations[i].left;
		let rectEnd = _data.operations[i].right;
		let rectTop = _data.operations[i].rectTop;
		let rectBottom = _data.operations[i].rectBottom;
		let rectWidth = _data.operations[i].width;
		let rectHeight = _data.operationDims.rectHeight;
		let rectVMiddle = _data.operations[i].rectVMiddle;
		let textY;
		let displayCompare, rectCompareStart, rectCompareEnd, rectCompareTop, rectCompareBottom;
		if( _data.operations[i].Start_COMPInSeconds != -1 && _data.operations[i].Fin_COMPInSeconds != -1 ) {
			rectCompareStart = timeToScreen( _data.operations[i].Start_COMPInSeconds );
			rectCompareEnd = timeToScreen( _data.operations[i].Fin_COMPInSeconds );
			rectCompareTop = _data.operations[i].top + _data.operationDims.height * compareTopMargin;
			rectCompareBottom = _data.operations[i].bottom - _data.operationDims.height * compareBottomMargin;
			textY = rectCompareTop - 4;
			displayCompare = true;
		} else {
			displayCompare = false;
			textY = rectTop - 4;
		}

		if( init ) { // Initializing...
			let group = document.createElementNS( NS, 'g' ); // Container
			group.setAttributeNS(null,'id','ganttGroup'+i);
			if( displayCompare ) { // To compare with...
				opCompareProperties.id = 'ganttOpCompare' + i;
				let rectCompare = createRect( rectCompareStart, rectCompareTop, rectCompareEnd - rectCompareStart, 
					rectCompareBottom - rectCompareTop, opCompareProperties ); // Compare rectangle
				group.appendChild(rectCompare);
			}			

			if( _data.operations[i].status == 0 ) {
				let op0;
				op0Properties.id = 'ganttOpNotStarted'+i;
				// op0Properties.fill = (_data.operations[i].f_Critical=="1") ? _settings.ganttCriticalColor : _settings.ganttOperation0Color;
				op0Properties.fill = _data.operations[i].color;
				if( !_data.operations[i].Level ) {
					op0 = createRect( rectStart, rectTop, rectWidth, rectHeight, op0Properties ); // Rectangle
				} else {
					op0 = createPolygon( calcPhaseCoords( rectStart, rectTop, rectWidth, rectHeight), op0Properties );
				}
				group.appendChild(op0);
			} else if( _data.operations[i].status == 100 ) {
				let op100;
				op100Properties.id = 'ganttOpFinished'+i;
				if( !_data.operations[i].Level ) {
					op100 = createRect( rectStart, rectTop, rectWidth, rectHeight, op100Properties ); // Rectangle
				} else {
					op100 = createPolygon( calcPhaseCoords( rectStart, rectTop, rectWidth, rectHeight ), op100Properties );
				}
				group.appendChild(op100);
			} else {
				let xUnfinished = timeToScreen( _data.operations[i].displayUnfinishedInSeconds );
				op100Properties.id = 'ganttOpFinished'+i;
				let op100;
				if( !_data.operations[i].Level ) {
					op100 = createRect( rectStart, rectTop, xUnfinished - rectStart, rectHeight, op100Properties  ); // Rectangle
				} else {
					op100 = createPolygon( calcPhaseCoords(rectStart, rectTop, xUnfinished - rectStart, rectHeight,-1), op100Properties );
				}
				group.appendChild(op100);
				
				op0Properties.id = 'ganttOpNotStarted'+i;
				//op0Properties.fill = (_data.operations[i].f_Critical=="1") ? _settings.ganttCriticalColor : _settings.ganttOperation0Color;
				op0Properties.fill = _data.operations[i].color;
				let op0;
				if( _data.operations[i].Level === null ) {
					op0 = createRect( xUnfinished, rectTop, rectEnd - xUnfinished , rectHeight, op0Properties  ); // Rectangle
				} else {
					op0 = createPolygon( calcPhaseCoords(xUnfinished, rectTop, rectEnd - xUnfinished , rectHeight,1), op0Properties );
				}
				group.appendChild(op0);
			}
			group.style.cursor = 'pointer';

			let title = document.createElementNS( NS,'title' ); // Title
			title.setAttributeNS(null, 'id', 'ganttGroupTitle'+i);
			title.textContent = formatTitleTextContent(i);
			group.appendChild(title);

			group.setAttributeNS( null, 'data-i', i );
			if( 'editables' in _data ) {
	 			group.onmouseup = function(e) { e.stopPropagation(); displayDataInEditBox(this); };
			}

			text = createText( _data.operations[i].Name, rectStart, textY, // - fontSize * 0.25, 
				{ fontSize:fontSize, fill:_settings.ganttFontColor, id:'ganttText'+i, textAnchor:'left', alignmentBaseline:'baseline' } );
			text.style.cursor = 'pointer';
			group.appendChild(text);
			ganttSVG.appendChild(group);			
		} else {
			text = document.getElementById( 'ganttText'+i );
			text.setAttributeNS(null,'x',rectStart);
			text.setAttributeNS(null,'y',textY);
			text.setAttributeNS(null,'font-size',fontSize);
			if( displayCompare ) {
				setRectCoords( document.getElementById('ganttOpCompare' + i), 
					rectCompareStart, rectCompareTop, rectCompareEnd - rectCompareStart, rectCompareBottom - rectCompareTop );
			}
			if( _data.operations[i].status == 0 ) {
				let el = document.getElementById('ganttOpNotStarted'+i);
				if( !_data.operations[i].Level ) {
					setRectCoords( el, rectStart, rectTop, rectWidth, rectHeight );
				} else {
					el.setAttributeNS( null,'points', calcPhaseCoords(rectStart, rectTop, rectWidth, rectHeight) );
				} 
			} else if( _data.operations[i].status == 100 ) {
				let el = document.getElementById('ganttOpFinished'+i);
				if( !_data.operations[i].Level ) {
					setRectCoords( el, rectStart, rectTop, rectWidth, rectHeight );
				} else {
					el.setAttributeNS( null,'points', calcPhaseCoords(rectStart, rectTop, rectWidth, rectHeight) );
				} 
			} else {
				let xUnfinished = timeToScreen( _data.operations[i].displayUnfinishedInSeconds );
				let el100 = document.getElementById('ganttOpFinished'+i);
				let el0 = document.getElementById('ganttOpNotStarted'+i);
				if( !_data.operations[i].Level ) {
					setRectCoords( el100, rectStart, rectTop, xUnfinished - rectStart, rectHeight );
					setRectCoords( el0, xUnfinished, rectTop, rectEnd - xUnfinished, rectHeight );
				} else {
					el100.setAttributeNS( null,'points', calcPhaseCoords(rectStart, rectTop, xUnfinished - rectStart, rectHeight,-1) );
					el0.setAttributeNS( null,'points', calcPhaseCoords(xUnfinished, rectTop, rectEnd - xUnfinished, rectHeight,1) );
				} 
			}
		}

		if( fontSize < _settings.minVisibleFontSize ) { // If font size is too small to make text visible at screen.
			text.setAttributeNS(null,'display','none');
		} else {
			text.setAttributeNS(null,'display','block');				
		}

		let group = document.getElementById('ganttGroup'+i); // Hiding or showing the group.
		if( !_data.operations[i].visible ) {
			group.setAttributeNS(null,'display','none');
		} else {
			_data.operations[i].left = rectStart;
			_data.operations[i].right = rectEnd;
			_data.operations[i].top = rectTop;
			_data.operations[i].bottom = rectBottom;			
			group.setAttributeNS(null,'display','block');
		}
	}
}

function formatTitleTextContent( i, html=false ) {
	let textContent = "";
	let endl = ( !html ) ? "\r\n" : "<br/>";

	let op = _data.operations[i].Name;
	if( html ) {
		op = "<b>" + op + "</b>" + endl;
	} else {
		op = op + endl + "---------------------------------------" + endl;
	}
	textContent = op;

	let statusText;
	if( _data.operations[i].status == 0 ) {
		statusText = _terms[_data.lang].status0;
	} else if( _data.operations[i].status < 100 ) {
		statusText = _data.operations[i].status + "%";
	} else {
		statusText = _terms[_data.lang].status100;				
	}
	textContent += "[ " + statusText + " ]" + endl + endl;

	for( let col=1 ; col < _data.table.length ; col++ ) {
		if( !_data.table[col].visible ) {
			continue;
		}		
		if( _data.table[col].ref == 'Name' ) {
			continue;
		}
		let ref = _data.table[col].ref;

		let content = _data.operations[i][ref];
		if( 'userData' in _data.operations[i] ) {
			if( ref in _data.operations[i].userData ) {
				if( _data.operations[i].userData[ref] != _data.operations[i][ref] ) {
					let newValue = _data.operations[i].userData[ref];
					if( html ) {
						if( content === 'undefined' || content === null ) {
							content = '';
						} else {
							content = "<span style='color:#5f5f5f; text-decoration:line-through;'>" + content + "</span>"
						}
						newValue = "<span style='color:" + _settings.editedColor + "'#af2f2f;'>" + newValue + "</span>";
					} else {
						if( content === 'undefined' || content === null ) {
							content = '';
						}						
					}
					content += " => " + newValue;
				}
			}
		}
		// let name = _terms[_data.lang][ref];
		let name = _data.table[col].name;
		if( html ) {
			name = "<span style='color:#5f5f5f; font-style:italic;'>" + name + "</span>";
		}
		if( content === 'undefined' || content == null ) {
			continue;
		}
		textContent += name + ": " + content + endl;
	}	
	return textContent;
}

function calcPhaseCoords( rectStart, rectTop, rectWidth, rectHeight, brackets=0 ) {
	let phaseBracketHeight = rectHeight * _settings.ganttRectBracketRelHeight;
	let thick = (rectWidth+rectWidth > _settings.ganttRectBracketThick) ? _settings.ganttRectBracketThick : 1;
	let rectEnd = rectStart + rectWidth;
	let rectBottom = rectTop + rectHeight;
	let phaseCoords;
	if( brackets == 0 ) { // Both brackets
		phaseCoords = rectStart+" "+rectTop+" "+rectEnd+" "+rectTop+" "+rectEnd+" "+rectBottom;
		phaseCoords += " "+(rectEnd - thick)+" "+(rectBottom-phaseBracketHeight);
		phaseCoords += " "+(rectStart + thick)+" "+(rectBottom-phaseBracketHeight)+" "+rectStart+" "+rectBottom;		
	} else if( brackets == 1 ) {  // Only right bracket
		phaseCoords = rectStart+" "+rectTop+" "+rectEnd+" "+rectTop+" "+rectEnd+" "+rectBottom;
		phaseCoords += " "+(rectEnd - thick)+" "+(rectBottom-phaseBracketHeight);
		phaseCoords += " "+rectStart+" "+(rectBottom-phaseBracketHeight);				
	} else { // Only left bracket
		phaseCoords = rectStart+" "+rectTop+" "+rectEnd+" "+rectTop+" "+rectEnd+" "+(rectBottom- phaseBracketHeight);
		phaseCoords += " "+(rectStart + thick)+" "+(rectBottom-phaseBracketHeight)+" "+rectStart+" "+rectBottom;		
	}
	return phaseCoords;
}

function setUserData( userData ) { // Sets user data read from a file
	let ok = true;
	try {
		for( let i = 0 ; i < _data.operations.length ; i++ ) { // For all operations...
			for( let iU = 0 ; iU < userData.length ; iU++ ) { // For all userData items...
				if( _data.operations[i].Code == userData[iU].operationCode ) { // If the codes are the same...
					_data.operations[i].userData = {};
					for( let iE=0 ; iE < _data.editables.length ; iE++ ) {
						let ref = _data.editables[iE].ref;
						if( ref in userData[iU].data ) {
							_data.operations[i].userData[ ref ] = userData[iU].data[ ref ];
						} else {
							_data.operations[i].userData[ ref ] = _data.operations[i][ ref ];						
						}
					}
					break;
				}
			}
		}
	} catch(e) {
		ok = false;
	}
	return ok;
}


function createEditBoxInputs() {
	let container = document.getElementById('editBoxInputs');
	if( !container ) {
		return;
	}
	container.style.height = '50vh';
	for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
		let ref = _data.editables[iE].ref;
		let promptDiv = document.createElement('div');
		promptDiv.id = 'editBoxInputPrompt' + ref;
		promptDiv.innerText = _data.editables[iE].name; // _terms[_data.lang][ref];
		promptDiv.className = 'editBoxPrompt';

		let input;
		if( _data.editables[iE].type == 'text' ) {
			input = document.createElement('textarea');
			input.rows = 4;
		} else {
			input = document.createElement('input');			
		}

		input.className = 'editBoxInput';
		input.id = 'editBoxInput' + ref;

		container.appendChild(promptDiv);
		container.appendChild(input);
	}
}


function drawTableHeader( init ) {
	if( !init ) {
		var init = false;
	}
	if( init ) {
		while (tableHeaderSVG.hasChildNodes()) {
			tableHeaderSVG.removeChild(tableHeaderSVG.lastChild);
		}

		//tableHeaderSVGBkgr = createRect( 0, 0, _containerDivWidth, tableHeaderSVGHeight, { fill:'url(#timeScaleGradient)' } ); // backgroud rect
		tableHeaderSVGBkgr = createRect( 0, 0, _containerDivWidth, tableHeaderSVGHeight, { fill:_settings.tableHeaderFillColor } ); // backgroud rect
		tableHeaderSVG.appendChild( tableHeaderSVGBkgr );			

		let left = _data.table[0].width;
		for( let col = 1 ; col < _data.table.length ; col++ ) {
			let svg = createSVG(left+1-tableVisibleLeft, 0, _data.table[col].width-2, tableHeaderSVGHeight, 
				{ id:'tableHeaderColumnNameSVG'+col, 'fill':_settings.tableHeaderFillColor } );
			left += _data.table[col].width;
			let props = { id:'tableHeaderColumnNameBkgr'+col, 'fill':_settings.tableHeaderFillColor, 
				'stroke':_settings.tableHeaderBorderColor, 'strokeWidth':1 };
			let rect = createRect(0, 0, _data.table[col].width-2, tableHeaderSVGHeight, props );
			rect.onmouseover = function(e) { this.setAttributeNS( null, 'stroke', _settings.tableHeaderActiveBorderColor); };
			rect.onmouseout = function(e) { this.setAttributeNS( null, 'stroke', _settings.tableHeaderBorderColor); };
			let text = createText( _data.table[col].name, 2, tableHeaderSVGHeight/2, 
				{ alignmentBaseline:'baseline', textAnchor:'start', fontSize:_settings.tableMaxFontSize, fill:_settings.tableHeaderFontColor } );
			svg.appendChild( rect );
			svg.appendChild( text );
			tableHeaderSVG.appendChild( svg );
			
			svg.onmousedown = onTableHeaderMouseDown;
			svg.style.cursor = 'hand';
			svg.dataset.columnNumber = col;
		}
		tableHeaderOverallWidth = left;
	} else {
		tableHeaderSVGBkgr.setAttributeNS(null,'x',-tableVisibleLeft);
		let left = _data.table[0].width;
		for( let col = 1 ; col < _data.table.length ; col++ ) {
			let svg = document.getElementById('tableHeaderColumnNameSVG'+col);
			svg.setAttributeNS(null,'x',left+1-tableVisibleLeft);
			svg.setAttributeNS(null,'width',_data.table[col].width-2);			
			svg.setAttributeNS(null,'display','block');
			left += _data.table[col].width;
		}
		tableHeaderOverallWidth = left;		
	}
}


function onTableHeaderMouseDown(e) {
	tableHeaderColumnSwapper = this.cloneNode(true);
	tableHeaderSVG.appendChild(tableHeaderColumnSwapper);
	tableHeaderColumnSwapperCapturedAtX = e.x;
	tableHeaderColumnSwapperOriginalX = parseInt( tableHeaderColumnSwapper.getAttributeNS(null,'x') );	
	tableHeaderColumnSwapper.setAttributeNS(null,'opacity',0.5);
	tableHeaderColumnSwapper.style.cursor = 'col-resize';
	tableHeaderSVGBkgr.style.cursor = 'col-resize';
}


function drawTableContent( init ) {
	if( !init ) {
		init = false;
	}
	if( init ) {
		while (tableContentSVG.hasChildNodes()) {
			tableContentSVG.removeChild(tableContentSVG.lastChild);
		}

		let height = operToScreen(_data.operations.length);
		tableContentSVGBkgr = createRect( 0-tableVisibleLeft, 0, _containerDivWidth, height, 
			{ stroke:'none', strokeWidth:1,  fill:_settings.tableContentFillColor } ); 	// backgroud rect
		tableContentSVG.appendChild( tableContentSVGBkgr );		
		
		let left = 0;
		for( let col = 0 ; col < _data.table.length ; col++ ) { // Creating svg-containers for columns
			let rect = createSVG( left+2-tableVisibleLeft, 0, _data.table[col].width-4, height, 
				{ id:('tableColumnSVG'+col), fill:_settings.tableContentStrokeColor } );
			tableContentSVG.appendChild( rect );
			left += _data.table[col].width;
		}

		for( let col = 0, left=0 ; col < _data.table.length ; col++  ) { // Creating splitters
			left += _data.table[col].width;
			let splitter = createRect( left-tableVisibleLeft, 0, 1, operToScreen(_data.operations.length), 
				{id:'tableSplitter'+col, fill:'#dfdfdf'} );
			splitter.dataset.columnNumber = col;
			splitter.setAttributeNS(null,'cursor','col-resize');
			tableContentSVG.appendChild(splitter);
			splitter.onmousedown = function(e) { tableSplitterCaptured=Number(this.dataset.columnNumber); tableSplitterCapturedAtX=e.x; };
		}
	} else {
		tableContentSVGBkgr.setAttributeNS(null,'x',-tableVisibleLeft);
		let left = 0;
		for( let col = 0 ; col < _data.table.length ; col++ ) { // Updating svg-containers for columns as well as splitters 
			let rect = document.getElementById('tableColumnSVG'+col);
			rect.setAttributeNS(null,'x',left+2-tableVisibleLeft);
			rect.setAttributeNS(null,'width',_data.table[col].width-4);
			left += _data.table[col].width;			
			let splitter = document.getElementById('tableSplitter'+col); 
			splitter.setAttributeNS(null,'x',left-tableVisibleLeft);
		}
	}

	// Doing fields inside columns
	let rectCounter = 0;
	let rectHeight = (operToScreen(1) - operToScreen(0));
	let fontSize = (rectHeight < 16) ? rectHeight * 0.75 : _settings.tableMaxFontSize;
	let expandFontSize = fontSize; //(rectHeight < 32) ? rectHeight*1.2 : _settings.expandMaxFontSize;
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		let lineTop = operToScreen(rectCounter);
		let lineBottom = lineTop + rectHeight;
		let lineHeight = lineBottom - lineTop;
		//let fontSize = 11;
		let lineMiddle = lineBottom - lineHeight/3;
		let lineId = 'ganttTableLine' + i;

		// Expand functionality [+] / [-]
		let expand='';
		if( _data.operations[i].expandable ) {
			if( _data.operations[i].expanded ) {
				expand='▼';
			} else {
				expand= '▶';				
			}
		}
		let expandText;
		let expandTextId = 'tableColumn0Row' + i;

		if( init ) {			
			expandText = createText( expand, _data.table[0].width/2.0, lineMiddle, 
				{ id:expandTextId, fontSize:expandFontSize, textAnchor:'middle', alignmentBaseline:'baseline' } );
	 		document.getElementById('tableColumnSVG0').appendChild(expandText);
	 		expandText.dataset.operationNumber=i;
	 		if( _data.operations[i].expandable ) {
	 			expandText.style.cursor = 'pointer';
		 		expandText.onmousedown = function(e) {
		 			let operationNumber = Number(this.dataset.operationNumber); 
		 			if( _data.operations[operationNumber].expanded == true ) {
		 				for( let iO = 0 ; iO < _data.operations.length ; iO++ ) {
		 					for( let iP = 0 ; iP < _data.operations[iO].parents.length ; iP++ ) {
		 	 					if( _data.operations[iO].parents[iP] == operationNumber ) {
			 						_data.operations[iO].visible = false;
			 						break;
			 					}
			 				}
			 			}
		 				_data.operations[operationNumber].expanded = false;
		 			} else {
		 				for( let iO = operationNumber+1 ; iO < _data.operations.length ; iO++ ) {
		 					for( let iP = 0 ; iP < _data.operations[iO].parents.length ; iP++ ) {
		 						let iParent = _data.operations[iO].parents[iP];
		 	 					if( iParent == operationNumber ) {
			 						_data.operations[iO].visible = true;
			 						break;
			 					}
			 					if( _data.operations[iParent].expandable && _data.operations[iParent].expanded == false ) {
			 						break;
			 					}

			 				}
			 			}
		 				_data.operations[operationNumber].expanded = true;
		 			}
		 			drawTableContent();
		 			drawTimeScale();
		 			drawGantt();
		 		};
		 	}

		 	// Fields inside columns
			let left = _data.table[0].width;
			for( let col = 1 ; col < _data.table.length ; col++ ) {
				let ref = _data.table[col].ref;
				let content = _data.operations[i][ref];
				let color = _settings.tableContentStrokeColor;
				if( 'userData' in _data.operations[i] ) { // If the value has been changed by user and not saved
					if( ref in _data.operations[i].userData ) {
						if( _data.operations[i].userData[ref] != content ) {
							content = _data.operations[i].userData[ref];
							color = _settings.editedColor;
						}
					}
				}
				if( content === 'undefined' || content == null ) {
					content = '-';
				}
				let text = createText(content, 2, lineMiddle, 
					{ id:('tableColumn'+col+'Row'+i), fill:color, textAnchor:'start', fontSize:fontSize } );
				document.getElementById('tableColumnSVG'+col).appendChild( text );
			}

		} else {
			expandText = document.getElementById(expandTextId);
			expandText.setAttributeNS(null,'x',_data.table[0].width/2.0);
			expandText.setAttributeNS(null,'y',lineMiddle);
			expandText.firstChild.nodeValue = expand;
			expandText.setAttributeNS(null,'font-size',expandFontSize);

			let left = _data.table[0].width;
			for( let col = 1 ; col < _data.table.length ; col++ ) {
				let id = 'tableColumn'+col+'Row'+i;
				let el = document.getElementById(id);
				el.setAttributeNS(null,'x',2);
				el.setAttributeNS(null,'y',lineMiddle);
				el.setAttributeNS(null,'font-size',fontSize);
			}
		}

		if( _data.operations[i].visible /*&& document.getElementById(expandTextId).style.visibility == 'hidden'*/ ) {
			for( let col = 0 ; col < _data.table.length ; col++ ) {
				let id = 'tableColumn'+col+'Row'+i;
				let el = document.getElementById(id);
				el.setAttributeNS(null,'display','block');
			}
		} else if( !_data.operations[i].visible /*&& document.getElementById(expandTextId).style.visibility != 'hidden'*/ ) {
			for( let col = 0 ; col < _data.table.length ; col++ ) {
				let id = 'tableColumn'+col+'Row'+i;
				let el = document.getElementById(id);
				el.setAttributeNS(null,'display','none');
			}
		}		
		if( _data.operations[i].visible ) {
			rectCounter += 1;
		}				
	}
}


function drawTimeScale() {
	while (timeSVG.hasChildNodes()) {
		timeSVG.removeChild(timeSVG.lastChild);
	}
	timeSVGBkgr = createRect( 0, 0, timeSVGWidth, timeSVGHeight, { fill:'url(#timeScaleGradient)' } ); 	// backgroud rect
	timeSVG.appendChild( timeSVGBkgr );			

	let daysInScreen = (ganttVisibleWidth)/ (60*60*24);
	let dayRectWidth = timeSVGWidth / daysInScreen;
	let displayDays = ( dayRectWidth > _settings.minDayWidthOnTimeScale ) ? true : false;
	let displayWeeks = ( !displayDays && dayRectWidth*7 > _settings.minDayWidthOnTimeScale ) ? true : false;

	let minTime = _data.visibleMin * 1000; // screenToTime(0) * 1000;
	let maxTime = _data.visibleMax * 1000; // screenToTime( timeSVGWidth ) * 1000;
	let minDT = new Date(minTime);
	let maxDT = new Date(maxTime);
	let deltaY = maxDT.getFullYear() - minDT.getFullYear();
	let deltaM = maxDT.getMonth() - minDT.getMonth();
	let deltaD = maxDT.getDate() - minDT.getDate();
	let minY = minDT.getFullYear();
	let maxY = maxDT.getFullYear();
	let textRectProperties = { fill:'none', stroke:_settings.timeScaleStrokeColor, strokeWidth:0.25 };
	let monthFontSize;
	let monthWithYear=false;
	if( dayRectWidth*30 > timeSVGHeight*0.3*8 ) {
		monthFontSize = timeSVGHeight*0.25;
		monthWithYear = true; 
	} else if( dayRectWidth*30 > timeSVGHeight*0.3*3 ) {
		monthFontSize = timeSVGHeight*0.25;
	} else {
		monthFontSize = dayRectWidth * 30 * 0.25;
	}
	let monthProperties = { fontSize:monthFontSize, fill:_settings.timeScaleFontColor, textAnchor:'middle', alignmentBaseline:'baseline' };
	let dayFontSize=0;
	if( displayDays ) {
		dayFontSize = (dayRectWidth > timeSVGHeight*0.25) ? timeSVGHeight*0.22 : dayRectWidth * 0.8;
	} else if( !displayDays && displayWeeks ) {
		dayFontSize = (dayRectWidth*7 > timeSVGHeight*0.25) ? timeSVGHeight*0.22 : (dayRectWidth*7) * 0.8;
	}
	let dayProperties = { fontSize:dayFontSize, fill:_settings.timeScaleFontColor, textAnchor:'middle', alignmentBaseline:'baseline' };
	let textRectHeight = timeSVGHeight/3;
	let monthY = textRectHeight;
	let dayY = 2*textRectHeight;
	let dayTextY = dayY+textRectHeight-3;
	let numSecondsInDay = 24*60*60;

	timeScaleToGrid = []; // To draw a grid later on the Gantt chart...

	for( let y = minY ; y <= maxY ; y++ ) {
		if( minY != maxY ) {
			let yearText = createText( minY, timeSVGWidth/2, textRectHeight-3, monthProperties );
			timeSVG.appendChild(yearText);
		} else {
			let startOfYear = new Date(y,0,1,0,0,0,0);
			let startOfYearInSeconds = startOfYear.getTime() / 1000;
			let endOfYear = new Date(y,11,31,23,59,59,999);
			let endOfYearInSeconds = endOfYear.getTime() / 1000;
			let yearStartX = timeToScreen(startOfYearInSeconds);
			let yearEndX = timeToScreen(endOfYearInSeconds);
			let yearRect = createRect( yearStartX, 0, yearEndX - yearStartX, textRectHeight, textRectProperties );		
			timeSVG.appendChild(yearRect);
			let yearText = createText( y, yearStartX + (yearEndX - yearStartX)/2, textRectHeight-3, monthProperties );
			timeSVG.appendChild(yearText);
		}

		let minM = ( y == minY ) ? minDT.getMonth() : 0;
		let maxM = ( y == maxY ) ? maxDT.getMonth() : 11;
		let mNames = _terms[_data.lang]['monthNames']
		for( let m = minM ; m <= maxM ; m++ ) {
			let startOfMonth = new Date(y,m,1,0,0,0,0);
			let startOfMonthInSeconds = startOfMonth.getTime() / 1000;
			let endOfMonth = new Date(y,m+1,0,23,59,59,999);
			let endOfMonthInSeconds = endOfMonth.getTime() / 1000;
			let monthStartX = timeToScreen(startOfMonthInSeconds);
			let monthEndX = timeToScreen(endOfMonthInSeconds);
			let monthRect = createRect( monthStartX, monthY, monthEndX - monthStartX, textRectHeight, textRectProperties );		
			timeSVG.appendChild(monthRect);
			let monthString = mNames[m];
			if( monthWithYear ) { 
				monthString += ", " + y;
			}
			let monthText = createText( monthString, monthStartX + (monthEndX - monthStartX)/2, monthY+textRectHeight-3, monthProperties );
			timeSVG.appendChild(monthText);

			if( displayDays ) {
				let minD = 1;
				let maxD = endOfMonth.getDate();
				for( let d = minD ; d <= maxD ; d++ ) {
					let currentDay = new Date(y,m,d,0,0,0,0);
					let currentTimeInSeconds = currentDay.getTime()/1000;
					let dayStartX = timeToScreen(currentTimeInSeconds);
					let dayEndX = timeToScreen(currentTimeInSeconds + numSecondsInDay);
					let dayRect = createRect( dayStartX, dayY, dayEndX - dayStartX, textRectHeight, textRectProperties );
					timeSVG.appendChild(dayRect);
					let dayText = createText( d.toString(), dayStartX + (dayEndX - dayStartX)/2, dayTextY, dayProperties );
					timeSVG.appendChild(dayText);
					timeScaleToGrid.push(currentTimeInSeconds); // To a draw grid later on the Gantt chart...
				}				
			} 
		}
		
		if( !displayDays && displayWeeks ) {
			let minW = (y == minY) ? getWeekNumber(minDT) : 1;
			let maxW = (y == maxY) ? getWeekNumber(maxDT) : 53;
			let numSecondsInWeek = 7*numSecondsInDay;
			let startOfWeekInSeconds = minDT.getTime()/1000;
			let endOfWeekInSeconds = startOfWeekInSeconds + (8-minDT.getDay())*numSecondsInDay;
			for( let w = minW ; w <= maxW ; w++ ) {
				let weekStartX = timeToScreen(startOfWeekInSeconds);
				let weekEndX = timeToScreen(endOfWeekInSeconds);
				let weekRect = createRect( weekStartX, dayY, weekEndX - weekStartX, textRectHeight, textRectProperties );		
				timeSVG.appendChild(weekRect);
				let weekText = createText( w.toString(), weekStartX + (weekEndX - weekStartX)/2, dayTextY, dayProperties );
				timeSVG.appendChild(weekText);
				timeScaleToGrid.push(startOfWeekInSeconds); // To draw a grid later on the Gantt chart...
				startOfWeekInSeconds = endOfWeekInSeconds;
				if( w < maxW ) {
					endOfWeekInSeconds += numSecondsInWeek;
				} else {
					endOfWeekInSeconds = maxDT.getTime()/1000;
				}
			}								
		}	
	}
}

function drawTableScroll( init ) {
	if( !init ) {
		init = false;
	}
	let visibleMaxStart = (tableHeaderOverallWidth > tableScrollSVGWidth) ? (tableHeaderOverallWidth - tableScrollSVGWidth) : 0;
	let sliderSize = (visibleMaxStart > 0) ? (tableScrollSVGWidth*tableScrollSVGWidth/tableHeaderOverallWidth) : tableScrollSVGWidth;
	if( sliderSize < _settings.scrollSliderSize ) {
		sliderSize = _settings.scrollSliderSize;
	}

	if( init ) {
		let bbox = tableScrollSVG.getBBox();
		tableScrollSVGBkgr = createRect( 0, 0, tableScrollSVGWidth, tableScrollSVGHeight, 
			{ id:('tableScrollSVGBkgr'), fill:_settings.scrollBkgrColor, stroke:_settings.scrollRectColor, strokeWidth:1 } );
		tableScrollSVGBkgr.setAttributeNS(null,'cursor','pointer');
		tableScrollSVGBkgr.onmousedown = onTableScrollSVGBkgr;
		tableScrollSVGSlider = createRect( 0, 0, sliderSize, tableScrollSVGHeight, 
			{ id:('tableScrollSVGSlider'), fill:_settings.scrollSliderColor } );
		tableScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		tableScrollSVG.appendChild( tableScrollSVGBkgr );
		tableScrollSVG.appendChild( tableScrollSVGSlider );
		tableScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderActiveColor) };
		tableScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderColor) };
		tableScrollSVGSlider.onmousedown = function(e) {
			e.stopPropagation();
			tableScrollCaptured = true;
			tableScrollCapturedAtX = e.x;
			tableScrollXAtCapture = this.getBBox().x;
		}
	} else {
		tableScrollSVGBkgr.setAttributeNS(null,'width',tableScrollSVGWidth);
		tableScrollSVGSlider.setAttributeNS(null,'width',sliderSize);
	}
}

function drawGanttHScroll( init ) {
	if( !init ) {
		init = false;
	}
	let overallWidth = _data.visibleMaxWidth;
	let visibleMaxLeft = (overallWidth > ganttVisibleWidth) ? (_data.visibleMin + overallWidth - ganttVisibleWidth) : _data.visibleMin;
	let sliderSize = (visibleMaxLeft > _data.visibleMin) ? (ganttHScrollSVGWidth*ganttVisibleWidth/overallWidth) : ganttHScrollSVGWidth;
	if( sliderSize < _settings.scrollSliderSize ) {
		sliderSize = _settings.scrollSliderSize;
	}
	if( init ) {
		let bbox = ganttHScrollSVG.getBBox();
		ganttHScrollSVGBkgr = createRect( 0, 0, ganttHScrollSVGWidth, ganttHScrollSVGHeight, 
			{ id:('ganttHScrollSVGBkgr'), fill:_settings.scrollBkgrColor, stroke:_settings.scrollRectColor, strokeWidth:1 } );
		ganttHScrollSVGBkgr.setAttributeNS(null,'cursor','pointer');
		ganttHScrollSVGBkgr.onmousedown = onGanttHScrollSVGBkgr;
		ganttHScrollSVGSlider = createRect( 0, 0, sliderSize, ganttHScrollSVGHeight, 
			{ id:('ganttHScrollSVGSlider'), fill:_settings.scrollSliderColor } );
		ganttHScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		ganttHScrollSVG.appendChild( ganttHScrollSVGBkgr );
		ganttHScrollSVG.appendChild( ganttHScrollSVGSlider );
		ganttHScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderActiveColor); };
		ganttHScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderColor) };
		ganttHScrollSVGSlider.onmousedown = function(e) {
			ganttHScrollCaptured = true;
			ganttHScrollCapturedAtX = e.x;
			ganttHScrollXAtCapture = this.getBBox().x;
		}
	} else {
		ganttHScrollSVGBkgr.setAttributeNS(null,'width',ganttHScrollSVGWidth);
		ganttHScrollSVGSlider.setAttributeNS(null,'width',sliderSize);
		let sliderPosition=0;
		if( visibleMaxLeft > _data.visibleMin ) {
			sliderPosition = (ganttVisibleLeft-_data.visibleMin) * (ganttHScrollSVGWidth-sliderSize) / (visibleMaxLeft-_data.visibleMin);
		}
		ganttHScrollSVGSlider.setAttributeNS(null,'x',sliderPosition);
	}
}


function drawVerticalScroll( init ) {
	if( !init ) {
		init = false;
	}
	let overallHeight = _data.operations.length;
	let visibleMaxTop = (overallHeight > ganttVisibleHeight) ? (overallHeight - ganttVisibleHeight) : 0;
	let sliderSize = (visibleMaxTop > 0) ? (verticalScrollSVGHeight*ganttVisibleHeight/overallHeight) : verticalScrollSVGHeight;
	if( sliderSize < _settings.scrollSliderSize ) {
		sliderSize = _settings.scrollSliderSize;
	}
	if( init ) {
		let bbox = verticalScrollSVG.getBBox();
		verticalScrollSVGBkgr = createRect( 0, 0, verticalScrollSVGWidth, verticalScrollSVGHeight, 
			{ id:('verticalScrollSVGBkgr'), fill:_settings.scrollBkgrColor, stroke:_settings.scrollRectColor, strokeWidth:1 } );
		verticalScrollSVGBkgr.setAttributeNS(null,'cursor','pointer');
		verticalScrollSVGBkgr.onmousedown = onVerticalScrollSVGBkgr;
		verticalScrollSVGSlider = createRect( 0, 0, verticalScrollSVGWidth, sliderSize, 
			{ id:('verticalScrollSVGSlider'), fill:_settings.scrollSliderColor } );
		verticalScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		verticalScrollSVG.appendChild( verticalScrollSVGBkgr );
		verticalScrollSVG.appendChild( verticalScrollSVGSlider );
		verticalScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderActiveColor) };
		verticalScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderColor) };
		verticalScrollSVGSlider.onmousedown = function(e) {
			verticalScrollCaptured = true;
			verticalScrollCapturedAtY = e.y;
			verticalScrollYAtCapture = this.getBBox().y;
		}
	} else {
		verticalScrollSVGSlider.setAttributeNS(null,'height',sliderSize);
		let sliderPosition = 0;
		if( visibleMaxTop > 0 ) {
			sliderPosition = ganttVisibleTop * (verticalScrollSVGHeight-sliderSize) / visibleMaxTop;
		}
		verticalScrollSVGSlider.setAttributeNS(null,'y',sliderPosition);
	}
}


function zoomX( zoomFactorChange, zoomPositionChange, centerOfZoom=0.5 ) {
	if( (zoomFactorChange == null || zoomFactorChange == '100%') && zoomPositionChange == null ) {
		ganttVisibleLeft = _data.visibleMin;
		ganttVisibleWidth = _data.visibleMaxWidth;
		_zoomGanttHorizontalInput.value = 100;
		return;
	} 
	if( zoomFactorChange != null && zoomPositionChange == null ) {
		if( ganttVisibleWidth >= _data.visibleMaxWidth && zoomFactorChange > 1.0 ) {
			return;
		}
		let currentZoomFactor = _data.visibleMaxWidth / ganttVisibleWidth;
		let newZoomFactor = currentZoomFactor + zoomFactorChange; 
		if( !(newZoomFactor > 0) ) {
			return;
		}
		if( centerOfZoom < 0.1 ) {
			centerOfZoom = 0.0;
		} else if( centerOfZoom > 0.9 ) {
			centerOfZoom = 1.0;
		}
		let newWidth = _data.visibleMaxWidth / newZoomFactor;
		let newLeft = ganttVisibleLeft - (newWidth - ganttVisibleWidth) * centerOfZoom;				
		if( newLeft < _data.visibleMin ) {
			newLeft = _data.visibleMin;
		} else if( newLeft + newWidth > _data.visibleMax ) {
			newLeft = _data.visibleMin;
		}
		ganttVisibleLeft = newLeft;
		ganttVisibleWidth = newWidth;
		_zoomGanttHorizontalInput.value = parseInt(newZoomFactor*100.0 + 0.5);
		return;
	}
	if( zoomFactorChange == null && zoomPositionChange != null ) {
		ganttVisibleLeft = validateGanttLeft(ganttVisibleLeft + zoomPositionChange);
		return;
	}
}

function validateGanttLeft( left ) {
	if( left < _data.visibleMin ) {
		left = _data.visibleMin;
	} else if( left + ganttVisibleWidth > _data.visibleMax ) {
		left = _data.visibleMax - ganttVisibleWidth;
	}
	return left;
}

function zoomXR( factorChange, positionChange, centerOfZoom=0.5 ) { // Zoom and redraw
	zoomX( factorChange, positionChange, centerOfZoom );		
	drawTimeScale();
	drawGantt();
	drawGanttHScroll();	
}

function zoomY( zoomFactorChange, zoomPositionChange, centerOfZoom=0.5 ) {
	if( (zoomFactorChange === null || zoomFactorChange == '100%') && zoomPositionChange === null ) {
		ganttVisibleTop = 0;
		ganttVisibleHeight = _data.operations.length;
		_zoomGanttVerticalInput.value = 100;
		return;
	} 
	if( zoomFactorChange !== null && zoomPositionChange === null ) {
		if( ganttVisibleHeight >= _data.operations.length && zoomFactorChange > 1.0 ) {
			return;
		}
		let currentZoomFactor = _data.operations.length / ganttVisibleHeight;
		let newZoomFactor = currentZoomFactor + zoomFactorChange;
		if( !(newZoomFactor > 0) ) {
			return;
		}
		let newHeight = _data.operations.length / newZoomFactor;
		if( newHeight < 1 && zoomFactorChange < 1.0 ) {
			return;
		}
		if( centerOfZoom < 0.1 ) {
			centerOfZoom = 0.0;
		} else if ( centerOfZoom > 0.9 ) {
			centerOfZoom = 1.0;
		} 
		let newY = ganttVisibleTop - (newHeight - ganttVisibleHeight) * centerOfZoom;	
		if( newY < 0 ) {
			newY = 0;
		} else if( newY + newHeight > _data.operations.length ) {
			newY = 0;
		}
		ganttVisibleTop = newY;
		ganttVisibleHeight = newHeight;
		_zoomGanttVerticalInput.value = parseInt(newZoomFactor*100.0 + 0.5);
		return;
	} 
	if( zoomFactorChange === null && zoomPositionChange !== null ) {
		let newY = ganttVisibleTop + zoomPositionChange;
		if( newY < 0 ) {
			newY = 0;
		} else if( newY + ganttVisibleHeight > _data.operations.length ) {
			newY = _data.operations.length - ganttVisibleHeight;
		}
		ganttVisibleTop = newY;
		return;
	}
}

function zoomYR( factorChange, positionChange ) {
	zoomY( factorChange, positionChange );		
	drawTableContent();
	drawGantt();
	drawVerticalScroll();
}



function reassignBoundaryValue( knownBoundary, newBoundary, upperBoundary ) {
	if( knownBoundary == -1 ) {
		return newBoundary;
	} 
	if( newBoundary == -1 ) {
		return knownBoundary;
	}
	if( !upperBoundary ) { // Min.
		if( newBoundary < knownBoundary ) {
			return newBoundary;			
		} 
	} else { // Max.
		if( newBoundary > knownBoundary ) {
			return newBoundary;			
		} 		
	}
	return knownBoundary;
}

function getElementPosition(el) {
	let lx=0, ly=0
    for( ; el != null ; ) {
		lx += el.offsetLeft;
		ly += el.offsetTop;
		el = el.offsetParent;    	
    }
    return {x:lx, y:ly};
}

function addOnMouseWheel(elem, handler) {
	if (elem.addEventListener) {
		if ('onwheel' in document) {           // IE9+, FF17+
			elem.addEventListener("wheel", handler);
		} else if ('onmousewheel' in document) {           //
			elem.addEventListener("mousewheel", handler);
		} else {          // 3.5 <= Firefox < 17
			elem.addEventListener("MozMousePixelScroll", handler);
		}
	} else { // IE8-
		elem.attachEvent("onmousewheel", handler);
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
		zoomXR( zoomFactorChange, null, (e.clientX - ganttSVG.getAttributeNS(null,'x')) / ganttSVGWidth );
	} else {
		let change = ganttVisibleWidth * _settings.timeScaleScrollStep;
		if( delta < 0 ) {
			change = -change;
		}
		zoomXR( null, change );		
	}
}

function onGanttHScrollSVGBkgr(e) {
	let x = parseInt( ganttHScrollSVGSlider.getAttributeNS(null,'x') ) + parseInt( ganttHScrollSVG.getAttributeNS(null,'x') ) + _containerDivX;
	let step = ganttVisibleWidth * _settings.timeScaleScrollStep;
	if( e.x < x ) {
		zoomXR( null, -step );		
	} else if( e.x > x + parseInt( ganttHScrollSVGSlider.getAttributeNS(null,'width') ) ) {
		zoomXR( null, step );		
	}
}

function onTableScrollSVGBkgr(e) {
	let bbox = tableScrollSVGSlider.getBBox();
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
	let step = tableContentSVGWidth * _settings.tableScrollStep;
	let maxVisibleLeft = (tableHeaderOverallWidth > tableHeaderSVGWidth) ? (tableHeaderOverallWidth - tableHeaderSVGWidth) : 0;
	if( !(maxVisibleLeft > 0.0) ) {
		return;
	}
	tableVisibleLeft = parseInt(tableVisibleLeft + step * moveTo);
	if( tableVisibleLeft > maxVisibleLeft ) {
		tableVisibleLeft = maxVisibleLeft;
	} else if( tableVisibleLeft < 0 ) {
		tableVisibleLeft = 0;
	}
	newSliderX = tableVisibleLeft * (tableScrollSVGWidth - tableScrollSVGSlider.getBBox().width) / maxVisibleLeft;
	tableScrollSVGSlider.setAttributeNS( null,'x', newSliderX );
	drawTableHeader();
	drawTableContent();
}


function onTimeCapturedMouseMove(e) {
	if( !timeCaptured ) {
		return;
	}
	let deltaX = ganttVisibleWidth * (e.clientX - timeCapturedAtX) / ganttSVGWidth;
	zoomX( null, -deltaX );
	drawTimeScale();
	drawGantt();
	drawGanttHScroll();
}


function onGanttWheel(e) {
	let delta = e.deltaY || e.detail || e.wheelDelta;
	if( e.shiftKey ) {
		let zoomFactorChange;
		if( delta > 0 ) {
			zoomFactorChange = _settings.zoomFactor;
		} else {
			zoomFactorChange = -_settings.zoomFactor;
		}		
		let y = e.clientY - getElementPosition(_containerDiv).y - ganttSVG.getAttributeNS(null,'y');
		zoomYR( zoomFactorChange, null, y / ganttSVGHeight );
	} else {
		let positionChange;
		if( delta > 0 ) {
			positionChange = 1;
		} else {
			positionChange = -1;
		}		
		zoomYR( null, positionChange );		
	}
}

function onVerticalScrollSVGBkgr(e) {
	let bbox = verticalScrollSVGSlider.getBBox();
	let mouseYRelative = e.y - _containerDivY - tableHeaderSVGHeight;
	if( mouseYRelative < bbox.y ) {
		zoomYR( null, -1 );				
	} else if( mouseYRelative > bbox.y + bbox.height ) {
		zoomYR( null, 1 );				
	}
}

function zoomYR( factorChange, positionChange, centerOfZoom=0.5 ) {
	zoomY( factorChange, positionChange, centerOfZoom );		
	drawTableContent();
	drawGantt();
	drawVerticalScroll();
}

function onGanttCapturedMouseMove(e) {
	if( !ganttCaptured ) {
		return;
	}
	let deltaX = ganttVisibleWidth * (e.clientX - ganttCapturedAtX) / ganttSVGWidth;
	ganttVisibleLeft = validateGanttLeft( ganttCapturedLeft - deltaX );
	ganttCapturedLeft = ganttVisibleLeft;
	ganttCapturedAtX = e.clientX;
	drawGantt();
	drawTimeScale();
	drawGanttHScroll();
}

function onGanttDblClick(e) {
	zoomX( null, null );
	zoomY( null, null );
	drawGantt();
	drawTimeScale();
	drawGanttHScroll();
	drawTableContent();
	drawVerticalScroll();
}


function timeToScreen( timeInSeconds ) {
	let availableSVGWidth = ganttSVGWidth - _settings.ganttChartLeftMargin - _settings.ganttChartRightMargin;
	return _settings.ganttChartLeftMargin + (timeInSeconds - ganttVisibleLeft) * availableSVGWidth / ganttVisibleWidth; 
}

function timeToScreenInt( timeInSeconds ) {
	let x = timeToScreen(timeInSeconds);
	return parseInt(x+0.5); 
}

function screenToTime( screenX ) {
	let xNotScaled = ganttVisibleLeft + screenX * (ganttVisibleWidth - 1) / (ganttSVGWidth-1);
}


function operToScreen( n ) {
	//return ( ( n ) * ganttSVGHeight )/ _data.operations.length; 
	return ( n - ganttVisibleTop) * ganttSVGHeight / (ganttVisibleHeight+0.5); 
} 


function displayMessageBox( message ) {
	_blackOutBoxDiv.style.display='block';	
	_messageBoxDiv.style.display = 'table';
	_messageBoxTextDiv.innerText = message;
}

function hideMessageBox() {
	_blackOutBoxDiv.style.display='none';	
	_messageBoxDiv.style.display = 'none';
}

function displayEditBox() {
	_blackOutBoxDiv.style.display='block';	
	_editBoxDiv.style.display = 'table';
}
function hideEditBox() {
	_blackOutBoxDiv.style.display='none';	
	_editBoxDiv.style.display = 'none';
}

function displayDataInEditBox( id ) {
	let i = id.getAttributeNS(null, 'data-i');
	_editBoxDetailsElem.innerHTML = formatTitleTextContent(i,true);
	_editBoxOperationIndexElem.value = i;
	_editBoxOperationCodeElem.value = _data.operations[i].Code;
	for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
		let ref = _data.editables[iE].ref;
		let elem = document.getElementById( "editBoxInput" + ref );
		if( elem ) {
			let valueSet = false;
			if( 'userData' in _data.operations[i] ) {
				if( ref in _data.operations[i].userData ) {
					elem.value = _data.operations[i].userData[ ref ];
					valueSet = true;
				}
			}
			if( !valueSet ) {
				elem.value = _data.operations[i][ ref ];
			}
		}
	}
	displayEditBox();
}

function saveUserDataFromEditBox() {

	if( document.location.host ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 ) {
		    	if( this.status == 200 ) {
			        if( this.responseText == "ok" ) {
			        	let i = _editBoxOperationIndexElem.value;
			    		if( !('userData' in _data.operations[i]) ) {
							_data.operations[i].userData = {};
						}
						for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
							let ref = _data.editables[iE].ref;
							let elem = document.getElementById( 'editBoxInput' + ref );
							_data.operations[i].userData[ ref ] = elem.value;
							for( let col = 0 ; col < _data.table.length ; col++ ) { // Changing the value in the table...
								if( _data.table[col].ref == ref ) {
									let el = document.getElementById( 'tableColumn'+col+'Row'+i );
									el.childNodes[0].nodeValue = elem.value;
									if( _data.operations[i][ref] != elem.value ) {
										el.setAttributeNS( null, 'fill', _settings.editedColor );
									} else { // If user re-entered the old value
										el.setAttributeNS( null, 'fill', _settings.tableContentStrokeColor );										
									}
									break;
								}
							}
						}
			        	document.getElementById( 'ganttGroupTitle'+i). textContent = formatTitleTextContent(i); 
			        	document.getElementById('editBoxMessage').innerText = '';
				        hideEditBox();
			        } else {
			        	alert("Error: " + this.responseText); // this.responseText contains the error message. 
			        	document.getElementById('editBoxMessage').innerText = _terms[_data.lang].errorLoadingData + ": " + this.responseText;
			        }
			    }
		    }
		};

		let operationIndexValue = _editBoxOperationIndexElem.value;

		let bEdited = false; // The following is to confirm something has been edited...
		for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
			let ref = _data.editables[iE].ref;
			let elem = document.getElementById( 'editBoxInput' + ref );
			if( elem ) {
				if( !('userData' in _data.operations[operationIndexValue]) )	{
					if( elem.value != _data.operations[operationIndexValue][ref] ) {
						bEdited = true;
						break;
					}
				} else {
					if( elem.value != _data.operations[operationIndexValue].userData[ref] ) {
						bEdited = true;
						break;
					}
				}
			}
		}		
		if( !bEdited ) {
			hideEditBox();
			return;
		} 

		let userData = []; // Creating userData object with all the data entered but not synchronized
		for( let i = 0 ; i < _data.operations.length ; i++ ) {
			if( 'userData' in _data.operations[i] || i == operationIndexValue ) {
				let userDataOfOperation = {};
				for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
					let ref = _data.editables[iE].ref;
					let value;
					if( i == _editBoxOperationIndexElem.value ) {
						let elem = document.getElementById( 'editBoxInput' + ref );
						value = elem.value;
					} else {
						value = _data.operations[i].userData[ ref ];
					}
					userDataOfOperation[ ref ] = value;
				}
				userData.push( { "operationCode":_data.operations[i].Code, "data":userDataOfOperation } );				
			}
		}
		if( userData.length > 0 ) {
			xmlhttp.open("POST", _files.userDataSave, true);
			xmlhttp.setRequestHeader("Cache-Control", "no-cache");
			xmlhttp.setRequestHeader("Content-type", "plain/text" ); //"application/x-www-form-urlencoded");
			xmlhttp.send( JSON.stringify(userData) );		
			document.getElementById('editBoxMessage').innerText = _terms[_data.lang].waitSaveUserDataText;			
		}
	} else {
    	let i = _editBoxOperationIndexElem.value;
		if( !('userData' in _data.operations[i]) ) {
			_data.operations[i].userData = {};
		}
		for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
			let ref = _data.editables[iE].ref;
			let elem = document.getElementById( 'editBoxInput' + ref );
			_data.operations[i].userData[ ref ] = elem.value;
		}
    	document.getElementById( 'ganttGroupTitle'+i).textContent = formatTitleTextContent(i); 
		hideEditBox();
	}
}
