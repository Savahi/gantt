
var NS = "http://www.w3.org/2000/svg";

var data = {
	proj: { code:'Project-1', name:'The name of the project may be tha-a-a-a-a-a-a-a-a-a-t long...', 
		projVer:'1.0', curTime:'09.02.2007 08:00' },
	factStartMin:-1, factFinMax:-1, asapStartMin:-1, asapFinMax:-1, startMin:-1, finMax:-1, startFin:-1,
	operations: [
		{ level:1, code:'1', name:'Phase 1', factStart:'01.01.2007  08:00', factFin:'17.01.2007  16:00', asapStart:'01.01.2007  08:00', asapFin:'17.01.2007  08:00', costTotal:100, volSum:1000, durSumD:24 },
		{ level:null, code:'1-1', name:'Operation 1-1', factStart:'01.01.2007  08:00', factFin:'17.01.2007  16:00', asapStart:'01.01.2007  08:00', asapFin:'17.01.2007  10:00', costTotal:100, volSum:1300, durSumD:20 },
		{ level:null, code:'1-2', name:'Operation 1-2', factStart:'09.01.2007  08:00', factFin:'15.01.2007  16:00', asapStart:'09.01.2007  08:00', asapFin:'15.01.2007  08:00', costTotal:100, volSum:1004, durSumD:23 },
		{ level:1, code:'2', name:'Phase 2', factStart:'15.01.2007  08:00', factFin:'12.02.2007  16:00', asapStart:'15.01.2007  08:00', asapFin:'12.02.2007  10:00', costTotal:100, volSum:1000, durSumD:23 },
		{ level:null, code:'2-1', name:'Operation 2-1', factStart:'15.01.2007  08:00', factFin:'20.01.2007  16:00', asapStart:'15.01.2007  08:00', asapFin:'20.01.2007  10:00', costTotal:100, volSum:3400, durSumD:10 },
		{ level:null, code:'2-2', name:'Operation 2-2', factStart:'20.01.2007  08:00', factFin:null, asapStart:'21.01.2007  08:00', asapFin:'23.01.2007  10:00', costTotal:100, volSum:1540, durSumD:20 },
		{ level:null, code:'2-3', name:'Operation 2-3', factStart:null, factFin:null, asapStart:'21.01.2007  08:00', asapFin:'12.02.2007  10:00', costTotal:100, volSum:1050, durSumD:21 },
		{ level:1, code:'3', name:'Phase 3', factStart:'25.01.2007  08:00', factFin:'24.03.2007  16:00', asapStart:'25.01.2007  08:00', asapFin:'24.03.2007  10:00', costTotal:100, volSum:1000, durSumD:23 },
		{ level:null, code:'3-1', name:'Operation 3-1', factStart:'25.01.2007  08:00', factFin:'10.03.2007  16:00', asapStart:'25.01.2007  08:00', asapFin:'10.01.2007  10:00', costTotal:100, volSum:3400, durSumD:10 },
		{ level:null, code:'3-2', name:'Operation 3-2', factStart:'02.02.2007  08:00', factFin:null, asapStart:'10.02.2007  08:00', asapFin:'24.03.2007  10:00', costTotal:100, volSum:1540, durSumD:20 },
		{ level:1, code:'4', name:'Phase 4', factStart:'25.01.2007  08:00', factFin:'24.03.2007  16:00', asapStart:'25.01.2007  08:00', asapFin:'24.03.2007  10:00', costTotal:100, volSum:1000, durSumD:23 },
		{ level:null, code:'4-1', name:'Operation 4-1', factStart:'25.01.2007  08:00', factFin:'10.03.2007  16:00', asapStart:'25.01.2007  08:00', asapFin:'10.01.2007  10:00', costTotal:100, volSum:3400, durSumD:10 },
		{ level:null, code:'4-2', name:'Operation 4-2', factStart:'02.02.2007  08:00', factFin:null, asapStart:'10.02.2007  08:00', asapFin:'24.03.2007  10:00', costTotal:100, volSum:1540, durSumD:20 },
	],
	operationsLinks: [
		{ predCode:'2-1', succCode:'2-2', typeSF:'FS', lagType:'time', lagUnit:'hour', lag:10 },
		{ predCode:'2-2', succCode:'2-3', typeSF:'FF', lagType:'time', lagUnit:'hour', lag:10 }
	],
	resourses: [
		{ level:0, code:'0', name:'Resourse #0', type:'Type #0', number:1 },
		{ level:1 , code:'1', name:'Resourse #1', type:'Type #1', number:10 },
		{ level:0 , code:'2', name:'Subresourse of #1', type:'Type #1.1', number:10 },
		{ level:0 , code:'3', name:'Subresourse of #1', type:'Type #1.2', number:10 }
	],
	assignments: [
		{ operCode:'1', resCode:'1', number:1, prior:10 },
		{ operCode:'2', resCode:'2', number:1, prior:10 }
	],
	cost: [
		{ code:'0', name:'Name of Cost0' }, { code:'1', name:'Name of Cost1' }, 
		{ code:'2', name:'Name of Cost2' }, { code:'3', name:'Name of Cost3' }
	],
	operCost: [
		{ operCode:'0', costCode:'0', fix:2 }, { operCode:'1', costCode:'1', fix:4 }, 
		{ operCode:'2', costCode:'2', fix:10 }, { operCode:'3', costCode:'3', fix:100 }
	],
	colors: {
		level1:'#f8edc9', level2:'#ccffcc', level3:'#e1e1ff', level4:'#dfffff', level5:'#e6e6ff',
		level6:'#e6e6ff', level7:'#e6e6ff', level8:'#e6e6ff', level9:'#e6e6ff', level10:'#e6e6ff', oper:'#ffffff'
	}	
};

