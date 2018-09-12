
var NS = "http://www.w3.org/2000/svg";

var data;

var dataSrc = {
	'proj': { 'Code':'Project-1', 'Name':'The name of the project may be tha-a-a-a-a-a-a-a-a-a-t long...', 
		'projVer':'1.0', 'curTime':'09.02.2007 08:00' },
	'operations': [
		{ 'Level':1, 'Code':'1', 'Name':'Phase 1', 
			'Start':'01.01.2007  08:00', 'Fin':'17.01.2007  16:00',
			'FactStart':'01.01.2007  08:00', 'FactFin':'17.01.2007  16:00', 
			'AsapStart':'01.01.2007  08:00', 'AsapFin':'17.01.2007  08:00', 
			'Start_COMP':'01.01.2007  08:00', 'Fin_COMP':'15.01.2007  16:00', // To compare with
			'f_Critical':1, 'CostTotal':100, 'VolSum':1000, 'DurSumD':24, 'Notes':'This is a note for 1' },
		{ 'Level':null, 'Code':'1-1', 'Name':'Operation 1-1', 
			'Start':'01.01.2007  08:00', 'Fin':'17.01.2007  16:00',
			'FactStart':'01.01.2007  08:00', 'FactFin':'17.01.2007  16:00', 
			'AsapStart':'01.01.2007  08:00', 'AsapFin':'17.01.2007  10:00', 
			'Start_COMP':'01.01.2007  08:00', 'Fin_COMP':'15.01.2007  16:00', // To compare with
			'f_Critical':1, 'CostTotal':100, 'VolSum':1300, 'DurSumD':20, 'Notes':'This is a note for 1-1' },
		{ 'Level':null, 'Code':'1-2', 'Name':'Operation 1-2', 
			'Start':'09.01.2007  08:00', 'Fin':'15.01.2007  16:00',
			'FactStart':'09.01.2007  08:00', 'FactFin':'15.01.2007  16:00', 
			'AsapStart':'09.01.2007  08:00', 'AsapFin':'15.01.2007  08:00', 
			'Start_COMP':null, 'Fin_COMP':null, 
			'f_Critical':null, 'CostTotal':100, 'VolSum':1004, 'DurSumD':23, 'Notes':'This is a note for 1-2' },
		{ 'Level':1, 'Code':'2', 'Name':'Phase 2', 
			'Start':'15.01.2007  08:00', 'Fin':'12.02.2007  10:00',		
			'FactStart':'15.01.2007  08:00', 'FactFin':null, 
			'AsapStart':'21.01.2007  08:00', 'AsapFin':'12.02.2007  10:00', 
			'Start_COMP':null, 'Fin_COMP':null, 
			'f_Critical':null, 'CostTotal':100, 'VolSum':1000, 'DurSumD':23, 'Notes':'This is a note for 2' },
		{ 'Level':null, 'Code':'2-1', 'Name':'Operation 2-1', 
			'Start':'15.01.2007  08:00', 'Fin':'20.01.2007  16:00',		
			'FactStart':'15.01.2007  08:00', 'FactFin':'20.01.2007  16:00', 
			'AsapStart':'15.01.2007  08:00', 'AsapFin':'20.01.2007  10:00', 
			'Start_COMP':null, 'Fin_COMP':null, 'f_Critical':null, 'CostTotal':100, 'VolSum':3400, 'DurSumD':10, 'Notes':'' },
		{ 'Level':null, 'Code':'2-2', 'Name':'Operation 2-2', 
			'Start':'20.01.2007  08:00', 'Fin':'23.01.2007  10:00',		
			'FactStart':'20.01.2007  08:00', 'FactFin':null, 'AsapStart':'21.01.2007  08:00', 'AsapFin':'23.01.2007  10:00', 
			'Start_COMP':null, 'Fin_COMP':null, 'f_Critical':1, 'CostTotal':100, 'VolSum':1540, 'DurSumD':20, 'Notes':''  },
		{ 'Level':null, 'Code':'2-3', 'Name':'Operation 2-3', 
			'Start':'21.01.2007  08:00', 'Fin':'12.02.2007  10:00',		
			'FactStart':null, 'FactFin':null, 'AsapStart':'21.01.2007  08:00', 'AsapFin':'12.02.2007  10:00', 
			'Start_COMP':null, 'Fin_COMP':null, 'f_Critical':1, 'CostTotal':100, 'VolSum':1050, 'DurSumD':21, 'Notes':''  },
		{ 'Level':1, 'Code':'3', 'Name':'Phase 3', 
			'Start':'25.01.2007  08:00', 'Fin':'24.03.2007  10:00',		
			'FactStart':'25.01.2007  08:00', 'FactFin':null, 
			'AsapStart':'10.02.2007  08:00', 'AsapFin':'24.03.2007  10:00', 
			'Start_COMP':null, 'Fin_COMP':null, 'f_Critical':null, 'CostTotal':100, 'VolSum':1000, 'DurSumD':23, 'Notes':'' },
		{ 'Level':null, 'Code':'3-1', 'Name':'Operation 3-1', 
			'Start':'25.01.2007  08:00', 'Fin':'10.03.2007  16:00',		
			'FactStart':'25.01.2007  08:00', 'FactFin':'10.03.2007  16:00', 
			'AsapStart':'25.01.2007  08:00', 'AsapFin':'10.01.2007  10:00', 
			'Start_COMP':null, 'Fin_COMP':null, 'f_Critical':null, 'CostTotal':100, 'VolSum':3400, 'DurSumD':10, 'Notes':'' },
		{ 'Level':null, 'Code':'3-2', 'Name':'Operation 3-2', 
			'Start':'02.02.2007  08:00', 'Fin':'24.03.2007  10:00',		
			'FactStart':'02.02.2007  08:00', 'FactFin':null, 
			'AsapStart':'10.02.2007  08:00', 'AsapFin':'24.03.2007  10:00', 
			'Start_COMP':null, 'Fin_COMP':null, 'f_Critical':null, 'CostTotal':100, 'VolSum':1540, 'DurSumD':20, 'Notes':'' },
	],
	'opLinks': [
		{ 'PredCode':'2-1', 'SuccCode':'2-2', 'TypeSF':'FS', 'LagType':'time', 'LagUnit':'hour', 'Lag':10 },
		{ 'PredCode':'2-2', 'SuccCode':'2-3', 'TypeSF':'FF', 'LagType':'time', 'LagUnit':'hour', 'Lag':10 }
	],
	'editable': [ { 'ref':'Notes', 'type':'text' }, { 'ref':'CostTotal', 'type':'float' }, { 'ref':'VolSum', 'type':'float' } ]
};

var tableColumns = [ { name:'[]', ref:'expandColumn', width:30 }, { name:'Level', ref:'Level', width:40 },
	{ name:'Name', ref:'Name', width:80 }, { name:'Code', ref:'Code', width:80 }, 
	{ name:'Start', ref:'Start', width:80 }, { name:'Finish', ref:'Fin', width:80 }, 
	{ name:'Cost', ref:'CostTotal', width:80 }, { name:'Vol.', ref:'VolSum', width:80 }, 
	{ name:'Dur.', ref:'DurSumD', width:80 }, { name:'Notes', ref:'Notes', width:80 } ]; 

var settings = {
	ganttOperation0Color:'#2fdf2f', ganttOperation0Opacity:0.75,
	ganttOperation100Color:'#7f7f7f', ganttOperation100Opacity:0.75,
	ganttPhaseColor:'#0f7f07f', ganttPhaseOpacity:0.75,
	ganttCriticalColor:'#df2f2f', 
	ganttCompareColor:'#cfcfdf', ganttCompareOpacity:0.75,
	ganttFontColor:'#4f4f4f', timeScaleFontColor:'#4f4f4f', timeScaleFillColor:'#cfcfdf', timeScaleStrokeColor:'#afafaf',
	ganttLinkStrokeColor:'#000000',	ganttLinkStrokeWidth:1, ganttLinkStrokeDashArray:null, 
	ganttLinkOpacity:0.4, ganttLinkArrowWidth:10, ganttLinkArrowHeight:10,
	tableHeaderFontColor:'#4f4f4f',	tableHeaderFillColor:'#cfcfdf',	tableHeaderStrokeColor:'#4f4f4f', tableContentFontColor:'#4f4f4f',
	tableContentFillColor:'#ffffff', tableContentStrokeColor:'#4f4f4f',
	scrollBkgrColor:'#cfcfcf', scrollRectColor:'#afafaf', scrollSliderColor:'#8f8f8f', scrollSliderActiveColor:'#000000',
	gridColor:"#bfbfbf", gridStrokeWidth:0.5, gridOpacity:1, gridCurrentTimeColor:"#bf2f2f",
	ganttChartLeftMargin:8, ganttChartRightMargin:8, ganttRectTopMargin:0.7, ganttRectBottomMargin:0.0,
	ganttCompareTopMargin:0.5, ganttCompareBottomMargin:0.3,
	ganttRectBracketRelHeight:0.25,	ganttRectBracketThick:5,
	minDayWidthOnTimeScale:12,
	scrollThick:8, scrollSliderSize:10,
	verticalSplitterInitialPosition:0.25,
	initialZoomFactor:1.25,
	containerHPadding:0
}

var lang='ru';

