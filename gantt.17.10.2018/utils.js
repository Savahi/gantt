
function displaySynchronizedStatus( synchronized ) {
    if( typeof(synchronized) !== 'undefined' ) {
        if( synchronized != null ) {
            let el = document.getElementById('synchronized');
            if( synchronized == -1 ) {
                el.innerHTML =  '×'; // ⚠ '&#9888;'
                el.className = 'error-color';
                el.title = _terms[_data.lang].errorUserData;
            } else if( synchronized == 0 ) {
                el.innerHTML =  '⚠'; // '&#9888;';
                el.className = 'error-color';
                el.title = _terms[_data.lang].unsynchronizedMessage;
            } else {
                el.innerHTML =  '⟳'; // '&#8634;' '&#9888;';
                el.className = 'ok-color';
                el.title = _terms[_data.lang].synchronizedMessage;
            }
        }
    }
} 


function createRhomb( x, top, height, properties ) {
    return createPolygon( calcRhombCoords(x, top, height), properties );
}

function calcRhombCoords( x, top, height ) {
    let inc = 2;
    top -= inc;
    height += inc*2;
    let halfWidth = Math.floor(height / 2.0);
    let halfHeight = halfWidth;
    let points = (x - halfWidth) + " " + (top + halfHeight) + " " + x + " " + top;
    points += " " + (x + halfWidth) + " " + (top + halfHeight) + " " + x + " " + (top + height);
    return points;
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


function createDefs( appendToSVG ) {
    let defs = document.createElementNS(NS, 'defs');

    let marker = document.createElementNS(NS, 'marker');
    marker.setAttribute('id', 'arrow');
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('refX', '5');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerUnits', 'strokeWidth');
    marker.setAttribute('markerWidth', _settings.ganttLinkArrowWidth ); //ganttSVGWidth*2 / ganttVisibleWidth );
    marker.setAttribute('markerHeight', _settings.ganttLinkArrowHeight ); //ganttSVGWidth*2 / ganttVisibleWidth );
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

    appendToSVG.appendChild(defs);
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


// Returns the number of week of the year
function getWeekNumber(d) {
    d = new Date( Date.UTC( d.getFullYear(), d.getMonth(), d.getDate() ) );
    d.setUTCDate( d.getUTCDate() + 4 - (d.getUTCDay() || 7) );
    var startOfYear = new Date( Date.UTC( d.getUTCFullYear(), 0,1 ) );
    var weekNumber = Math.ceil( ( ( (d - startOfYear) / 86400000 ) + 1 ) / 7 );
    return weekNumber;
}


function parseDate( dateString ) {
    if( typeof(dateString) === 'undefined' ) {
        return null;
    }
    if( dateString == null ) {
        return null;
    }
    let date = null;
    let parsedFull = dateString.match( /([0-9]+)\.([0-9]+)\.([0-9]+) +([0-9]+)\:([0-9]+)/ );
    if( parsedFull !== null ) {
        if( parsedFull.length == 6 ) {
            date = new Date(parsedFull[3], parsedFull[2]-1, parsedFull[1], parsedFull[4], parsedFull[5], 0, 0);
        }
    } else {
        let parsedShort = dateString.match( /([0-9]+)\.([0-9]+)\.([0-9]+)/ );
        if( parsedShort !== null ) {
            if( parsedShort.length == 4 ) {
                date = new Date(parsedShort[3], parsedShort[2]-1, parsedShort[1], 0, 0, 0, 0);
            }
        }
    }
    if( date === null ) {
        return null;
    }
    let timeInSeconds = date.getTime();
    return( { 'date':date, 'timeInSeconds':timeInSeconds/1000 } ); 
}


function digitsOnly( string ) {
    let patt1 = /[0-9]+/g;
    let patt2 = /[^0-9 ]/;
    let res1 = string.match(patt1);
    let res2 = string.match(patt2);
    if( res1 != null && res2 == null ) {
        if( res1.length > 0 ) {
            return true;
        }
    }
    return false;    
}


function setCookie( cname, cvalue, exdays=3650 ) {
    if( exdays == null ) {
        document.cookie = cname + "=" + cvalue + "; path=/";
    }
    else {
        let d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();        
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

}


function deleteCookie( cname ) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie( cname, type='string' ) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for( let i = 0 ; i < ca.length ; i++ ) {
        let c = ca[i];
        while( c.charAt(0) == ' ' ) {
            c = c.substring(1);
        }
        if( c.indexOf(name) == 0 ) {
            let value = c.substring(name.length, c.length);
            if( type == 'string' ) {
            	return value;
            }
			if( type == 'int' ) {
				let intValue = parseInt(value);
				if( !isNaN(intValue) ) {
					return intValue;
				}
			}
			if( type == 'float' ) {
				let floatValue = parseFloat(value);
				if( !isNaN(floatValue) ) {
					return floatValue;
				}
			}
			return null;
		}
    }
    return null;
}


function moveElementInsideArray( arr, from, to ) {    
    var elToMove = {};
    for( let key in arr[from] ) {
        elToMove[key] = arr[from][key];
    }
    if( from < to ) {
        for( let i = from+1 ; i <= to ; i++ ) {
            for( let key in arr[i] ) {
                arr[i-1][key] = arr[i][key];
            }
        }
    } else if( to < from ) {
        for( let i = from-1 ; i >= to ; i-- ) {
            for( let key in arr[i] ) {
                arr[i+1][key] = arr[i][key];
            }
        }
    }
    for( let key in elToMove ) {
        arr[to][key] = elToMove[key];
    }
}


function decColorToString( decColor, defaultColor=null ) {
    if( typeof(decColor) !== 'undefined' ) {        
        if( decColor ) {
            if( digitsOnly(decColor) ) {
                let c1 = (decColor & 0xFF0000) >> 16;
                let c1text = c1.toString(16);
                if( c1text.length == 1 ) {
                    c1text = "0" + c1text;
                }
                let c2 = (decColor & 0x00FF00) >> 8;
                c2text = c2.toString(16);
                if( c2text.length == 1 ) {
                    c2text = "0" + c2text;
                }
                let c3 = (decColor & 0x0000FF);      
                c3text = c3.toString(16);
                if( c3text.length == 1 ) {
                    c3text = "0" + c3text;
                }
                return '#' + c3text + c2text + c1text;
            }
        }
    }
    return defaultColor;
}


function isEditable( name ) {
    for( let iE=0 ; iE < _data.editables.length ; iE++ ) {
        let ref = _data.editables[iE].ref;
        if( ref == name ) {
            return true;
        }
    }
    return false;
}