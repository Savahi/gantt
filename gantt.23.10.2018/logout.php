<?php

//unset( $_SERVER['PHP_AUTH_USER'] );
//unset( $_SERVER['PHP_AUTH_PW'] );

header("WWW-Authenticate: Basic realm=\"Passwords\"");
header("HTTP/1.0 401 Unauthorized");

echo "<script>window.location.replace('http://www.spiderproject.com/');</script>";
//header("Location: http://www.spiderproject.com/");

exit();

?>