var tableColumns = [ { name:'[]', ref:'', width:30 }, { name:'Level', ref:'level', width:40 },
	{ name:'Name', ref:'name', width:80 }, { name:'Code', ref:'code', width:80 }, 
	{ name:'Start', ref:'start', width:80 }, { name:'Finish', ref:'fin', width:80 }, 
	{ name:'Cost', ref:'costTotal', width:80 }, { name:'Vol.', ref:'volSum', width:80 }, { name:'Dur.', ref:'durSumD', width:80 } ]; 

var settings = {
	ganttOperation0RectColor:'#bfbfff', ganttOperation0StrokeColor:'#bfbfff', ganttOperation0Opacity:0.75,
	ganttOperation100RectColor:'#7f7fff', ganttOperation100StrokeColor:'#7f7fff', ganttOperation100Opacity:0.75,
	ganttPhaseRectColor:'#afafaf', ganttPhaseStrokeColor:'#7f7f7f', ganttPhaseActiveColor:'#4f4f4f', ganttPhaseOpacity:0.75,
	ganttUnfinishedOpacity:0.5,
	ganttFontColor:'#4f4f4f', timeScaleFontColor:'#4f4f4f', timeScaleFillColor:'#cfcfdf', timeScaleStrokeColor:'#afafaf',
	ganttLinkStrokeColor:'#000000',	ganttLinkStrokeWidth:1, ganttLinkStrokeDashArray:'1,4,1,4',
	tableHeaderFontColor:'#4f4f4f',	tableHeaderFillColor:'#cfcfdf',	tableHeaderStrokeColor:'#4f4f4f', tableContentFontColor:'#4f4f4f',
	tableContentFillColor:'#ffffff', tableContentStrokeColor:'#4f4f4f',
	scrollBkgrColor:'#cfcfcf', scrollRectColor:'#afafaf', scrollSliderColor:'#8f8f8f', scrollSliderActiveColor:'#000000',
	gridColor:"#bfbfbf", gridStrokeWidth:0.5, gridOpacity:1, gridCurrentTimeColor:"#bf2f2f",
	ganttChartLeftMargin:8, ganttChartRightMargin:8, ganttRectTopMargin:0.4, ganttRectBottomMargin:0.2,
	ganttRectBracketRelHeight:0.75,	ganttRectBracketThick:5,
	minDayWidthOnTimeScale:12,
	scrollThick:8, scrollSliderSize:10,
	verticalSplitterInitialPosition:0.25,
	initialZoomFactor:1.25,
	containerHPadding:0
}

var language='en';

var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var monthNamesRu = ['Янв','Фев','Мар','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Ноя','Дек'];

var termsDictionary = { 
	'en': { operation:'Operation', phase:'Phase', gantt:'Gantt', help:'Help', monthNames:monthNames },
	'ru': { operation:'Операция', phase:'Фаза', gantt:'Гантт', help:'Справка', monthNames:monthNamesRu }
};

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

loadData();
drawAll();

function drawAll() {	
	let success = initLayout();
	if( success ) {
		initLayoutCoords();
		createDefs();
		drawTableContent(true);
		drawTableHeader(true);
		drawTimeScale();
		drawGantt(true);
		drawTableScroll( true );
		drawGanttHScroll( true );
		drawVerticalScroll( true );
	}
}

