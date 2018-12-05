
var NS = "http://www.w3.org/2000/svg";

var _touchDevice = false;

var _data;

var _settings = {
	ganttOperation0Color:'#2f8f2f', ganttOperation0Opacity:1.0, ganttOperation100Color:'#7f7f7f', ganttOperation100Opacity:1.0,
	ganttPhaseColor:'#0f7f07f', ganttPhaseOpacity:1.0, ganttCriticalColor:'#bf2f2f', ganttOperationStrokeWidth:0, 
	ganttCompareColor:'#cfcfdf', ganttCompareOpacity:0.75,
	ganttFontColor:'#4f4f4f', timeScaleFontColor:'#4f4f4f', timeScaleFillColor:'#cfcfdf', timeScaleStrokeColor:'#afafaf',
	timeScaleMaxFontSize:12, minRectWidthOnTimeScale:14,
	ganttLinkStrokeColor:'#000000',	ganttLinkStrokeWidth:0.5, ganttLinkStrokeDashArray:null, 
	ganttLinkOpacity:0.50, ganttLinkArrowOpacity:1.0, ganttLinkArrowWidth:8, ganttLinkArrowHeight:8,
	tableHeaderFontColor:'#4f4f4f',	tableHeaderFillColor:'#cfcfdf',	tableHeaderStrokeColor:'#4f4f4f', 
	tableHeaderBorderColor:'#cfcfdf', tableHeaderActiveBorderColor:'#8f8f9f', 
	tableContentFontColor:'#4f4f4f', tableContentFillColor:'#ffffff', tableContentStrokeColor:'#4f4f4f', 
	tableColumnHMargin:1, tableColumnTextMargin:2, 
	tableMaxFontSize:12, expandMaxFontSize:32,
	scrollBkgrColor:'#cfcfcf', scrollRectColor:'#afafaf', scrollSliderColor:'#8f8f8f', scrollSliderActiveColor:'#000000',
	gridColor:"#bfbfbf", gridStrokeWidth:0.5, gridOpacity:1, gridStrokeDashArray:'2,2', gridCurrentTimeColor:"#bf2f2f",
	editedColor:"#bf2f2f",
	ganttChartLeftMargin:8, ganttChartRightMargin:8, 
	ganttRectTopMargin:0.7, ganttRectBottomMargin:0.0, ganttRectTopMarginTitleFree:0.5, ganttRectBottomMarginTitleFree:0.0,
	ganttCompareTopMargin:0.5, ganttCompareBottomMargin:0.3, ganttCompareTopMarginTitleFree:0.1, ganttCompareBottomMarginTitleFree:0.5,
	ganttRectBracketRelHeight:0.25,	ganttRectBracketThick:5,
	scrollThick:10, scrollSliderSize:10, timeScaleScrollStep:0.1, tableScrollStep:0.1, verticalSplitterInitialPosition:0.25,
	verticalSplitterWidth:6, verticalSplitterStrokeColor:'#4f4f4f', verticalSplitterBkgrColor:'#dfdfdf',
	zoomFactor:0.25, containerHPadding:2, 
	minDayWidthOnTimeScale:12, minVisibleFontSize:6, minTableColumnWidth:4, hierarchyIndent:4,
	webExportLineNumberColumnName:'f_WebExportLineNumber',
	ganttSVGCursor:'zoom-in', ganttSVGCapturedCursor:'pointer', timeSVGCursor:'zoom-in'
}

var _files = { gantt:"gantt.php", logout:"logout.php", userDataFile: "gantt_user_data.php", userDataSave:"gantt_save_user_data.php" };

var _zoomGanttHorizontalInput = null;
var _zoomGanttVerticalInput = null; 
var _zoomTableVerticalInput = null; 
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

var _visibleTop;      // Gantt & Table top visible operation 
var _visibleHeight;   // Gantt & Table visible operations number
var _notHiddenOperationsLength=0;

var _ganttSVGWidth;
var _ganttSVGHeight;
var _ganttVisibleLeft;
var _ganttVisibleWidth;
var _ganttSVGBkgr = null;
var _ganttViewBoxLeft = 0;
var _ganttViewBoxTop = 0;

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

var _tableViewBoxLeft = 0; // 
var _tableViewBoxTop = 0;

