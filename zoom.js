function setGanttViewBoxX( x ) {
    if( x < 0 ) {
        x = 0;
    } else if( x > _data.maxViewBoxX ) {
        x = _data.maxViewBoxX;
    }
    _ganttViewBoxX = x;
    setCookie( "ganttViewBoxX", x );
    _ganttSVG.setAttributeNS( null, 'viewBox', `${_ganttViewBoxX} ${_ganttViewBoxY} ${ _ganttSVGWidth} ${ _ganttSVGHeight}` );
}


function setGanttVisibleSeconds( newVisibleSeconds ) {
    if( newVisibleSeconds < 3600 ) {
        return;
    }
    _ganttVisibleSeconds = newVisibleSeconds;
    setCookie( "ganttVisibleSeconds", _ganttVisibleSeconds );
    _zoomGanttHorizontalInput.value = parseInt( _data.maxVisibleSecondsAllowed * 100.0 / newVisibleSeconds + 0.5 );
    _data.maxViewBoxX = timeToScreen(_data.maxVisibleSecond);
}

function setGanttViewBoxY( y ) {
    if( y < 0 ) {
        y = 0;
    } else {
        if( y > _ganttMaxViewBoxY ) {
            y = _ganttMaxViewBoxY;
        }
    }
    _ganttViewBoxY = y;
    setCookie( "ganttViewBoxY", y );
    _ganttSVG.setAttributeNS( null, 'viewBox', `${_ganttViewBoxX} ${_ganttViewBoxY} ${ _ganttSVGWidth} ${ _ganttSVGHeight}` );
}


function setGanttVisibleOperations( newVisibleOperations ) {
    if( newVisibleOperations < 1 ) {
        return;
    }
    _ganttVisibleOperations = newVisibleOperations;
    setCookie( "ganttVisibleOperations", _ganttVisibleOperations );
    _zoomGanttVerticalInput.value = parseInt( _data.maxVisibleOperations * 100.0 / newVisibleOperations + 0.5 );
    _ganttMaxViewBoxY = operToScreen(_data.maxVisibleOperations) - _ganttSVGHeight*0.95;
}


function zoomX100() {
    setGanttViewBoxX( 0 );
    setGanttVisibleSeconds( _data.maxVisibleSecondsAllowed );
    drawTimeScale();
    drawGantt();
    drawGanttHScroll(); 
}


function zoomX( zoomFactorChange, centerOfZoom=0.5 ) {
    if( _ganttVisibleSeconds >= _data.maxVisibleSecondsAllowed && zoomFactorChange > 1.0 ) {
        return;
    }
    let currentZoomFactor = _data.maxVisibleSecondsAllowed / _ganttVisibleSeconds;
    let newZoomFactor = currentZoomFactor + zoomFactorChange; 
    if( !(newZoomFactor > 0) ) {
        return;
    }
    if( centerOfZoom < 0.1 ) {
        centerOfZoom = 0.0;
    } else if( centerOfZoom > 0.9 ) {
        centerOfZoom = 1.0;
    }
    let newWidth = _data.maxVisibleSecondsAllowed / newZoomFactor;
    let newX = _ganttViewBoxX - timeToScreen(newWidth - _ganttVisibleSeconds) * centerOfZoom;             
    setGanttViewBoxX(newX);
    setGanttVisibleSeconds(newWidth);
}


function zoomXandRedraw( factorChange, centerOfZoom=0.5 ) { // Zoom and redraw
    zoomX( factorChange, centerOfZoom );        
    drawTimeScale();
    drawGantt();
    drawGanttHScroll(); 
}

function moveXandRedraw( x ) {
    setGanttViewBoxX(x);
    drawGanttHScroll();
}


function zoomY100() {
    setGanttViewBoxY( 0 );
    setGanttVisibleOperations( _data.maxVisibleOperations );
    drawTableContent();
    drawGantt();
    drawVerticalScroll();
}


function zoomY( zoomFactorChange, centerOfZoom=0.5 ) {
        let currentZoomFactor = _data.maxVisibleOperations / _ganttVisibleOperations;
        let newZoomFactor = currentZoomFactor + zoomFactorChange;
        if( !(newZoomFactor > 0) ) {
            return;
        }
        let newVisibleOperations = _data.maxVisibleOperations / newZoomFactor;
        if( newVisibleOperations < 1 && zoomFactorChange < 1.0 ) {
            return;
        }
        if( newVisibleOperations > _data.maxVisibleOperations ) {
            return;
        }
        if( centerOfZoom < 0.1 ) {
            centerOfZoom = 0.0;
        } else if ( centerOfZoom > 0.9 ) {
            centerOfZoom = 1.0;
        } 
        let newY = _ganttViewBoxY - operToScreen(newVisibleOperations - _ganttVisibleOperations) * centerOfZoom;   
        setGanttViewBoxY(newY);
        setGanttVisibleOperations(newVisibleOperations);
}

function zoomYandRedraw( factorChange, centerOfZoom=0.5 ) {
    zoomY( factorChange, centerOfZoom );        
    drawTableContent();
    drawGantt();
    drawVerticalScroll();
}

function moveYandRedraw( y ) {
    setGanttViewBoxY(y);
    drawVerticalScroll();
}
