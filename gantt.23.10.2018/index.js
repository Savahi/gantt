
var NS = "http://www.w3.org/2000/svg";

var _data;

var _settings = {
	ganttOperation0Color:'#2f8f2f', ganttOperation0Opacity:1.0, ganttOperation100Color:'#7f7f7f', ganttOperation100Opacity:1.0,
	ganttPhaseColor:'#0f7f07f', ganttPhaseOpacity:1.0, ganttCriticalColor:'#bf2f2f', ganttOperationStrokeWidth:0, 
	ganttCompareColor:'#cfcfdf', ganttCompareOpacity:0.75,
	ganttFontColor:'#4f4f4f', timeScaleFontColor:'#4f4f4f', timeScaleFillColor:'#cfcfdf', timeScaleStrokeColor:'#afafaf',
	ganttLinkStrokeColor:'#000000',	ganttLinkStrokeWidth:0.5, ganttLinkStrokeDashArray:null, 
	ganttLinkOpacity:1.0, ganttLinkArrowWidth:8, ganttLinkArrowHeight:8,
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
	minDayWidthOnTimeScale:12, minVisibleFontSize:6, minTableColumnWidth:4, hierarchyIndent:4
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
		settingsTitle:'Settings',
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
var _containerSVG = null;
var _timeSVG = null;
var _ganttSVG = null;
var _tableContentSVG = null;
var _tableContentSVGContainer = null;
var _tableHeaderSVG = null;
var _verticalSplitterSVG = null;
var _tableScrollSVG = null;
var _ganttHScrollSVG = null;
var _verticalScrollSVG = null;

var _containerDivX, _containerDivY, _containerDivHeight, _containerDivWidth;

var _ganttSVGWidth;
var _ganttSVGHeight;
var _ganttVisibleLeft;
var _ganttVisibleWidth;
var _ganttVisibleTop;
var _ganttVisibleHeight;
var _ganttSVGBkgr = null;

var _timeSVGWidth;
var _timeSVGHeight;
var _timeSVGBkgr=null;

var _tableContentSVGWidth;
var _tableContentSVGHeight;
var _tableContentSVGBkgr=null;

var _tableHeaderSVGWidth;
var _tableHeaderSVGHeight;
var _tableHeaderSVGBkgr=null;
var _tableHeaderOverallWidth=0;

var _tableVisibleLeft=0;

var _ganttCaptured=false;
var _ganttCapturedAtX;
var _ganttCapturedLeft;

var _verticalSplitterSVGWidth;
var _verticalSplitterSVGHeight;
var _verticalSplitterSVGBkgr=null;
var _verticalSplitterCaptured=false;
var _verticalSplitterCapturedAtX;
var _verticalSplitterPosition = null;

var _tableSplitterCaptured = -1;
var _tableSplitterCapturedAtX = -1;

var _timeScaleToGrid = [];

var _tableScrollSVGWidth, _tableScrollSVGHeight;
var _tableScrollCaptured = false;
var _tableScrollCapturedAtX = -1;
var _tableScrollXAtCapture = -1;
var _tableScrollSVGSlider=null;
var _tableScrollSVGBkgr=null;

var _ganttHScrollSVGWidth, _ganttHScrollSVGHeight;
var _ganttHScrollCaptured = false;
var _ganttHScrollCapturedAtX = -1;
var _ganttHScrollXAtCapture = -1;
var _ganttHScrollSVGSlider=null;
var _ganttHScrollSVGBkgr=null;

var _verticalScrollSVGWidth, _verticalScrollSVGHeight;
var _verticalScrollCaptured = false;
var _verticalScrollCapturedAtY = -1;
var _verticalScrollYAtCapture = -1;
var _verticalScrollSVGSlider=null;
var _verticalScrollSVGBkgr=null;

var _verticalScrollSVGWidth, _verticalScrollSVGHeight;

var _tableHeaderColumnSwapper = null;
var _tableHeaderColumnSwapperCapturedAtX = -1;
var _tableHeaderColumnSwapperOriginalX = -1;

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
		calcTableHeaderOverallWidth();
		drawTableContent();
		drawTableHeader();
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
		_ganttVisibleWidth *= (_ganttSVGWidth / oldGanttSVGWidth);
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
		_tableVisibleLeft = newSliderX * maxVisibleLeft / maxSlider;
		_tableScrollSVGSlider.setAttributeNS( null,'x', newSliderX );
		drawTableHeader();
		drawTableContent();
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
		_ganttVisibleTop = newSliderY * (_data.operations.length - _ganttVisibleHeight) / maxSlider;
		setCookie("ganttVisibleTop",_ganttVisibleTop);		
		_verticalScrollSVGSlider.setAttributeNS( null,'y', newSliderY );
		drawGantt();
		drawTableContent();
		return;
	}
	if( _tableHeaderColumnSwapper != null ) {
		let newX = _tableHeaderColumnSwapperOriginalX + e.x - _tableHeaderColumnSwapperCapturedAtX;
		_tableHeaderColumnSwapper.setAttributeNS(null,'x', newX );
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
		parsed = parseDate( d.f_LastFin );
		if( parsed !== null ) {
			d.lastFinInSeconds = parsed.timeInSeconds;			
		} else {
			d.lastFinInSeconds = d.AsapStartInSeconds; // To prevent error if for some reason unfinished operation has no valid f_LastFin. 
		}

		// Start and finish
		if( d.FactFin ) {
			d.status = 100; // finished
			d.displayStartInSeconds = d.FactStartInSeconds; 
			d.displayFinInSeconds = d.FactFinInSeconds;
			d.displayRestartInSeconds = null; 
		} else {
			if( !d.FactStart ) { // Hasn't been started yet
				d.status = 0; // not started 
				d.displayStartInSeconds = d.AsapStartInSeconds; 
				d.displayFinInSeconds = d.AsapFinInSeconds;
				d.displayRestartInSeconds = null;
			} else { // started but not finished
				let divisor = (d.AsapFinInSeconds - d.AsapStartInSeconds) + (d.lastFinInSeconds - d.FactStartInSeconds); 
				if( divisor > 0 ) {
					d.status = parseInt( (d.lastFinInSeconds - d.FactStartInSeconds) * 100.0 / divisor - 1.0); 
				} else {
					d.status = 50;
				}
				d.displayStartInSeconds = d.FactStartInSeconds; 
				d.displayFinInSeconds = d.AsapFinInSeconds;
				d.displayRestartInSeconds = d.AsapStartInSeconds;
			}
		}
		d.color = decColorToString( d.f_ColorCom, _settings.ganttOperation0Color );
		d.colorBack = decColorToString( d.f_ColorBack, "#ffffff" );
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

	// Initializing vertical zoom
	_ganttVisibleTop = 0;
	_ganttVisibleHeight = _data.operations.length;
	let gvh = getCookie('ganttVisibleHeight', 'int');
	if( gvh ) {
		if( gvh <= _data.operations.length ) {
			_ganttVisibleHeight = gvh;
		}	
	}
	let gvt = getCookie('ganttVisibleTop', 'int');
	if( gvt ) {
		if( (gvt + _ganttVisibleHeight) <= _data.operations.length ) {
			_ganttVisibleTop = gvt;
		}	
	}
	let zoomFactorY = _data.operations.length / _ganttVisibleHeight;
	_zoomGanttVerticalInput.value = parseInt(zoomFactorY*100.0 + 0.5);

	// Initializing horizontal zoom
	_ganttVisibleLeft = _data.visibleMin;
	_ganttVisibleWidth = _data.visibleMaxWidth;
	let gvw = getCookie('ganttVisibleWidth', 'int');
	if( gvw ) {
		if( gvw <= _data.visibleMaxWidth ) {
			_ganttVisibleWidth = gvw;
		}	
	}
	let gvl = getCookie('ganttVisibleLeft', 'int');
	if( gvl ) {
		if( (gvl + _ganttVisibleWidth) <= _data.visibleMaxWidth ) {
			_ganttVisibleLeft = gvl;
		}	
	}
	let zoomFactorX = _data.visibleMaxWidth / _ganttVisibleWidth;
	_zoomGanttHorizontalInput.value = parseInt(zoomFactorX*100.0 + 0.5);

	calcTableHeaderOverallWidth();
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
			} else if( currentLevel == 'A' ) {
				if( _data.operations[i].Level === 'T' ) { // The upper level element is a team
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
	_containerSVG = document.getElementById("containerSVG");
	_tableHeaderSVG = document.getElementById('tableHeaderSVG');
	_tableContentSVG = document.getElementById('tableContentSVG');
	_ganttSVG = document.getElementById("ganttSVG");
	_timeSVG = document.getElementById("timeSVG");
	_verticalSplitterSVG = document.getElementById("verticalSplitterSVG");
	_tableScrollSVG = document.getElementById("tableScrollSVG");
	_ganttHScrollSVG = document.getElementById("ganttScrollSVG");
	_verticalScrollSVG = document.getElementById("verticalScrollSVG");

	let value = getCookie( "verticalSplitterPosition", 'float' );
	if( value ) {
		if( value > 0.0 && value < 1.0 ) {
			_settings.verticalSplitterInitialPosition = value;
		}
	}	
	_verticalSplitterPosition = _settings.verticalSplitterInitialPosition;

	initLayoutCoords();

	_containerDiv.addEventListener('selectstart', function() { event.preventDefault(); return false; } );
	_containerDiv.addEventListener('selectend', function() { event.preventDefault(); return false; } );

	// Vertical splitter
	_verticalSplitterSVGBkgr = createRect( 0, 0, _verticalSplitterSVGWidth, _verticalSplitterSVGHeight, 
			{ stroke:_settings.tableContentStrokeColor, strokeWidth:1,  fill:_settings.tableContentFillColor } ); 	// backgroud rect
	_verticalSplitterSVG.setAttributeNS(null,'cursor','col-resize');	
	_verticalSplitterSVG.appendChild( _verticalSplitterSVGBkgr );			
	_verticalSplitterSVG.onmousedown = function(e) { _verticalSplitterCaptured=true; _verticalSplitterCapturedAtX=e.x; };

	// Gantt chart
	_ganttSVG.addEventListener( "mousedown", onGanttMouseDown );
	_ganttSVG.addEventListener( "mousemove", onGanttCapturedMouseMove );
	_ganttSVG.addEventListener( "dblclick", onGanttDblClick );
	addOnMouseWheel( _ganttSVG, onGanttWheel );
	_ganttSVG.style.cursor = "default";

	// To scroll the table vertically - using the same handler as for the gantt chart... 
	addOnMouseWheel( _tableContentSVG, onGanttWheel );

	// Time scale
	_timeSVG.onmousedown = onGanttMouseDown;
	_timeSVG.onmousemove = onGanttCapturedMouseMove;
	_timeSVG.addEventListener( "dblclick", onGanttDblClick );
	addOnMouseWheel( _timeSVG, onTimeWheel );	
	_timeSVG.style.cursor = "default";

	// zoom tools
	_zoomGanttHorizontalInput.onchange = function(e) { 
		zoomXR( (parseInt(this.value) - parseInt(_data.visibleMaxWidth * 100.0 / _ganttVisibleWidth + 0.5)) / 100.0, null );
	};
	_zoomGanttVerticalInput.onchange = function(e) { 
		zoomYR( (parseInt(this.value) - parseInt(_data.operations.length *100.0 / _ganttVisibleHeight + 0.5)) / 100.0, null); 
	};
	_displayLinksCheckbox.onchange = function() { drawGantt(); };

	createDefs( _containerSVG );
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

	_containerSVG.setAttributeNS(null, 'x', 0 );
	_containerSVG.setAttributeNS(null, 'y', 0 ); 
	_containerSVG.setAttributeNS(null, 'width', _containerDivWidth ); // window.innerWidth-1  );
	_containerSVG.setAttributeNS(null, 'height', _containerDivHeight ); 

	// Table Header
	_tableHeaderSVG.setAttributeNS(null, 'x', 0 );
	_tableHeaderSVG.setAttributeNS(null, 'y', 0 ); 
	_tableHeaderSVGWidth = _containerDivWidth * _verticalSplitterPosition;
	_tableHeaderSVG.setAttributeNS(null, 'width', _tableHeaderSVGWidth ); // window.innerWidth * 0.1 );
	_tableHeaderSVGHeight = _containerDivHeight * 0.1;
	_tableHeaderSVG.setAttributeNS(null, 'height', _tableHeaderSVGHeight ); 

	// Table Content
	_tableContentSVG.setAttributeNS(null, 'x', 0 );
	_tableContentSVG.setAttributeNS(null, 'y', _tableHeaderSVGHeight ); 
	_tableContentSVGWidth = _tableHeaderSVGWidth;
	_tableContentSVG.setAttributeNS(null, 'width', _tableContentSVGWidth ); // window.innerWidth * 0.1 );
	_tableContentSVGHeight = _containerDivHeight - _tableHeaderSVGHeight - _settings.scrollThick;
	_tableContentSVG.setAttributeNS(null, 'height', _tableContentSVGHeight ); 

	// Vertical Splitter
	_verticalSplitterSVG.setAttributeNS(null, 'x', _tableContentSVGWidth );
	_verticalSplitterSVG.setAttributeNS(null, 'y', 0 ); 
	_verticalSplitterSVGWidth = 3; //_containerDivWidth * 0.005;
	_verticalSplitterSVG.setAttributeNS(null, 'width', _verticalSplitterSVGWidth ); // window.innerWidth * 0.9 );
	_verticalSplitterSVGHeight = _containerDivHeight - _settings.scrollThick;
	_verticalSplitterSVG.setAttributeNS(null, 'height', _containerDivHeight ); //window.innerHeight/2 ); 

	// Gantt chart
	_ganttSVG.setAttributeNS(null, 'x', _tableContentSVGWidth + _verticalSplitterSVGWidth );
	_ganttSVG.setAttributeNS(null, 'y', _tableHeaderSVGHeight ); 
	_ganttSVGWidth = _containerDivWidth - (_tableContentSVGWidth + _verticalSplitterSVGWidth) - _settings.scrollThick;
	_ganttSVG.setAttributeNS(null, 'width', _ganttSVGWidth ); // window.innerWidth * 0.9 );
	_ganttSVGHeight = _tableContentSVGHeight;
	_ganttSVG.setAttributeNS(null, 'height', _ganttSVGHeight ); //window.innerHeight/2 );

	// Time scale
	_timeSVG.setAttributeNS(null, 'x', _tableContentSVGWidth + _verticalSplitterSVGWidth );
	_timeSVG.setAttributeNS(null, 'y', 0 ); 
	_timeSVGWidth = _ganttSVGWidth;
	_timeSVG.setAttributeNS(null, 'width', _timeSVGWidth ); // window.innerWidth * 0.9 );
	_timeSVGHeight = _tableHeaderSVGHeight;
	_timeSVG.setAttributeNS(null, 'height', _timeSVGHeight ); //window.innerHeight/2 );

	// Table scrolling tool
	_tableScrollSVG.setAttributeNS(null, 'x', 0 )
	_tableScrollSVG.setAttributeNS(null, 'y', _tableHeaderSVGHeight + _tableContentSVGHeight ); 
	_tableScrollSVGWidth = _tableHeaderSVGWidth;
	_tableScrollSVG.setAttributeNS(null, 'width', _tableContentSVGWidth ); // window.innerWidth * 0.1 );
	_tableScrollSVGHeight = _settings.scrollThick;
	_tableScrollSVG.setAttributeNS(null, 'height', _tableContentSVGHeight ); 

	// Gantt horizontal scrolling tool
	_ganttHScrollSVG.setAttributeNS(null, 'x', _tableContentSVGWidth + _verticalSplitterSVGWidth )
	_ganttHScrollSVG.setAttributeNS(null, 'y', _tableHeaderSVGHeight + _tableContentSVGHeight ); 
	_ganttHScrollSVGWidth = _ganttSVGWidth;
	_ganttHScrollSVG.setAttributeNS(null, 'width', _ganttHScrollSVGWidth );
	_ganttHScrollSVGHeight = _settings.scrollThick;
	_ganttHScrollSVG.setAttributeNS(null, 'height', _ganttHScrollSVGHeight ); 

	// Vertical scrolling tool
	_verticalScrollSVG.setAttributeNS(null, 'x', _tableContentSVGWidth + _verticalSplitterSVGWidth + _ganttSVGWidth )
	_verticalScrollSVG.setAttributeNS(null, 'y', _tableHeaderSVGHeight ); 
	_verticalScrollSVGWidth = _settings.scrollThick;
	_verticalScrollSVG.setAttributeNS(null, 'width', _verticalScrollSVGWidth );
	_verticalScrollSVGHeight = _ganttSVGHeight; // _containerDivHeight;
	_verticalScrollSVG.setAttributeNS(null, 'height', _verticalScrollSVGHeight ); 
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
		while (_ganttSVG.hasChildNodes()) {
			_ganttSVG.removeChild(_ganttSVG.lastChild);
		}		
		_ganttSVGBkgr = createRect( 0, 0, _ganttSVGWidth, _ganttSVGHeight, {fill:'url(#ganttGradient)'} );
		_ganttSVG.appendChild(_ganttSVGBkgr);		

	} else {
		_ganttSVGBkgr.setAttributeNS(null,'width',_ganttSVGWidth);		
	}

	let displayLinks = _displayLinksCheckbox.checked; // Display links?

	// Drawing grid...
  	for( let i = 0 ;  ; i++ ) {
		let el = document.getElementById( 'ganttGrid' + i );
		if( !el ) {
			break;
		}
		_ganttSVG.removeChild(el);
	}
	let gridLineProperties = { stroke:_settings.gridColor, strokeWidth:_settings.gridStrokeWidth, strokeDasharray:_settings.gridStrokeDashArray }; 
	let gridMaxY = operToScreen(_data.operations.length);
	for( let i = 0 ; i < _timeScaleToGrid.length ; i++ ) {
		let x = timeToScreen( _timeScaleToGrid[i] );
		gridLineProperties.id = 'ganttGrid' + i;
		let line = createLine( x, 0, x, gridMaxY, gridLineProperties );
		_ganttSVG.appendChild(line);
	}		
	let gridXNow = timeToScreen( _data.proj.curTimeInSeconds );
	gridLineProperties.id = 'ganttGrid' + _timeScaleToGrid.length;
	gridLineProperties.stroke = _settings.gridCurrentTimeColor;
	gridLineProperties.strokeDasharray = _settings.gridStrokeDashArray;
	let gridLine = createLine( gridXNow, 0, gridXNow, gridMaxY, gridLineProperties );
	_ganttSVG.appendChild(gridLine);
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
				lineY2 = _data.operations[succOp].rectTop - _settings.ganttLinkArrowHeight*2;
				arrowY = _data.operations[succOp].rectTop - _settings.ganttLinkArrowHeight;
			} else {
				lineY1 = _data.operations[predOp].rectTop;
				lineY2 = _data.operations[succOp].rectBottom + _settings.ganttLinkArrowHeight*2;
				arrowY = _data.operations[succOp].rectBottom + _settings.ganttLinkArrowHeight;
			}
			if( _data.links[i].TypeSF2 == 'SF' || _data.links[i].TypeSF2 == 'FF' ) {
				lineX2 = _data.operations[succOp].right;
			} else {
				lineX2 = _data.operations[succOp].left;				
			}

			if( init ) {
				lineProperties.id = 'ganttLine'+i;
				line = createLine( lineX1, lineY1, lineX2, lineY2, lineProperties );
				arrowLineProperties.id = 'ganttLineArrow'+i;
				arrowLine = createLine( lineX2, lineY2, lineX2, arrowY, arrowLineProperties );
				_ganttSVG.appendChild(line);				
				_ganttSVG.appendChild(arrowLine);				
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
	let op0Properties = { fill:_settings.ganttOperation0Color, opacity:_settings.ganttOperation0Opacity };
	let op100Properties = { fill:_settings.ganttOperation100Color, opacity:_settings.ganttOperation100Opacity };
	let opCompareProperties = { fill:_settings.ganttCompareColor, opacity:_settings.ganttCompareOpacity };
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

			if( _data.operations[i].status == 0 ) { // Not started
				let op0;
				op0Properties.id = 'ganttOpNotStarted'+i;
				// op0Properties.fill = (_data.operations[i].f_Critical=="1") ? _settings.ganttCriticalColor : _settings.ganttOperation0Color;
				op0Properties.fill = _data.operations[i].color;
				if( !(rectWidth > 0) ) {
					op0 = createRhomb( rectStart, rectTop, rectHeight, op0Properties );
				} else if( typeof(_data.operations[i].Level) !== 'number' ) { // Not a phase ?
					op0 = createRect( rectStart, rectTop, rectWidth, rectHeight, op0Properties ); // Rectangle
				} else {
					op0 = createPolygon( calcPhaseCoords( rectStart, rectTop, rectWidth, rectHeight), op0Properties );
				}
				group.appendChild(op0);
			} else if( _data.operations[i].status == 100 ) { // Finished
				let op100;
				op100Properties.id = 'ganttOpFinished'+i;
				if( !(rectWidth > 0) ) {
					op100 = createRhomb( rectStart, rectTop, rectHeight, op100Properties );
				} else if( typeof(_data.operations[i].Level) !== 'number' ) { // Not a phase
					op100 = createRect( rectStart, rectTop, rectWidth, rectHeight, op100Properties ); // Rectangle
				} else {
					op100 = createPolygon( calcPhaseCoords( rectStart, rectTop, rectWidth, rectHeight ), op100Properties );
				}
				group.appendChild(op100);
			} else { // Started but not finished
				let xLastFin = timeToScreen( _data.operations[i].lastFinInSeconds );
				let xRestart = timeToScreen( _data.operations[i].displayRestartInSeconds );
				op100Properties.id = 'ganttOpFinished'+i;
				let op100;
				let width100 = xLastFin - rectStart;
				if( !(width100 > 0) ) {
					op100 = createRhomb( rectStart, rectTop, rectHeight, op0Properties );
				} else if( typeof(_data.operations[i].Level) !== 'number' ) { // Not a phase
					op100 = createRect( rectStart, rectTop, width100, rectHeight, op100Properties  ); // Rectangle
				} else {
					op100 = createPolygon( calcPhaseCoords(rectStart, rectTop, width100, rectHeight,-1), op100Properties );
				}
				group.appendChild(op100);

				if( xLastFin < xRestart ) { // A gap between 
					op100Properties.id = 'ganttOpBetweenFinishedAndNotStarted'+i;
					opBetween = createRect( xLastFin, rectTop+rectHeight*0.33, xRestart - xLastFin, rectHeight*0.2, op100Properties  ); // Rectangle
					group.appendChild(opBetween);				
				} 
				
				op0Properties.id = 'ganttOpNotStarted'+i;
				op0Properties.fill = _data.operations[i].color;
				let op0;
				let width0 = rectEnd - xRestart;
				if( !(width0 > 0) ) {
					op0 = createRhomb( rectEnd, rectTop, rectHeight, op0Properties );
				} else if( typeof(_data.operations[i].Level) !== 'number' ) { // Not a phase
					op0 = createRect( xRestart, rectTop, width0, rectHeight, op0Properties  ); // Rectangle
				} else {
					op0 = createPolygon( calcPhaseCoords(xRestart, rectTop, width0, rectHeight, 1), op0Properties );
				}
				group.appendChild(op0);
			}
			group.style.cursor = 'pointer';
			// group.onmouseover = function(e) { document.getElementById('tableColumn0Row'+i).setAttributeNS(null,'fill','#2f2f2f') };
			// let bkgr = createRect( 0, lineTop, _data.table[col].width, rectHeight, { id:('tableColumn'+col+'Row'+i+'Bkgr'), fill:_data.operations[i].colorBack } );

			let title = document.createElementNS( NS,'title' ); // Title
			title.setAttributeNS(null, 'id', 'ganttGroupTitle'+i);
			title.textContent = formatTitleTextContent(i);
			group.appendChild(title);

			group.setAttributeNS( null, 'data-i', i );
			if( 'editables' in _data ) {
	 			group.onmousedown = function(e) { e.stopPropagation(); displayDataInEditBox(this); };
			}

			text = createText( _data.operations[i].Name, rectStart, textY, // - fontSize * 0.25, 
				{ fontSize:fontSize, fill:_settings.ganttFontColor, id:'ganttText'+i, textAnchor:'left', alignmentBaseline:'baseline' } );
			text.style.cursor = 'pointer';
			group.appendChild(text);
			_ganttSVG.appendChild(group);			
		} else { // Not initializing but only updating coordinates...
			text = document.getElementById( 'ganttText'+i );
			text.setAttributeNS(null,'x',rectStart);
			text.setAttributeNS(null,'y',textY);
			text.setAttributeNS(null,'font-size',fontSize);
			if( displayCompare ) {
				setRectCoords( document.getElementById('ganttOpCompare' + i), 
					rectCompareStart, rectCompareTop, rectCompareEnd - rectCompareStart, rectCompareBottom - rectCompareTop );
			}
			if( _data.operations[i].status == 0 ) { // Not started
				let el = document.getElementById('ganttOpNotStarted'+i);
				if( !(rectWidth > 0) ) {
					el.setAttributeNS( null,'points', calcRhombCoords( rectStart, rectTop, rectHeight ) );
				} else if( typeof(_data.operations[i].Level) !== 'number' ) { // Not a phase
					setRectCoords( el, rectStart, rectTop, rectWidth, rectHeight );
				} else {
					el.setAttributeNS( null,'points', calcPhaseCoords(rectStart, rectTop, rectWidth, rectHeight) );
				} 
			} else if( _data.operations[i].status == 100 ) {
				let el = document.getElementById('ganttOpFinished'+i);
				if( !(rectWidth > 0) ) {
					el.setAttributeNS( null,'points', calcRhombCoords( rectStart, rectTop, rectHeight ) );
				} else if( typeof(_data.operations[i].Level) !== 'number' ) { // Not a phase
					setRectCoords( el, rectStart, rectTop, rectWidth, rectHeight );
				} else {
					el.setAttributeNS( null,'points', calcPhaseCoords(rectStart, rectTop, rectWidth, rectHeight) );
				} 
			} else {
				let xLastFin = timeToScreen( _data.operations[i].lastFinInSeconds );				
				let xRestart = timeToScreen( _data.operations[i].displayRestartInSeconds );
				let width100 = xLastFin - rectStart;
				let width0 = rectEnd - xRestart;
				let el100 = document.getElementById('ganttOpFinished'+i);
				let el0 = document.getElementById('ganttOpNotStarted'+i);
				if( !(width100 > 0) ) { // Zero width
					el100.setAttributeNS( null,'points', calcRhombCoords( rectStart, rectTop, rectHeight ) );					
				} else if( typeof(_data.operations[i].Level) !== 'number' ) { // Not a phase
					setRectCoords( el100, rectStart, rectTop, width100, rectHeight );
				} else {
					el100.setAttributeNS( null,'points', calcPhaseCoords(rectStart, rectTop, width100, rectHeight,-1) );
				} 
				if( xLastFin < xRestart ) {
					let elBetween = document.getElementById( 'ganttOpBetweenFinishedAndNotStarted'+i );
					setRectCoords( elBetween, xLastFin, rectTop + rectHeight*0.33, xRestart - xLastFin, rectHeight*0.2 );
				}
				if( !(width0 > 0) ) { // Zero width
					el0.setAttributeNS( null,'points', calcRhombCoords( rectEnd, rectTop, rectHeight ) );					
				}
				if( typeof(_data.operations[i].Level) !== 'number' ) { // Not a phase
					setRectCoords( el0, xRestart, rectTop, width0, rectHeight );
				} else {
					el0.setAttributeNS( null,'points', calcPhaseCoords(xRestart, rectTop, width0, rectHeight,1) );
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
		while (_tableHeaderSVG.hasChildNodes()) {
			_tableHeaderSVG.removeChild(_tableHeaderSVG.lastChild);
		}

		_tableHeaderSVGBkgr = createRect( 0, 0, _tableHeaderOverallWidth, _tableHeaderSVGHeight, { fill:_settings.tableHeaderFillColor } ); // backgroud rect
		_tableHeaderSVG.appendChild( _tableHeaderSVGBkgr );			

		let left = _data.table[0].width;
		for( let col = 1 ; col < _data.table.length ; col++ ) {
			let svg = createSVG(left+1-_tableVisibleLeft, 0, _data.table[col].width-2, _tableHeaderSVGHeight, 
				{ id:'tableHeaderColumnNameSVG'+col, 'fill':_settings.tableHeaderFillColor } );
			left += _data.table[col].width;
			let props = { id:'tableHeaderColumnNameBkgr'+col, 'fill':_settings.tableHeaderFillColor, 
				'stroke':_settings.tableHeaderBorderColor, 'strokeWidth':1 };
			let rect = createRect(0, 0, _data.table[col].width-2, _tableHeaderSVGHeight, props );
			rect.onmouseover = function(e) { this.setAttributeNS( null, 'stroke', _settings.tableHeaderActiveBorderColor); };
			rect.onmouseout = function(e) { this.setAttributeNS( null, 'stroke', _settings.tableHeaderBorderColor); };
			//let text = createText( _data.table[col].name, 2, _tableHeaderSVGHeight/2, 
			//	{ alignmentBaseline:'baseline', textAnchor:'start', fontSize:_settings.tableMaxFontSize, fill:_settings.tableHeaderFontColor } );
			let text = createForeignObjectWithText( _data.table[col].name, 0, 0, _data.table[col].width-2, _tableHeaderSVGHeight, 
				{ id:'tableHeaderColumnNameText'+col, textAlign:'center', fontSize:_settings.tableMaxFontSize, color:_settings.tableHeaderFontColor } );

			svg.appendChild( rect );			
			svg.appendChild( text );
			_tableHeaderSVG.appendChild( svg );
			
			svg.onmousedown = onTableHeaderMouseDown;
			svg.style.cursor = 'hand';
			svg.dataset.columnNumber = col;
		}
	} else {
		let left = _data.table[0].width;
		for( let col = 1 ; col < _data.table.length ; col++ ) {
			let svg = document.getElementById('tableHeaderColumnNameSVG'+col);
			svg.setAttributeNS(null,'x',left+1-_tableVisibleLeft);
			svg.setAttributeNS(null,'width',_data.table[col].width-2);			
			svg.setAttributeNS(null,'display','block');
			let rect = document.getElementById('tableHeaderColumnNameBkgr'+col);
			rect.setAttributeNS(null,'width',_data.table[col].width-2);			
			let text = document.getElementById('tableHeaderColumnNameText'+col);
			text.setAttributeNS(null,'width',_data.table[col].width-2);			
			left += _data.table[col].width;
		}
	}
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


function drawTableContent( init ) {
	if( !init ) {
		init = false;
	}
	if( init ) {
		while (_tableContentSVG.hasChildNodes()) {
			_tableContentSVG.removeChild(_tableContentSVG.lastChild);
		}

		let height = operToScreen(_data.operations.length);
		_tableContentSVGBkgr = createRect( 0-_tableVisibleLeft, 0, _containerDivWidth, height, 
			{ stroke:'none', strokeWidth:1,  fill:_settings.tableContentFillColor } ); 	// backgroud rect
		_tableContentSVG.appendChild( _tableContentSVGBkgr );		
		
		let left = 0;
		for( let col = 0 ; col < _data.table.length ; col++ ) { // Creating svg-containers for columns
			let rect = createSVG( left+2-_tableVisibleLeft, 0, _data.table[col].width-4, height, 
				{ id:('tableColumnSVG'+col), fill:_settings.tableContentStrokeColor } );
			_tableContentSVG.appendChild( rect );
			left += _data.table[col].width;
		}

		for( let col = 0, left=0 ; col < _data.table.length ; col++  ) { // Creating splitters
			left += _data.table[col].width;
			let splitter = createRect( left-_tableVisibleLeft, 0, 2, operToScreen(_data.operations.length), 
				{id:'tableSplitter'+col, fill:'#dfdfdf'} );
			splitter.dataset.columnNumber = col;
			splitter.setAttributeNS(null,'cursor','col-resize');
			_tableContentSVG.appendChild(splitter);
			splitter.onmousedown = function(e) { _tableSplitterCaptured=Number(this.dataset.columnNumber); _tableSplitterCapturedAtX=e.x; };
		}
	} else {
		_tableContentSVGBkgr.setAttributeNS(null,'x',-_tableVisibleLeft);
		let left = 0;
		for( let col = 0 ; col < _data.table.length ; col++ ) { // Updating svg-containers for columns as well as splitters 
			let rect = document.getElementById('tableColumnSVG'+col);
			rect.setAttributeNS(null,'x',left+2-_tableVisibleLeft);
			rect.setAttributeNS(null,'width',_data.table[col].width-4);
			left += _data.table[col].width;			
			let splitter = document.getElementById('tableSplitter'+col); 
			splitter.setAttributeNS(null,'x',left-_tableVisibleLeft);
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
				if( ref == "Level" ) { // To display no 'teams' or 'assignments' (phases only). 
					if( typeof(content) == 'string' ) {
						content = "";
					}
				}

				let el = document.getElementById('tableColumnSVG'+col);
				let bkgr = createRect( 0, lineTop, _data.table[col].width, rectHeight,  
					{ id:('tableColumn'+col+'Row'+i+'Bkgr'), fill:_data.operations[i].colorBack } );
				el.appendChild( bkgr );

				let textX = 2;
				let textAnchor = 'start';
				if( ref == "Name" ) { // A name should be adjusted according to it's position in the hierarchy
					// textX += _settings.hierarchyIndent * _data.operations[i].parents.length;
					content = padWithNChars( _data.operations[i].parents.length, '·' ) + content;
				} else {
					if( _data.table[col].type == 'float' || _data.table[col].type == 'int' ) {
						textX = _data.table[col].width - 4;
						textAnchor = 'end';
					}						
				}
				let text = createText( content, textX, lineMiddle, 
					{ id:('tableColumn'+col+'Row'+i), fill:color, textAnchor:textAnchor, fontSize:fontSize } );
				el.appendChild( text );
				if( isEditable(_data.table[col].ref) ) {
					bkgr.setAttributeNS( null, 'data-i', i );
					bkgr.onmousedown = function(e) { displayDataInEditBox( this ); };
					bkgr.style.cursor = 'pointer';
					text.setAttributeNS( null, 'data-i', i );
					text.onmousedown = function(e) { displayDataInEditBox( this ); };
					text.style.cursor = 'pointer';
				}
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
				el.setAttributeNS(null,'y',lineMiddle);
				el.setAttributeNS(null,'font-size',fontSize);
				if( _data.table[col].type == 'float' || _data.table[col].type == 'int' ) {
					el.setAttributeNS( null, 'x', _data.table[col].width - 4 );
				}
				let bkgrEl = document.getElementById(id+'Bkgr');
				bkgrEl.setAttributeNS(null,'y',lineTop);
				bkgrEl.setAttributeNS(null,'width',_data.table[col].width);
				bkgrEl.setAttributeNS(null,'height',rectHeight);
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
	while (_timeSVG.hasChildNodes()) {
		_timeSVG.removeChild(_timeSVG.lastChild);
	}
	_timeSVGBkgr = createRect( 0, 0, _timeSVGWidth, _timeSVGHeight, { fill:'url(#timeScaleGradient)' } ); 	// backgroud rect
	_timeSVG.appendChild( _timeSVGBkgr );			

	let daysInScreen = (_ganttVisibleWidth)/ (60*60*24);
	let dayRectWidth = _timeSVGWidth / daysInScreen;
	let displayDays = ( dayRectWidth > _settings.minDayWidthOnTimeScale ) ? true : false;
	let displayWeeks = ( !displayDays && dayRectWidth*7 > _settings.minDayWidthOnTimeScale ) ? true : false;

	let minTime = _data.visibleMin * 1000; // screenToTime(0) * 1000;
	let maxTime = _data.visibleMax * 1000; // screenToTime( _timeSVGWidth ) * 1000;
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
	if( dayRectWidth*30 > _timeSVGHeight*0.3*8 ) {
		monthFontSize = _timeSVGHeight*0.25;
		monthWithYear = true; 
	} else if( dayRectWidth*30 > _timeSVGHeight*0.3*3 ) {
		monthFontSize = _timeSVGHeight*0.25;
	} else {
		monthFontSize = dayRectWidth * 30 * 0.25;
	}
	let monthProperties = { fontSize:monthFontSize, fill:_settings.timeScaleFontColor, textAnchor:'middle', alignmentBaseline:'baseline' };
	let dayFontSize=0;
	if( displayDays ) {
		dayFontSize = (dayRectWidth > _timeSVGHeight*0.25) ? _timeSVGHeight*0.22 : dayRectWidth * 0.8;
	} else if( !displayDays && displayWeeks ) {
		dayFontSize = (dayRectWidth*7 > _timeSVGHeight*0.25) ? _timeSVGHeight*0.22 : (dayRectWidth*7) * 0.8;
	}
	let dayProperties = { fontSize:dayFontSize, fill:_settings.timeScaleFontColor, textAnchor:'middle', alignmentBaseline:'baseline' };
	let textRectHeight = _timeSVGHeight/3;
	let monthY = textRectHeight;
	let dayY = 2*textRectHeight;
	let dayTextY = dayY+textRectHeight-3;
	let numSecondsInDay = 24*60*60;

	_timeScaleToGrid = []; // To draw a grid later on the Gantt chart...

	for( let y = minY ; y <= maxY ; y++ ) {
		if( minY != maxY ) {
			let yearText = createText( minY, _timeSVGWidth/2, textRectHeight-3, monthProperties );
			_timeSVG.appendChild(yearText);
		} else {
			let startOfYear = new Date(y,0,1,0,0,0,0);
			let startOfYearInSeconds = startOfYear.getTime() / 1000;
			let endOfYear = new Date(y,11,31,23,59,59,999);
			let endOfYearInSeconds = endOfYear.getTime() / 1000;
			let yearStartX = timeToScreen(startOfYearInSeconds);
			let yearEndX = timeToScreen(endOfYearInSeconds);
			let yearRect = createRect( yearStartX, 0, yearEndX - yearStartX, textRectHeight, textRectProperties );		
			_timeSVG.appendChild(yearRect);
			let yearText = createText( y, yearStartX + (yearEndX - yearStartX)/2, textRectHeight-3, monthProperties );
			_timeSVG.appendChild(yearText);
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
			_timeSVG.appendChild(monthRect);
			let monthString = mNames[m];
			if( monthWithYear ) { 
				monthString += ", " + y;
			}
			let monthText = createText( monthString, monthStartX + (monthEndX - monthStartX)/2, monthY+textRectHeight-3, monthProperties );
			_timeSVG.appendChild(monthText);

			if( displayDays ) {
				let minD = 1;
				let maxD = endOfMonth.getDate();
				for( let d = minD ; d <= maxD ; d++ ) {
					let currentDay = new Date(y,m,d,0,0,0,0);
					let currentTimeInSeconds = currentDay.getTime()/1000;
					let dayStartX = timeToScreen(currentTimeInSeconds);
					let dayEndX = timeToScreen(currentTimeInSeconds + numSecondsInDay);
					let dayRect = createRect( dayStartX, dayY, dayEndX - dayStartX, textRectHeight, textRectProperties );
					_timeSVG.appendChild(dayRect);
					let dayText = createText( d.toString(), dayStartX + (dayEndX - dayStartX)/2, dayTextY, dayProperties );
					_timeSVG.appendChild(dayText);
					_timeScaleToGrid.push(currentTimeInSeconds); // To a draw grid later on the Gantt chart...
				}				
			} 
		}
		
		if( !displayDays && displayWeeks ) {
			let minW = (y == minY) ? getWeekNumber(minDT) : 1;
			let maxW = (y == maxY) ? getWeekNumber(maxDT) : 53;
			let numSecondsInWeek = 7*numSecondsInDay;
			let firstDay = minDT.getDay(); // To adjust to the beginning of a week.
			if( firstDay == 0 ) { // If Sunday... 
				firstDay = 7; // ... making it 7 instead of 0
			}
			if( firstDay > 1 ) { // If not monday...
				minDT = new Date(minDT.getTime() - numSecondsInDay*1000*(firstDay-1)); // ... making it Monday
			}
			let startOfWeekInSeconds = minDT.getTime()/1000;
			let endOfWeekInSeconds = startOfWeekInSeconds + (8-minDT.getDay())*numSecondsInDay;
			for( let w = minW ; w <= maxW ; w++ ) {
				let weekStartX = timeToScreen(startOfWeekInSeconds);
				let weekEndX = timeToScreen(endOfWeekInSeconds);
				let weekRect = createRect( weekStartX, dayY, weekEndX - weekStartX, textRectHeight, textRectProperties );		
				_timeSVG.appendChild(weekRect);
				let startOfWeekDate = new Date(startOfWeekInSeconds*1000);
				let weekText = createText( (startOfWeekDate.getDate()).toString(), weekStartX + (weekEndX - weekStartX)/2, dayTextY, dayProperties );
				_timeSVG.appendChild(weekText);
				_timeScaleToGrid.push(startOfWeekInSeconds); // To draw a grid later on the Gantt chart...
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
	let visibleMaxStart = (_tableHeaderOverallWidth > _tableScrollSVGWidth) ? (_tableHeaderOverallWidth - _tableScrollSVGWidth) : 0;
	let sliderSize = (visibleMaxStart > 0) ? (_tableScrollSVGWidth*_tableScrollSVGWidth/_tableHeaderOverallWidth) : _tableScrollSVGWidth;
	if( sliderSize < _settings.scrollSliderSize ) {
		sliderSize = _settings.scrollSliderSize;
	}

	if( init ) {
		let bbox = _tableScrollSVG.getBBox();
		_tableScrollSVGBkgr = createRect( 0, 0, _tableScrollSVGWidth, _tableScrollSVGHeight, 
			{ id:('tableScrollSVGBkgr'), fill:_settings.scrollBkgrColor, stroke:_settings.scrollRectColor, strokeWidth:1 } );
		_tableScrollSVGBkgr.setAttributeNS(null,'cursor','pointer');
		_tableScrollSVGBkgr.onmousedown = onTableScrollSVGBkgr;
		_tableScrollSVGSlider = createRect( 0, 0, sliderSize, _tableScrollSVGHeight, 
			{ id:('tableScrollSVGSlider'), fill:_settings.scrollSliderColor } );
		_tableScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		_tableScrollSVG.appendChild( _tableScrollSVGBkgr );
		_tableScrollSVG.appendChild( _tableScrollSVGSlider );
		_tableScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderActiveColor) };
		_tableScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderColor) };
		_tableScrollSVGSlider.onmousedown = function(e) {
			e.stopPropagation();
			_tableScrollCaptured = true;
			_tableScrollCapturedAtX = e.x;
			_tableScrollXAtCapture = this.getBBox().x;
		}
	} else {
		_tableScrollSVGBkgr.setAttributeNS(null,'width',_tableScrollSVGWidth);
		_tableScrollSVGSlider.setAttributeNS(null,'width',sliderSize);
	}
}

function drawGanttHScroll( init ) {
	if( !init ) {
		init = false;
	}
	let overallWidth = _data.visibleMaxWidth;
	let visibleMaxLeft = (overallWidth > _ganttVisibleWidth) ? (_data.visibleMin + overallWidth - _ganttVisibleWidth) : _data.visibleMin;
	let sliderSize = (visibleMaxLeft > _data.visibleMin) ? (_ganttHScrollSVGWidth*_ganttVisibleWidth/overallWidth) : _ganttHScrollSVGWidth;
	if( sliderSize < _settings.scrollSliderSize ) {
		sliderSize = _settings.scrollSliderSize;
	}

	let sliderPosition;
	if( visibleMaxLeft > _data.visibleMin ) {
		sliderPosition = (_ganttVisibleLeft-_data.visibleMin) * (_ganttHScrollSVGWidth-sliderSize) / (visibleMaxLeft-_data.visibleMin);
	} else {
		sliderPosition = 0;
	}
	if( init ) {
		let bbox = _ganttHScrollSVG.getBBox();
		_ganttHScrollSVGBkgr = createRect( 0, 0, _ganttHScrollSVGWidth, _ganttHScrollSVGHeight, 
			{ id:('ganttHScrollSVGBkgr'), fill:_settings.scrollBkgrColor, stroke:_settings.scrollRectColor, strokeWidth:1 } );
		_ganttHScrollSVGBkgr.setAttributeNS(null,'cursor','pointer');
		_ganttHScrollSVGBkgr.onmousedown = onGanttHScrollSVGBkgr;
		_ganttHScrollSVGSlider = createRect( sliderPosition, 0, sliderSize, _ganttHScrollSVGHeight, 
			{ id:('ganttHScrollSVGSlider'), fill:_settings.scrollSliderColor } );
		_ganttHScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		_ganttHScrollSVG.appendChild( _ganttHScrollSVGBkgr );
		_ganttHScrollSVG.appendChild( _ganttHScrollSVGSlider );
		_ganttHScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderActiveColor); };
		_ganttHScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderColor) };
		_ganttHScrollSVGSlider.onmousedown = function(e) {
			_ganttHScrollCaptured = true;
			_ganttHScrollCapturedAtX = e.x;
			_ganttHScrollXAtCapture = this.getBBox().x;
		}
	} else {
		_ganttHScrollSVGBkgr.setAttributeNS(null,'width',_ganttHScrollSVGWidth);
		_ganttHScrollSVGSlider.setAttributeNS(null,'width',sliderSize);
		_ganttHScrollSVGSlider.setAttributeNS(null,'x',sliderPosition);
	}
}