var _ganttCaptured = false;
var _ganttCapturedAtX;
var _ganttLastFoundAtX;
var _ganttCapturedAtY;
var _ganttLastFoundAtY;
var _ganttCapturedLeft;
var _ganttCapturedTop;

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

window.addEventListener( "load", onWindowLoad );

window.addEventListener( "contextmenu", onWindowContextMenu );

window.addEventListener( "resize", onWindowResize );

window.addEventListener( "wheel", function(event) {
	if( event.ctrlKey ) {
		event.preventDefault();//prevent zoom
	}
});

window.addEventListener( 'mouseup', onWindowMouseUp, true );
//window.addEventListener( 'touchcancel', onWindowMouseUp, true );
//window.addEventListener( 'touchend', onWindowMouseUp, true );

window.addEventListener( 'mousemove', onWindowMouseMove );
//window.addEventListener( 'touchmove', onWindowMouseMove );

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
						displayMessageBox( _texts['en'].errorParsingData ); 
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
					displayMessageBox( _texts['en'].errorLoadingData ); 
				}
		    }
		};
		xmlhttp.open("GET", _files.gantt, true);
		xmlhttp.setRequestHeader("Cache-Control", "no-cache");
		xmlhttp.send();
		displayMessageBox( _texts['en'].waitDataText ); 
	} 
}

function displayData() {	
	displayHeaderAndFooterInfo();	
	drawAll();
}

