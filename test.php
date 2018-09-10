<?php
$str = '[{"id":1, "value":"Comfort Stretch"}, {"id":1, "value":"Comfort\" Stretch"} ]';

$items = json_decode($str);

$csv = '';
foreach($items as $item) {
	$csv = $csv . $item->id . "\t" . $item->value . "\n";
}

$csvFileHandle = fopen('userdata.csv','w');
		
if( $csvFileHandle != FALSE ) {
	$status = fwrite( $csvFileHandle, $csv );
	if( $status == FALSE ) {
		echo "Error writing userdata.csv";
	} 
	fclose( $csvFileHandle );
}

?>