function drawVerticalScroll( init ) {
	if( !init ) {
		init = false;
	}
	let overallHeight = _data.operations.length;
	let visibleMaxTop = (overallHeight > _ganttVisibleHeight) ? (overallHeight - _ganttVisibleHeight) : 0;
	let sliderSize = (visibleMaxTop > 0) ? (_verticalScrollSVGHeight*_ganttVisibleHeight/overallHeight) : _verticalScrollSVGHeight;
	if( sliderSize < _settings.scrollSliderSize ) {
		sliderSize = _settings.scrollSliderSize;
	}
	let sliderPosition;
	if( visibleMaxTop > 0 ) {
		sliderPosition = _ganttVisibleTop * (_verticalScrollSVGHeight-sliderSize) / visibleMaxTop;
	} else {
		sliderPosition = 0;
	}
	if( init ) {
		let bbox = _verticalScrollSVG.getBBox();
		_verticalScrollSVGBkgr = createRect( 0, 0, _verticalScrollSVGWidth, _verticalScrollSVGHeight, 
			{ id:('verticalScrollSVGBkgr'), fill:_settings.scrollBkgrColor, stroke:_settings.scrollRectColor, strokeWidth:1 } );
		_verticalScrollSVGBkgr.setAttributeNS(null,'cursor','pointer');
		_verticalScrollSVGBkgr.onmousedown = onVerticalScrollSVGBkgr;
		_verticalScrollSVGSlider = createRect( 0, sliderPosition, _verticalScrollSVGWidth, sliderSize, 
			{ id:('verticalScrollSVGSlider'), fill:_settings.scrollSliderColor } );
		_verticalScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		_verticalScrollSVG.appendChild( _verticalScrollSVGBkgr );
		_verticalScrollSVG.appendChild( _verticalScrollSVGSlider );
		_verticalScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderActiveColor) };
		_verticalScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderColor) };
		_verticalScrollSVGSlider.onmousedown = function(e) {
			_verticalScrollCaptured = true;
			_verticalScrollCapturedAtY = e.y;
			_verticalScrollYAtCapture = this.getBBox().y;
		}
	} else {
		_verticalScrollSVGSlider.setAttributeNS(null,'height',sliderSize);
		_verticalScrollSVGSlider.setAttributeNS(null,'y',sliderPosition);
	}
}


