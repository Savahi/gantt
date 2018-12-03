
function loadData( data ) {
	// Retrieving min. and max. dates
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
			d.start = d.factStart;
			d.fin = d.factFin;
		} else {
			if( d.factStart == null ) { // Hasn't been started yet
				d.status = 0; // not started 
				d.displayStartInSeconds = d.asapStartInSeconds; 
				d.displayFinInSeconds = d.asapFinInSeconds;
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
				d.start = d.factStart;
				d.fin = d.asapFin;				
			}
		}
	}
	data.startMin = (data.asapStartMin > data.factStartMin) ? data.factStartMin : data.asapStartMin;
	data.finMax = (data.asapFinMax > data.factFinMax) ? data.asapFinMax : data.factFinMax;
	data.startFin = data.finMax - data.startMin;
	data.displayMax = data.finMax + (data.finMax-data.startMin)/2.0;
	data.displayMaxWidth = data.displayMax - data.startMin;

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

export default loadData;
