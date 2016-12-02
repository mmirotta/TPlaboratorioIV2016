<?php
include_once '../vendor/autoload.php';
include_once '../../clases/usuario.php';
use \Firebase\JWT\JWT;


$DatosDelModelPorPost = file_get_contents('php://input');
$user = json_decode($DatosDelModelPorPost);

$usuarioBuscado = Usuario::Verificar($user->correo, $user->clave);

if ($usuarioBuscado != null)
{
	$usuarioBuscado->fechaAcceso = date("Y-m-d H:i:s");
	Usuario::EditarAcceso($usuarioBuscado);

	$ClaveDeEncriptacion="estaeslaclave";
	$token["usuario"] = $usuarioBuscado->nombre;
	$token["perfil"] = $usuarioBuscado->perfil;
	$token["id"] = $usuarioBuscado->id;
	$token["localId"] = $usuarioBuscado->localId;
	$token["localNombre"] = $usuarioBuscado->localNombre;
	$token["iat"] = time();
	$token["exp"] = time()+30000;

	$jwt = JWT::encode($token, $ClaveDeEncriptacion);
}
else
{
	$jwt = false;
}

$ArrayConToken["IndumentariaABCS"] = $jwt; 
echo json_encode($ArrayConToken); 

?>