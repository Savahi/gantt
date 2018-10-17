var settingsTableOriginal = null;
var settingsTable = null;
var settingsTableFields = [];
var settingsTableUpdated = false;
var settingsTableContainer = null;

function settingsDisplay( table ) {
	settingsTableOriginal = table;
	settingsTable = settingsClone( table ); 

	settingsTableContainer = document.getElementById('settingsTable');

	for( let iF = 1 ; iF < settingsTable.length ; iF++ ) {
		let field = document.createElement("div");
		field.id = 'settingsTableField' + iF;
		field.className = 'settings-table-field';
		field.setAttribute( 'draggable', true );
		field.ondragstart = function(e) { settingsTableDragStart(e); };
		field.ondrop = function(e) { settingsTableDrop(e) }; 
		field.ondragover = function(e) { settingsTableDragOver(e) };
		field._indexInTable = iF; 
		settingsTableFields.push(field);

		let fieldName = document.createElement("div");
		fieldName.innerText = settingsTable[iF].name;
		fieldName.className = 'settings-table-name';

		let fieldWidth = document.createElement("div");
		fieldWidth.className = 'settings-table-width';
		let inputNumber = document.createElement("input");
		inputNumber.setAttribute( "type", "number" );
		inputNumber.setAttribute( "value", settingsTable[iF].width );
		inputNumber.setAttribute( "min", 4 );
		inputNumber.setAttribute( "max", 999 );
		inputNumber.id = "settingTableWidth" + iF;
		fieldWidth.appendChild( inputNumber );
		inputNumber.onchange = function() {
			let index = (this.parentNode).parentNode._indexInTable;
			settingsTable[index].width = inputNumber.value;
			settingsUpdated();
		}

		let fieldVisibility = document.createElement("div");
		fieldVisibility.className = 'settings-table-visibility';
		let checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "name";
		checkbox.checked = settingsTable[iF].visible;
		checkbox.id = "settingTableVisibility" + iF;
		fieldVisibility.appendChild(checkbox);
		checkbox.onchange = function() {
			let index = (this.parentNode).parentNode._indexInTable;
			settingsTable[index].visible = this.checked;
			settingsUpdated();
		}

		field.appendChild(fieldVisibility);
		field.appendChild(fieldWidth);
		field.appendChild(fieldName);
		settingsTableContainer.appendChild(field);
	}
}

function settingsApply() {
	for( let i = 1 ; i < settingsTable.length ; i++ ) {
		settingsTableOriginal[i].width = settingsTable[i].width;
		settingsTableOriginal[i].visible = settingsTable[i].visible;
		settingsTableOriginal[i].ref = settingsTable[i].ref;
		settingsTableOriginal[i].name = settingsTable[i].name;
	}
}

function settingsRestore() {
	settingsTable = [];
	settingsTable = settingsClone( table ); 

	for( let iF = 1 ; iF < settingsTable.length ; iF++ ) {
		let idWidth = "settingTableWidth" + iF;
		document.getElementById(idWidth).value = settingsTable[iF].width;
		let idVisibile = "settingTableVisibility" + iF;
		document.getElementById(idVisibile).checked = settingsTable[iF].visible;
	}
	settingsUnchanged();
}

function settingsUpdated() {
	settingsTableUpdated = true;
	let apply = document.getElementById('settingsApply')
	apply.className = "btn ok";
	apply.disabled = false;
	let restore = document.getElementById('settingsRestore')
	restore.className = "btn cancel";
	restore.disabled = false;
}

function settingsUnchanged() {
	settingsTableUpdated = false;			
	let apply = document.getElementById('settingsApply')
	apply.className = "btn dim";
	apply.disabled = true;
	let restore = document.getElementById('settingsRestore')
	restore.className = "btn dim";
	restore.disabled = true;
}

function settingsClone( table ) {
	let clone = [];
	for( let i = 0 ; i < table.length ; i++ ) {
		clone.push( { name:table[i].name, ref:table[i].ref, width:table[i].width, visible:table[i].visible } ); 
	}
	return clone;
}