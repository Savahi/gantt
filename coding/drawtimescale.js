var NS = "http://www.w3.org/2000/svg";
var _settings = { 
	minRectWidthOnTimeScale:10, timeScaleMaxFontSize:12, timeScaleFontColor:"#bfbfbf", timeScaleStrokeColor:"#2f2f2f",
	ganttChartLeftMargin:2, ganttChartRightMargin:2 
};
var _timeSVG = document.getElementById('timeSVG');
var _timeSVGBkgr = null;
var _timeSVGWidth=800, _timeSVGHeight=40;

var curDate = new Date();
var curDateInSeconds = curDate.getTime()/1000;
_data = { visibleMin:curDateInSeconds - 60*60*24*809, visibleMax: curDateInSeconds, lang:'ru' };
var _ganttVisibleWidth = _data.visibleMax - _data.visibleMin;
var _ganttVisibleLeft = _data.visibleMin;
var _ganttSVGWidth = _timeSVGWidth;
var _timeScaleToGrid = [];

var _terms = { 
	'en': {  
		monthNames:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
	},
	'ru': { 
		monthNames:['Янв','Фев','Мар','Апр','Май','Июнь','Июль','Авг','Сен','Окт','Ноя','Дек'] 
	}
};

drawTimeScale();

function drawTimeScale() {
	while (_timeSVG.hasChildNodes()) {
		_timeSVG.removeChild(_timeSVG.lastChild);
	}
	_timeSVGBkgr = createRect( 0, 0, _timeSVGWidth, _timeSVGHeight, { fill:'url(#timeScaleGradient)' } ); 	// backgroud rect
	_timeSVG.appendChild( _timeSVGBkgr );			

	let displayHours=0, displayDays=false, displayWeeks=false, displayMonths=0, displayYears=0;
	let hourRectWidth, dayRectWidth, weekRectWidth, monthRectWidth, yearRectWidth;
	let hoursInScreen, daysInScreen, weeksInScreen, monthsInScreen, yearsInScreen;
	let fontSize, hoursFontSize, daysFontSize, weeksFontSize, monthsFontSize, yearsFontSize;

	let maxFontSizeAccordingToSVGHeight = _timeSVGHeight*0.4;

	hoursInScreen = (_ganttVisibleWidth)/ (60*60);
	hourRectWidth = _timeSVGWidth / hoursInScreen;
	if( hourRectWidth > _settings.minRectWidthOnTimeScale ) {
		hoursFontSize = hourRectWidth*0.75;
		if( hourRectWidth > _settings.minRectWidthOnTimeScale*2.5 ) {
			displayHours = 2;
			hoursFontSize = hourRectWidth * 0.75 / 2.5; 
		} else {
			displayHours = 1;
			hoursFontSize = hourRectWidth * 0.75; 				
		}
		if( hoursFontSize > _settings.timeScaleMaxFontSize ) {
			hoursFontSize = _settings.timeScaleMaxFontSize;
		}
		if( hoursFontSize > maxFontSizeAccordingToSVGHeight ) {
			hoursFontSize = maxFontSizeAccordingToSVGHeight;
		}
	}

	daysInScreen = hoursInScreen / 24.0;
	dayRectWidth = hourRectWidth * 24.0;
	if( dayRectWidth > _settings.minRectWidthOnTimeScale ) {
		displayDays = true;		
		daysFontSize = dayRectWidth*0.75;
		if( daysFontSize > _settings.timeScaleMaxFontSize ) {
			daysFontSize = _settings.timeScaleMaxFontSize;
		}
		if( daysFontSize > maxFontSizeAccordingToSVGHeight ) {
			daysFontSize = maxFontSizeAccordingToSVGHeight;
		}
	}

	if( !displayDays ) {
		weeksInScreen = daysInScreen / 7.0;
		weekRectWidth = dayRectWidth * 7.0;
		if( weekRectWidth > _settings.minRectWidthOnTimeScale )	{
			displayWeeks = true;
		}
		weeksFontSize = weekRectWidth*0.75;
		if( weeksFontSize > _settings.timeScaleMaxFontSize ) {
			weeksFontSize = _settings.timeScaleMaxFontSize;
		}
		if( weeksFontSize > maxFontSizeAccordingToSVGHeight ) {
			weeksFontSize = maxFontSizeAccordingToSVGHeight;
		}
	}
	if( displayHours == 0 ) {
		monthsInScreen = daysInScreen / 30.0;
		monthRectWidth = dayRectWidth * 30.0;
		if( monthRectWidth > _settings.minRectWidthOnTimeScale ) {
			if( monthRectWidth > _settings.minRectWidthOnTimeScale*5 ) {
				displayMonths = 3;
				monthsFontSize = monthRectWidth * 0.75 / 5.0; 
			} else if( monthRectWidth > _settings.minRectWidthOnTimeScale*1.5 ) {
				displayMonths = 2;
				monthsFontSize = monthRectWidth * 0.75 / 1.5; 
			} else {
				displayMonths = 1;
				monthsFontSize = monthRectWidth * 0.75; 				
			}
			if( monthsFontSize > _settings.timeScaleMaxFontSize ) {
				monthsFontSize = _settings.timeScaleMaxFontSize;
			}
			if( monthsFontSize > maxFontSizeAccordingToSVGHeight ) {
				monthsFontSize = maxFontSizeAccordingToSVGHeight;
			}			
		}
	}

	if( !displayDays && displayMonths != 3 ) {
		yearsInScreen = daysInScreen / 365.0;
		yearRectWidth = dayRectWidth * 365.0;
		if( yearRectWidth > _settings.minRectWidthOnTimeScale ) {
			if( yearRectWidth > _settings.minRectWidthOnTimeScale * 2 ) {
				displayYears = 2;
				yearsFontSize = yearRectWidth * 0.75 / 2;
			} else {
				displayYears = 1;
				yearsFontSize = yearRectWidth * 0.75;				
			}
			if( yearsFontSize > _settings.timeScaleMaxFontSize ) {
				yearsFontSize = _settings.timeScaleMaxFontSize;
			}
			if( yearsFontSize > maxFontSizeAccordingToSVGHeight ) {
				yearsFontSize = maxFontSizeAccordingToSVGHeight;
			}			
		}
	}

	let height = _timeSVGHeight / 2.0;
	let textProperties = { fill:_settings.timeScaleFontColor, textAnchor:'middle', alignmentBaseline:'baseline' };
	let rectProperties = { fill:'none', stroke:_settings.timeScaleStrokeColor, strokeWidth:0.25 };

	let minTime = _data.visibleMin * 1000; // screenToTime(0) * 1000;
	let maxTime = _data.visibleMax * 1000; // screenToTime( _timeSVGWidth ) * 1000;
	let minDT = new Date(minTime);
	let maxDT = new Date(maxTime);
	let minY = minDT.getFullYear();
	let maxY = maxDT.getFullYear();

	rowNumber = 2;
	if( displayHours != 0 ) {
		textProperties.fontSize = hoursFontSize;
		drawTimeScaleHours( (rowNumber - 1) * height, height, rectProperties, textProperties, displayHours, minDT, maxDT );
		rowNumber -= 1;
	}

	// Adjusting to the beginning of a day
	minDT = new Date( minDT.getFullYear(), minDT.getMonth(), minDT.getDate(), 0, 0, 0, 0 );
	maxDT = new Date( maxDT.getFullYear(), maxDT.getMonth(), maxDT.getDate(), 0, 0, 0, 0 );

	if( displayDays && rowNumber > 0 ) {
		textProperties.fontSize = daysFontSize;
		drawTimeScaleDays( (rowNumber - 1) * height, height, rectProperties, textProperties, minDT, maxDT  );
		rowNumber -= 1;
	}

	if( displayWeeks && rowNumber > 0 ) {
		textProperties.fontSize = weeksFontSize;
		drawTimeScaleWeeks( (rowNumber - 1) * height, height, rectProperties, textProperties, minDT, maxDT );
		rowNumber -= 1;		
	}

	if( displayMonths != 0 && rowNumber > 0 ) {
		textProperties.fontSize = monthsFontSize;
		drawTimeScaleMonths( (rowNumber - 1) * height, height, rectProperties, textProperties, displayMonths, minY, maxY, minDT, maxDT );
		rowNumber -= 1;				
	}

	if( displayYears != 0 && rowNumber > 0 ) {
		textProperties.fontSize = yearsFontSize;
		drawTimeScaleYears( (rowNumber - 1) * height, height, rectProperties, textProperties, displayYears, minY, maxY );
	}
}


