var	_blackOutBoxDiv=null;
var	_messageBoxDiv=null;
var	_messageBoxTextDiv=null;
var	_editBoxDiv=null;
var	_editBoxDetailsElem=null;

function displayMessageBox( message ) {
	_blackOutBoxDiv = document.getElementById("blackOutBox");
	_messageBoxDiv = document.getElementById("messageBox");
	_messageBoxTextDiv = document.getElementById("messageBoxText");

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
	document.getElementById('editBoxMessage').innerText = '';			
}

var _editBoxOperationIndex = -1;

function displayDataInEditBox( id ) {
	_blackOutBoxDiv = document.getElementById("blackOutBox");
	_editBoxDiv = document.getElementById('editBox');			
	_editBoxDetailsElem = document.getElementById('editBoxDetails');			

	let i = id.getAttributeNS(null, 'data-i');
	_editBoxDetailsElem.innerHTML = formatTitleTextContent(i,true);
	_editBoxOperationIndex = i;
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

			if( ref == 'VolDone' ) { // If this is a "VolDone" field recalculation af "VolRest" is required...
				elem.onblur = function(e) {
					//let volDone = document.getElementById( "editBoxInputVolDone").value;
					let volRest = recalculateVolRestAfterVolDoneChanged( this.value, _editBoxOperationIndex );					
					if( volRest ) {
						let elemVolRest = document.getElementById( 'editBoxInputVolRest');
						if( elemVolRest ) {
							elemVolRest.value = volRest;
						}
					}
				}
			}
		}
	}
	displayEditBox();
}


