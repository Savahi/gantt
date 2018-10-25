function displayMessageBox( message ) {
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
}

function displayDataInEditBox( id ) {
	let i = id.getAttributeNS(null, 'data-i');
	_editBoxDetailsElem.innerHTML = formatTitleTextContent(i,true);
	_editBoxOperationIndexElem.value = i;
	_editBoxOperationCodeElem.value = _data.operations[i].Code;
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
			        	let i = _editBoxOperationIndexElem.value;
			    		if( !('userData' in _data.operations[i]) ) {
							_data.operations[i].userData = {};
						}
						for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
							let ref = _data.editables[iE].ref;
							let elem = document.getElementById( 'editBoxInput' + ref );
							_data.operations[i].userData[ ref ] = elem.value;
							for( let col = 0 ; col < _data.table.length ; col++ ) { // Changing the value in the table...
								if( _data.table[col].ref == ref ) {
									let el = document.getElementById( 'tableColumn'+col+'Row'+i );
									el.childNodes[0].nodeValue = elem.value;
									if( _data.operations[i][ref] != elem.value ) {
										el.setAttributeNS( null, 'fill', _settings.editedColor );
									} else { // If user re-entered the old value
										el.setAttributeNS( null, 'fill', _settings.tableContentStrokeColor );										
									}
									break;
								}
							}
						}
			        	document.getElementById( 'ganttGroupTitle'+i). textContent = formatTitleTextContent(i); 
			        	document.getElementById('editBoxMessage').innerText = '';
				        hideEditBox();
			        } else {
			        	alert("Error: " + this.responseText); // this.responseText contains the error message. 
			        	document.getElementById('editBoxMessage').innerText = _texts[_data.lang].errorLoadingData + ": " + this.responseText;
			        }
			    }
		    }
		};

		let operationIndexValue = _editBoxOperationIndexElem.value;

		let bEdited = false; // The following is to confirm something has been edited...
		for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
			let ref = _data.editables[iE].ref;
			let elem = document.getElementById( 'editBoxInput' + ref );
			if( elem ) {
				if( !('userData' in _data.operations[operationIndexValue]) )	{
					if( elem.value != _data.operations[operationIndexValue][ref] ) {
						bEdited = true;
						break;
					}
				} else {
					if( elem.value != _data.operations[operationIndexValue].userData[ref] ) {
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
		for( let i = 0 ; i < _data.operations.length ; i++ ) {
			if( 'userData' in _data.operations[i] || i == operationIndexValue ) {
				let userDataOfOperation = {};
				for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
					let ref = _data.editables[iE].ref;
					let value;
					if( i == _editBoxOperationIndexElem.value ) {
						let elem = document.getElementById( 'editBoxInput' + ref );
						value = elem.value;
					} else {
						value = _data.operations[i].userData[ ref ];
					}
					userDataOfOperation[ ref ] = value;
				}
				userData.push( { "operationCode":_data.operations[i].Code, "data":userDataOfOperation } );				
			}
		}
		if( userData.length > 0 ) {
			xmlhttp.open("POST", _files.userDataSave, true);
			xmlhttp.setRequestHeader("Cache-Control", "no-cache");
			xmlhttp.setRequestHeader("Content-type", "plain/text" ); //"application/x-www-form-urlencoded");
			xmlhttp.send( JSON.stringify(userData) );		
			document.getElementById('editBoxMessage').innerText = _texts[_data.lang].waitSaveUserDataText;			
		}
	} else {
    	let i = _editBoxOperationIndexElem.value;
		if( !('userData' in _data.operations[i]) ) {
			_data.operations[i].userData = {};
		}
		for( let iE = 0 ; iE < _data.editables.length ; iE++ ) {
			let ref = _data.editables[iE].ref;
			let elem = document.getElementById( 'editBoxInput' + ref );
			_data.operations[i].userData[ ref ] = elem.value;
		}
    	document.getElementById( 'ganttGroupTitle'+i).textContent = formatTitleTextContent(i); 
		hideEditBox();
	}
}