function drawTimeScaleYears( top, height, rectProperties, textProperties, displayYears, minY, maxY ) {
	let bottom = top + height;

	for( let y = minY ; y <= maxY ; y++ ) {
		if( minY == maxY ) {
			let yearText = createText( minY, _timeSVGWidth/2, bottom-3, textproperties );
			_timeSVG.appendChild(yearText);
		} else {
			let startOfYear = new Date(y,0,1,0,0,0,0);
			let startOfYearInSeconds = startOfYear.getTime() / 1000;
			let endOfYear = new Date(y,11,31,23,59,59,999);
			let endOfYearInSeconds = endOfYear.getTime() / 1000;
			let yearStartX = timeToScreen(startOfYearInSeconds);
			let yearEndX = timeToScreen(endOfYearInSeconds);
			let yearRect = createRect( yearStartX, top, yearEndX - yearStartX, height, rectProperties );		
			_timeSVG.appendChild(yearRect);

			let text;
			if( displayYears == 1 ) { // 2-digit format
				text = parseInt(y.toString().slice(-2));
			} else { // 4-digit format
				text = y.toString();
			}
			let yearText = createText( text, yearStartX + (yearEndX - yearStartX)/2, bottom-3, textProperties );
			_timeSVG.appendChild(yearText);
		}
	}
}


