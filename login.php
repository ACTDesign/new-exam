<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
$uid = $_POST['userid'];
$pw = $_POST['password'];
 
if($uid == 'ali123' and $pw == 'ali1234')
{    
    session_start();
    $_SESSION['sid']=session_id();
    echo "Logged in successfully";
}
?>
 
</body>
<canvas id="game"></canvas>
    <div class="highscore"></div>
    <div class="reset-game">Reset score</div>
    
<script src="main.js"></script>
</body>
</html>