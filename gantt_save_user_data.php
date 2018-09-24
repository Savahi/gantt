<?php

require('auth.php');

if( isAuthRequired() ) {
	auth(true);
}

$authScript = "<?php require('auth.php'); if( isAuthRequired() ) { auth(true); } ?>";

if( strlen($HTTP_RAW_POST_DATA) > 0 ) {

	$fileHandle = fopen('gantt_user_data.php','w');
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
} else {
		echo "Post data error";
}
exit();

?>