function saveUserDataFromEditBox() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 ) {
	    	if( this.status == 200 ) {
		        if( this.responseText == "ok" ) {
		        	let i = _editBoxOperationIndex;
		    		if( !('userData' in _data.operations[i]) ) {
						_data.operations[i].userData = {};
					}
					for( let iE = 0 ; iE < _data.editables.length ; iE++ ) { // For all editable field of the table...
						let ref = _data.editables[iE].ref;
						let elem = document.getElementById( 'editBoxInput' + ref ); // ... retrieving the element that stores a new value.
						_data.operations[i].userData[ ref ] = elem.value; // Reading the value (possibly) changed.
						for( let col = 0 ; col < _data.table.length ; col++ ) { // Changing the value in the table...
							if( _data.table[col].ref == ref ) {
								writeNewValueFromInputElemIntoTable( elem.value, i, col, ref );								
								break;
							}
						}
					}
					if( !_inputOnly ) {
			        	document.getElementById('ganttGroupTitle'+i).textContent = formatTitleTextContent(i); 
					}
			        hideEditBox();
		        } else {
		        	document.getElementById('editBoxMessage').innerText = _texts[_data.lang].errorLoadingData + ": " + this.responseText;
		        }
		    }
	    }
	};

	let bEdited = false; // The following is to confirm something has been edited...
	for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
		let ref = _data.editables[iE].ref;
		let elem = document.getElementById( 'editBoxInput' + ref );
		if( elem ) {
			if( !('userData' in _data.operations[_editBoxOperationIndex]) )	{
				if( elem.value != _data.operations[_editBoxOperationIndex][ref] ) {
					bEdited = true;
					break;
				}
			} else {
				if( elem.value != _data.operations[_editBoxOperationIndex].userData[ref] ) {
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

	let userData = createUserDataObjectToSendAfterEditingInBox(_editBoxOperationIndex);
	if( userData.length > 0 ) {
		xmlhttp.open("POST", _files.userDataSave, true);
		xmlhttp.setRequestHeader("Cache-Control", "no-cache");
		xmlhttp.setRequestHeader("Content-type", "plain/text" ); //"application/x-www-form-urlencoded");
		xmlhttp.send( JSON.stringify(userData) );		
		document.getElementById('editBoxMessage').innerText = _texts[_data.lang].waitSaveUserDataText;			
	}
}


var _editTableFieldBox = null;
var _editTableFieldBoxInput = null;
var _editTableFieldBoxValue = null;
var _editTableFieldBoxOperationIndex = -1;
var _editTableFieldBoxRef = null;
var _editTableFieldBoxType = null;
var _editTableFieldBoxChangesVolRestTo = null;


function displayEditTableFieldBox( id ) {
	_blackOutBoxDiv.style.display='block';	

	let i = id.getAttributeNS(null, 'data-i');
	let col = id.getAttributeNS(null,'data-col');
	let ref = _data.table[col].ref;
	_editTableFieldBoxType = id.getAttributeNS(null,'data-type');
	let value = null;
	if( 'userData' in _data.operations[i] ) {
		if( ref in _data.operations[i].userData ) {
			value = _data.operations[i].userData[ ref ];
		}
	}
	if( !value ) {
		value = _data.operations[i][ ref ];
	}
	if( !value ) {
		value = '';
	}
	id = document.getElementById('tableColumn'+col+'Row'+i+'Bkgr');
	let box = id.getBoundingClientRect();
	
	_editTableFieldBoxChangesVolRestTo = null; // If a "VolDone" value is edited this field is to be changed too

	_editTableFieldBox = document.getElementById('editTableFieldBox');
	_editTableFieldBoxMessage = document.getElementById('editTableFieldBoxMessage');
	if( _editTableFieldBoxType == 'text' ) {
		_editTableFieldBoxInput = document.getElementById('editTableFieldBoxTextarea');
	} else {
		_editTableFieldBoxInput = document.getElementById('editTableFieldBoxInput');
		if( _editTableFieldBoxType == 'string' || _editTableFieldBoxType == 'datetime' ) {
			_editTableFieldBoxInput.setAttribute('type', 'text');
		} else {
			_editTableFieldBoxInput.setAttribute('type', 'number');			
		}
	}
	_editTableFieldBoxInput.style.display = 'block';

	_editTableFieldBox.style.left = parseInt(box.x) + "px";
	_editTableFieldBox.style.top = parseInt(box.y) + "px";
	_editTableFieldBox.style.width = parseInt(box.width) + "px";
	_editTableFieldBox.style.height = parseInt(box.height) + "px";
	_editTableFieldBox.style.display = 'block';
	_editTableFieldBoxInput.value = value;
	_editTableFieldBoxInput.style.width = '100%';

	_editTableFieldBoxValue = value; // Saving an old value to confirm it has been changed or to restore if required.
	_editTableFieldBoxOperationIndex = i;
	_editTableFieldBoxRef = ref;
	_editTableFieldBoxInput.focus();

	_editTableFieldBoxInput.addEventListener( "keyup", onEditTableFieldKey );
	window.addEventListener( "keyup", onEditTableFieldKey );

	_blackOutBoxDiv.onclick = onEditTableFieldInputBlur; // On click saving changes.. 

	document.getElementById('editTableFieldBoxCancel').onclick = hideEditTableFieldBox; // Cancel button hides  edit field 
}


function onEditTableFieldKey(event) {
	event.preventDefault();
	if( event.keyCode == 13 && _editTableFieldBoxType != 'text' ) {
		onEditTableFieldInputBlur();
	}
	if( event.keyCode == 27 ) {
		hideEditTableFieldBox();
	}	
}

function onEditTableFieldInputBlur() {
	if( !_editTableFieldBoxInput.value && !_editTableFieldBoxValue ) { // Nothing has been changed...
		hideEditTableFieldBox();
		return;
	}
	if( _editTableFieldBoxInput.value == _editTableFieldBoxValue ) { // Nothing has been changed...
		hideEditTableFieldBox();
		return;
	}

	var xmlhttp = new XMLHttpRequest();
	_editTableFieldBoxMessage.style.display = 'none';
	xmlhttp.onerror = function(e) { 
		_editTableFieldBoxMessage.innerText = _texts[_data.lang].errorSavingData;
		_editTableFieldBoxMessage.style.display = 'block';
	}

	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 ) {
	    	if( this.status == 200 ) {
		        if( this.responseText == "ok" ) { // The data has been successfully saved. Thus updating all corresponding data inside browser
		        	let i = _editTableFieldBoxOperationIndex;
		    		if( !('userData' in _data.operations[i]) ) {
						_data.operations[i].userData = {};
					}
					let ref = _editTableFieldBoxRef;
					_data.operations[i].userData[ ref ] = _editTableFieldBoxInput.value;
					for( let col = 0 ; col < _data.table.length ; col++ ) { // Changing the value in the table...
						if( _data.table[col].ref == ref ) {
							writeNewValueFromInputElemIntoTable( _editTableFieldBoxInput.value, i, col, ref ); 
							if( ref == 'VolDone' ) { // If it's a "VolDone" field that has been changed, the "VolRest" one should be updated too
								for( let col2 = 0 ; col2 < _data.table.length ; col2++ ) { 
									if( _data.table[col2].ref == 'VolRest' ) {					
										_data.operations[i].userData['VolRest'] = _editTableFieldBoxChangesVolRestTo;			
										writeNewValueFromInputElemIntoTable( _editTableFieldBoxChangesVolRestTo, i, col2, 'VolRest' );							
										break;
									}
								}	
							}							
							break;
						}
					}
					if( !_inputOnly ) {
			        	document.getElementById('ganttGroupTitle'+i).textContent = formatTitleTextContent(i); 
					}
					//console.log(JSON.stringify(_data.operations[i].userData));
			        hideEditTableFieldBox();
		        } else {
		        	alert("Error: " + this.responseText); // this.responseText contains the error message. 
		        }
		    }
		}
	};

	let userData = createUserDataObjectToSendAfterEditingInField( _editTableFieldBoxOperationIndex, _editTableFieldBoxRef );
	if( userData.length > 0 ) {
		xmlhttp.open("POST", _files.userDataSave, true);
		xmlhttp.setRequestHeader("Cache-Control", "no-cache");
		xmlhttp.setRequestHeader("Content-type", "plain/text");
		xmlhttp.send( JSON.stringify(userData) );		
	}
}