function drawTimeScaleMonths( top, height, rectProperties, textProperties, displayMonths, minY, maxY, minDT, maxDT ) {
	let bottom = top + height;

	for( let y = minY ; y <= maxY ; y++ ) {
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
			let monthRect = createRect( monthStartX, top, monthEndX - monthStartX, height, rectProperties );		
			_timeSVG.appendChild(monthRect);
			let text;
			if( displayMonths == 3 ) { // Display with year
				yearShort = parseInt(y.toString().slice(-2));
				text = mNames[m] + "'" + yearShort;
			} else if( displayMonths == 2 ) { // Display with name
				text = mNames[m];
			} else { // Display with digits
				text = (m+1).toString();
			}
			let monthText = createText( text, monthStartX + (monthEndX - monthStartX)/2, bottom-3, textProperties );
			_timeSVG.appendChild(monthText);
		}
	}
}


function drawTimeScaleWeeks( top, height, rectProperties, textProperties, minDT, maxDT ) {
	let bottom = top + height;
	let numSecondsInDay = 24 * 60 * 60;
	let numSecondsInWeek = 7 * numSecondsInDay;

	let firstDay = minDT.getDay(); // To adjust to the beginning of a week.
	if( firstDay == 0 ) { // If Sunday... 
		firstDay = 7; // ... making it 7 instead of 0
	}
	let startDT;
	if( firstDay > 1 ) { // If not monday...
		startDT = new Date( minDT.getTime() - numSecondsInDay*1000*(firstDay-1) ); // ... making it Monday
	} else {
		startDT = new Date( minDT.getFullYear(), minDT.getMonth(), minDT.getDate(), 0, 0, 0, 0 );
	}

	let startOfWeekInSeconds = startDT.getTime() / 1000;
	let endOfWeekInSeconds = startOfWeekInSeconds + numSecondsInWeek;
	let endInSeconds = maxDT.getTime()/1000 + numSecondsInWeek - 1;		
	for( ; startOfWeekInSeconds < endInSeconds ; ) {
		let weekStartX = timeToScreen(startOfWeekInSeconds);
		let weekEndX = timeToScreen(endOfWeekInSeconds);
		let weekRect = createRect( weekStartX, top, weekEndX - weekStartX, height, rectProperties );		
		_timeSVG.appendChild(weekRect);
		let startOfWeekDate = new Date( startOfWeekInSeconds*1000 );
		let weekText = createText( (startOfWeekDate.getDate()).toString(), 
			weekStartX + (weekEndX - weekStartX)/2, bottom-3, textProperties );
		_timeSVG.appendChild(weekText);
		_timeScaleToGrid.push(startOfWeekInSeconds); // To draw a grid later on the Gantt chart...
		startOfWeekInSeconds = endOfWeekInSeconds;
		endOfWeekInSeconds += numSecondsInWeek;
	}								
}