function loadData() {
	var curTimeParsed = parseDate( data.proj.curTime );
	if( curTimeParsed != null ) {
		data.proj.curTimeInSeconds = curTimeParsed.timeInSeconds;
	} else {
		data.proj.curTimeInSeconds = parseInt(Date.now()/1000);		
	}

	// Retrieving dates of operations, calculating min. and max. dates.
	var parsed;
	for( let i = 0 ; i < data.operations.length ; i++ ) {
		let d = data.operations[i];
		parsed = parseDate( data.operations[i].asapStart );
		if( parsed != null ) {
			data.asapStartMin = reassignBoundaryValue( data.asapStartMin, parsed.timeInSeconds, false );
			data.operations[i].asapStartInSeconds = parsed.timeInSeconds;
		}
		parsed = parseDate( data.operations[i].asapFin );
		if( parsed != null ) {
			data.asapFinMax = reassignBoundaryValue( data.asapFinMax, parsed.timeInSeconds, true );
			data.operations[i].asapFinInSeconds = parsed.timeInSeconds;
		}
		parsed = parseDate( data.operations[i].factStart );
		if( parsed != null ) {
			data.factStartMin = reassignBoundaryValue( data.factStartMin, parsed.timeInSeconds, false );
			data.operations[i].factStartInSeconds = parsed.timeInSeconds;
		}
		parsed = parseDate( data.operations[i].factFin );
		if( parsed != null ) {
			data.factFinMax = reassignBoundaryValue( data.factFinMax, parsed.timeInSeconds, true );
			data.operations[i].factFinInSeconds = parsed.timeInSeconds;
		}
		// Start and finish
		if( data.operations[i].factFin != null ) {
			d.status = 100; // finished
			d.displayStartInSeconds = d.factStartInSeconds; 
			d.displayFinInSeconds = d.factFinInSeconds;
			d.displayUnfinishedInSeconds = null; 
			d.start = d.factStart;
			d.fin = d.factFin;
		} else {
			if( d.factStart == null ) { // Hasn't been started yet
				d.status = 0; // not started 
				d.displayStartInSeconds = d.asapStartInSeconds; 
				d.displayFinInSeconds = d.asapFinInSeconds;
				d.displayUnfinishedInSeconds = null;
				d.start = d.asapStart;
				d.fin = d.asapFin;
			} else { // started but not finished
				let divisor = d.asapFinInSeconds - d.factStartInSeconds;
				if( divisor > 0 ) {
					d.status = parseInt( (d.asapStartInSeconds - d.factStartInSeconds) * 100 / divisor); 
				} else {
					d.status = 50;
				}
				d.displayStartInSeconds = d.factStartInSeconds; 
				d.displayFinInSeconds = d.asapFinInSeconds;
				d.displayUnfinishedInSeconds = d.asapStartInSeconds;
				d.start = d.factStart;
				d.fin = d.asapFin;				
			}
		}
	}
	data.startMin = (data.asapStartMin > data.factStartMin) ? data.factStartMin : data.asapStartMin;
	data.finMax = (data.asapFinMax > data.factFinMax) ? data.asapFinMax : data.factFinMax;
	data.startFin = data.finMax - data.startMin;
	data.visibleMin = data.startMin; // - (data.finMax-data.startMin)/20.0;
	data.visibleMax = data.finMax; // + (data.finMax-data.startMin)/20.0;
	data.visibleMaxWidth = data.visibleMax - data.visibleMin;

	// Initializing the structure 
	for( let i = 0 ; i < data.operations.length ; i++ ) {
		data.operations[i].id = 'ganttRect' + i; // Id
		data.operations[i].parents = []; // Initializing "parents"
		for( let j = i-1 ; j >= 0 ; j-- ) {
			if( data.operations[j].level != null ) {
				let l = data.operations[i].parents.length;
				if( l == 0 ) {
					if( data.operations[i].level == null ) {
						data.operations[i].parents.push(j);
					} else if( data.operations[i].level > data.operations[j].level ) {
						data.operations[i].parents.push(j);						
					}
				} else {
					let lastPushedIndex = data.operations[i].parents[l-1];
					if( data.operations[lastPushedIndex].level > data.operations[j].level ) {
						data.operations[i].parents.push(j);						
					}
				} 
			} 
		}
		if( data.operations[i].level == null ) {
			data.operations[i].expanded = false;
			data.operations[i].visible = true;
		} else {
			data.operations[i].expanded = true;			
			data.operations[i].visible = true;
		}
	}	
}