var terms = { 
	'en': { operation:'Operation', phase:'Phase', status:'Status', resourse:'Resourse(s)', 
		expandColumn:'[]', Level:'Level', Name:'Name', Code:'Code', Start:'Start', Fin:'Finish', 
		CostTotal:'Cost', VolSum:'Volume', DurSumD:'Duration', 
		Notes:'Notes',status0:'Not started', status100:'Finished', statusNotFinished:'Under way',
		gantt:'Gantt', help:'Help', 
		monthNames:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		helpText:'<h1>Help</h1>The Gantt chart has been generated with the Spider Project Professional.',
		waitDataText:'PLEASE WAIT WHILE LOADING DATA...',
		waitSaveUserDataText:'PLEASE WAIT WHILE SAVING DATA...',
		errorLoadingData:'ERROR LOADING DATA...',
		errorParsingData:'DATA LOADED ARE INVALID...',
		errorParsingUserData:'DATA LOADED ARE INVALID...', 
		enterUserDataMessage: 'ENTER USER DATA HERE',
		unsynchronizedMessage: 'The data you entered has not been uploaded into Spider yet!' },
	'ru': { operation:'Îïåðàöèÿ', phase:'Ôàçà', status:'Ñîñòîÿíèå', resourse:'Ðåñóðñ(û)', 
		expandColumn:'[]', Level:'Óðîâåíü', Name:'Íàçâàíèå', Code:'Êîä', Start:'Ñòàðò', Fin:'Ôèíèø', 
		CostTotal:'Ñòîèìîñòü', VolSum:'Îáúåì', DurSumD:'Äëèòåëüíîñòü', 
		Notes:'Êîììåíòàðèé', status0:'Íå íà÷àòî', status100:'Çàâåðøåíî', statusNotFinished:'Íå çàâåðøåíî',
		gantt:'Ãàíòò', help:'Ñïðàâêà', 
		monthNames:['ßíâ','Ôåâ','Ìàð','Àïð','Ìàé','Èþíü','Èþëü','Àâã','Ñåí','Îêò','Íîÿ','Äåê'], 
		helpText:'<h1>Ñïðàâêà</h1>Äèàãðàììà Ãàíòòà ñîçäàíà ñ ïîìîùüþ èíòåãðèðîâàííîé ñèñòåìû óïðàâëåíèÿ ïðîåêòàìè Spider Project Professional.',
		waitDataText:'ÏÎÆÀËÓÉÑÒÀ ÏÎÄÎÆÄÈÒÅ, ÏÎÊÀ ÇÀÃÐÓÆÀÞÒÑß ÄÀÍÍÛÅ...',
		waitSaveUserDataText:'ÏÎÆÀËÓÉÑÒÀ, ÏÎÄÎÆÄÈÒÅ ÏÎÊÀ ÑÎÕÐÀÍßÞÒÑß ÄÀÍÍÛÅ...',
		errorLoadingData:'ÎØÈÁÊÀ ÏÐÈ ÇÀÃÐÓÇÊÅ ÄÀÍÍÛÕ...',
		errorParsingData:'ÇÀÃÐÓÆÅÍÍÛÅ ÄÀÍÍÛÅ ÈÑÊÀÆÅÍÛ...',
		errorParsingUserData:'ÇÀÃÐÓÆÅÍÍÛÅ ÄÀÍÍÛÅ ÈÑÊÀÆÅÍÛ...',
		enterUserDataMessage: 'USER DATA ÂÂÎÄßÒÑß ÑÞÄÀ',
		unsynchronizedMessage: 'Äàííûå, êîòîðûå âû ââåëè åùå íå áûëè çàãðóæåíû â Spider!' }
};

var blackOutBoxDiv = null;
var messageBoxDiv = null;
var messageBoxTextDiv = null;
var editBoxDiv = null;
var editBoxDetailsElem = null;
var editBoxOperationCodeElem = null;
var editBoxUserDataElem = null;
var editBoxOperationIndexElem = null;

var containerDiv = null;
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

var containerDivHeight, containerDivWidth;

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
var ganttCapturedAtY;

var verticalSplitterSVGWidth;
var verticalSplitterSVGHeight;
var verticalSplitterSVGBkgr=null;
var verticalSplitterCaptured=false;
var verticalSplitterCapturedAtX;
var verticalSplitterPosition = 0.25;

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
var gverticalScrollYAtCapture = -1;
var verticalScrollSVGSlider=null;
var verticalScrollSVGBkgr=null;

var ganttScrollSVGWidth, ganttScrollSVGHeight;
var verticalScrollSVGWidth, verticalScrollSVGHeight;

var zoomFactor = 1.25;

window.addEventListener( 'mouseup', function(e) { 
	if( timeCaptured ) { timeCaptured = false; } 
	if( ganttCaptured ) { ganttCaptured = false; } 
	if( verticalSplitterCaptured ) { verticalSplitterCaptured = false; } 
	if( tableScrollCaptured ) { tableScrollCaptured = false; }
	if( ganttHScrollCaptured ) { ganttHScrollCaptured = false; }
	if( verticalScrollCaptured ) { verticalScrollCaptured = false; }
	
	if( tableSplitterCaptured >= 0 ) {
		let el = document.getElementById('tableSplitter'+tableSplitterCaptured);
		let newWidth = tableColumns[tableSplitterCaptured].width + e.x - tableSplitterCapturedAtX;
		if( newWidth < 4 ) {
			newWidth = 4;
		}
		tableColumns[tableSplitterCaptured].width = newWidth;
		tableSplitterCaptured = -1;
		drawTableContent();
		drawTableHeader();
	}
}, true );

window.addEventListener( 'mousemove', function(e) { 
	if( verticalSplitterCaptured ) {
		verticalSplitterPosition = (e.x - verticalSplitterCapturedAtX) / containerDivWidth + verticalSplitterPosition;
		verticalSplitterCapturedAtX = e.x;

		let oldGanttSVGWidth = ganttSVGWidth;
		initLayoutCoords();
		drawTableScroll();
		drawGanttHScroll();
		ganttVisibleWidth *= (ganttSVGWidth / oldGanttSVGWidth);
		return;
	}
	if( tableSplitterCaptured >= 0 ) {
		let el = document.getElementById('tableSplitter'+tableSplitterCaptured);
		el.setAttributeNS(null,'x',e.x);
		return;
	}
	if( tableScrollCaptured ) {
		let visibleMaxStart = (tableHeaderOverallWidth > tableHeaderSVGWidth) ? (tableHeaderOverallWidth - tableHeaderSVGWidth) : 0;
		let newSliderX = tableScrollXAtCapture + (e.x - tableScrollCapturedAtX);
		let maxSlider = tableScrollSVGWidth - tableScrollSVGSlider.getBBox().width;
		if( newSliderX < 0 ) {
			newSliderX = 0;
		} else if( newSliderX > maxSlider ) {
			newSliderX = maxSlider;
		}
		tableVisibleLeft = newSliderX * visibleMaxStart / maxSlider;
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
		ganttVisibleLeft = data.visibleMin + newSliderX * (data.visibleMaxWidth - ganttVisibleWidth) / maxSlider;
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
		ganttVisibleTop = newSliderY * (data.operations.length - ganttVisibleHeight) / maxSlider;
		verticalScrollSVGSlider.setAttributeNS( null,'y', newSliderY );
		drawGantt();
		drawTableContent();
		return;
	}
} );

initLayout();

loadData();

function loadData() {
	if( document.location.host ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 ) {
		    	if( this.status == 200) {
			    	let errorParsingData = false;
			    	try{
				        data = JSON.parse(this.responseText);
			    	} catch(e) {
			    		errorParsingData = true;
			    	}
			    	if( errorParsingData ) {
						displayMessageBox( terms[lang].errorParsingData ); 
			    	} else if( !('editable' in data) ) {
					    hideMessageBox();		    
						calcData();
						displayData();		 
			        } else {
			        	createEditBoxInputs();
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
						        		data.synchronized = -1;
					        		} else {
					      				data.synchronized = 0;
					        			setUserData( userData );
					        		}
					        	} else if( status == 404 ) {
					        		data.synchronized = 1;
					        	}
							    hideMessageBox();		    
								calcData();
								displayData();		 
				        	} 
				        }
				        xmlhttpUserData.open("GET", "userdata.json", true);
				        xmlhttpUserData.setRequestHeader("Cache-Control", "no-cache");
						xmlhttpUserData.send();
				    }
				} else {
					displayMessageBox( terms[lang].errorLoadingData ); 
				}
		    }
		};
		xmlhttp.open("GET", "gantt.json", true);
		xmlhttp.setRequestHeader("Cache-Control", "no-cache");
		xmlhttp.send();
		displayMessageBox( terms[lang].waitDataText ); 
	} else {
		data = dataSrc;
		createEditBoxInputs();
		let userData = [ { operationCode:'1', data: { 'Notes':'USER DATA FOR OPERATION WITH CODE "1"' } } ];
		setUserData( userData );
		calcData();
		displayData();		
	}
}

function displayData() {	
	zoomX(null, null);
	zoomY(null, null);
	displayLayoutHeader();	
	drawTableContent(true);
	drawTableHeader(true);
	drawTimeScale();
	drawGantt(true);
	drawTableScroll( true );
	drawGanttHScroll( true );
	drawVerticalScroll( true );
}