function zoomX( zoomFactorChange, zoomPositionChange, centerOfZoom=0.5 ) {
	if( (zoomFactorChange == null || zoomFactorChange == '100%') && zoomPositionChange == null ) {
		_ganttVisibleLeft = _data.visibleMin;
		_ganttVisibleWidth = _data.visibleMaxWidth;
		_zoomGanttHorizontalInput.value = 100;
		setCookie("ganttVisibleLeft",_ganttVisibleLeft);
		setCookie("ganttVisibleWidth",_ganttVisibleWidth);
		return;
	} 
	if( zoomFactorChange != null && zoomPositionChange == null ) {
		//if( _ganttVisibleWidth >= _data.visibleMaxWidth && zoomFactorChange < 0.0 ) {
		//	return;
		//}
		let currentZoomFactor = _data.visibleMaxWidth / _ganttVisibleWidth;
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
		let newLeft = _ganttVisibleLeft - (newWidth - _ganttVisibleWidth) * centerOfZoom;				
		if( newLeft < _data.visibleMin ) {
			newLeft = _data.visibleMin;
		} else if( newLeft + newWidth > _data.visibleMax ) {
			newLeft = _data.visibleMin;
		}
		_ganttVisibleLeft = newLeft;
		_ganttVisibleWidth = newWidth;
		_zoomGanttHorizontalInput.value = parseInt(newZoomFactor*100.0 + 0.5);
		setCookie("ganttVisibleLeft",_ganttVisibleLeft);
		setCookie("ganttVisibleWidth",_ganttVisibleWidth);
		return;
	}
	if( zoomFactorChange == null && zoomPositionChange != null ) {
		_ganttVisibleLeft = validateGanttLeft(_ganttVisibleLeft + zoomPositionChange);
		setCookie("ganttVisibleLeft",_ganttVisibleLeft);
		return;
	}
}

