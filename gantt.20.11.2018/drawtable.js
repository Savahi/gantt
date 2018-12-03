
function drawTableHeader( init=false, shiftOnly=false ) {
    let thViewBox = `${_tableViewBoxLeft} 0 ${_tableHeaderSVGWidth} ${_tableHeaderSVGHeight}`;
    _tableHeaderSVG.setAttributeNS(null,'viewBox',thViewBox);
    if( shiftOnly ) {
        return;
    }

    calcTableHeaderOverallWidth();
	if( init ) {
		while (_tableHeaderSVG.hasChildNodes()) {
			_tableHeaderSVG.removeChild(_tableHeaderSVG.lastChild);
		}

		_tableHeaderSVGBkgr = createRect( 0, 0, _tableHeaderOverallWidth, _tableHeaderSVGHeight, 
			{ id:'tableHeaderBkgr', fill:_settings.tableHeaderFillColor } ); // backgroud rect
		_tableHeaderSVG.appendChild( _tableHeaderSVGBkgr );			

		let left = _data.table[0].width;
		for( let col = 1 ; col < _data.table.length ; col++ ) {
			let svg = createSVG(left, 0, _data.table[col].width, _tableHeaderSVGHeight, 
				{ id:'tableHeaderColumnNameSVG'+col, 'fill':_settings.tableHeaderFillColor } );
			left += _data.table[col].width;
			let props = { id:'tableHeaderColumnNameBkgr'+col, 'fill':_settings.tableHeaderFillColor, 
				'stroke':_settings.tableHeaderBorderColor, 'strokeWidth':1 };
			let rect = createRect(0, 0, _data.table[col].width-2, _tableHeaderSVGHeight, props );
			rect.onmouseover = function(e) { this.setAttributeNS( null, 'stroke', _settings.tableHeaderActiveBorderColor); };
			rect.onmouseout = function(e) { this.setAttributeNS( null, 'stroke', _settings.tableHeaderBorderColor); };
			//let text = createText( _data.table[col].name, 2, _tableHeaderSVGHeight/2, 
			//	{ alignmentBaseline:'baseline', textAnchor:'start', fontSize:_settings.tableMaxFontSize, fill:_settings.tableHeaderFontColor } );
			let title = _data.table[col].name;
			if( isEditable( _data.table[col].ref ) ) {
				title += "*";
			}
			let text = createForeignObjectWithText( title, 0, 0, _data.table[col].width-2, _tableHeaderSVGHeight, 
				{ id:'tableHeaderColumnNameText'+col, textAlign:'center', fontSize:_settings.tableMaxFontSize, color:_settings.tableHeaderFontColor } );

			svg.appendChild( rect );			
			svg.appendChild( text );
			_tableHeaderSVG.appendChild( svg );
			
			svg.addEventListener( 'mousedown', onTableHeaderMouseDown );
			//svg.addEventListener( 'touchstart', onTableHeaderMouseDown );			
			svg.style.cursor = 'hand';
			svg.dataset.columnNumber = col;
		}
	} else {
		document.getElementById('tableHeaderBkgr').setAttributeNS(null,'width',_tableHeaderOverallWidth);
		let left = _data.table[0].width;
		for( let col = 1 ; col < _data.table.length ; col++ ) {
			let svg = document.getElementById('tableHeaderColumnNameSVG'+col);
			svg.setAttributeNS(null,'x',left+1);
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


function drawTableContent( init=false, shiftOnly=false ) {

    _tableViewBoxTop = operToScreen( _visibleTop );
    let tcViewBox = `${_tableViewBoxLeft} ${_tableViewBoxTop} ${_tableContentSVGWidth} ${_tableContentSVGHeight}`;
    _tableContentSVG.setAttributeNS(null,'viewBox',tcViewBox);
    if( shiftOnly ) {
        return;
    }

	let overallHeight = operToScreen(_data.operations.length);
	if( init ) {
		while (_tableContentSVG.hasChildNodes()) {
			_tableContentSVG.removeChild(_tableContentSVG.lastChild);
		}

		_tableContentSVGBkgr = createRect( 0, 0, _tableHeaderOverallWidth, overallHeight, 
			{ stroke:'none', strokeWidth:1,  fill:_settings.tableContentFillColor } ); 	// backgroud rect
		_tableContentSVG.appendChild( _tableContentSVGBkgr );		
		
		let left = 0;
		for( let col = 0 ; col < _data.table.length ; col++ ) { // Creating svg-containers for columns
			let rectX = left + _settings.tableColumnHMargin;
			let rectWidth = _data.table[col].width - _settings.tableColumnHMargin * 2;
			let rect = createSVG( rectX, 0, rectWidth, overallHeight, 
				{ id:('tableColumnSVG'+col), fill:_settings.tableContentStrokeColor } );
			_tableContentSVG.appendChild( rect );
			left += _data.table[col].width;
		}

		for( let col = 0, left=0 ; col < _data.table.length ; col++  ) { // Creating splitters
			left += _data.table[col].width;
			let splitter = createRect( left, 0, 2, overallHeight, 
				{id:'tableSplitter'+col, fill:'#dfdfdf'} );
			splitter.dataset.columnNumber = col;
			splitter.setAttributeNS(null,'cursor','col-resize');
			_tableContentSVG.appendChild(splitter);
			splitter.addEventListener( 'mousedown', onTableColumnSplitterMouseDown );
			//splitter.addEventListener( 'touchstart', onTableColumnSplitterMouseDown );
		}
	} else {
		_tableContentSVGBkgr.setAttributeNS(null,'width',_tableHeaderOverallWidth);
		_tableContentSVGBkgr.setAttributeNS(null,'height',overallHeight);
		let left = 0;
		for( let col = 0 ; col < _data.table.length ; col++ ) { // Updating svg-containers for columns as well as splitters 
			let rectX = left + _settings.tableColumnHMargin;
			let rectWidth = _data.table[col].width - _settings.tableColumnHMargin * 2;
			let rect = document.getElementById('tableColumnSVG'+col);
			rect.setAttributeNS(null,'x',rectX);
			rect.setAttributeNS(null,'width',rectWidth);
			left += _data.table[col].width;			
			rect.setAttributeNS(null,'height',overallHeight);			
			let splitter = document.getElementById('tableSplitter'+col); 
			splitter.setAttributeNS(null,'x',left);
			splitter.setAttributeNS(null,'height',overallHeight);
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
		 			calcNotHiddenOperationsLength();
					_zoomGanttVerticalInput.value = parseInt((_notHiddenOperationsLength*100.0) / _visibleHeight + 0.5);
					drawVerticalScroll();
		 			drawTableContent();
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

				let columnWidthToUse = _data.table[col].width - _settings.tableColumnHMargin*2;

				let el = document.getElementById('tableColumnSVG'+col);
				let bkgr = createRect( 0, lineTop, columnWidthToUse, rectHeight,  
					{ id:('tableColumn'+col+'Row'+i+'Bkgr'), fill:_data.operations[i].colorBack } );
				el.appendChild( bkgr );

				let textX = _settings.tableColumnTextMargin;
				let textAnchor = 'start';
				if( ref == 'Name' ) { // A name should be adjusted according to it's position in the hierarchy
					// textX += _settings.hierarchyIndent * _data.operations[i].parents.length;
					content = spacesToPadNameAccordingToHierarchy(_data.operations[i].parents.length) + content; 
				} else {
					if( _data.table[col].type == 'float' || _data.table[col].type == 'int' ) {
						textX = columnWidthToUse - _settings.tableColumnTextMargin*2;
						textAnchor = 'end';
					}						
				}
				let text = createText( content, textX, lineMiddle, 
					{ id:('tableColumn'+col+'Row'+i), fill:color, textAnchor:textAnchor, fontSize:fontSize } );
				el.appendChild( text );
				let editableType = isEditable(_data.table[col].ref); // To confirm the field is editable...
				if( editableType != null ) {
					bkgr.style.cursor = 'pointer';
					bkgr.setAttributeNS( null, 'data-i', i );
					bkgr.setAttributeNS( null, 'data-col', col );
					bkgr.setAttributeNS( null, 'data-type', editableType );
					bkgr.onmousedown = onTableFieldMouseDown;
					text.style.cursor = 'pointer';
					text.setAttributeNS( null, 'data-i', i );
					text.setAttributeNS( null, 'data-col', col );
					text.setAttributeNS( null, 'data-type', editableType );
					text.onmousedown = onTableFieldMouseDown;
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
				let columnWidthToUse = _data.table[col].width - _settings.tableColumnHMargin*2;

				let id = 'tableColumn'+col+'Row'+i;
				let el = document.getElementById(id);
				el.setAttributeNS(null,'y',lineMiddle);
				el.setAttributeNS(null,'font-size',fontSize);
				if( _data.table[col].type == 'float' || _data.table[col].type == 'int' ) {
					el.setAttributeNS( null, 'x', columnWidthToUse - _settings.tableColumnTextMargin*2 );
				}
				let bkgrEl = document.getElementById(id+'Bkgr');
				bkgrEl.setAttributeNS(null,'y',lineTop);
				bkgrEl.setAttributeNS(null,'width',columnWidthToUse);
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


function onTableFieldMouseDown(e) {

	let col = this.getAttributeNS(null,'data-col');
	if( e.which == 3 /*|| (_data.table[col].type == 'text' )*/ ) { // The right button has been clicked...
		displayDataInEditBox( this );
	} else { // The left one...
		displayEditTableFieldBox( this );		
	}
}


function drawTableScroll( init=false ) {
	let maxViewBoxLeft = (_tableHeaderOverallWidth > _tableScrollSVGWidth) ? (_tableHeaderOverallWidth - _tableScrollSVGWidth) : 0;
	let sliderSize = (maxViewBoxLeft > 0) ? (_tableScrollSVGWidth*_tableScrollSVGWidth/_tableHeaderOverallWidth) : _tableScrollSVGWidth;
	if( sliderSize < _settings.scrollSliderSize ) {
		sliderSize = _settings.scrollSliderSize;
	}

	let sliderX;
	if( maxViewBoxLeft > 0 ) {
		let maxSlider = _tableScrollSVGWidth - sliderSize;
		sliderX = _tableViewBoxLeft * maxSlider / maxViewBoxLeft;
		if( sliderX < 0 ) {
			sliderX = 0;
		} else if( sliderX > maxSlider ) {
			sliderX = maxSlider;
		}
	} else {
		sliderX = 0;
	}

	if( init ) {
		let bbox = _tableScrollSVG.getBBox();
		_tableScrollSVGBkgr = createRect( 0, 0, _tableScrollSVGWidth, _tableScrollSVGHeight, 
			{ id:('tableScrollSVGBkgr'), fill:_settings.scrollBkgrColor, stroke:_settings.scrollRectColor, strokeWidth:1 } );
		_tableScrollSVGBkgr.setAttributeNS(null,'cursor','pointer');
		_tableScrollSVGBkgr.onmousedown = onTableScrollSVGBkgr;
		_tableScrollSVGSlider = createRect( sliderX, 0, sliderSize, _tableScrollSVGHeight, 
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
		_tableScrollSVGSlider.setAttributeNS( null,'x', sliderX );
	}
}