function calcData() {
	var curTimeParsed = parseDate( data.proj.curTime );
	if( curTimeParsed != null ) {
		data.proj.curTimeInSeconds = curTimeParsed.timeInSeconds;
	} else {
		data.proj.curTimeInSeconds = parseInt(Date.now()/1000);		
	}

	// Retrieving dates of operations, calculating min. and max. dates.
	data.startMinInSeconds = -1;
	data.finMaxInSeconds = -1;
	data.startFinSeconds = -1

	var parsed;
	for( let i = 0 ; i < data.operations.length ; i++ ) {
		let d = data.operations[i];
		parsed = parseDate( d.AsapStart );
		if( parsed !== null ) {
			data.startMinInSeconds = reassignBoundaryValue( data.startMinInSeconds, parsed.timeInSeconds, false );
			d.AsapStartInSeconds = parsed.timeInSeconds;
		} else {
			d.AsapStartInSeconds = -1;
		}
		parsed = parseDate( d.AsapFin );
		if( parsed !== null ) {
			data.finMaxInSeconds = reassignBoundaryValue( data.finMaxInSeconds, parsed.timeInSeconds, true );
			d.AsapFinInSeconds = parsed.timeInSeconds;
		} else {
			d.AsapFinInSeconds = -1;
		}
		parsed = parseDate( d.FactStart );
		if( parsed !== null ) {
			data.startMinInSeconds = reassignBoundaryValue( data.startMinInSeconds, parsed.timeInSeconds, false );
			d.FactStartInSeconds = parsed.timeInSeconds;
		} else {
			d.FactStartInSeconds = -1;
		}
		parsed = parseDate( d.FactFin );
		if( parsed !== null ) {
			data.finMaxInSeconds = reassignBoundaryValue( data.finMaxInSeconds, parsed.timeInSeconds, true );
			d.FactFinInSeconds = parsed.timeInSeconds;
		} else {
			d.FactFinInSeconds = -1;
		}
		parsed = parseDate( d.Start_COMP );
		if( parsed !== null ) {
			data.startMinInSeconds = reassignBoundaryValue( data.startMinInSeconds, parsed.timeInSeconds, false );			
			d.Start_COMPInSeconds = parsed.timeInSeconds;			
		} else {
			d.Start_COMPInSeconds = -1;
		}
		parsed = parseDate( d.Fin_COMP );
		if( parsed !== null ) {
			data.finMaxInSeconds = reassignBoundaryValue( data.finMaxInSeconds, parsed.timeInSeconds, true );			
			d.Fin_COMPInSeconds = parsed.timeInSeconds;			
		} else {
			d.Fin_COMPInSeconds = -1;
		}
		parsed = parseDate( d.alapStart );
		if( parsed !== null ) {
			data.startMinInSeconds = reassignBoundaryValue( data.startMinInSeconds, parsed.timeInSeconds, false );			
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
	}
	data.startFinSeconds = data.finMaxInSeconds - data.startMinInSeconds;
	data.visibleMin = data.startMinInSeconds; // - (data.finMaxInSeconds-data.startMinInSeconds)/20.0;
	data.visibleMax = data.finMaxInSeconds; // + (data.finMaxInSeconds-data.startMinInSeconds)/20.0;
	data.visibleMaxWidth = data.visibleMax - data.visibleMin;

	// Initializing the structure 
	for( let i = 0 ; i < data.operations.length ; i++ ) {
		data.operations[i].id = 'ganttRect' + i; // Id
		data.operations[i].parents = []; // Initializing "parents"
		for( let j = i-1 ; j >= 0 ; j-- ) {
			if( data.operations[j].Level != null ) {
				let l = data.operations[i].parents.length;
				if( l == 0 ) {
					if( !data.operations[i].Level ) {
						data.operations[i].parents.push(j);
					} else if( data.operations[i].Level > data.operations[j].Level ) {
						data.operations[i].parents.push(j);						
					}
				} else {
					let lastPushedIndex = data.operations[i].parents[l-1];
					if( data.operations[lastPushedIndex].Level > data.operations[j].Level ) {
						data.operations[i].parents.push(j);						
					}
				} 
			} 
		}
		if( !data.operations[i].Level ) {
			data.operations[i].expanded = false;
			data.operations[i].visible = true;
		} else {
			data.operations[i].expanded = true;			
			data.operations[i].visible = true;
		}
	}	
}

function initLayout() {
	blackOutBoxDiv = document.getElementById("blackOutBox");
	messageBoxDiv = document.getElementById("messageBox");
	messageBoxTextDiv = document.getElementById("messageBoxText");
	editBoxDiv = document.getElementById('editBox');			
	editBoxDetailsElem = document.getElementById('editBoxDetails');			
	editBoxOperationCodeElem = document.getElementById('editBoxOperationCode');			
	editBoxUserDataElem = document.getElementById('editBoxUserData');			
	editBoxOperationIndexElem = document.getElementById('editBoxOperationIndex');			
	
	
	containerDiv = document.getElementById("containerDiv");
	containerSVG = document.getElementById("containerSVG");
	tableHeaderSVG = document.getElementById('tableHeaderSVG');
	tableContentSVG = document.getElementById('tableContentSVG');
	ganttSVG = document.getElementById("ganttSVG");
	timeSVG = document.getElementById("timeSVG");
	verticalSplitterSVG = document.getElementById("verticalSplitterSVG");
	tableScrollSVG = document.getElementById("tableScrollSVG");
	ganttHScrollSVG = document.getElementById("ganttScrollSVG");
	verticalScrollSVG = document.getElementById("verticalScrollSVG");

	zoomFactor = settings.initialZoomFactor;
	verticalSplitterPosition = settings.verticalSplitterInitialPosition;
	initLayoutCoords();

	containerDiv.addEventListener('selectstart', function() { event.preventDefault(); return false; } );
	containerDiv.addEventListener('selectend', function() { event.preventDefault(); return false; } );

	// Vertical splitter
	verticalSplitterSVGBkgr = createRect( 0, 0, verticalSplitterSVGWidth, verticalSplitterSVGHeight, 
			{ stroke:settings.tableContentStrokeColor, strokeWidth:1,  fill:settings.tableContentFillColor } ); 	// backgroud rect
	verticalSplitterSVG.setAttributeNS(null,'cursor','col-resize');	
	verticalSplitterSVG.appendChild( verticalSplitterSVGBkgr );			
	verticalSplitterSVG.onmousedown = function(e) { verticalSplitterCaptured=true; verticalSplitterCapturedAtX=e.x; };

	// Gantt chart
	ganttSVG.onmousedown = function(e) { ganttCaptured = true; ganttCapturedAtY = e.clientY; };
	ganttSVG.onmousemove = onGanttCapturedMouseMove;
	addOnMouseWheel( ganttSVG, zoomYByWheel );

	// Time scale
	timeSVG.style.cursor = "pointer";
	timeSVG.onmousedown = function(e) { timeCaptured = true; timeCapturedAtX = e.clientX; };
	timeSVG.onmousemove = onTimeCapturedMouseMove;
	addOnMouseWheel( timeSVG, zoomXByWheel );	

	createDefs();
	return true;
}

function initLayoutCoords() {
	containerDivHeight = window.innerHeight - getElementPosition(containerDiv).y - 60;
	containerDiv.style.height = containerDivHeight;
	//containerDivWidth = window.innerWidth; // parseInt( getComputedStyle(containerDiv).width );
	//containerDiv.style.width = containerDivWidth;

	containerDiv.style.width = window.innerWidth;
	containerDivWidth = window.innerWidth - settings.containerHPadding*2;
	containerDiv.style.padding='0px ' + settings.containerHPadding + 'px 0px ' + settings.containerHPadding + 'px';

	containerSVG.setAttributeNS(null, 'x', 0 );
	containerSVG.setAttributeNS(null, 'y', 0 ); 
	containerSVG.setAttributeNS(null, 'width', containerDivWidth ); // window.innerWidth-1  );
	containerSVG.setAttributeNS(null, 'height', containerDivHeight ); 

	// Table Header
	tableHeaderSVG.setAttributeNS(null, 'x', 0 );
	tableHeaderSVG.setAttributeNS(null, 'y', 0 ); 
	tableHeaderSVGWidth = containerDivWidth * verticalSplitterPosition;
	tableHeaderSVG.setAttributeNS(null, 'width', tableHeaderSVGWidth ); // window.innerWidth * 0.1 );
	tableHeaderSVGHeight = containerDivHeight * 0.1;
	tableHeaderSVG.setAttributeNS(null, 'height', tableHeaderSVGHeight ); 

	// Table Content
	tableContentSVG.setAttributeNS(null, 'x', 0 );
	tableContentSVG.setAttributeNS(null, 'y', tableHeaderSVGHeight ); 
	tableContentSVGWidth = tableHeaderSVGWidth;
	tableContentSVG.setAttributeNS(null, 'width', tableContentSVGWidth ); // window.innerWidth * 0.1 );
	tableContentSVGHeight = containerDivHeight - tableHeaderSVGHeight - settings.scrollThick;
	tableContentSVG.setAttributeNS(null, 'height', tableContentSVGHeight ); 

	// Vertical Splitter
	verticalSplitterSVG.setAttributeNS(null, 'x', tableContentSVGWidth );
	verticalSplitterSVG.setAttributeNS(null, 'y', 0 ); 
	verticalSplitterSVGWidth = 3; //containerDivWidth * 0.005;
	verticalSplitterSVG.setAttributeNS(null, 'width', verticalSplitterSVGWidth ); // window.innerWidth * 0.9 );
	verticalSplitterSVGHeight = containerDivHeight - settings.scrollThick;
	verticalSplitterSVG.setAttributeNS(null, 'height', containerDivHeight ); //window.innerHeight/2 ); 

	// Gantt chart
	ganttSVG.setAttributeNS(null, 'x', tableContentSVGWidth + verticalSplitterSVGWidth );
	ganttSVG.setAttributeNS(null, 'y', tableHeaderSVGHeight ); 
	ganttSVGWidth = containerDivWidth - (tableContentSVGWidth + verticalSplitterSVGWidth) - settings.scrollThick;
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
	tableScrollSVGHeight = settings.scrollThick;
	tableScrollSVG.setAttributeNS(null, 'height', tableContentSVGHeight ); 

	// Gantt horizontal scrolling tool
	ganttHScrollSVG.setAttributeNS(null, 'x', tableContentSVGWidth + verticalSplitterSVGWidth )
	ganttHScrollSVG.setAttributeNS(null, 'y', tableHeaderSVGHeight + tableContentSVGHeight ); 
	ganttHScrollSVGWidth = ganttSVGWidth;
	ganttHScrollSVG.setAttributeNS(null, 'width', ganttHScrollSVGWidth );
	ganttHScrollSVGHeight = settings.scrollThick;
	ganttHScrollSVG.setAttributeNS(null, 'height', ganttHScrollSVGHeight ); 

	// Vertical scrolling tool
	verticalScrollSVG.setAttributeNS(null, 'x', tableContentSVGWidth + verticalSplitterSVGWidth + ganttSVGWidth )
	verticalScrollSVG.setAttributeNS(null, 'y', tableHeaderSVGHeight ); 
	verticalScrollSVGWidth = settings.scrollThick;
	verticalScrollSVG.setAttributeNS(null, 'width', verticalScrollSVGWidth );
	verticalScrollSVGHeight = ganttSVGHeight; // containerDivHeight;
	verticalScrollSVG.setAttributeNS(null, 'height', verticalScrollSVGHeight ); 
}

function displayLayoutHeader() {
	// Initializing upper & menu area elements
	let menuWidth = parseInt( getComputedStyle(document.getElementById('menu')).width );
	let menuProjectDetails = document.getElementById('menuProjectDetails');
	menuProjectDetails.style.width=10*menuWidth/100;
	menuProjectDetails.innerHTML = data.proj.curTime + "<br/>V. " + data.proj.projVer;

	let menuProjectName = document.getElementById('menuProjectName');
	menuProjectName.innerText = data.proj.Name;
	menuProjectName.style.width = 70*menuWidth/100;

	let menuMain = document.getElementById('menuMain');
	menuMain.style.width = 10*menuWidth/100;
	menuMain.innerText = terms[lang]['gantt'];
	let menuHelp = document.getElementById('menuHelp');
	menuHelp.style.width = 10*menuWidth/100;
	menuHelp.innerText = terms[lang]['help'];

	document.getElementById('helpText').innerHTML = terms[lang].helpText; // Initializing help text	
}


function calcVisibleOperations() {
	let numVisible = 0;
	for( let i = 0 ; i < data.operations.length ; i++ ) {
		if( data.operations[i].visible ) {
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

	// Drawing grid...
  	for( let i = 0 ;  ; i++ ) {
		let el = document.getElementById( 'ganttGrid' + i );
		if( !el ) {
			break;
		}
		ganttSVG.removeChild(el);
	}
	let gridLineProperties = { stroke:settings.gridColor, strokeWidth:settings.gridStrokeWidth }; 
	let gridMaxY = operToScreen(data.operations.length);
	for( let i = 0 ; i < timeScaleToGrid.length ; i++ ) {
		let x = timeToScreen( timeScaleToGrid[i] );
		gridLineProperties.id = 'ganttGrid' + i;
		let line = createLine( x, 0, x, gridMaxY, gridLineProperties );
		ganttSVG.appendChild(line);
	}		
	let gridXNow = timeToScreen( data.proj.curTimeInSeconds );
	gridLineProperties.id = 'ganttGrid' + timeScaleToGrid.length;
	gridLineProperties.stroke = settings.gridCurrentTimeColor;
	let gridLine = createLine( gridXNow, 0, gridXNow, gridMaxY, gridLineProperties );
	ganttSVG.appendChild(gridLine);
	// ...the grid is done.

	// Calculating the coordinates...
	let rectCounter = 0;
	data.operationDims = {}; // To store recalculated values such as : rectangle width and height etc
	data.operationDims.height = operToScreen(1) - operToScreen(0);
	data.operationDims.rectHeight = operToScreen(1.0 - settings.ganttRectBottomMargin) - operToScreen(settings.ganttRectTopMargin);
	for( let i = 0 ; i < data.operations.length ; i++ ) {
		if( !data.operations[i].visible ) {
			continue;
		}
		data.operations[i].left = timeToScreen( data.operations[i].displayStartInSeconds );
		data.operations[i].right = timeToScreen( data.operations[i].displayFinInSeconds );
		data.operations[i].width = data.operations[i].right - data.operations[i].left;
		data.operations[i].top = operToScreen(rectCounter);
		data.operations[i].bottom = operToScreen(rectCounter + 1);
		data.operations[i].rectTop = operToScreen(rectCounter + settings.ganttRectTopMargin);
		data.operations[i].rectBottom = operToScreen(rectCounter + 1.0 - settings.ganttRectBottomMargin);
		data.operations[i].rectVMiddle = data.operations[i].rectTop + data.operations[i].rectHeight/2;
		rectCounter++;
	}

	// Drawing gantt links...
	let lineProperties = { stroke:settings.ganttLinkStrokeColor, strokeWidth:settings.ganttLinkStrokeWidth, 
		opacity:settings.ganttLinkOpacity };
	let arrowLineProperties = { stroke:settings.ganttLinkStrokeColor, 
		strokeWidth:1, opacity:settings.ganttLinkOpacity, endingArrow:true };
	for( let i = 0 ; i < data.opLinks.length ; i++ ) {

		let PredCode = data.opLinks[i].PredCode;
		let SuccCode = data.opLinks[i].SuccCode;
		let predOp = null;
		let succOp = null;
		for( let op = 0 ; op < data.operations.length ; op++ ) {
			if( !predOp ) { 
				if( data.operations[op].Code == PredCode ) { predOp = op; }
			}
			if( !succOp ) {
				if( data.operations[op].Code == SuccCode ) { succOp = op; }
			}
			if( predOp && succOp ) {
				break;
			}
		}

		if( predOp && succOp ) {
			let line, arrowLine, lineX1, lineY1, lineX2, lineY2, arrowY, lineArrowY;
			if( data.opLinks[i].TypeSF == 'SS' || data.opLinks[i].TypeSF == 'SF' ) {
				lineX1 = data.operations[predOp].left;
			} else {
				lineX1 = data.operations[predOp].right;				
			}
			if( data.operations[predOp].top < data.operations[succOp].top ) {
				lineY1 = data.operations[predOp].rectBottom;
				lineY2 = data.operations[succOp].rectTop - settings.ganttLinkArrowHeight;
				arrowY = data.operations[succOp].rectTop;
			} else {
				lineY1 = data.operations[predOp].rectTop;
				lineY2 = data.operations[succOp].rectBottom + settings.ganttLinkArrowHeight;
				arrowY = data.operations[succOp].rectBottom;
			}
			if( data.opLinks[i].TypeSF == 'SF' || data.opLinks[i].TypeSF == 'FF' ) {
				lineX2 = data.operations[succOp].left;
			} else {
				lineX2 = data.operations[succOp].right;				
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
			if( !data.operations[predOp].visible || !data.operations[succOp].visible ) {
				line.setAttributeNS(null,'display','none');
			} else {
				line.setAttributeNS(null,'display','block');				
			}
		}
	}	

	// Drawing main gantt visual elements...
	let op0Properties = { fill:settings.ganttOperation0Color, stroke:settings.ganttOperation0StrokeColor, 
		strokeWidth:settings.ganttOperationStrokeWidth, opacity:settings.ganttOperation0Opacity };
	let op100Properties = { fill:settings.ganttOperation100Color, stroke:settings.ganttOperation100StrokeColor, 
		strokeWidth:settings.ganttOperationStrokeWidth, opacity:settings.ganttOperation100Opacity };
	let opCompareProperties = { fill:settings.ganttCompareColor, stroke:settings.ganttCompareStrokeColor, 
		strokeWidth:settings.ganttCompareStrokeWidth, opacity:settings.ganttCompareOpacity };
	let fontSize = (operToScreen(settings.ganttCompareTopMargin) - operToScreen(0)) * 0.6;
	for( let i = 0 ; i < data.operations.length ; i++ ) {
		if( !data.operations[i].visible ) {
			continue;
		}		
		let rectStart = data.operations[i].left;
		let rectEnd = data.operations[i].right;
		let rectTop = data.operations[i].rectTop;
		let rectBottom = data.operations[i].rectBottom;
		let rectWidth = data.operations[i].width;
		let rectHeight = data.operationDims.rectHeight;
		let rectVMiddle = data.operations[i].rectVMiddle;
		let textY;
		let displayCompare, rectCompareStart, rectCompareEnd, rectCompareTop, rectCompareBottom;
		if( data.operations[i].Start_COMPInSeconds != -1 && data.operations[i].Fin_COMPInSeconds != -1 ) {
			rectCompareStart = timeToScreen( data.operations[i].Start_COMPInSeconds );
			rectCompareEnd = timeToScreen( data.operations[i].Fin_COMPInSeconds );
			rectCompareTop = data.operations[i].top + data.operationDims.height * settings.ganttCompareTopMargin;
			rectCompareBottom = data.operations[i].bottom - data.operationDims.height * settings.ganttCompareBottomMargin;
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

			if( data.operations[i].status == 0 ) {
				let op0;
				op0Properties.id = 'ganttOpNotStarted'+i;
				op0Properties.fill = (data.operations[i].f_Critical==1) ? settings.ganttCriticalColor : settings.ganttOperation0Color;
				if( !data.operations[i].Level ) {
					op0 = createRect( rectStart, rectTop, rectWidth, rectHeight, op0Properties ); // Rectangle
				} else {
					op0 = createPolygon( calcPhaseCoords( rectStart, rectTop, rectWidth, rectHeight), op0Properties );
				}
				group.appendChild(op0);
			} else if( data.operations[i].status == 100 ) {
				let op100;
				op100Properties.id = 'ganttOpFinished'+i;
				if( !data.operations[i].Level ) {
					op100 = createRect( rectStart, rectTop, rectWidth, rectHeight, op100Properties ); // Rectangle
				} else {
					op100 = createPolygon( calcPhaseCoords( rectStart, rectTop, rectWidth, rectHeight ), op100Properties );
				}
				group.appendChild(op100);
			} else {
				let xUnfinished = timeToScreen( data.operations[i].displayUnfinishedInSeconds );
				op100Properties.id = 'ganttOpFinished'+i;
				let op100;
				if( !data.operations[i].Level ) {
					op100 = createRect( rectStart, rectTop, xUnfinished - rectStart, rectHeight, op100Properties  ); // Rectangle
				} else {
					op100 = createPolygon( calcPhaseCoords(rectStart, rectTop, xUnfinished - rectStart, rectHeight,-1), op100Properties );
				}
				group.appendChild(op100);
				
				op0Properties.id = 'ganttOpNotStarted'+i;
				op0Properties.fill = (data.operations[i].f_Critical==1) ? settings.ganttCriticalColor : settings.ganttOperation0Color;
				let op0;
				if( data.operations[i].Level === null ) {
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
			if( 'editable' in data ) {
	 			group.onmouseup = function() { displayDataInEditBox(this); };
			}

			text = createText( data.operations[i].Name, rectStart, textY, // - fontSize * 0.25, 
				{ fontSize:fontSize, fill:settings.ganttFontColor, id:'ganttText'+i, textAnchor:'left', alignmentBaseline:'baseline' } );
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
			if( data.operations[i].status == 0 ) {
				let el = document.getElementById('ganttOpNotStarted'+i);
				if( !data.operations[i].Level ) {
					setRectCoords( el, rectStart, rectTop, rectWidth, rectHeight );
				} else {
					el.setAttributeNS( null,'points', calcPhaseCoords(rectStart, rectTop, rectWidth, rectHeight) );
				} 
			} else if( data.operations[i].status == 100 ) {
				let el = document.getElementById('ganttOpFinished'+i);
				if( !data.operations[i].Level ) {
					setRectCoords( el, rectStart, rectTop, rectWidth, rectHeight );
				} else {
					el.setAttributeNS( null,'points', calcPhaseCoords(rectStart, rectTop, rectWidth, rectHeight) );
				} 
			} else {
				let xUnfinished = timeToScreen( data.operations[i].displayUnfinishedInSeconds );
				let el100 = document.getElementById('ganttOpFinished'+i);
				let el0 = document.getElementById('ganttOpNotStarted'+i);
				if( !data.operations[i].Level ) {
					setRectCoords( el100, rectStart, rectTop, xUnfinished - rectStart, rectHeight );
					setRectCoords( el0, xUnfinished, rectTop, rectEnd - xUnfinished, rectHeight );
				} else {
					el100.setAttributeNS( null,'points', calcPhaseCoords(rectStart, rectTop, xUnfinished - rectStart, rectHeight,-1) );
					el0.setAttributeNS( null,'points', calcPhaseCoords(xUnfinished, rectTop, rectEnd - xUnfinished, rectHeight,1) );
				} 
			}
		}

		let group = document.getElementById('ganttGroup'+i);

		if( !data.operations[i].visible ) {
			group.setAttributeNS(null,'display','none');
		} else {
			data.operations[i].left = rectStart;
			data.operations[i].right = rectEnd;
			data.operations[i].top = rectTop;
			data.operations[i].bottom = rectBottom;			
			group.setAttributeNS(null,'display','block');
		}
	}
}

function formatTitleTextContent( i, html=false ) {
	let textContent = "";
	let endl = ( !html ) ? "\r\n" : "<br/>";

	let op = data.operations[i].Name;
	if( html ) {
		op = "<b>" + op + "</b>" + endl;
	} else {
		op = op + endl + "---------------------------------------" + endl;
	}
	textContent = op;

	let statusText;
	if( data.operations[i].status == 0 ) {
		statusText = terms[lang].status0;
	} else if( data.operations[i].status < 100 ) {
		statusText = data.operations[i].status + "%";
	} else {
		statusText = terms[lang].status100;				
	}
	textContent += "[ " + statusText + " ]" + endl + endl;

	for( let col=1 ; col < tableColumns.length ; col++ ) {
		if( tableColumns[col].ref == 'Name' ) {
			continue;
		}
		let ref = tableColumns[col].ref;

		let content = data.operations[i][ref];
		if( 'userData' in data.operations[i] ) {
			if( ref in data.operations[i].userData ) {
				if( data.operations[i].userData[ref] != data.operations[i][ref] ) {
					let newValue = data.operations[i].userData[ref];
					if( html ) {
						content = "<span style='color:#5f5f5f; text-decoration:line-through;'>"+content+"</span>"
						newValue = "<span style='color:#af2f2f;'>"+newValue+"</span>";
					}
					content += " => " + newValue;
				}
			}
		}
		let name = terms[lang][ref];
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
	let phaseBracketHeight = rectHeight * settings.ganttRectBracketRelHeight;
	let thick = (rectWidth+rectWidth > settings.ganttRectBracketThick) ? settings.ganttRectBracketThick : 1;
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
		for( let i = 0 ; i < data.operations.length ; i++ ) { // For all operations...
			for( let iU = 0 ; iU < userData.length ; iU++ ) { // For all userData items...
				if( data.operations[i].Code == userData[iU].operationCode ) { // If the codes are the same...
					data.operations[i].userData = {};
					for( let iE=0 ; iE < data.editable.length ; iE++ ) {
						let ref = data.editable[iE].ref;
						if( ref in userData[iU].data ) {
							data.operations[i].userData[ ref ] = userData[iU].data[ ref ];
						} else {
							data.operations[i].userData[ ref ] = data.operations[i][ ref ];						
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
	for( let iE = 0 ; iE < data.editable.length ; iE++ ) {
		let ref = data.editable[iE].ref;
		let promptDiv = document.createElement('div');
		promptDiv.id = 'editBoxInputPrompt' + ref;
		promptDiv.innerText = terms[lang][ref];
		promptDiv.className = 'editBoxPrompt';

		let input;
		if( data.editable[iE].type == 'text' ) {
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

		tableHeaderSVGBkgr = createRect( 0, 0, containerDivWidth, tableHeaderSVGHeight, 
			{ fill:'url(#timeScaleGradient)' } ); // backgroud rect
		tableHeaderSVG.appendChild( tableHeaderSVGBkgr );			

		let left = 0;
		for( let i = 0 ; i < tableColumns.length ; i++ ) {
			let rect = createSVG(left+1-tableVisibleLeft, 0, tableColumns[i].width-2, tableHeaderSVGHeight, 
				{ id:'tableHeaderColumnNameSVG'+i, 'fill':settings.tableHeaderFillColor } );
			tableHeaderSVG.appendChild( rect );
			let text = createText( terms[lang][tableColumns[i].ref], 2, tableHeaderSVGHeight/2, 
				{ alignmentBaseline:'baseline', textAnchor:'start', fontSize:12, fill:settings.tableHeaderFontColor } );
			rect.appendChild( text );
			left += tableColumns[i].width;
		}
		tableHeaderOverallWidth = left;
	} else {
		tableHeaderSVGBkgr.setAttributeNS(null,'x',-tableVisibleLeft);
		let left = 0;
		for( let i = 0 ; i < tableColumns.length ; i++ ) {
			let rect = document.getElementById('tableHeaderColumnNameSVG'+i);
			rect.setAttributeNS(null,'x',left+1-tableVisibleLeft);
			rect.setAttributeNS(null,'width',tableColumns[i].width-2);			
			left += tableColumns[i].width;
		}
		tableHeaderOverallWidth = left;		
	}
}


function drawTableContent( init ) {
	if( !init ) {
		init = false;
	}
	if( init ) {
		while (tableContentSVG.hasChildNodes()) {
			tableContentSVG.removeChild(tableContentSVG.lastChild);
		}

		let height = operToScreen(data.operations.length);
		tableContentSVGBkgr = createRect( 0-tableVisibleLeft, 0, containerDivWidth, height, 
			{ stroke:'none', strokeWidth:1,  fill:settings.tableContentFillColor } ); 	// backgroud rect
		tableContentSVG.appendChild( tableContentSVGBkgr );		
		
		let left = 0;
		for( let col = 0 ; col < tableColumns.length ; col++ ) {
			let rect = createSVG( left+2-tableVisibleLeft, 0, tableColumns[col].width-4, height, 
				{ id:('tableColumnSVG'+col), fill:settings.tableContentStrokeColor } );
			tableContentSVG.appendChild( rect );
			left += tableColumns[col].width;
		}

		for( let col = 0, left=0 ; col < tableColumns.length ; col++  ) { // Creating splitters
			left += tableColumns[col].width;
			let splitter = createRect( left-tableVisibleLeft, 0, 1, operToScreen(data.operations.length), 
				{id:'tableSplitter'+col, fill:'#dfdfdf'} );
			splitter._columnNumber = col;
			splitter.setAttributeNS(null,'cursor','col-resize');
			tableContentSVG.appendChild(splitter);
			splitter.onmousedown = function(e) { tableSplitterCaptured=this._columnNumber; tableSplitterCapturedAtX=e.x; };
		}
	} else {
		tableContentSVGBkgr.setAttributeNS(null,'x',-tableVisibleLeft);
		let left = 0;
		for( let col = 0 ; col < tableColumns.length ; col++ ) {
			let rect = document.getElementById('tableColumnSVG'+col);
			rect.setAttributeNS(null,'x',left+2-tableVisibleLeft);
			rect.setAttributeNS(null,'width',tableColumns[col].width-4);
			left += tableColumns[col].width;			
			let splitter = document.getElementById('tableSplitter'+col); 
			splitter.setAttributeNS(null,'x',left-tableVisibleLeft);
		}
	}

	// Operations table
	let rectCounter = 0;
	for( let i = 0 ; i < data.operations.length ; i++ ) {
		let lineTop = operToScreen(rectCounter);
		let lineBottom = operToScreen(rectCounter+1.0);
		let lineHeight = lineBottom - lineTop;
		let fontSize = 11;
		let lineMiddle = lineBottom - lineHeight/3;
		let lineId = 'ganttTableLine' + i;

		let expand='[]';
		if( data.operations[i].Level ) {
			if( data.operations[i].expanded ) {
				expand='[-]';
			} else {
				expand='[+]';				
			}
		}
		let expandText;
		let expandTextId = 'tableColumn0Row' + i;

		if( init ) {			
			expandText = createText( expand, tableColumns[0].width/2.0, lineMiddle, 
				{ id:expandTextId, fontSize:fontSize, textAnchor:'middle', alignmentBaseline:'baseline' } );
	 		document.getElementById('tableColumnSVG0').appendChild(expandText);
	 		expandText._operationNumber=i;
	 		if( data.operations[i].Level ) {
	 			expandText.style.cursor = 'pointer';
		 		expandText.onmousedown = function(e) {
		 			if( data.operations[this._operationNumber].expanded == true ) {
		 				for( let i = 0 ; i < data.operations.length ; i++ ) {
		 					for( let j = 0 ; j < data.operations[i].parents.length ; j++ ) {
		 	 					if( data.operations[i].parents[j] == this._operationNumber ) {
			 						data.operations[i].visible = false;
			 						break;
			 					}
			 				}
			 			}
		 				data.operations[this._operationNumber].expanded = false;
		 			} else {
		 				for( let i = 0 ; i < data.operations.length ; i++ ) {
		 					for( let j = 0 ; j < data.operations[i].parents.length ; j++ ) {
		 	 					if( data.operations[i].parents[j] == this._operationNumber ) {
			 						data.operations[i].visible = true;
			 						break;
			 					}
			 				}
			 			}
		 				data.operations[this._operationNumber].expanded = true;
		 			}
		 			drawTableContent();
		 			drawTimeScale();
		 			drawGantt();
		 		};
		 	}

			let left = tableColumns[0].width;
			for( let col = 1 ; col < tableColumns.length ; col++ ) {
				let ref = tableColumns[col].ref;
				let content = data.operations[i][ref];
				if( content === 'undefined' || content == null ) {
					content = '-';
				}

				let text = createText(content, 2, lineMiddle, 
					{ id:('tableColumn'+col+'Row'+i), fill:settings.tableContentStrokeColor, textAnchor:'start', fontSize:fontSize } );
				document.getElementById('tableColumnSVG'+col).appendChild( text );
			}

		} else {
			expandText = document.getElementById(expandTextId);
			expandText.setAttributeNS(null,'x',tableColumns[0].width/2.0);
			expandText.setAttributeNS(null,'y',lineMiddle);
			expandText.firstChild.nodeValue = expand;

			let left = tableColumns[0].width;
			for( let col = 1 ; col < tableColumns.length ; col++ ) {
				let id = 'tableColumn'+col+'Row'+i;
				let el = document.getElementById(id);
				el.setAttributeNS(null,'x',2);
				el.setAttributeNS(null,'y',lineMiddle);
				el.setAttributeNS(null,'font-size',fontSize);
			}
		}

		//alert(document.getElementById('tableColumn0Row'+i).style.display);

		if( data.operations[i].visible /*&& document.getElementById(expandTextId).style.visibility == 'hidden'*/ ) {
			for( let col = 0 ; col < tableColumns.length ; col++ ) {
				let id = 'tableColumn'+col+'Row'+i;
				let el = document.getElementById(id);
				el.setAttributeNS(null,'display','block');
			}
		} else if( !data.operations[i].visible /*&& document.getElementById(expandTextId).style.visibility != 'hidden'*/ ) {
			for( let col = 0 ; col < tableColumns.length ; col++ ) {
				let id = 'tableColumn'+col+'Row'+i;
				let el = document.getElementById(id);
				el.setAttributeNS(null,'display','none');
			}
		}		
		if( data.operations[i].visible ) {
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
	let displayDays = ( dayRectWidth > settings.minDayWidthOnTimeScale ) ? true : false;
	let displayWeeks = ( !displayDays && dayRectWidth*7 > settings.minDayWidthOnTimeScale ) ? true : false;

	let minTime = data.visibleMin * 1000; // screenToTime(0) * 1000;
	let maxTime = data.visibleMax * 1000; // screenToTime( timeSVGWidth ) * 1000;
	let minDT = new Date(minTime);
	let maxDT = new Date(maxTime);
	let deltaY = maxDT.getFullYear() - minDT.getFullYear();
	let deltaM = maxDT.getMonth() - minDT.getMonth();
	let deltaD = maxDT.getDate() - minDT.getDate();
	let minY = minDT.getFullYear();
	let maxY = maxDT.getFullYear();
	let textRectProperties = { fill:'none', stroke:settings.timeScaleStrokeColor, strokeWidth:0.25 };
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
	let monthProperties = { fontSize:monthFontSize, fill:settings.timeScaleFontColor, textAnchor:'middle', alignmentBaseline:'baseline' };
	let dayFontSize=0;
	if( displayDays ) {
		dayFontSize = (dayRectWidth > timeSVGHeight*0.25) ? timeSVGHeight*0.22 : dayRectWidth * 0.8;
	} else if( !displayDays && displayWeeks ) {
		dayFontSize = (dayRectWidth*7 > timeSVGHeight*0.25) ? timeSVGHeight*0.22 : (dayRectWidth*7) * 0.8;
	}
	let dayProperties = { fontSize:dayFontSize, fill:settings.timeScaleFontColor, textAnchor:'middle', alignmentBaseline:'baseline' };
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
		let mNames = terms[lang]['monthNames']
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
	if( sliderSize < settings.scrollSliderSize ) {
		sliderSize = settings.scrollSliderSize;
	}

	if( init ) {
		let bbox = tableScrollSVG.getBBox();
		tableScrollSVGBkgr = createRect( 0, 0, tableScrollSVGWidth, tableScrollSVGHeight, 
			{ id:('tableScrollSVGBkgr'), fill:settings.scrollBkgrColor, stroke:settings.scrollRectColor, strokeWidth:1 } );
		tableScrollSVGSlider = createRect( 0, 0, sliderSize, tableScrollSVGHeight, 
			{ id:('tableScrollSVGSlider'), fill:settings.scrollSliderColor } );
		tableScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		tableScrollSVG.appendChild( tableScrollSVGBkgr );
		tableScrollSVG.appendChild( tableScrollSVGSlider );
		tableScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',settings.scrollSliderActiveColor) };
		tableScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',settings.scrollSliderColor) };
		tableScrollSVGSlider.onmousedown = function(e) {
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
	let overallWidth = data.visibleMaxWidth;
	let visibleMaxLeft = (overallWidth > ganttVisibleWidth) ? (data.visibleMin + overallWidth - ganttVisibleWidth) : data.visibleMin;
	let sliderSize = (visibleMaxLeft > data.visibleMin) ? (ganttHScrollSVGWidth*ganttVisibleWidth/overallWidth) : ganttHScrollSVGWidth;
	if( sliderSize < settings.scrollSliderSize ) {
		sliderSize = settings.scrollSliderSize;
	}
	if( init ) {
		let bbox = ganttHScrollSVG.getBBox();
		ganttHScrollSVGBkgr = createRect( 0, 0, ganttHScrollSVGWidth, ganttHScrollSVGHeight, 
			{ id:('ganttHScrollSVGBkgr'), fill:settings.scrollBkgrColor, stroke:settings.scrollRectColor, strokeWidth:1 } );
		ganttHScrollSVGSlider = createRect( 0, 0, sliderSize, ganttHScrollSVGHeight, 
			{ id:('ganttHScrollSVGSlider'), fill:settings.scrollSliderColor } );
		ganttHScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		ganttHScrollSVG.appendChild( ganttHScrollSVGBkgr );
		ganttHScrollSVG.appendChild( ganttHScrollSVGSlider );
		ganttHScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',settings.scrollSliderActiveColor); };
		ganttHScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',settings.scrollSliderColor) };
		ganttHScrollSVGSlider.onmousedown = function(e) {
			ganttHScrollCaptured = true;
			ganttHScrollCapturedAtX = e.x;
			ganttHScrollXAtCapture = this.getBBox().x;
		}
	} else {
		ganttHScrollSVGBkgr.setAttributeNS(null,'width',ganttHScrollSVGWidth);
		ganttHScrollSVGSlider.setAttributeNS(null,'width',sliderSize);
		let sliderPosition=0;
		if( visibleMaxLeft > data.visibleMin ) {
			sliderPosition = (ganttVisibleLeft-data.visibleMin) * (ganttHScrollSVGWidth-sliderSize) / (visibleMaxLeft-data.visibleMin);
		}
		ganttHScrollSVGSlider.setAttributeNS(null,'x',sliderPosition);
	}
}


function drawVerticalScroll( init ) {
	if( !init ) {
		init = false;
	}
	let overallHeight = data.operations.length;
	let visibleMaxTop = (overallHeight > ganttVisibleHeight) ? (overallHeight - ganttVisibleHeight) : 0;
	let sliderSize = (visibleMaxTop > 0) ? (verticalScrollSVGHeight*ganttVisibleHeight/overallHeight) : verticalScrollSVGHeight;
	if( sliderSize < settings.scrollSliderSize ) {
		sliderSize = settings.scrollSliderSize;
	}
	if( init ) {
		let bbox = verticalScrollSVG.getBBox();
		verticalScrollSVGBkgr = createRect( 0, 0, verticalScrollSVGWidth, verticalScrollSVGHeight, 
			{ id:('verticalScrollSVGBkgr'), fill:settings.scrollBkgrColor, stroke:settings.scrollRectColor, strokeWidth:1 } );
		verticalScrollSVGSlider = createRect( 0, 0, verticalScrollSVGWidth, sliderSize, 
			{ id:('verticalScrollSVGSlider'), fill:settings.scrollSliderColor } );
		verticalScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		verticalScrollSVG.appendChild( verticalScrollSVGBkgr );
		verticalScrollSVG.appendChild( verticalScrollSVGSlider );
		verticalScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',settings.scrollSliderActiveColor) };
		verticalScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',settings.scrollSliderColor) };
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


function zoomX( zoomFactorChange, zoomPositionChange ) {
	if( (zoomFactorChange == null || zoomFactorChange == '100%') && zoomPositionChange == null ) {
		ganttVisibleLeft = data.visibleMin;
		ganttVisibleWidth = data.visibleMaxWidth;
		return;
	} 
	if( zoomFactorChange != null && zoomPositionChange == null ) {
		if( ganttVisibleWidth >= data.visibleMaxWidth && zoomFactorChange > 1.0 ) {
			return;
		}
		let currentZoomFactor = ganttVisibleWidth / data.visibleMaxWidth;
		let newZoomFactor = currentZoomFactor * zoomFactorChange;
		if( !(newZoomFactor > 0) ) {
			return;
		}
		let newWidth = data.visibleMaxWidth * newZoomFactor;
		let newLeft = ganttVisibleLeft - (newWidth - ganttVisibleWidth) / 2.0;	
		if( newLeft < data.visibleMin ) {
			newLeft = data.visibleMin;
		} else if( newLeft + newWidth > data.visibleMax ) {
			newLeft = data.visibleMin;
		}
		ganttVisibleLeft = newLeft;
		ganttVisibleWidth = newWidth;
		return;
	}
	if( zoomFactorChange == null && zoomPositionChange != null ) {
		let newLeft = ganttVisibleLeft + zoomPositionChange;
		if( newLeft < data.visibleMin ) {
			newLeft = data.visibleMin;
		} else if( newLeft + ganttVisibleWidth > data.visibleMax ) {
			newLeft = data.visibleMax - ganttVisibleWidth;
		}
		ganttVisibleLeft = newLeft;
		return;
	}
}

function zoomY( zoomFactorChange, zoomPositionChange ) {
	if( (zoomFactorChange === null || zoomFactorChange == '100%') && zoomPositionChange === null ) {
		ganttVisibleTop = 0;
		ganttVisibleHeight = data.operations.length;
		return;
	} 
	if( zoomFactorChange !== null && zoomPositionChange === null ) {
		if( ganttVisibleHeight >= data.operations.length && zoomFactorChange > 1.0 ) {
			return;
		}
		let currentZoomFactor = ganttVisibleHeight / data.operations.length;
		let newZoomFactor = currentZoomFactor * zoomFactorChange;
		if( !(newZoomFactor > 0) ) {
			return;
		}
		let newHeight = data.operations.length * newZoomFactor;
		if( newHeight < 1 && zoomFactorChange < 1.0 ) {
			return;
		}
		let newY = ganttVisibleTop - (newHeight - ganttVisibleHeight) / 2.0;	
		if( newY < 0 ) {
			newY = 0;
		} else if( newY + newHeight > data.operations.length ) {
			newY = 0;
		}
		ganttVisibleTop = newY;
		ganttVisibleHeight = newHeight;
		return;
	} 
	if( zoomFactorChange === null && zoomPositionChange !== null ) {
		let newY = ganttVisibleTop + zoomPositionChange;
		if( newY < 0 ) {
			newY = 0;
		} else if( newY + ganttVisibleHeight > data.operations.length ) {
			newY = data.operations.length - ganttVisibleHeight;
		}
		ganttVisibleTop = newY;
		return;
	}
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

function zoomXByWheel(e) {
	let delta = e.deltaY || e.detail || e.wheelDelta;
	let zoomFactorChange;
	if( delta > 0 ) {
		zoomFactorChange = zoomFactor;
	} else {
		zoomFactorChange = 1.0/zoomFactor;
	}
	zoomX( zoomFactorChange, null );
	drawTimeScale();
	drawGantt();
	drawGanttHScroll();
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


function zoomYByWheel(e) {
	let delta = e.deltaY || e.detail || e.wheelDelta;
	let zoomFactorChange;
	if( delta > 0 ) {
		zoomFactorChange = zoomFactor;
	} else {
		zoomFactorChange = 1.0 / zoomFactor;
	}
	zoomY( zoomFactorChange, null );
	drawTableContent();
	drawGantt();
	drawVerticalScroll();
}


function onGanttCapturedMouseMove(e) {
	if( !ganttCaptured ) {
		return;
	}
	let deltaY = ganttVisibleHeight * (e.clientY - ganttCapturedAtY) / ganttSVGHeight;
	zoomY(null,-deltaY);
	drawTableContent();
	drawGantt();
	drawVerticalScroll();
}


function timeToScreen( timeInSeconds ) {
	let availableSVGWidth = ganttSVGWidth - settings.ganttChartLeftMargin - settings.ganttChartRightMargin;
	return settings.ganttChartLeftMargin + (timeInSeconds - ganttVisibleLeft) * availableSVGWidth / ganttVisibleWidth; 
}

function timeToScreenInt( timeInSeconds ) {
	let x = timeToScreen(timeInSeconds);
	return parseInt(x+0.5); 
}

function screenToTime( screenX ) {
	let xNotScaled = ganttVisibleLeft + screenX * (ganttVisibleWidth - 1) / (ganttSVGWidth-1);
}


function operToScreen( n ) {
	//return ( ( n ) * ganttSVGHeight )/ data.operations.length; 
	return ( n - ganttVisibleTop) * ganttSVGHeight / (ganttVisibleHeight+0.5); 
} 


function createRect( x, y, width, height, properties ) {
	let rect = document.createElementNS(NS, 'rect');
	if( 'id' in properties ) {
		rect.setAttributeNS(null, 'id', properties.id ); 		
	} 
	rect.setAttributeNS(null, 'x', x ); 
	rect.setAttributeNS(null, 'width', width ); 
	rect.setAttributeNS(null, 'y', y ); 
	rect.setAttributeNS(null, 'height', height );
	if( 'fill' in properties ) {
		rect.setAttributeNS(null, 'fill', properties.fill );
	} 
	if( 'stroke' in properties ) {
		rect.setAttributeNS(null, 'stroke', properties.stroke );
	}
	if( 'strokeWidth' in properties ) {
		rect.setAttributeNS(null, 'stroke-width', properties.strokeWidth );			
	}
	if( 'opacity' in properties ) {
		rect.setAttributeNS(null, 'opacity', properties.opacity );
	} 
	return rect;
}

function setRectCoords( rect, x, y, width, height ) {
	rect.setAttributeNS(null,'x',x);
	rect.setAttributeNS(null,'y',y);
	rect.setAttributeNS(null,'width',width);
	rect.setAttributeNS(null,'height',height);	
}

function createPolygon( points, properties ) {
	let polygon = document.createElementNS(NS, 'polygon');
	polygon.setAttributeNS(null, 'points', points ); 			
	if( 'id' in properties ) {
		polygon.setAttributeNS(null, 'id', properties.id ); 		
	} 
	if( 'fill' in properties ) {
		polygon.setAttributeNS(null, 'fill', properties.fill );
	} 
	if( 'stroke' in properties ) {
		polygon.setAttributeNS(null, 'stroke', properties.stroke );
	}
	if( 'strokeWidth' in properties ) {
		polygon.setAttributeNS(null, 'stroke-width', properties.strokeWidth );			
	}
	if( 'opacity' in properties ) {
		polygon.setAttributeNS(null, 'opacity', properties.opacity );
	} 
	return polygon;
}


function createText( textString, x, y, properties ) {
	let text = document.createElementNS(NS, 'text');
	text.setAttributeNS(null,'x', x );
	text.setAttributeNS(null,'y', y );
	if( 'id' in properties ) {
		text.setAttributeNS(null, 'id', properties.id ); 		
	} 
	if( 'fontSize' in properties ) {
		text.setAttributeNS(null,'font-size', properties.fontSize );
	}
	if( 'textAnchor' in properties ) {
		text.setAttributeNS(null,'text-anchor', properties.textAnchor );
	}
	if( 'textLength' in properties ) {
		if( properties.textLength ) {
			text.setAttributeNS(null,'textLength', properties.textLength );			
		}
	}
	if( 'lengthAdjust' in properties ) {
		text.setAttributeNS(null,'lengthAdjust', properties.lengthAdjust );
	}
	if( 'alignmentBaseline' in properties ) {
		text.setAttributeNS(null,'alignment-baseline', properties.alignmentBaseline );
	}
	if( 'preserveAspectRatio' in properties ){
		text.setAttributeNS(null,'preserveAspectRatio', properties.preserveAspectRatio );
	}
	if( 'stroke' in properties ) {
		text.setAttributeNS(null,'stroke', properties.stroke );
	}
	if( 'fill' in properties ) {
		text.setAttributeNS(null,'fill', properties.fill );
	}
	if( 'clipPath' in properties ) {
		text.setAttributeNS(null,'clip-path', properties.clipPath );
	}
	text.appendChild( document.createTextNode( textString ) );
	return text;
}

function createLine( x1, y1, x2, y2, properties ) {
	let line = document.createElementNS(NS, 'line');
	if( 'id' in properties ) {
		line.setAttributeNS(null, 'id', properties.id ); 		
	} 
	if( 'endingArrow' in properties ) {
		if( properties.endingArrow ) {
			line.setAttributeNS(null,'marker-end', 'url(#arrow)');
		}
	}
	line.setAttributeNS(null, 'x1', x1 ); 
	line.setAttributeNS(null, 'y1', y1 ); 
	line.setAttributeNS(null, 'x2', x2 ); 
	line.setAttributeNS(null, 'y2', y2 );
	if( 'fill' in properties ) {
		line.setAttributeNS(null, 'fill', properties.fill );
	} 
	if( 'stroke' in properties ) {
		line.setAttributeNS(null, 'stroke', properties.stroke );
	}
	if( 'strokeWidth' in properties ) {
		line.setAttributeNS(null, 'stroke-width', properties.strokeWidth );			
	}
	if( 'strokeDasharray' in properties ) {
		line.setAttributeNS(null, 'stroke-dasharray', properties.strokeDasharray );					
	}
	if( 'opacity' in properties ) {
		line.setAttributeNS(null, 'opacity', properties.opacity );
	} 
	return line;
}

function createSVG( x, y, width, height, properties ) {
	let svg = document.createElementNS(NS,'svg');
	svg.setAttributeNS(null,'x',x);
	svg.setAttributeNS(null,'y',y);
	svg.setAttributeNS(null,'width', width );
	svg.setAttributeNS(null,'height', height );
	if( 'fill' in properties ) {
		svg.setAttributeNS(null, 'fill', properties.fill);		
	}
	if( 'id' in properties ) {
		svg.setAttributeNS(null, 'id', properties.id);		
	}
	return svg;	
}


function createDefs() {
	let defs = document.createElementNS(NS, 'defs');

    let marker = document.createElementNS(NS, 'marker');
    marker.setAttribute('id', 'arrow');
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('refX', '5');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerUnits', 'strokeWidth');
    marker.setAttribute('markerWidth', settings.ganttLinkArrowWidth ); //ganttSVGWidth*2 / ganttVisibleWidth );
    marker.setAttribute('markerHeight', settings.ganttLinkArrowHeight ); //ganttSVGWidth*2 / ganttVisibleWidth );
    marker.setAttribute('orient', 'auto');
    let path = document.createElementNS(NS, 'path');
    path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    path.setAttribute('fill', '#2f2f2f'/*'url(#blackToGrayGradient)'*/);
    marker.appendChild(path);
    defs.appendChild(marker);	

	let gradient1 = initLinearGradient( [{"color":"#cfcfdf","offset":"0%"},{"color":"#ffffff","offset":"100%"}], 'timeScaleGradient' );
	defs.appendChild(gradient1);

	let gradient2 = initLinearGradient( [{"color":"#f7f7f7","offset":"0%"},{"color":"#ffffff","offset":"100%"}], 'ganttGradient' );
	defs.appendChild(gradient2);

	let gradient3 = initLinearGradient( [{"color":"#2f2f2f","offset":"0%"},{"color":"#afafaf","offset":"100%"}], 'blackToGrayGradient' );
	defs.appendChild(gradient3);

    containerSVG.appendChild(defs);
}


function initLinearGradient( stops, name ) {
	let gradient = document.createElementNS(NS, 'linearGradient');
	for( let i = 0 ; i < stops.length; i++ ) {
	    let stop = document.createElementNS(NS, 'stop');
	    stop.setAttribute('offset', stops[i].offset);
	    stop.setAttribute('stop-color', stops[i].color);
    	gradient.appendChild(stop);
    }
	gradient.id = name;
	gradient.setAttribute('x1', '0');
	gradient.setAttribute('x2', '1');
	gradient.setAttribute('y1', '0');
	gradient.setAttribute('y2', '0');
	return gradient;
}


function parseDate( dateString ) {
	if( dateString == null ) {
		return null;
	}
    var parsed = dateString.match( /([0-9]+)\.([0-9]+)\.([0-9]+) +([0-9]+)\:([0-9]+)/ );
    if( parsed == null ) {
    	return null;
    }
    if( parsed.length != 6 ) {
    	return null;
    }
    var date = new Date(parsed[3], parsed[2]-1, parsed[1], parsed[4], parsed[5], 0, 0);
    var timeInSeconds = date.getTime();
    return( { 'date':date, 'timeInSeconds':timeInSeconds/1000 } ); 
}

// Returns the number of week of the year
function getWeekNumber(d) {
    d = new Date( Date.UTC( d.getFullYear(), d.getMonth(), d.getDate() ) );
    d.setUTCDate( d.getUTCDate() + 4 - (d.getUTCDay() || 7) );
    var startOfYear = new Date( Date.UTC( d.getUTCFullYear(), 0,1 ) );
    var weekNumber = Math.ceil( ( ( (d - startOfYear) / 86400000 ) + 1 ) / 7 );
    return weekNumber;
}

function displayMessageBox( message ) {
	blackOutBoxDiv.style.display='block';	
	messageBoxDiv.style.display = 'table';
	messageBoxTextDiv.innerText = message;
}

function hideMessageBox() {
	blackOutBoxDiv.style.display='none';	
	messageBoxDiv.style.display = 'none';
}

function displayEditBox() {
	blackOutBoxDiv.style.display='block';	
	editBoxDiv.style.display = 'table';
}
function hideEditBox() {
	blackOutBoxDiv.style.display='none';	
	editBoxDiv.style.display = 'none';
}

function displayDataInEditBox( id ) {
	let i = id.getAttributeNS(null, 'data-i');
	editBoxDetailsElem.innerHTML = formatTitleTextContent(i,true);
	editBoxOperationIndexElem.value = i;
	editBoxOperationCodeElem.value = data.operations[i].Code;
	for( let iE = 0 ; iE < data.editable.length ; iE++ ) {
		let ref = data.editable[iE].ref;
		let elem = document.getElementById( "editBoxInput" + ref );
		if( elem ) {
			let valueSet = false;
			if( 'userData' in data.operations[i] ) {
				if( ref in data.operations[i].userData ) {
					elem.value = data.operations[i].userData[ ref ];
					valueSet = true;
				}
			}
			if( !valueSet ) {
				elem.value = data.operations[i][ ref ];
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
			        	let i = editBoxOperationIndexElem.value;
			    		if( !('userData' in data.operations[i]) ) {
							data.operations[i].userData = {};
						}
						for( let iE = 0 ; iE < data.editable.length ; iE++ ) {
							let ref = data.editable[iE].ref;
							let elem = document.getElementById( 'editBoxInput' + ref );
							data.operations[i].userData[ ref ] = elem.value;
						}
			        	document.getElementById( 'ganttGroupTitle'+i). textContent = formatTitleTextContent(i); 
			        	document.getElementById('editBoxMessage').innerText = '';
				        hideEditBox();
			        } else {
			        	alert("Error: " + this.responseText); // this.responseText contains the error message. 
			        	document.getElementById('editBoxMessage').innerText = terms[lang].errorLoadingData + ": " + this.responseText;
			        }
			    }
		    }
		};

		let operationIndexValue = editBoxOperationIndexElem.value;

		let bEdited = false; // The following is to confirm something has been edited...
		for( let iE = 0 ; iE < data.editable.length ; iE++ ) {
			let ref = data.editable[iE].ref;
			let elem = document.getElementById( 'editBoxInput' + ref );
			if( elem ) {
				if( !('userData' in data.operations[operationIndexValue]) )	{
					if( elem.value != data.operations[operationIndexValue][ref] ) {
						bEdited = true;
						break;
					}
				} else {
					if( elem.value != data.operations[operationIndexValue].userData[ref] ) {
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
		for( let i = 0 ; i < data.operations.length ; i++ ) {
			if( 'userData' in data.operations[i] || i == operationIndexValue ) {
				let userDataOfOperation = {};
				for( let iE = 0 ; iE < data.editable.length ; iE++ ) {
					let ref = data.editable[iE].ref;
					let value;
					if( i == editBoxOperationIndexElem.value ) {
						let elem = document.getElementById( 'editBoxInput' + ref );
						value = elem.value;
					} else {
						value = data.operations[i].userData[ ref ];
					}
					userDataOfOperation[ ref ] = value;
				}
				userData.push( { "operationCode":data.operations[i].Code, "data":userDataOfOperation } );				
			}
		}
		if( userData.length > 0 ) {
			xmlhttp.open("POST", "saveuserdata.php", true);
			xmlhttp.setRequestHeader("Cache-Control", "no-cache");
			xmlhttp.setRequestHeader("Content-type", "plain/text" ); //"application/x-www-form-urlencoded");
			xmlhttp.send( JSON.stringify(userData) );		
			document.getElementById('editBoxMessage').innerText = terms[lang].waitSaveUserDataText;			
		}
	} else {
    	let i = editBoxOperationIndexElem.value;
		if( !('userData' in data.operations[i]) ) {
			data.operations[i].userData = {};
		}
		for( let iE = 0 ; iE < data.editable.length ; iE++ ) {
			let ref = data.editable[iE].ref;
			let elem = document.getElementById( 'editBoxInput' + ref );
			data.operations[i].userData[ ref ] = elem.value;
		}
    	document.getElementById( 'ganttGroupTitle'+i).textContent = formatTitleTextContent(i); 
		hideEditBox();
	}
}