function validateGanttLeft( left ) {
	if( left < _data.visibleMin ) {
		left = _data.visibleMin;
	} else if( left + _ganttVisibleWidth > _data.visibleMax ) {
		left = _data.visibleMax - _ganttVisibleWidth;
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
		_ganttVisibleTop = 0;
		_ganttVisibleHeight = _data.operations.length;
		_zoomGanttVerticalInput.value = 100;
		setCookie("ganttVisibleTop",_ganttVisibleTop);
		setCookie("ganttVisibleHeight",_ganttVisibleHeight);
		return;
	} 
	if( zoomFactorChange !== null && zoomPositionChange === null ) {
		if( _ganttVisibleHeight >= _data.operations.length && zoomFactorChange > 1.0 ) {
			return;
		}
		let currentZoomFactor = _data.operations.length / _ganttVisibleHeight;
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
		let newY = _ganttVisibleTop - (newHeight - _ganttVisibleHeight) * centerOfZoom;	
		if( newY < 0 ) {
			newY = 0;
		} else if( newY + newHeight > _data.operations.length ) {
			newY = 0;
		}
		_ganttVisibleTop = newY;
		_ganttVisibleHeight = newHeight;
		_zoomGanttVerticalInput.value = parseInt(newZoomFactor*100.0 + 0.5);
		setCookie("ganttVisibleTop",_ganttVisibleTop);
		setCookie("ganttVisibleHeight",_ganttVisibleHeight);
		return;
	} 
	if( zoomFactorChange === null && zoomPositionChange !== null ) {
		let newY = _ganttVisibleTop + zoomPositionChange;
		if( newY < 0 ) {
			newY = 0;
		} else if( newY + _ganttVisibleHeight > _data.operations.length ) {
			newY = _data.operations.length - _ganttVisibleHeight;
		}
		_ganttVisibleTop = newY;
		setCookie("ganttVisibleTop",_ganttVisibleTop);
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
		zoomXR( zoomFactorChange, null, (e.clientX - _ganttSVG.getAttributeNS(null,'x')) / _ganttSVGWidth );
	} else {
		let change = _ganttVisibleWidth * _settings.timeScaleScrollStep;
		if( delta < 0 ) {
			change = -change;
		}
		zoomXR( null, change );		
	}
}

