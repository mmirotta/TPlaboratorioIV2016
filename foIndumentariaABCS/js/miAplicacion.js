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
			"login.usuario",
			{
				url:"/usuario/:usuario",
				views:{
					"contenido": {
					templateUrl:"vistas/login/modificarUsuario.html",
					controller:"controlModificarUsuario"
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

/*INICIO*/
miApp.controller("controlInicio", function($scope, $auth, $http, $state, jwtHelper) {
	$scope.usuario = {};
	$scope.usuario.correo = "admin@indumentariaABCS.com";
	$scope.usuario.clave = "Admin123$";
	$scope.usuario.perfil = "admin";

	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		$scope.menu = true;
		switch ($scope.usuarioLogeado.perfil)
		{
			case 'admin':
				$scope.admin = true;
				$scope.cantidadEncargados = "0";
				$scope.cantidadEmpleados = "0";
				$scope.cantidadClientes = "0";
				$scope.cantidadLocales = "0";

				$http.get('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuariosPorPerfil/encargado')
			 	.then(function(respuesta) {     	
			      	$scope.ListadoUsuarios = respuesta.data;
			      	$scope.cantidadEncargados = parseInt($scope.ListadoUsuarios.length);
			    },function errorCallback(response) {
			    	$scope.ListadoUsuarios= [];
			 	});
			 	$http.get('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuariosPorPerfil/empleado')
			 	.then(function(respuesta) {     	
			      	$scope.ListadoUsuarios = respuesta.data;
			      	$scope.cantidadEmpleados = parseInt($scope.ListadoUsuarios.length);
			    },function errorCallback(response) {
			    	$scope.ListadoUsuarios= [];
			 	});
			 	$http.get('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuariosPorPerfil/cliente')
			 	.then(function(respuesta) {     	
			      	$scope.ListadoUsuarios = respuesta.data;
			      	$scope.cantidadClientes = parseInt($scope.ListadoUsuarios.length);
			    },function errorCallback(response) {
			    	$scope.ListadoUsuarios= [];
			 	});
			 	$http.get('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/locales')
			 	.then(function(respuesta) {     	
			      	$scope.ListadoLocales = respuesta.data;
			      	$scope.cantidadLocales = parseInt($scope.ListadoLocales.length);
			    },function errorCallback(response) {
			    	$scope.ListadoLocales= [];
			 	});

			break;
		}
	}	
	else
	{
		$scope.logeado = false;
		$scope.menu = false;
		$scope.admin = false;
	}

	$scope.VerUsuarios = function(perfil){
		$state.go('login.usuarios', {perfil:perfil});
	};

	$scope.Salir = function(){
		$auth.logout();
		$state.go("inicio");
	};
});

/*LOGIN*/
miApp.controller("controlLogin", function($scope, $state, $auth, jwtHelper) {
	$scope.usuario = {};
	$scope.usuario.correo = "admin@indumentariaABCS.com";
	$scope.usuario.clave = "Admin123$";

	if ($auth.isAuthenticated())
		console.info("token", jwtHelper.decodeToken($auth.getToken()));

	$scope.Verificar = function(){
		$auth.login($scope.usuario)
			.then(function(response){
				if ($auth.isAuthenticated())
				{
					$state.go("inicio");
				}
				
			}).catch(function(response){
				console.info("NO volvio bien", response);
			});
	};
});

miApp.controller("controlRegistro", function($scope, $auth, $state, $http, jwtHelper, FileUploader) {
	$scope.usuario={};
    $scope.usuario.nombre = "Cliente";
    $scope.usuario.correo = "cliente@gmail.com";
    $scope.usuario.clave = "cliente123";
    $scope.usuario.claveRepetida = "cliente123";
    $scope.usuario.perfil = "cliente";

	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		$scope.admin = true;
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

	$scope.Guardar = function(){
		$scope.uploader.uploadAll();
		for (var i = 0; i < $scope.uploader.queue.length; i++) {
			$scope.foto = $scope.uploader.queue[i];
			if (i==0)
				$scope.usuario.foto = $scope.foto.file.name;
			else
				$scope.usuario.foto = $scope.usuario.foto + ';' + $scope.foto.file.name;
		};

		$scope.usuario.fechaCreacion = new Date();
		$http.post('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuario/' + JSON.stringify($scope.usuario))
		.then(function(respuesta) { 
			if ($auth.isAuthenticated())
			{  
			  	$auth.login($scope.usuario)
				.then(function(response){
					if ($auth.isAuthenticated())
					{
						$state.go("inicio");
					}
					
				}).catch(function(response){
					console.info("NO volvio bien", response);
				});
			}
			else
			{
		    	$state.go("inicio");
		    }
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

miApp.controller("controlModificarUsuario", function($scope, $auth, $state, $stateParams, $http, jwtHelper, FileUploader) {
	if ($auth.isAuthenticated())
	{
		$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		$scope.logeado = true;
		$scope.usuario = JSON.parse($stateParams.usuario);
	}
	else
	{
		$state.go("inicio");
	}

	$scope.Guardar = function(){

		$http.put('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuario/' + JSON.stringify($scope.usuario))
		.then(function(respuesta) {     	
		    $state.go("inicio");
		},function errorCallback(response) {
			console.log(response);
	 	});
	};

});	

miApp.controller("controlUsuarios", function($scope, $http, $state, $auth, $stateParams, jwtHelper) {
 	$scope.perfil = $stateParams.perfil;
	if ($auth.isAuthenticated())
	{
		$scope.usuario = jwtHelper.decodeToken($auth.getToken());
		$scope.usuario.logeado = true;
	    $scope.editar = false;

		switch($scope.usuario.perfil)
		{
			case "admin":
					$scope.editar = true;
				break;

			case "encargado":
					if ($scope.perfil == "empleado")
						$scope.editar = true;
				break;
		}
	}
	else
	{
		$state.go("inicio");
	}

 	$http.get('http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/usuariosPorPerfil/' + $scope.perfil)
 	.then(function(respuesta) {     	
      	 $scope.ListadoUsuarios = respuesta.data;
      	 console.log(respuesta);
    },function errorCallback(response) {
     		 $scope.ListadoUsuarios= [];
     		console.log(response);

 	 });

 	$scope.Modificar = function(usuario){
 		var param = JSON.stringify(usuario);
    	$state.go('login.usuario', {usuario:param});
 	}
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

