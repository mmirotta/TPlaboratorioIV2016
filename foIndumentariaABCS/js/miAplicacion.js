var miApp = angular.module('indumentariaABCS', ['ui.router', 'angularFileUpload','satellizer', 'angular-jwt']);

miApp.config(function($stateProvider, $urlRouterProvider, $authProvider){
	//proveedor de autentificacion.
	$authProvider.loginUrl = 'http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/jwt/php/auth.php';
	$authProvider.tokenName = 'MiTokenGeneradoEnPHP';
	$authProvider.tokenPrefix = 'Aplicacion';
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
				templateUrl:"vistas/login/abstractaLogin.html"
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
				templateUrl:"vistas/local/abstractaLocal.html"
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

	$urlRouterProvider.otherwise("/inicio");
});