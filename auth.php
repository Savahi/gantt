<?php

$s_AuthUsersFile = "users.txt";

$s_AuthorizationFailed = "<html><body><h1>Authentification failed!</h1></body></html>";

function isAuthRequired() {
	global $s_AuthUsersFile;
	global $s_AuthorizationFailed;

	$bReturn = true;

	if( file_exists( $s_AuthUsersFile ) ) {
		$fileHandle = fopen( $s_AuthUsersFile, 'rb' );
		if( $fileHandle != FALSE ) {
			$sLine = fgets( $fileHandle );
			if( strncmp( $sLine, "NOAUTH", 6 ) == 0 ) {
				$bReturn = false;
			}
			fclose( $fileHandle );
		} 
	}
	return $bReturn;
}


function auth( $bAjax=false ) {
	global $s_AuthUsersFile;
	global $s_AuthorizationFailed;

	if( !isset( $_SERVER['PHP_AUTH_USER'] ) ) {
	  header("WWW-Authenticate: Basic realm=\"Passwords\"");
	  header("HTTP/1.0 401 Unauthorized");
	  echo $s_AuthorizationFailed;
	  exit();
	} 
	$status = isAuthUserAndPasswordCorrect( $_SERVER["PHP_AUTH_USER"], $_SERVER['PHP_AUTH_PW'] );
	if( !$status['authorized'] ) {
		if( !$bAjax ) {
		  header("WWW-Authenticate: Basic realm=\"Passwords\"");
		  header("HTTP/1.0 401 Unauthorized");
		} else {
			echo "Authentification error";
		}
		exit();
	}
	return $status['userName'];
}


function isAuthUserAndPasswordCorrect( $sUser, $sPassword ) {
	global $s_AuthUsersFile;
	global $s_AuthorizationFailed;

	$bAuthorized = false;
	$iError = 0;
	$sUserName = '';

	$sSplitter = "\t";
	$iUserPos = 0;
	$iPasswordPos = 1;
	$iUserNamePos = 2;
	
	if( file_exists( $s_AuthUsersFile ) ) {
		$fileHandle = fopen( $s_AuthUsersFile, 'rb' );
		
		if( $fileHandle != FALSE ) {
			$sEncryptedPassword = strtolower( encrypt( $sPassword ) );

			while( !feof( $fileHandle ) ) {
				$sLine = fgets( $fileHandle );
				$aExploded = explode( $sSplitter, $sLine );
				if( count( $aExploded ) < 3 ) {
					continue;
				}
				if( strlen( $aExploded[ $iUserPos ] ) < 1 ) {
					continue;
				}
				
				$sTryUser = $aExploded[ $iUserPos ];				
				if( strncmp( $sTryUser, $sUser, strlen($sTryUser) ) != 0 ) {
					continue;
				}

				$sTryPassword = strtolower( $aExploded[ $iPasswordPos ] );
				if( strncmp( $sEncryptedPassword, $sTryPassword, strlen($sTryPassword) ) != 0 ) {
					continue;
				}
				
				$sUserName = $aExploded[ $iUserNamePos ];
				$bAuthorized = true;
				break;
			}
			fclose( $fileHandle );
		} else {
			$iError = 1;
		}
	} else {
		$iError = 1;
	}
	return array( 'authorized' => $bAuthorized, 'error' => $iError, 'userName' => $sUserName );
}


function encrypt( $s ) {
	$encrypted = '';
	for( $i = 0 ; $i < strlen( $s ) ; $i++ ) {
	   $byteValue = ord( $s[$i] );
	   $xor = $byteValue ^ 0xFF;
	   $encrypted = $encrypted . dechex( $xor );
	}
	return $encrypted;
}

?>