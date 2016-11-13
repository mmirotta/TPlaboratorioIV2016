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
				templateUrl:"vistas/inicio.html",
				controller:"InicioCtrl"
			}
		)

		.state(
			"menuPrincipal",
			{
				url:"/menuPrincipal",
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
				url:"/usuarios/:perfil",
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
				views:{
					"contenido": {
					templateUrl:"vistas/local/altaLocal.html",
					controller:"controlAltaLocal"
					}
				}
			}
		)

		.state(
			"local.locales",
			{
				url:"/locales",
				views:{
					"contenido": {
					templateUrl:"vistas/local/locales.html",
					controller:"controlLocales"
					}
				}
			}
		)

	$urlRouterProvider.otherwise("/inicio");
});

/*LOCALES*/

miApp.controller("controlAltaLocal", function($scope, $auth, $state, $http, jwtHelper, FileUploader) {
	if ($auth.isAuthenticated())
	{
		$scope.usuario = jwtHelper.decodeToken($auth.getToken());
		$scope.usuario.logeado = true;
	}
	else
	{
		$state.go("inicio");
	}
	
	$scope.uploader = new FileUploader({url: 'http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/archivos'});
	$scope.uploader.queueLimit = 10; // indico cuantos archivos permito cargar
				
	/* Si quiero restringir los archivos a imagenes añado este filtro */
	$scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

	$scope.local={};
    $scope.local.direccion = "Av. Rivadavia";
    $scope.local.numero = "7302";
    $scope.local.localidad = "Capital Federal";
    $scope.local.provincia = "Buenos Aires";
    $scope.local.longitud = "-58.468439";
    $scope.local.latitud = "-34.629645";
    $scope.local.sucursal = "Flores";

	$scope.Guardar = function(){
		$scope.uploader.uploadAll();
		for (var i = 0; i < $scope.uploader.queue.length; i++) {
			$scope.foto = $scope.uploader.queue[i];
			if (i==0)
				$scope.local.foto = $scope.foto.file.name;
			else
				$scope.local.foto = $scope.usuario.foto + ';' + $scope.foto.file.name;
		};

		$http.post('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/local/' + JSON.stringify($scope.local))
		.then(function(respuesta) {     	
		    console.log(respuesta);
		},function errorCallback(response) {
				console.log(response);
		 	});
	};

	$scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
	    console.info('onCompleteItem', fileItem, response, status, headers);
	};
    $scope.uploader.onCompleteAll = function() {
        console.info('Se cargo con exito');
    };
});

miApp.controller("controlLocales", function($scope, $http, $state, $auth) {
	if ($auth.isAuthenticated())
	{
		console.info("token", $auth.getPayload());
		$scope.logeado = true;
	}
	else
	{
		console.info("no token", $auth.getPayload());
		$scope.logeado = false;
		$state.go("inicio");
	}
 	$http.get('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/locales')
 	.then(function(respuesta) {     	
      	 $scope.ListadoLocales = respuesta.data;
      	 console.log(respuesta);
    },function errorCallback(response) {
     		 $scope.ListadoLocales= [];
     		console.log(response);

 	 });
});