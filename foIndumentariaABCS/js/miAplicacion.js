var miApp = angular.module('indumentariaABCS', ['ui.router', 'angularFileUpload','satellizer']);

miApp.config(function($stateProvider, $urlRouterProvider, $authProvider){
	//proveedor de autentificacion.
	$authProvider.loginUrl = 'http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/jwt/php/auth.php';
	$authProvider.tokenName = 'MiTokenGeneradoEnPHP';
	$authProvider.tokenPrefix = 'Aplicacion';
	$authProvider.authReader = 'data';

	//aca se genera el ruteo atravez de estados

	$stateProvider
		.state(
			"inicio",
			{
				url:"/inicio",
				templateUrl:"vistas/inicio.html",
				controller:"controlInicio"
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
					controller:"controlLogin"
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
					controller:"controlRegistro"
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
					controller:"controlUsuarios"
					}
				}
			}
		)

	$urlRouterProvider.otherwise("/inicio");
});

miApp.controller("controlInicio", function($scope, $auth, $http, $state) {
	$scope.usuario = {};
	$scope.usuario.correo = "admin@indumentariaABCS.com";
	$scope.usuario.clave = "Admin123$";
	$scope.usuario.perfil = "admin";

	if ($auth.isAuthenticated())
	{
		//$scope.usuario = JSON.parse($auth.getPayload());
		console.info("token", $auth.getPayload());	
		$scope.logeado = true;
		$scope.menu = true;
		switch ($scope.usuario.perfil)
		{
			case 'admin':
				$scope.admin = true;
				$scope.cantidadEncargados = "0";
				$scope.cantidadEmpleados = "0";
				$scope.cantidadClientes = "0";
				$scope.cantidadLocales = "0";

				// $http.post('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuarioCantidadPorPerfil/Encargado')
				// .then(function(respuesta) {     	
				//     console.info(respuesta.data);
				// },function errorCallback(response) {
				// 		console.log(response);
				//  	});

			break;
		}
	}	
	else
	{
		console.info("no token", $auth.getPayload());	
		$scope.logeado = false;
	}

	$scope.VerUsuarios = function(perfil){
		console.log("va a la lista" + perfil);
		$state.go('login.usuarios', {perfil:perfil});
	};

});

miApp.controller("controlLogin", function($scope, $state, $auth) {
	$scope.usuario = {};
	$scope.usuario.correo = "admin@indumentariaABCS.com";
	$scope.usuario.clave = "Admin123$";

	if ($auth.isAuthenticated())
		console.info("token", $auth.getPayload());
	else
		console.info("no token", $auth.getPayload());		

	$scope.Verificar = function(){
		//esto es una llamada igual que el http
		$auth.login($scope.usuario)
			.then(function(response){
				console.info("correcto", response);
				//solo sabemos que nos devolvio un token correcto con el isauthenticated
				if ($auth.isAuthenticated())
				{
					$state.go("inicio");
				}
				else
					console.info("no token", $auth.getPayload());		
				
			}).catch(function(response){
				console.info("NO volvio bien", response);
			});
	};

});

miApp.controller("controlRegistro", function($scope, $auth, $state, $http) {
	
	$scope.usuario={};
    $scope.usuario.nombre = "Aministrador";
    $scope.usuario.correo = "admin@indumentariaABCS.com";
    $scope.usuario.clave = "Admin123$";
    $scope.usuario.claveRepetida = "Admin123$";
    $scope.usuario.perfil = "admin";

	$scope.Guardar = function(){
		$http.post('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuario/' + JSON.stringify($scope.usuario))
		.then(function(respuesta) {     	
		    $state.go("inicio");
		},function errorCallback(response) {
				console.log(response);
		 	});
	};
});	

miApp.controller("controlUsuarios", function($scope, $http, $state, $auth, $stateParams) {
 	$scope.perfil = $stateParams.perfil;
 	$http.get('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuariosPorPerfil/' + $scope.perfil)
 	.then(function(respuesta) {     	
      	 $scope.ListadoUsuarios = respuesta.data;
      	 console.log(respuesta);
    },function errorCallback(response) {
     		 $scope.ListadoUsuarios= [];
     		console.log(response);

 	 });

});

miApp.controller("controlPersonaMenu", function($scope, $state, $auth) {
	if (!$auth.isAuthenticated())
		$state.go("inicio");
	$scope.irAAlta = function(){
		$state.go("persona.alta");
	};
	$scope.irAGrilla = function(){
		$state.go("persona.grilla");
	};
});

miApp.controller("controlPersonaAlta", function($scope, $http, $state, FileUploader, $auth) {
  $scope.DatoTest="**alta**";
  //inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "" ;
  $scope.persona.dni= "" ;
  $scope.persona.apellido= "" ;
  $scope.persona.foto="pordefecto.png";

  $scope.Guardar=function(){
  	$http.post('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/persona/' + JSON.stringify($scope.persona))
 	.then(function(respuesta) {     	
  	    $state.go("persona.grilla");
    },function errorCallback(response) {
 		console.log(response);
 	 });
  }
});

miApp.controller("controlPersonaGrilla", function($scope, $http, $state, $auth) {
	$scope.DatoTest="**grilla**";
 	
 	$http.get('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/personas')
 	.then(function(respuesta) {     	
      	 $scope.ListadoPersonas = respuesta.data;
      	 console.log(respuesta);
    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log(response);

 	 });
	/*$scope.Modificar=function(persona)
	{
		$state.go("modificacion", persona);
	};*/

 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);

		$http.delete('http://localhost:8080/wsIndumentariaABCS/persona/' + persona.id)
	 	.then(function(respuesta) {     	
	  	    $state.go("persona.grilla");
	    },function errorCallback(response) {
	 		console.log(response);
	 	 });
 	}

 	$scope.Modificar=function(persona){
 		$http.post('servidor/nexoPersona.php', { datos: {accion :"modificar",persona:$scope.persona}})
		  .then(function(respuesta) {     	
				 //aca se ejetuca si retorno sin errores      	
			 console.log(respuesta.data);
			 location.href="formGrilla.html";

		},function errorCallback(response) {     		
				//aca se ejecuta cuando hay errores
				console.log( response);     			
		  });
 	}
});

