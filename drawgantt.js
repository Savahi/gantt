function drawGantt( init=false, shiftOnly=false ) {
	if( _inputOnly ) {
		return;
	}

    _ganttViewBoxLeft = timeToScreen( _ganttVisibleLeft ) - _settings.ganttChartLeftMargin;
    _ganttViewBoxTop = operToScreen( _visibleTop );
    let ganttViewBox = `${_ganttViewBoxLeft} ${_ganttViewBoxTop} ${_ganttSVGWidth} ${_ganttSVGHeight}`;
    _ganttSVG.setAttributeNS(null,'viewBox',ganttViewBox);
    if( shiftOnly ) {
    	return;
    }

	if( init ) {
		while (_ganttSVG.hasChildNodes()) {
			_ganttSVG.removeChild(_ganttSVG.lastChild);
		}		
		_ganttSVGBkgr = createRect( 0, 0, timeToScreen(_data.visibleMax), operToScreen(_data.operations.length), { fill:'#ffffff' } );
		_ganttSVG.appendChild(_ganttSVGBkgr);		

	} else {
		_ganttSVGBkgr.setAttributeNS(null,'width',timeToScreen(_data.visibleMax));
		_ganttSVGBkgr.setAttributeNS(null,'height',operToScreen(_data.operations.length));
	}

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
	if( fontSize > _settings.ganttMaxFontSize ) {
		fontSize = _settings.ganttMaxFontSize;
	}
	let rectBottomMargin = (fontSize > _settings.ganttMinFontSize) ? _settings.ganttRectBottomMargin : _settings.ganttRectBottomMarginTitleFree;
	let rectTopMargin = (fontSize > _settings.ganttMinFontSize) ? _settings.ganttRectTopMargin : _settings.ganttRectTopMarginTitleFree;
	let compareBottomMargin = (fontSize > _settings.ganttMinFontSize) ? _settings.ganttCompareBottomMargin : _settings.ganttCompareBottomMarginTitleFree;
	let compareTopMargin = (fontSize > _settings.ganttMinFontSize) ? _settings.ganttCompareTopMargin : _settings.ganttCompareTopMarginTitleFree;
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
		strokeWidth:1, opacity:_settings.ganttLinkArrowOpacity, endingArrow:true };
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
				// Creating a title for the link lines...
				// let lineTitleText = `${_data.operations[predOp].Name} [${_data.operations[predOp].Code}] -> ${_data.operations[succOp].Name} [${_data.operations[succOp].Code}]`; 
				// let lineTitle = document.createElementNS(NS,'title');
  				// lineTitle.textContent = lineTitleText;
  				// line.appendChild(lineTitle);
  				// arrowLine.appendChild(lineTitle);
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
			if( !_data.operations[predOp].visible || !_data.operations[succOp].visible || !_displayLinksOn ) {
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
					opBetween = createRect( xLastFin, rectTop+rectHeight*0.33, xRestart - xLastFin, 1 /*rectHeight*0.2*/, op100Properties  ); // Rectangle
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
				if( _data.editables.length > 0 ) {
					if( !_inputOnly || 
						(_inputOnly && (typeof(_data.operations[i].Level) === 'string' || _data.operations[i].Level === null)) ) {
			 			group.onmousedown = function(e) { e.stopPropagation(); displayEditBoxWithData(this); };
					}
				}
	 			//group.ontouchstart = function(e) { e.stopPropagation(); displayEditBoxWithData(this); };
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
			text.style.fontSize = fontSize;
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
					setRectCoords( elBetween, xLastFin, rectTop + rectHeight*0.33, xRestart - xLastFin, 1 /*rectHeight*0.2*/ );
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

		if( fontSize < _settings.ganttMinFontSize ) { // If font size is too small to make text visible at screen.
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

function drawGanttHScroll( init=false ) {
	if( _inputOnly ) {
		return;
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
		_ganttHScrollSVGBkgr.addEventListener( 'mousedown', onGanttHScrollSVGBkgr );
		//_ganttHScrollSVGBkgr.addEventListener( 'touchstart', onGanttHScrollSVGBkgr );		
		_ganttHScrollSVGSlider = createRect( sliderPosition, 0, sliderSize, _ganttHScrollSVGHeight, 
			{ id:('ganttHScrollSVGSlider'), fill:_settings.scrollSliderColor } );
		_ganttHScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		_ganttHScrollSVG.appendChild( _ganttHScrollSVGBkgr );
		_ganttHScrollSVG.appendChild( _ganttHScrollSVGSlider );
		_ganttHScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderActiveColor); };
		_ganttHScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderColor) };
		_ganttHScrollSVGSlider.addEventListener('mousedown', onGanttHScrollSVGSlider, true );
		//_ganttHScrollSVGSlider.addEventListener('touchstart', onGanttHScrollSVGSlider );
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
	let overallHeight =  _notHiddenOperationsLength;
	let visibleMaxTop = (overallHeight > _visibleHeight) ? (overallHeight - _visibleHeight) : 0;
	let sliderSize = (visibleMaxTop > 0) ? (_verticalScrollSVGHeight*_visibleHeight/overallHeight) : _verticalScrollSVGHeight;
	if( sliderSize < _settings.scrollSliderSize ) {
		sliderSize = _settings.scrollSliderSize;
	}
	let sliderPosition;
	if( visibleMaxTop > 0 ) {
		sliderPosition = _visibleTop * (_verticalScrollSVGHeight-sliderSize) / visibleMaxTop;
	} else {
		sliderPosition = 0;
	}
	if( init ) {
		let bbox = _verticalScrollSVG.getBBox();
		_verticalScrollSVGBkgr = createRect( 0, 0, _verticalScrollSVGWidth, _verticalScrollSVGHeight, 
			{ id:('verticalScrollSVGBkgr'), fill:_settings.scrollBkgrColor, stroke:_settings.scrollRectColor, strokeWidth:1 } );
		_verticalScrollSVGBkgr.setAttributeNS(null,'cursor','pointer');
		_verticalScrollSVGBkgr.addEventListener('mousedown', onVerticalScrollSVGBkgr);
		//_verticalScrollSVGBkgr.addEventListener('touchstart', onVerticalScrollSVGBkgr);
		_verticalScrollSVGSlider = createRect( 0, sliderPosition, _verticalScrollSVGWidth, sliderSize, 
			{ id:('verticalScrollSVGSlider'), fill:_settings.scrollSliderColor } );
		_verticalScrollSVGSlider.setAttributeNS(null,'cursor','pointer');
		_verticalScrollSVG.appendChild( _verticalScrollSVGBkgr );
		_verticalScrollSVG.appendChild( _verticalScrollSVGSlider );
		_verticalScrollSVGSlider.onmouseover = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderActiveColor) };
		_verticalScrollSVGSlider.onmouseout = function(e) { this.setAttributeNS(null,'fill',_settings.scrollSliderColor) };
		_verticalScrollSVGSlider.addEventListener('mousedown', onVerticalScrollSVGSlider, true );
		//_verticalScrollSVGSlider.addEventListener('touchstart', onVerticalScrollSVGSlider );
	} else {
		_verticalScrollSVGSlider.setAttributeNS(null,'height',sliderSize);
		_verticalScrollSVGSlider.setAttributeNS(null,'y',sliderPosition);
	}
}

