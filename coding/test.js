function findPositionOfElementAtPage( el ) {
    if( typeof( el.offsetParent ) !== 'undefined' ) {
        let posX, posY;
        for( posX = 0, posY = 0; el ; el = el.offsetParent ) {
            posX += el.offsetLeft;
            posY += el.offsetTop;
        }
        return [ posX, posY ];
    } else {
        return [ el.x, el.y ];
    }
}


function getCoordinatesOfClickOnImage( event, imgId ) {
    let posX = 0, posY = 0;
    let imgPos = findPositionOfElement( imgId );
    let e = ( event ) ? event : window.event;

    if( e.pageX || e.pageY ) {
        posX = e.pageX;
        posY = e.pageY;
    } else if( e.clientX || e.clientY ) {
            posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    posX = posX - imgPos[0];
    posY = posY - imgPos[1];

    let right = ( posX > parseInt( imgId.clientWidth/2 ) ) ? 1 : 0;
    let lower = ( posY > parseInt( imgId.clientHeight/2 ) ) ? 1 : 0;

    return [ posX, posY, right, lower ];
}


function filterInput( id, patternStr='([^0-9]+)', minValue=100, maxValue=10000, defaultValue=100 ) {
    let start = id.selectionStart;
    let end = id.selectionEnd;
    
    const currentValue = id.value;
    const pattern = new RegExp(patternStr, 'g');
    let correctedValue = currentValue.replace(pattern, '');
    if( correctedValue.length == 0 ) {
        correctedValue = defaultValue; 
    } else {
        let parsed = parseInt(correctedValue);
        if( isNaN(parsed) ) {
            correctedValue = defaultValue;
        } else if( parsed < minValue ) {
            correctedValue = minValue;
        } else if( parsed > maxValue ) {
            correctedValue = maxValue;
        }
    }
    id.value = correctedValue;
    if( correctedValue.length < currentValue.length) {
        end--;
    }
    id.setSelectionRange(start, end);    
}
