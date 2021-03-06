var miApp = angular.module('indumentariaABCS', ['ui.router', 'angularFileUpload','satellizer', 'angular-jwt', 'ngMap']);

miApp.config(function($stateProvider, $urlRouterProvider, $authProvider){
	//proveedor de autentificacion.
	$authProvider.loginUrl = 'http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/jwt/php/auth.php';
	$authProvider.tokenName = 'IndumentariaABCS';
	$authProvider.tokenPrefix = '';
	//$authProvider.authReader = 'data';

	//aca se genera el ruteo atravez de estados

	$stateProvider
		.state(
			"inicio",
			{
				url:"/inicio",
				cache: false,
				templateUrl:"vistas/inicio.html",
				controller:"InicioCtrl"
			}
		)

		.state(
			"menuPrincipal",
			{
				url:"/menuPrincipal",
				cache: false,
				templateUrl:"vistas/menuPrincipal.html",
				controller:"MenuPrincipalCtrl"
			}
		)

		.state(
			"login",
			{
				url:"/login",
				abstract:true, 
				templateUrl:"vistas/login/abstractaLogin.html",
				controller:"MenuPrincipalCtrl"
			}
		)

		.state(
			"login.login",
			{
				url:"/login",
				cache: false,
				views:{
					"contenido": {
					templateUrl:"vistas/login/login.html",
					controller:"LoginCtrl"
					}
				}
			}
		)

		.state(
			"login.registro",
			{
				url:"/registro",
				cache: false,
				views:{
					"contenido": {
					templateUrl:"vistas/login/registro.html",
					controller:"RegistroCtrl"
					}
				}
			}
		)

		.state(
			"login.usuario",
			{
				url:"/usuario/:usuario",
				cache: false,
				views:{
					"contenido": {
					templateUrl:"vistas/login/modificarUsuario.html",
					controller:"UsuarioModificarCtrl"
					}
				}
			}
		)

		.state(
			"login.usuarios",
			{
				url:"/usuarios",
				cache: false,
				views:{
					"contenido": {
					templateUrl:"vistas/login/usuarios.html",
					controller:"UsuariosCtrl"
					}
				}
			}
		)

		.state(
			"local",
			{
				url:"/local",
				abstract:true, 
				templateUrl:"vistas/local/abstractaLocal.html",
				controller:"MenuPrincipalCtrl"
			}
		)

		.state(
			"local.alta",
			{
				url:"/alta",
				cache: false,
				views:{
					"contenido": {
					templateUrl:"vistas/local/altaLocal.html",
					controller:"LocalCtrl"
					}
				}
			}
		)

		.state(
			"local.verLocal",
			{
				url:"/verLocal/:local",
				cache: false,
				views:{
					"contenido": {
					templateUrl:"vistas/local/verLocal.html",
					controller:"VerLocalCtrl"
					}
				}
			}
		)

		.state(
			"local.locales",
			{
				url:"/locales",
				cache: false,
				views:{
					"contenido": {
					templateUrl:"vistas/local/locales.html",
					controller:"LocalesCtrl"
					}
				}
			}
		)

		.state(
			"producto",
			{
				url:"/producto",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/producto/abstractaProducto.html",
				controller:"MenuPrincipalCtrl"
			}
		)

		.state(
			"producto.alta",
			{
				url:"/alta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/producto/altaProducto.html",
					controller:"ProductoAltaCtrl"
					}
				}
			}
		)

		.state(
			"producto.modificar",
			{
				url:"/modificar/:producto",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/producto/modificarProducto.html",
					controller:"ProductoModificarCtrl"
					}
				}
			}
		)

		.state(
			"producto.verProducto",
			{
				url:"/verProducto/:producto",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/producto/verProducto.html",
					controller:"VerProductoCtrl"
					}
				}
			}
		)

		.state(
			"producto.productos",
			{
				url:"/productos",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/producto/productos.html",
					controller:"ProductosCtrl"
					}
				}
			}
		)

		.state(
			"oferta",
			{
				url:"/oferta",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/oferta/abstractaOferta.html",
				controller:"MenuPrincipalCtrl"
			}
		)

		.state(
			"oferta.alta",
			{
				url:"/alta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/oferta/altaOferta.html",
					controller:"OfertaAltaCtrl"
					}
				}
			}
		)

		.state(
			"oferta.verOferta",
			{
				url:"/verOferta/:oferta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/oferta/verOferta.html",
					controller:"VerOfertaCtrl"
					}
				}
			}
		)

		.state(
			"oferta.ofertas",
			{
				url:"/ofertas",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/oferta/ofertas.html",
					controller:"OfertasCtrl"
					}
				}
			}
		)

		.state(
			"pedido",
			{
				url:"/pedido",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/pedido/abstractaPedido.html",
				controller:"MenuPrincipalCtrl"
			}
		)

		.state(
			"pedido.verPedido",
			{
				url:"/verPedido/:pedido",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/pedido/verPedido.html",
					controller:"VerPedidoCtrl"
					}
				}
			}
		)

		.state(
			"pedido.pedidos",
			{
				url:"/pedidos",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/pedido/pedidos.html",
					controller:"PedidosCtrl"
					}
				}
			}
		)

		.state(
			"pedido.misPedidos",
			{
				url:"/misPedidos",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/pedido/misPedidos.html",
					controller:"MisPedidosCtrl"
					}
				}
			}
		)

		//Estadisticas
		.state(
			"estadistica",
			{
				url:"/estadistica",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/estadisticas/abstractaEstadisticas.html",
				controller:"MenuPrincipalCtrl"
			}
		)

		.state(
			"estadistica.graficoDCN",
			{
				url:"/graficoDCN",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/estadisticas/graficoDCN.html",
					controller:"GraficoDCNCtrl"
					}
				}
			}
		)

		.state(
			"estadistica.ventasPorLocal",
			{
				url:"/ventasPorLocal",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/estadisticas/ventasPorLocal.html",
					controller:"VentasPorLocalCtrl"
					}
				}
			}
		)

		.state(
			"estadistica.ventasPorLocalYUsuario",
			{
				url:"/ventasPorLocalYUsuario",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/estadisticas/ventasPorLocalYUsuario.html",
					controller:"VentasPorLocalYUsuarioCtrl"
					}
				}
			}
		)

		.state(
			"estadistica.calificacion",
			{
				url:"/calificacion",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/estadisticas/calificacionClientes.html",
					controller:"CalificacionCtrl"
					}
				}
			}
		)

		//Encuesta
		.state(
			"encuesta",
			{
				url:"/encuesta",
				cache:false,
				abstract:true, 
				templateUrl:"vistas/encuesta/abstractaEncuesta.html",
				controller:"MenuPrincipalCtrl"
			}
		)

		.state(
			"encuesta.encuesta",
			{
				url:"/encuesta",
				cache:false,
				views:{
					"contenido": {
					templateUrl:"vistas/encuesta/encuesta.html",
					controller:"EncuestaCtrl"
					}
				}
			}
		)

	$urlRouterProvider.otherwise("/inicio");
});