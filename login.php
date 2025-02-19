<?php
$server="localhost";
$usser="root";
$password="";
$database="inmobiliaria";

$conexion= mysqli_connect ($server,$usser,$password,$database);

?>



<!DOCTYPE html>
<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario </title>
 
</head>
<body>
<form action ="#" name="inmobiliaria" method="post">
    <input type="text" name="usuario" placeholder="usuario">
    <input type="password" name="password" placeholder="password">
    <input type="submit" name="login ">
    <input type="reset">
</form> 
</body>
</html>



<?php

// Obtener datos del formulario
$usuario=$_POST['usuario'];
$password=$_POST['password'];

$query=mysqli_query($conexion,"SELECT * FROM login WHERE usuario='".$usuario."'and password= '".$password."'");
$nr=mysqli_num_rows($query);

if($nr==1){
    //heaader("loccation:pGIN.html")
    echo "Bienvenido:" .$usuario;
} else{
echo "USUARIO NO ENCONTRADO ";
}


?>