function drawAll() {
	drawTableHeader(true);
	drawTableContent(true);
	drawTimeScale();
	drawGantt(true);
	drawTableScroll( true );
	drawGanttHScroll( true );
	drawVerticalScroll( true );			
	drawVerticalSplitter( true );	
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
		d.colorFont = decColorToString( d.f_FontColor, _settings.tableContentStrokeColor );
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

	// Handling table columns widths
	for( let col = 0 ; col < _data.table.length ; col++ ) { // Recalculating widths in symbols into widths in points 
		let add = _settings.tableColumnHMargin*2 + _settings.tableColumnTextMargin*2;
		_data.table[col].width = _data.table[col].width * _settings.tableMaxFontSize*0.8 + add;
	}
	_data.initialTable = []; // Saving table settings loaded from a local version of Spider Project
	copyArrayOfObjects( _data.table, _data.initialTable );
	// Reading cookies to init interface elements.
	for( let col = 0 ; col < _data.table.length ; col++ ) {
		let widthValue = getCookie( _data.table[col].ref + "Width", 'int' );
		if( widthValue ) {
			_data.table[col].width = widthValue;
		}
	}

	// Reading and assigning the positions of columns.
	let failed = false;
	for( let col = 0 ; col < _data.table.length ; col++ ) {
		let pos = getCookie( _data.table[col].ref + "Position", 'int' );
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
					moveElementInsideArrayOfObjects( _data.table, cookie, moveTo );
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

	calcNotHiddenOperationsLength();

	// Initializing vertical zoom
	_visibleTop = 0;
	_visibleHeight = _notHiddenOperationsLength;
	let gvh = getCookie('ganttVisibleHeight', 'float');
	if( gvh ) {
		if( gvh > 0 ) {
			_visibleHeight = gvh;
		}	
	}
	let gvt = getCookie('ganttVisibleTop', 'float');
	if( gvt ) {
		if( (gvt + _visibleHeight) <= _data.operations.length ) {
			_visibleTop = gvt;
		}	
	}
	let zoomFactorY = _notHiddenOperationsLength / _visibleHeight;
	_zoomGanttVerticalInput.value = parseInt(zoomFactorY*100.0 + 0.5);
	_zoomTableVerticalInput.value = _zoomGanttVerticalInput.value;

	// Initializing horizontal zoom
	_ganttVisibleLeft = _data.visibleMin;
	_ganttVisibleWidth = _data.visibleMaxWidth;
	let gvw = getCookie('ganttVisibleWidth', 'float');
	if( gvw ) {
		if( gvw > 60*60 ) {
			_ganttVisibleWidth = gvw;
		}	
	}
	let gvl = getCookie('ganttVisibleLeft', 'float');
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
	_zoomGanttHorizontalInput = document.getElementById('toolboxHScale');
	_zoomGanttVerticalInput = document.getElementById('toolboxVScale'); 
	_zoomTableVerticalInput = document.getElementById('toolboxVScaleT'); 
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

	_zoomTableVerticalInput.oninput = onZoomVerticalInput;

	// To scroll the table vertically - using the same handler as for the gantt chart... 
	addOnMouseWheel( _tableContentSVG, onGanttWheel );
	if( _inputOnly ) {
		document.getElementById('toolboxZoom100').style.display = 'none';
		document.getElementById('toolboxZoomHorizontally').style.display = 'none';
		document.getElementById('toolboxZoomVertically').style.display = 'none';
		document.getElementById('toolboxLinks').style.display = 'none';
		return;
	}

	_verticalSplitterSVG.addEventListener('mousedown', onVerticalSplitterSVGMouseDown );
	//_verticalSplitterSVG.addEventListener('touchstart', onVerticalSplitterSVGMouseDown );

	// Gantt chart
	_ganttSVG.addEventListener( "mousedown", onGanttMouseDown );
	//_ganttSVG.addEventListener( "touchstart", onGanttMouseDown );
	_ganttSVG.addEventListener( "mousemove", onGanttCapturedMouseMove );
	//_ganttSVG.addEventListener( "touchmove", onGanttCapturedMouseMove );
	//_ganttSVG.addEventListener( "mouseup", onGanttCapturedMouseUp );
	//_ganttSVG.addEventListener( "dblclick", onGanttDblClick );
	addOnMouseWheel( _ganttSVG, onGanttWheel );
	_ganttSVG.style.cursor = _settings.ganttSVGCursor;

	// Time scale
	_timeSVG.addEventListener('mousedown', onGanttMouseDown);
	//_timeSVG.addEventListener('touchstart', onGanttMouseDown);
	_timeSVG.addEventListener('mousemove', onGanttCapturedMouseMove);
	//_timeSVG.addEventListener('touchmove', onGanttCapturedMouseMove);
	//_timeSVG.addEventListener( "dblclick", onGanttDblClick );
	addOnMouseWheel( _timeSVG, onTimeWheel );	
	_timeSVG.style.cursor = _settings.timeSVGCursor;

	// zoom tools
	_zoomGanttHorizontalInput.oninput = onZoomHorizontalInput;
	_zoomGanttVerticalInput.oninput = onZoomVerticalInput;

	_displayLinksCheckbox.onchange = function() { drawGantt(); };

	createDefs( _containerSVG );

	return true;
}


function zoomXYR( e, zoomIn, xOnly=false ) {
	let zoomFactorChange;
	if( zoomIn ) {
		zoomFactorChange = _settings.zoomFactor;
	} else {
		zoomFactorChange = -_settings.zoomFactor;
	}
	let x = (e.clientX - _ganttSVG.getAttributeNS(null,'x')); // To calculate x-location of click
	zoomX( zoomFactorChange,  x / _ganttSVGWidth );
	if( !xOnly ) {
		let y = e.clientY - getElementPosition(_containerDiv).y - _ganttSVG.getAttributeNS(null,'y'); // To calculate y-location of click
		zoomY( zoomFactorChange, y / _ganttSVGHeight );	
	} 

	drawGantt();
	drawTimeScale();
	drawGanttHScroll();	
	if( !xOnly ) {
		drawTableContent();		
		drawVerticalScroll();
	}
}


function initLayoutCoords() {
	_containerDivY = getElementPosition(_containerDiv).y;
	if( window.innerHeight < 600 ) {
		document.documentElement.style.setProperty('--toolbox-table-height', '42px');
		document.documentElement.style.setProperty('--toolbox-td-height', '38px');
		document.documentElement.style.setProperty('--toolbox-font-size', '18px');
		document.documentElement.style.setProperty('--toolbox-input-width', '64px');
		document.documentElement.style.setProperty('--toolbox-input-font-size', '18px');
		_containerDivHeight = window.innerHeight - _containerDivY - _settings.scrollThick - 42;
	} else {
		document.documentElement.style.setProperty('--toolbox-table-height', '22px');
		document.documentElement.style.setProperty('--toolbox-td-height', '20px');
		document.documentElement.style.setProperty('--toolbox-font-size', '14px');
		document.documentElement.style.setProperty('--toolbox-input-width', '44px');
		document.documentElement.style.setProperty('--toolbox-input-font-size', '14px');
		_containerDivHeight = window.innerHeight - _containerDivY - _settings.scrollThick - 22;
	}

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
	if( !_inputOnly ) {
		_tableHeaderSVGWidth = _containerDivWidth * _verticalSplitterPosition;
	} else {		
		_tableHeaderSVGWidth = _containerDivWidth - _settings.scrollThick - _settings.verticalSplitterWidth;
	}
	_tableHeaderSVG.setAttributeNS(null, 'width', _tableHeaderSVGWidth ); // window.innerWidth * 0.1 );
	_tableHeaderSVGHeight = _containerDivHeight * 0.07;
	_tableHeaderSVG.setAttributeNS(null, 'height', _tableHeaderSVGHeight ); 
    _tableHeaderSVG.setAttribute('viewBox', `${_tableViewBoxLeft} 0 ${_tableHeaderSVGWidth} ${_tableHeaderSVGHeight}`);

	// Table Content
	_tableContentSVG.setAttributeNS(null, 'x', 0 );
	_tableContentSVG.setAttributeNS(null, 'y', _tableHeaderSVGHeight ); 
	_tableContentSVGWidth = _tableHeaderSVGWidth;
	_tableContentSVG.setAttributeNS(null, 'width', _tableContentSVGWidth ); // window.innerWidth * 0.1 );
	_tableContentSVGHeight = _containerDivHeight - _tableHeaderSVGHeight - _settings.scrollThick;
	_tableContentSVG.setAttributeNS(null, 'height', _tableContentSVGHeight ); 
    _tableContentSVG.setAttribute('viewBox', `${_tableViewBoxLeft} ${_tableViewBoxTop} ${_tableContentSVGWidth} ${_tableContentSVGHeight}`);

	// Vertical Splitter
	_verticalSplitterSVG.setAttributeNS(null, 'x', _tableContentSVGWidth );
	_verticalSplitterSVG.setAttributeNS(null, 'y', 0 ); 
	_verticalSplitterSVGWidth = _settings.verticalSplitterWidth; //_containerDivWidth * 0.005;
	_verticalSplitterSVG.setAttributeNS(null, 'width', _verticalSplitterSVGWidth ); // window.innerWidth * 0.9 );
	_verticalSplitterSVGHeight = _containerDivHeight - _settings.scrollThick;
	_verticalSplitterSVG.setAttributeNS(null, 'height', _containerDivHeight ); //window.innerHeight/2 ); 

	// Gantt chart
	_ganttSVG.setAttributeNS(null, 'x', _tableContentSVGWidth + _verticalSplitterSVGWidth );
	_ganttSVG.setAttributeNS(null, 'y', _tableHeaderSVGHeight ); 
	_ganttSVGWidth = _containerDivWidth - (_tableContentSVGWidth + _verticalSplitterSVGWidth) - _settings.scrollThick;
	if(_ganttSVGWidth < 0 ) {
		_ganttSVGWidth = 0;
	}
	_ganttSVG.setAttributeNS(null, 'width', _ganttSVGWidth ); // window.innerWidth * 0.9 );
	_ganttSVGHeight = _tableContentSVGHeight;
	if( _ganttSVGHeight < 0 ) {
		_ganttSVGHeight = 0;
	}
	_ganttSVG.setAttributeNS(null, 'height', _ganttSVGHeight ); //window.innerHeight/2 );
    _ganttSVG.setAttribute('viewBox', `${_ganttViewBoxLeft} ${_ganttViewBoxTop} ${_ganttSVGWidth} ${_ganttSVGHeight}`);

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


function displayHeaderAndFooterInfo() {
	let projectName = document.getElementById('projectName');
	projectName.innerText = _data.proj.Name;

	let timeAndVersion = _data.proj.CurTime + " | " + _texts[_data.lang].version + ": " + _data.proj.ProjVer;
	document.getElementById('projectTimeAndVersion').innerText = timeAndVersion;
	if( _data.userName !== null ) {
		let el = document.getElementById('projectUser');
		el.innerHTML = _data.userName + "<br/><a href='" + _files.logout + "' title='Logout'>[&rarr;]</a>";
	}

	document.getElementById('helpTitle').innerText = _texts[_data.lang].helpTitle; // Initializing help text	
	document.getElementById('helpText').innerHTML = _texts[_data.lang].helpText; // Initializing help text	

	document.getElementById('toolboxResetTableDimensions').title = _texts[_data.lang].resetTableDimensionsTitle;
	document.getElementById('toolboxZoom100').title = _texts[_data.lang].zoom100Title;
	document.getElementById('toolboxZoomVertically').title = _texts[_data.lang].zoomVerticallyTitle;
	document.getElementById('toolboxZoomHorizontally').title = _texts[_data.lang].zoomHorizontallyTitle;
	document.getElementById('toolboxLinks').title = _texts[_data.lang].displayLinksTitle;
}


function calcNotHiddenOperationsLength() {
	let numVisible = 0;
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		if( _data.operations[i].visible ) {
			numVisible += 1;
		}
	}
	_notHiddenOperationsLength = numVisible;
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
		statusText = _texts[_data.lang].status0;
	} else if( _data.operations[i].status < 100 ) {
		statusText = _data.operations[i].status + "%";
	} else {
		statusText = _texts[_data.lang].status100;				
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
							content = "<span style='text-decoration:line-through;'>" + content + "</span>"
						}
						newValue = "<span style='font-style:italic; color:" + _settings.editedColor + "'>" + '✎' + newValue + "</span>";
					} else {
						if( content === 'undefined' || content === null ) {
							content = '';
						}						
					}
					content += " => " + newValue;
				}
			}
		}
		// let name = _texts[_data.lang][ref];
		let name = _data.table[col].name;
		if( html ) {
			name = "<span style='color:#7f7f7f;'>" + name + "</span>";
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
				let lineNumber = userData[iU].data[_settings.webExportLineNumberColumnName];	// The line number inside the exported csv-
				// If the codes are the same and the numbers of lines are the same ...
				if( _data.operations[i].Code == userData[iU].operationCode && i == lineNumber ) {
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


function drawVerticalSplitter( init=false ) {
	if( _inputOnly ) {
		return;
	}
	if( init ) {
		while (_verticalSplitterSVG.hasChildNodes()) {
			_verticalSplitterSVG.removeChild(_verticalSplitterSVG.lastChild);
		}		
		_verticalSplitterSVG.setAttributeNS(null,'cursor','col-resize');	
		_verticalSplitterSVGBkgr = createRect( 0, 0, _verticalSplitterSVGWidth, _verticalSplitterSVGHeight, 
				{ strokeWidth:1, stroke:_settings.verticalSplitterStrokeColor, fill:_settings.verticalSplitterBkgrColor } ); 
		_verticalSplitterSVG.appendChild( _verticalSplitterSVGBkgr );					
	}
}


function zoomX100() {
	_ganttVisibleLeft = _data.visibleMin;
	_ganttVisibleWidth = _data.visibleMaxWidth;
	_zoomGanttHorizontalInput.value = 100;
	setCookie("ganttVisibleLeft",_ganttVisibleLeft);
	setCookie("ganttVisibleWidth",_ganttVisibleWidth);	
}


function moveX( positionChange ) {
	_ganttVisibleLeft = validateGanttLeft(_ganttVisibleLeft + positionChange);
	setCookie("ganttVisibleLeft",_ganttVisibleLeft);
}

function moveXR( positionChange ) {
	moveX( positionChange );
	drawGantt(false,true);
	drawTimeScale();
	drawGanttHScroll();
}


function zoomX( zoomFactorChange, centerOfZoom=0.5 ) {
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
}

function zoomXR( factorChange, centerOfZoom=0.5 ) { // Zoom and redraw
	zoomX( factorChange, centerOfZoom );		
	drawTimeScale();
	drawGantt();
	drawGanttHScroll();	
}

function validateGanttLeft( left ) {
	if( left < _data.visibleMin ) {
		left = _data.visibleMin;
	} else if( left + _ganttVisibleWidth > _data.visibleMax ) {
		left = _data.visibleMax - _ganttVisibleWidth;
	}
	return left;
}

function zoomY100() {
	_visibleTop = 0;
	_visibleHeight = _notHiddenOperationsLength; // _data.operations.length;
	_zoomGanttVerticalInput.value = 100;
	_zoomTableVerticalInput.value = 100;
	setCookie("ganttVisibleTop",_visibleTop);
	setCookie("ganttVisibleHeight",_visibleHeight);
} 

function moveY( positionChange ) {
	let newY = _visibleTop + positionChange;
	if( newY < 0 ) {
		newY = 0;
	} else if( newY + _visibleHeight > _notHiddenOperationsLength ) {
		newY = _notHiddenOperationsLength - _visibleHeight;
	}
	_visibleTop = newY;
	setCookie("ganttVisibleTop",_visibleTop);
}

function moveYR( positionChange ) {
	moveY( positionChange );
	drawGantt(false,true);
	drawTableContent(false,true);
	drawVerticalScroll();
}


function zoomY( zoomFactorChange, centerOfZoom=0.5 ) {
	let currentZoomFactor = _notHiddenOperationsLength / _visibleHeight;
	let newZoomFactor = currentZoomFactor + zoomFactorChange;
	if( !(newZoomFactor > 0) ) {
		return;
	}
	let newHeight = _notHiddenOperationsLength / newZoomFactor;
	if( newHeight < 1 && zoomFactorChange < 1.0 ) {
		return;
	}
	if( centerOfZoom < 0.1 ) {
		centerOfZoom = 0.0;
	} else if ( centerOfZoom > 0.9 ) {
		centerOfZoom = 1.0;
	} 
	let newY = _visibleTop - (newHeight - _visibleHeight) * centerOfZoom;	
	if( newY < 0 ) {
		newY = 0;
	} else if( newY + newHeight > _notHiddenOperationsLength ) {
		newY = 0;
	}
	_visibleTop = newY;
	_visibleHeight = newHeight;
	_zoomGanttVerticalInput.value = parseInt(newZoomFactor*100.0 + 0.5);
	_zoomTableVerticalInput.value = parseInt(newZoomFactor*100.0 + 0.5);
	setCookie("ganttVisibleTop",_visibleTop);
	setCookie("ganttVisibleHeight",_visibleHeight);
}

function zoomYR( factorChange, centerOfZoom=0.5 ) {
	zoomY( factorChange, centerOfZoom );		
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


function timeToScreen( timeInSeconds, absoluteMin=true ) {
	let availableSVGWidth = _ganttSVGWidth - _settings.ganttChartLeftMargin - _settings.ganttChartRightMargin;
	let min;
	if( absoluteMin ) {
		min = _data.visibleMin;
	} else {
		min = _ganttVisibleLeft;
	}
	return _settings.ganttChartLeftMargin + (timeInSeconds - min) * availableSVGWidth / _ganttVisibleWidth; 
}

function timeToScreenInt( timeInSeconds ) {
	let x = timeToScreen(timeInSeconds);
	return parseInt(x+0.5); 
}

function screenToTime( screenX ) {
	let xNotScaled = screenX * (_ganttVisibleWidth - 1) / (_ganttSVGWidth-1);
}


function operToScreen( n ) {
	return n * _ganttSVGHeight / (_visibleHeight+0.5); 
} 


function calcTableHeaderOverallWidth() {
	let w = 0; 
	for( let col = 0 ; col < _data.table.length ; col++ ) {
		w += _data.table[col].width;
	}	
	_tableHeaderOverallWidth = w;
}


function calcNumberOfVisibleOperations() {
	let n = 0;
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		if(_data.operations[i].visible ) {
			n++;
		}
	}	
	_data.numberOfVisibleOperations = n;
}


function restoreTableColumnOrderAndWidths() {
	copyArrayOfObjects( _data.initialTable, _data.table );
	drawTableHeader(true);
	drawTableContent(true);
	drawTableScroll();
	for( let cookie = 0 ; cookie < _data.table.length ; cookie++ ) {
		let cname = _data.table[cookie].ref+"Position";
		if( getCookie(cname) != null ) {
			deleteCookie( cname );
		}
		cname = _data.table[cookie].ref+"Width";
		if( getCookie(cname) != null ) {
			deleteCookie( cname );
		}
	}
}