function drawTimeScaleDays( top, height, rectProperties, textProperties, minDT, maxDT ) {
	let bottom = top + height;
	let numSecondsInDay = 24 * 60 * 60;

	let startOfDayInSeconds = minDT.getTime() / 1000;
	let endOfDayInSeconds = startOfDayInSeconds + numSecondsInDay;
	let endInSeconds = maxDT.getTime()/1000 + 1;		
	for( ; startOfDayInSeconds < endInSeconds ; ) {
		let dayStartX = timeToScreen(startOfDayInSeconds);
		let dayEndX = timeToScreen(endOfDayInSeconds);
		let dayRect = createRect( dayStartX, top, dayEndX - dayStartX, height, rectProperties );		
		_timeSVG.appendChild(dayRect);
		let startOfDayDate = new Date( startOfDayInSeconds*1000 );
		let dayText = createText( (startOfDayDate.getDate()).toString(), 
			dayStartX + (dayEndX - dayStartX)/2, bottom-3, textProperties );
		_timeSVG.appendChild(dayText);
		_timeScaleToGrid.push(startOfDayInSeconds); // To draw a grid later on the Gantt chart...
		startOfDayInSeconds = endOfDayInSeconds;
		endOfDayInSeconds += numSecondsInDay;
	}								
}


function drawTimeScaleHours( top, height, rectProperties, textProperties, displayHours, minDT, maxDT ) {
	let bottom = top + height;
	let numSecondsInHour = 60 * 60;

	let startDT = new Date( minDT.getFullYear(), minDT.getMonth(), minDT.getDate(), minDT.getHours(), 0, 0, 0 );
	let endDT = new Date( maxDT.getFullYear(), maxDT.getMonth(), maxDT.getDate(), maxDT.getHours(), 0, 0, 0 );

	let currentHour = startDT.getHours();
	let startOfHourInSeconds = startDT.getTime() / 1000;
	let endOfHourInSeconds = startOfHourInSeconds + numSecondsInHour;
	let endInSeconds = endDT.getTime()/1000 + 1;		
	for( ; startOfHourInSeconds < endInSeconds ; ) {
		let hourStartX = timeToScreen(startOfHourInSeconds);
		let hourEndX = timeToScreen(endOfHourInSeconds);
		let hourRect = createRect( hourStartX, top, hourEndX - hourStartX, height, rectProperties );		
		_timeSVG.appendChild(hourRect);

		let text = currentHour.toString();
		if( currentHour < 10 ) {
			text = "0" + text;
		}
		if( displayHours == 2 ) { // Display minutes
			text = text + ":00";			
		}
		let hourText = createText( text, hourStartX + (hourEndX - hourStartX)/2, bottom-3, textProperties );
		_timeSVG.appendChild(hourText);
		_timeScaleToGrid.push(startOfHourInSeconds); // To draw a grid later on the Gantt chart...
		startOfHourInSeconds = endOfHourInSeconds;
		endOfHourInSeconds += numSecondsInHour;
		currentHour = (currentHour < 23) ? (currentHour+1) : 0;
	}								
}


/*
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
	let textRectHeight = _timeSVGHeight/2;
	let monthY = 0;
	let dayY = textRectHeight;
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
*/




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

function timeToScreen( timeInSeconds ) {
	let availableSVGWidth = _ganttSVGWidth - _settings.ganttChartLeftMargin - _settings.ganttChartRightMargin;
	return _settings.ganttChartLeftMargin + (timeInSeconds - _ganttVisibleLeft) * availableSVGWidth / _ganttVisibleWidth; 
}

function getWeekNumber(d) {
    d = new Date( Date.UTC( d.getFullYear(), d.getMonth(), d.getDate() ) );
    d.setUTCDate( d.getUTCDate() + 4 - (d.getUTCDay() || 7) );
    var startOfYear = new Date( Date.UTC( d.getUTCFullYear(), 0,1 ) );
    var weekNumber = Math.ceil( ( ( (d - startOfYear) / 86400000 ) + 1 ) / 7 );
    return weekNumber;
}
