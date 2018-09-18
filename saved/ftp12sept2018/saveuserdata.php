<?php
	if( strlen($HTTP_RAW_POST_DATA) > 0 ) {

		$fileHandle = fopen('userdata.json','w');
		
		if( $fileHandle != FALSE ) {
		
			$status = fwrite( $fileHandle, $HTTP_RAW_POST_DATA );
		
			if( $status != FALSE ) {
	   			echo "ok";
			} else {
	   			echo "File write error";				
			}

 		} else {
 			echo "File open error";
 		}
	} else {
 		echo "Post data error";
	}
	exit();
?>