function hideEditTableFieldBox() {
	_editTableFieldBoxInput.removeEventListener( "keyup", onEditTableFieldKey );
	window.removeEventListener( "keyup", onEditTableFieldKey );

	_blackOutBoxDiv.style.display='none';	
	_editTableFieldBox.style.display='none';
	_editTableFieldBoxInput.style.display='none';
	_editTableFieldBoxMessage.style.display = 'none';
	document.getElementById('editTableFieldBoxInput').style.display = 'none';
	document.getElementById('editTableFieldBoxMessage').style.display = 'none';
} 


function createUserDataObjectToSendAfterEditingInBox( editedOperationIndex ) {
	let userData = []; // Creating userData object with all the data entered but not synchronized
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		if( 'userData' in _data.operations[i] || i == editedOperationIndex ) { // Data just edited comes from edit window
			let userDataOfOperation = {};
			for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
				let ref = _data.editables[iE].ref;
				let value;
				if( i == editedOperationIndex ) { // Data just edited comes from edit window
					let elem = document.getElementById( 'editBoxInput' + ref );
					value = elem.value;
				} else { // Duplicating data related to an operation that hasn't been edited this time.
					value = _data.operations[i].userData[ ref ];
				}
				userDataOfOperation[ ref ] = value;
			}
			//console.log(JSON.stringify(userDataOfOperation));
			userData.push( { "operationCode":_data.operations[i].Code, "data":userDataOfOperation } );			
		}
	}
	return userData;
}


function createUserDataObjectToSendAfterEditingInField( editedOperationIndex, editedFieldRef ) {
	let userData = []; // Creating userData object with all the data entered but not synchronized
	for( let i = 0 ; i < _data.operations.length ; i++ ) {
		if( 'userData' in _data.operations[i] || i == editedOperationIndex ) {
			let userDataOfOperation = {};
			for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
				let ref = _data.editables[iE].ref;
				let value;
				if( i == editedOperationIndex ) { // This operation has just been edited
					if( ref == editedFieldRef ) { // The value just edited
						value = _editTableFieldBoxInput.value; 
						if( ref == 'VolDone' ) { // Recalculation of the "VolRest" value is required 
							let volRest = recalculateVolRestAfterVolDoneChanged( value, i );
							//console.log(volRest);
							if( volRest !== null ) {
								//console.log("volRest=" + volRest);								
								userDataOfOperation['VolRest'] = volRest;
								_editTableFieldBoxChangesVolRestTo = volRest;
							}
						}
					} else if( editedFieldRef == 'VolDone' && ref == 'VolRest' ) { // 'VolRest' must be recalculated through 'VolDone' and not entered directly
						continue;
					} else { // A value of the same editedOperationIndex, yet not from edit field - thus not edited...
						let valueSet = false;
						if( 'userData' in _data.operations[i] ) { // If the value is set in 'userData'...
							if( ref in _data.operations[i].userData ) {
								value = _data.operations[i].userData[ ref ]; // ...copying.
								valueSet = true;
							}
						} 
						if( !valueSet ) { // If the value is not found in 'userData'
							value = _data.operations[i][ ref ]; // ...simply copying that passed from 'SpiderProject'.							
						}
					}
				} else { // Duplicating data related to an operation that hasn't been edited this time.
					value = _data.operations[i].userData[ ref ];
				}
				userDataOfOperation[ ref ] = value;
			}
			userData.push( { "operationCode":_data.operations[i].Code, "data":userDataOfOperation } );				
		}
	}
	return userData;
}


function recalculateVolRestAfterVolDoneChanged( volDoneEntered, i ) {
	let returnValue = null;
	if( 'VolPlan' in _data.operations[i] && 'VolRest' in _data.operations[i] ) {
		let volPlan = parseFloat( _data.operations[i]['VolPlan'] );
		let volDone = parseFloat( volDoneEntered );
		if( !isNaN(volPlan) && !isNaN(volDone) ) {
			returnValue = volPlan - volDone;
		}
	}
	return returnValue;
}


function writeNewValueFromInputElemIntoTable( inputElemValue, i, col, ref ) {
	let destElem = document.getElementById( 'tableColumn'+col+'Row'+i );
	if( ref != 'Name') {
		destElem.childNodes[0].nodeValue = inputElemValue;
	}
	else { // Shifting according to hierarchy if it's a name
		let hrh = _data.operations[i].parents.length;
		destElem.childNodes[0].nodeValue = spacesToPadNameAccordingToHierarchy(hrh) + inputElemValue;
	}
	if( _data.operations[i][ref] != inputElemValue ) {
		destElem.setAttributeNS( null, 'fill', _settings.editedColor );
	} else { // If user re-entered the old value
		destElem.setAttributeNS( null, 'fill', _settings.tableContentStrokeColor );										
	}
}