function initLayout() {
	let menuWidth = parseInt( getComputedStyle(document.getElementById('menu')).width );
	let menuProjectDetails = document.getElementById('menuProjectDetails');
	menuProjectDetails.style.width=10*menuWidth/100;
	menuProjectDetails.innerHTML = data.proj.curTime + "<br/>V. " + data.proj.projVer;

	let menuProjectName = document.getElementById('menuProjectName');
	menuProjectName.innerText = data.proj.name;
	menuProjectName.style.width = 70*menuWidth/100;

	let menuMain = document.getElementById('menuMain');
	menuMain.style.width = 10*menuWidth/100;
	let menuHelp = document.getElementById('menuHelp');
	menuHelp.style.width = 10*menuWidth/100;

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

	zoomX(null, null);
	zoomY(null, null);

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

function findResoursesForOperation( operationIndex ) {
	let operationCode = data.operations[operationIndex].code;
	for( let i = 0 ; i < data.assignments.length ; i++ ) {
		if( data.assignments[i].operCode == operationCode ) {
			let resourseCode = data.assignments[i].resCode;
			for( let j = 0 ; j < data.resourses.length ; j++ ) {
				if( data.resourses[j].code == resourseCode ) {
					return { code:data.resourses[j].code, name:data.resourses[j].name, number:data.resourses[j].number }
				}
			}
		}
	}
	return null;
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

	// Drawing gantt visual elements...
	let rectCounter = 0;
	let rect0Properties = { fill:settings.ganttOperation0RectColor, stroke:settings.ganttOperation0StrokeColor, 
		strokeWidth:1, opacity:settings.ganttOperation0Opacity };
	let rect100Properties = { fill:settings.ganttOperation100RectColor, stroke:settings.ganttOperation100StrokeColor, 
		strokeWidth:1, opacity:settings.ganttOperation100Opacity };
	let fontSize = (operToScreen(settings.ganttRectTopMargin) - operToScreen(0)) * 0.7;
	for( let i = 0 ; i < data.operations.length ; i++ ) {

		let rectStart = timeToScreen( data.operations[i].displayStartInSeconds );
		let rectEnd = timeToScreen( data.operations[i].displayFinInSeconds );
		let rectTop = operToScreen(rectCounter + settings.ganttRectTopMargin);
		let rectBottom = operToScreen(rectCounter + 1.0 - settings.ganttRectBottomMargin);
		let rectWidth = rectEnd - rectStart;
		let rectHeight = (rectBottom-rectTop);
		let rectVMiddle = rectTop + (rectBottom-rectTop)/2;

		if( init ) { // Initializing...
			let group = document.createElementNS( NS, 'g' ); // Container
			group.setAttributeNS(null,'id','ganttGroup'+i);
			if( data.operations[i].level === null ) {
				if( data.operations[i].status == 0 ) {
					rect0Properties.id = 'ganttOpNotStarted'+i;
					let rect0 = createRect( rectStart, rectTop, rectWidth, rectHeight, rect0Properties ); // Rectangle
					group.appendChild(rect0);
				} else if( data.operations[i].status == 100 ) {
					rect100Properties.id = 'ganttOpFinished'+i;
					let rect100 = createRect( rectStart, rectTop, rectWidth, rectHeight, rect100Properties ); // Rectangle
					group.appendChild(rect100);
				} else {
					let xUnfinished = timeToScreen( data.operations[i].displayUnfinishedInSeconds );
					rect100Properties.id = 'ganttOpFinished'+i;
					let rect100 = createRect( rectStart, rectTop, xUnfinished - rectStart, rectHeight, rect100Properties ); // Rectangle
					group.appendChild(rect100);
					rect0Properties.id = 'ganttOpNotStarted'+i;
					let rect0 = createRect( xUnfinished, rectTop, rectEnd - xUnfinished , rectHeight, rect0Properties );
					group.appendChild(rect0);					
				}
			} else {
				let rectPhase = document.createElementNS( NS, 'polygon' );
				rectPhase.setAttributeNS(null,'id','ganttPhase'+i);
				rectPhase.setAttributeNS(null,'fill',settings.ganttPhaseRectColor);
				rectPhase.setAttributeNS(null,'stroke',settings.ganttPhaseStrokeColor);
				rectPhase.setAttributeNS(null,'opacity',settings.ganttPhaseOpacity);
				rectPhase.setAttributeNS(null,'points',calcPhaseCoords( rectStart, rectEnd, rectTop, rectBottom));
				group.appendChild(rectPhase);
			}
			group.style.cursor = 'pointer';

			let title = document.createElementNS( NS,'title' ); // Title
			let phaseOrOp = (data.operations[i].level === null ) ? "Operation: " : "Phase: ";
			title.textContent = phaseOrOp + data.operations[i].name + "\r\n";
			if( data.operations[i].status == 0 ) {
				title.textContent += "Status: not started" + "\r\n";
			} else if( data.operations[i].status < 100 ) {
				title.textContent += "Status: " + data.operations[i].status + "% done" + "\r\n";
			} else {
				title.textContent += "Status: done" + "\r\n";				
			}
			let res = findResoursesForOperation( i );
			if( res != null ) {
				title.textContent += "Resourse: " + res.name + "\r\n";
			}
			for( let col=1 ; col < tableColumns.length ; col++ ) {
				if( tableColumns[col].name == 'Name' ) {
					continue;
				}
				let ref = tableColumns[col].ref;
				let content = data.operations[i][ref];
				if( content === 'undefined' || content == null ) {
					continue;
				}
				title.textContent += tableColumns[col].name + ": " + content + "\r\n";
			}
			group.appendChild(title);
			text = createText( data.operations[i].name, rectStart, rectTop - fontSize * 0.25, 
				{ fontSize:fontSize, fill:settings.ganttFontColor, id:'ganttText'+i } );
			text.style.cursor = 'pointer';
			group.appendChild(text);
			ganttSVG.appendChild(group);			
		} else {
			text = document.getElementById( 'ganttText'+i );
			text.setAttributeNS(null,'x',rectStart);
			text.setAttributeNS(null,'y',rectTop - fontSize * 0.25);
			text.setAttributeNS(null,'font-size',fontSize);
			if( data.operations[i].level === null ) {
				if( data.operations[i].status == 0 ) {
					let rect0 = document.getElementById('ganttOpNotStarted'+i);
					rect0.setAttributeNS(null,'x',rectStart);
					rect0.setAttributeNS(null,'width',rectWidth);
					rect0.setAttributeNS(null,'y',rectTop);
					rect0.setAttributeNS(null,'height',rectHeight);
				} else if( data.operations[i].status == 100 ) {
					let rect100 = document.getElementById('ganttOpFinished'+i);
					rect100.setAttributeNS(null,'x',rectStart);
					rect100.setAttributeNS(null,'width',rectWidth);
					rect100.setAttributeNS(null,'y',rectTop);
					rect100.setAttributeNS(null,'height',rectHeight);
				} else {
					let xUnfinished = timeToScreen( data.operations[i].displayUnfinishedInSeconds );
					let rect100 = document.getElementById('ganttOpFinished'+i);
					let rect0 = document.getElementById('ganttOpNotStarted'+i);
					rect100.setAttributeNS(null,'x', rectStart);
					rect100.setAttributeNS(null,'width', xUnfinished - rectStart);
					rect100.setAttributeNS(null,'y', rectTop);
					rect100.setAttributeNS(null,'height', rectHeight);
					rect0.setAttributeNS(null,'x', xUnfinished);
					rect0.setAttributeNS(null,'width', rectEnd - xUnfinished);
					rect0.setAttributeNS(null,'y', rectTop);
					rect0.setAttributeNS(null,'height', rectHeight);
				}
			} else {
				rectPhase = document.getElementById('ganttPhase'+i);
				rectPhase.setAttributeNS(null,'points',calcPhaseCoords( rectStart, rectEnd, rectTop, rectBottom));
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
			rectCounter += 1;		
		}
	}

	// Gantt links
	let lineProperties = { stroke:settings.ganttLinkStrokeColor, strokeWidth:settings.ganttLinkStrokeWidth, 
		strokeDasharray:settings.ganttLinkStrokeDashArray, endingArrow:true };
	for( let i = 0 ; i < data.operationsLinks.length ; i++ ) {

		let predCode = data.operationsLinks[i].predCode;
		let succCode = data.operationsLinks[i].succCode;
		let predOp = null;
		let succOp = null;
		for( let op = 0 ; op < data.operations.length ; op++ ) {
			if( !predOp ) { 
				if( data.operations[op].code == predCode ) { predOp = op; }
			}
			if( !succOp ) {
				if( data.operations[op].code == succCode ) { succOp = op; }
			}
			if( predOp && succOp ) {
				break;
			}
		}

		if( predOp && succOp ) {
			let line, lineX1, lineY1, lineX2, lineY2;
			if( data.operationsLinks[i].typeSF == 'SS' || data.operationsLinks[i].typeSF == 'SF' ) {
				lineX1 = data.operations[predOp].left;
			} else {
				lineX1 = data.operations[predOp].right;				
			}
			lineY1 = data.operations[predOp].top + (data.operations[predOp].bottom - data.operations[predOp].top) / 2.0;
			if( data.operationsLinks[i].typeSF == 'SF' || data.operationsLinks[i].typeSF == 'FF' ) {
				lineX2 = data.operations[succOp].left;
			} else {
				lineX2 = data.operations[succOp].right;				
			}
			lineY2 = data.operations[succOp].top + (data.operations[succOp].bottom - data.operations[succOp].top) / 2.0;
			if( init ) {
				lineProperties.id='ganttLine'+i;
				line = createLine( lineX1, lineY1, lineX2, lineY2, lineProperties );
				ganttSVG.appendChild(line);				
			} else {
				line = document.getElementById( 'ganttLine'+i );
				line.setAttributeNS(null,'x1',lineX1);
				line.setAttributeNS(null,'x2',lineX2);
				line.setAttributeNS(null,'y1',lineY1);
				line.setAttributeNS(null,'y2',lineY2);
			}
			if( !data.operations[predOp].visible || !data.operations[succOp].visible ) {
				line.setAttributeNS(null,'display','none');
			} else {
				line.setAttributeNS(null,'display','block');				
			}
		}
	}	
}

function calcPhaseCoords( rectStart, rectEnd, rectTop, rectBottom ) {
	let phaseBracketHeight = (rectBottom - rectTop) * settings.ganttRectBracketRelHeight;
	phaseCoords = rectStart+" "+rectTop+" "+rectEnd+" "+rectTop+" "+rectEnd+" "+rectBottom;
	phaseCoords += " "+(rectEnd - settings.ganttRectBracketThick)+" "+(rectTop+phaseBracketHeight);
	phaseCoords += " "+(rectStart + settings.ganttRectBracketThick)+" "+(rectTop+phaseBracketHeight)+" "+rectStart+" "+rectBottom;
	return phaseCoords;
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
			let text = createText( tableColumns[i].name, 2, tableHeaderSVGHeight/2, 
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
			let splitter = createRect( left-tableVisibleLeft, 0, 1, operToScreen(data.operations.length), {id:'tableSplitter'+col, fill:'#dfdfdf'} );
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
		let lineMiddle = lineTop + lineHeight/2;
		let lineId = 'ganttTableLine' + i;

		let expand='[]';
		if( data.operations[i].level != null ) {
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
				{ id:expandTextId, fontSize:12, textAnchor:'middle', alignmentBaseline:'baseline' } );
	 		document.getElementById('tableColumnSVG0').appendChild(expandText);
	 		expandText._operationNumber=i;
	 		if( data.operations[i].level != null ) {
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
					{ id:('tableColumn'+col+'Row'+i), fill:settings.tableContentStrokeColor, textAnchor:'start', fontSize:10 } );
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
		for( let m = minM ; m <= maxM ; m++ ) {
			let startOfMonth = new Date(y,m,1,0,0,0,0);
			let startOfMonthInSeconds = startOfMonth.getTime() / 1000;
			let endOfMonth = new Date(y,m+1,0,23,59,59,999);
			let endOfMonthInSeconds = endOfMonth.getTime() / 1000;
			let monthStartX = timeToScreen(startOfMonthInSeconds);
			let monthEndX = timeToScreen(endOfMonthInSeconds);
			let monthRect = createRect( monthStartX, monthY, monthEndX - monthStartX, textRectHeight, textRectProperties );		
			timeSVG.appendChild(monthRect);
			let monthString = monthNames[m];
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
	return ( n - ganttVisibleTop) * ganttSVGHeight / ganttVisibleHeight; 
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
    marker.setAttribute('markerWidth', 10 ); //ganttSVGWidth*2 / ganttVisibleWidth );
    marker.setAttribute('markerHeight', 10 ); //ganttSVGWidth*2 / ganttVisibleWidth );
    marker.setAttribute('orient', 'auto');
    let path = document.createElementNS(NS, 'path');
    path.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    path.setAttribute('fill', 'url(#blackToGrayGradient)');
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
