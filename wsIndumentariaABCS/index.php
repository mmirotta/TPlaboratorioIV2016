<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';
require 'clases/usuario.php';
require 'clases/local.php';
require 'clases/producto.php'; 
require 'clases/pedido.php';
require 'clases/pedidoProducto.php';
/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
*
*  GET: Para consultar y leer recursos */

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

/*BUSCAR*/

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $listado=Usuario::Buscar();
    $response->write(json_encode($listado));
    
    return $response;
});

$app->get('/usuariosPorPerfil/{perfil}', function ($request, $response, $args) {
    $listado=Usuario::BuscarPorPerfil($args['perfil']);
    $response->write(json_encode($listado));
    
    return $response;
});

$app->get('/locales[/]', function ($request, $response, $args) {
    $datos=Local::Buscar();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto=json_decode($datos[$i]->foto);
    }
    return $response->write(json_encode($datos));
});


/*CARGAR*/

$app->get('/usuario/{id}', function ($request, $response, $args) {
    $usuario=Usuario::Cargar($args['id']);
    $response->write(json_encode($usuario));
    return $response;
});

/* POST: Para crear recursos GUARDAR*/
$app->post('/usuario/{usuario}', function ($request, $response, $args) {
    $usuario=json_decode($args['usuario']);
    $usuario->foto=explode(';',$usuario->foto);
    $arrayFoto = array();
    if(count($usuario->foto) > 0){
        for ($i = 0; $i < count($usuario->foto); $i++ ){
            $rutaVieja="fotos/".$usuario->foto[$i];
            $rutaNueva=$usuario->correo. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]=$rutaNueva;
        } 
        $usuario->foto=json_encode($arrayFoto); 
    }

    
    return $response->write(Usuario::Guardar($usuario));
});

$app->post('/local/{local}', function ($request, $response, $args) {
    $local=json_decode($args['local']);
    $local->foto=explode(';',$local->foto);
    $arrayFoto = array();
    if(count($local->foto) > 0){
        for ($i = 0; $i < count($local->foto); $i++ ){
            $rutaVieja="fotos/".$local->foto[$i];
            $rutaNueva=$local->sucursal. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]=$rutaNueva;
        } 
        $local->foto=json_encode($arrayFoto); 
    }

    return $response->write(Local::Guardar($local));
});


// /* PUT: Para editar recursos MODIFICAR*/
$app->put('/usuario/{usuario}', function ($request, $response, $args) {
    Usuario::Editar(json_decode($args['usuario']));
    return $response;
});


// /* DELETE: Para eliminar recursos ELIMINAR*/
$app->delete('/usuario/{id}', function ($request, $response, $args) {
    Usuario::Borrar($args['id']);
    return $response;
});

/*Archivos*/
$app->post('/archivos', function ($request, $response, $args) {
    if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = "fotos" . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'Archivo Cargado!!' );
    $json = json_encode( $answer );
} else {
    echo 'Sin Archivos';
}
    return $response;
});

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