function onGanttHScrollSVGBkgr(e) {
	let x = parseInt( _ganttHScrollSVGSlider.getAttributeNS(null,'x') ) + parseInt( _ganttHScrollSVG.getAttributeNS(null,'x') ) + _containerDivX;
	let step = _ganttVisibleWidth * _settings.timeScaleScrollStep;
	if( e.x < x ) {
		zoomXR( null, -step );		
	} else if( e.x > x + parseInt( _ganttHScrollSVGSlider.getAttributeNS(null,'width') ) ) {
		zoomXR( null, step );		
	}
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
	_tableVisibleLeft = parseInt(_tableVisibleLeft + step * moveTo);
	if( _tableVisibleLeft > maxVisibleLeft ) {
		_tableVisibleLeft = maxVisibleLeft;
	} else if( _tableVisibleLeft < 0 ) {
		_tableVisibleLeft = 0;
	}
	newSliderX = _tableVisibleLeft * (_tableScrollSVGWidth - _tableScrollSVGSlider.getBBox().width) / maxVisibleLeft;
	_tableScrollSVGSlider.setAttributeNS( null,'x', newSliderX );
	drawTableHeader();
	drawTableContent();
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
		zoomYR( zoomFactorChange, null, y / _ganttSVGHeight );
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
	let bbox = _verticalScrollSVGSlider.getBBox();
	let mouseYRelative = e.y - _containerDivY - _tableHeaderSVGHeight;
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
	zoomX( null, null );
	zoomY( null, null );
	drawGantt();
	drawTimeScale();
	drawGanttHScroll();
	drawTableContent();
	drawVerticalScroll();
}


function timeToScreen( timeInSeconds ) {
	let availableSVGWidth = _ganttSVGWidth - _settings.ganttChartLeftMargin - _settings.ganttChartRightMargin;
	return _settings.ganttChartLeftMargin + (timeInSeconds - _ganttVisibleLeft) * availableSVGWidth / _ganttVisibleWidth; 
}

function timeToScreenInt( timeInSeconds ) {
	let x = timeToScreen(timeInSeconds);
	return parseInt(x+0.5); 
}

function screenToTime( screenX ) {
	let xNotScaled = _ganttVisibleLeft + screenX * (_ganttVisibleWidth - 1) / (_ganttSVGWidth-1);
}


function operToScreen( n ) {
	//return ( ( n ) * _ganttSVGHeight )/ _data.operations.length; 
	return ( n - _ganttVisibleTop) * _ganttSVGHeight / (_ganttVisibleHeight+0.5); 
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


function calcTableHeaderOverallWidth() {
	let w = 0; 
	for( let col = 0 ; col < _data.table.length ; col++ ) {
		w += _data.table[col].width;
	}	
	_tableHeaderOverallWidth = w;
}