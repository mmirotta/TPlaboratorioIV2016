<?php

require 'vendor/autoload.php';
require 'clases/usuario.php';
require 'clases/local.php';
require 'clases/producto.php'; 
require 'clases/pedido.php';
require 'clases/oferta.php';
require 'clases/estadisticas.php';
require 'clases/encuesta.php';

$app = new Slim\App();

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

/*BUSCAR*/

$app->get('/usuarios[/]', function ($request, $response, $args) {
    $listado=Usuario::Buscar();
    for ($i = 0; $i < count($listado); $i++ ){
        $listado[$i]->foto=json_decode($listado[$i]->foto);
    }
    return $response->write(json_encode($listado));
});

$app->get('/usuariosPorPerfil/{perfil}', function ($request, $response, $args) {
    $listado=Usuario::BuscarPorPerfil($args['perfil']);
    for ($i = 0; $i < count($listado); $i++ ){
        $listado[$i]->foto=json_decode($listado[$i]->foto);
    }
    return $response->write(json_encode($listado));
});

$app->get('/locales[/]', function ($request, $response, $args) {
    $datos=Local::Buscar();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto=json_decode($datos[$i]->foto);
    }
    return $response->write(json_encode($datos));
});

$app->get('/productos[/]', function ($request, $response, $args) {
    $datos=Producto::Buscar();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto=json_decode($datos[$i]->foto);
    }
    return $response->write(json_encode($datos));
});

$app->get('/productosTop5/{id}', function ($request, $response, $args) {
    $datos=Producto::BuscarTop5();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto=json_decode($datos[$i]->foto);
    }
    return $response->write(json_encode($datos));
});

$app->get('/productosTop6/{id}', function ($request, $response, $args) {
    $datos=Producto::BuscarTop6();
    for ($i = 0; $i < count($datos); $i++ ){
        $datos[$i]->foto=json_decode($datos[$i]->foto);
    }
    return $response->write(json_encode($datos));
});

$app->get('/ofertas[/]', function ($request, $response, $args) {
    $datos=Oferta::Buscar();
    return $response->write(json_encode($datos));
});

$app->get('/ofertasTop5/{id}', function ($request, $response, $args) {
    $datos=Oferta::BuscarTop5();
    return $response->write(json_encode($datos));
});

/*BUSCAR PEDIDOS*/

$app->get('/pedidosPorLocal/{localId}', function ($request, $response, $args) {
    $listado=Pedido::BuscarPorLocal($args['localId']);
    return $response->write(json_encode($listado));
});

$app->get('/pedidosPorLocalTop10/{localId}', function ($request, $response, $args) {
    $listado=Pedido::BuscarPorLocalTop10($args['localId']);
    return $response->write(json_encode($listado));
});

$app->get('/pedidosPorUsuario/{usuarioId}', function ($request, $response, $args) {
    $listado=Pedido::BuscarPorUsuario($args['usuarioId']);
    return $response->write(json_encode($listado));
});

$app->get('/pedidos[/]', function ($request, $response, $args) {
    $datos=Pedido::Buscar();
    return $response->write(json_encode($datos));
});

/*BUSCAR ESTADISTICAS*/

$app->get('/estadisticasVentasPorLocal[/]', function ($request, $response, $args) {
    $listado=Estadisticas::BuscarVentasPorLocal();
    return $response->write(json_encode($listado));
});

$app->get('/estadisticasVentasPorLocalYUsuario/{localId}', function ($request, $response, $args) {
    $listado=Estadisticas::BuscarVentasPorLocalYUsuario($args['localId']);
    return $response->write(json_encode($listado));
});
/*CARGAR*/

$app->get('/usuario/{id}', function ($request, $response, $args) {
    $usuario=Usuario::Cargar($args['id']);
    $response->write(json_encode($usuario));
    return $response;
});

$app->get('/local/{id}', function ($request, $response, $args) {
    $local=Local::Cargar($args['id']);
    $response->write(json_encode($local));
    return $response;
});

$app->get('/producto/{id}', function ($request, $response, $args) {
    $producto=Producto::Cargar($args['id']);
    $response->write(json_encode($producto));
    return $response;
});

$app->get('/oferta/{id}', function ($request, $response, $args) {
    $oferta=Oferta::Cargar($args['id']);
    $response->write(json_encode($oferta));
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
            if ($i==0)
            {
                $local->fotoPrincipal = $rutaNueva;
            }
        } 
        $local->foto=json_encode($arrayFoto); 
    }

    return $response->write(Local::Guardar($local));
});


$app->post('/producto/{producto}', function ($request, $response, $args) {
    $producto=json_decode($args['producto']);
    $producto->foto=explode(';',$producto->foto);
    $arrayFoto = array();
    if(count($producto->foto) > 0){
        for ($i = 0; $i < count($producto->foto); $i++ ){
            $rutaVieja="fotos/".$producto->foto[$i];
            $rutaNueva=$producto->nombre. "_". $i .".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
            copy($rutaVieja, "fotos/".$rutaNueva);
            unlink($rutaVieja);
            $arrayFoto[]=$rutaNueva;
            if ($i==0)
            {
                $producto->fotoPrincipal = $rutaNueva;
            }
        } 
        $producto->foto=json_encode($arrayFoto); 
    }

    return $response->write(Producto::Guardar($producto));
});

$app->post('/pedido/{pedido}', function ($request, $response, $args) {
    $pedido=json_decode($args['pedido']);
    return $response->write(Pedido::Guardar($pedido));
});

$app->post('/oferta/{oferta}', function ($request, $response, $args) {
    $oferta=json_decode($args['oferta']);
    return $response->write(Oferta::Guardar($oferta));
});

$app->post('/encuesta/{encuesta}', function ($request, $response, $args) {
    $encuesta=json_decode($args['encuesta']);
    return $response->write(Encuesta::Guardar($encuesta));
});

// /* PUT: Para editar recursos MODIFICAR*/
$app->put('/usuario/{usuario}', function ($request, $response, $args) {
    Usuario::Editar(json_decode($args['usuario']));
    return $response;
});


$app->put('/local/{local}', function ($request, $response, $args) {
    Local::Editar(json_decode($args['local']));
    return $response;
});

$app->put('/producto/{producto}', function ($request, $response, $args) {
    Producto::Editar(json_decode($args['producto']));
    return $response;
});

$app->put('/pedido/{pedido}', function ($request, $response, $args) {
    Pedido::Editar(json_decode($args['pedido']));
    return $response;
});

$app->put('/oferta/{oferta}', function ($request, $response, $args) {
    Oferta::Editar(json_decode($args['oferta']));
    return $response;
});


// /* DELETE: Para eliminar recursos ELIMINAR*/
$app->delete('/usuario/{id}', function ($request, $response, $args) {
    Usuario::Borrar($args['id']);
    return $response;
});

$app->delete('/local/{id}', function ($request, $response, $args) {
    Local::Borrar($args['id']);
    return $response;
});

$app->delete('/producto/{id}', function ($request, $response, $args) {
    Producto::Borrar($args['id']);
    return $response;
});

$app->delete('/pedido/{id}', function ($request, $response, $args) {
    Pedido::Borrar($args['id']);
    return $response;
});


$app->delete('/oferta/{id}', function ($request, $response, $args) {
    Oferta::Borrar($args['id']);
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

$app->run();
