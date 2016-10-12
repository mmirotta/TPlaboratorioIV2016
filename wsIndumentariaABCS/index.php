<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';
require 'clases/Personas.php';
require 'clases/usuario.php';
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

$app->get('/usuarioCantidadPorPerfil/{perfil}', function ($request, $response, $args) {
    $usuario=Usuario::BuscarCantidadUsuarios($args['perfil']);
    var_dump($usuario);
    $response->write(json_encode($usuario));
    return $response;
});

$app->get('/personas[/]', function ($request, $response, $args) {
    $listado=Persona::Buscar();
    $response->write(json_encode($listado));
    
    return $response;
});


/*CARGAR*/

$app->get('/usuario/{id}', function ($request, $response, $args) {
    $usuario=Usuario::Cargar($args['id']);
    $response->write(json_encode($usuario));
    return $response;
});

$app->get('/persona/{id}', function ($request, $response, $args) {
    $persona=Persona::Cargar($args['id']);
    $response->write(json_encode($persona));
    return $response;
});


/* POST: Para crear recursos GUARDAR*/
$app->post('/usuario/{usuario}', function ($request, $response, $args) {
    Usuario::Guardar(json_decode($args['usuario']));
    return $response;
});

$app->post('/persona/{persona}', function ($request, $response, $args) {
    Persona::Guardar(json_decode($args['persona']));
    return $response;
});


// /* PUT: Para editar recursos MODIFICAR*/
$app->put('/usuario/{usuario}', function ($request, $response, $args) {
    Usuario::Editar(json_decode($args['usuario']));
    return $response;
});

$app->put('/persona/{persona}', function ($request, $response, $args) {
    Persona::Editar(json_decode($args['persona']));
    return $response;
});




// /* DELETE: Para eliminar recursos ELIMINAR*/
$app->delete('/usuario/{id}', function ($request, $response, $args) {
    Usuario::Borrar($args['id']);
    return $response;
});

$app->delete('/persona/{id}', function ($request, $response, $args) {
    Persona::Borrar($args['id']);
    return $response;
});
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
