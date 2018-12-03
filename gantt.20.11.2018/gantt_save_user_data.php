<?php

require('auth.php');

if( isAuthRequired() ) {
	auth(true);
}

$authScript = "<?php require('auth.php'); if( isAuthRequired() ) { auth(true); } ?>";

if( strlen($HTTP_RAW_POST_DATA) > 0 ) {

	$fileHandle = fopen('gantt_user_data.php','w'); // Saving the JSON file for future use by the web application...
	if( $fileHandle != FALSE ) {
		$status = fwrite( $fileHandle, $authScript . $HTTP_RAW_POST_DATA );
		if( $status != FALSE ) {
   			echo "ok";
		} else {
   			echo "File write error";
		}
		fclose( $fileHandle );
	} else {
		echo "File open error";
	}
	
	$fileHandle = fopen('gantt_user_data.csv.php','w'); // Saving the CSV file for future use by the SP...
	if( $fileHandle != FALSE ) {
		$status = fwrite( $fileHandle, $authScript . "\n" );

		$json = json_decode($HTTP_RAW_POST_DATA);

		// Printing header...
		$keysText = "Code"; 
		foreach( $json[0]->data as $key => $value ) {
			$keysText .= "\t";
			$keysText .= $key;
		}
		$keysText .= "\n";
		fwrite( $fileHandle, $keysText );  

		// Printing data line by line...
		for( $i = 0 ; $i < sizeof($json); $i++ ) { 
			$text = $json[$i]->operationCode;
			foreach( $json[$i]->data as $key => $value ) {
				$text .= "\t";
				$text .= $value;
			}
			$text = preg_replace('/[\r\n]+/', '', $text);
			$text .= "\n";
			fwrite( $fileHandle, $text );
		}
		fclose( $fileHandle );		
	}
} else {
	echo "Post data error";
}
exit();

?>