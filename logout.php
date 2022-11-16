<!DOCTYPE html>
<html>
<body>
 
<?php
 
    echo "Logged out successfully";
 
    session_start();
    session_destroy();
 
?>
 
</body>
</html>