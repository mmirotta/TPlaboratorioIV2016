angular
  .module('indumentariaABCS')
  .controller('LoginCtrl', function($scope, $state, $auth, jwtHelper) {
	$scope.usuario = {};
	$scope.usuario.correo = "administrador@abcs.com";
	$scope.usuario.clave = "admin123";
	$scope.resultado = {};
	$scope.resultado.ver = false;
	$scope.masBotones = false;

	$scope.Verificar = function(){
		try
		{
			$auth.login($scope.usuario)
				.then(function(response){
					if ($auth.isAuthenticated())
					{
						$state.go("inicio");
					}
					else
					{
						$scope.resultado.ver = true;
						$scope.resultado.estilo = "alert alert-danger";
						$scope.resultado.mensaje = "Los datos ingresados son incorrectos.";
					}
					
				}).catch(function(response){
					console.info("NO volvio bien", response);
				});
		}
		catch(error)
		{
			console.info(error);
		}
	}

	$scope.Acceso = function(correo, clave){
		$scope.usuario.clave = clave;
		$scope.usuario.correo = correo;
	}

	$scope.MasBotones = function(){
		$scope.masBotones = true;
	}

	$scope.MenosBotones = function(){
		$scope.masBotones = false;
	}
})

.controller("RegistroCtrl", function($scope, $auth, $state, $timeout, jwtHelper, FileUploader, FactoryUsuario, FactoryRutas, FactoryLocal) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		$scope.admin = false;
	    $scope.empleado = false;
		$scope.encargado = false;
		$scope.cliente = false;

		$scope.usuario={
	    	nombre: "Cliente",
	    	correo: "Cliente@gmail.com",
	    	clave: "123456",
	    	claveRepetida: "123456",
	    	perfil: "cliente",
	    	localId: "0"
	    };

		if ($auth.isAuthenticated())
		{
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
			$scope.logeado = true;

			switch ($scope.usuarioLogeado.perfil)
			{
				case "admin":
					$scope.admin = true;
					break;
				case "empleado":
					$scope.empleado = true;
					break;
				case "encargado":
					$scope.encargado = true;
					break;
				case "cliente":
					$scope.cliente = true;
					break;
			}
		}

		FactoryLocal.BuscarTodos().then(
	 		function(respuesta) {     	
	  			$scope.ListaLocales = respuesta;
	    	},function(error) {
	 			$scope.ListaLocales= [];
	 	});

		$scope.uploader = new FileUploader({url: FactoryRutas.UrlArchivos});
		$scope.uploader.queueLimit = 10; // indico cuantos archivos permito cargar
					
		/* Si quiero restringir los archivos a imagenes añado este filtro */
		$scope.uploader.filters.push({
	        name: 'imageFilter',
	        fn: function(item, options) {
	            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
	            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
	        }
	    });
	}
	catch(error)
	{
		console.info(error);
	}
	$scope.Guardar = function(){
		try
		{
			$scope.uploader.uploadAll();
			for (var i = 0; i < $scope.uploader.queue.length; i++) {
				$scope.foto = $scope.uploader.queue[i];
				if (i==0)
					$scope.usuario.foto = $scope.foto.file.name;
				else
					$scope.usuario.foto = $scope.usuario.foto + ';' + $scope.foto.file.name;
			};
			$scope.usuario.fechaCreacion = new Date();
			FactoryUsuario.Guardar($scope.usuario).then(
				function(respuesta) { 
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Usuario Guardado";
					$timeout(function(){
			 			$state.go('login.usuarios');
			 		}, 1000);
				},function(error) {
					console.log(error);
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar el usuario";
		 	});
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 	}
	};
})

.controller("UsuarioModificarCtrl", function($scope, $auth, $state, $stateParams, $timeout, jwtHelper, FileUploader, FactoryUsuario) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		$scope.admin = false;
	    $scope.empleado = false;
		$scope.encargado = false;
		$scope.cliente = false;

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
	}
	catch(error)
	{
		console.info(error);
	}

	$scope.Guardar = function(){
		try
		{
			FactoryUsuario.Editar($scope.usuario);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-success";
			$scope.resultado.mensaje = "Usuario editado";
			$timeout(function(){
	 			$state.go('login.usuarios');
	 		}, 1000);
	 	}
		catch(error)
		{
			console.info(error);
		}
	};

	$scope.Volver = function(){
		try
		{
			$state.go('login.usuarios');
	 	}
		catch(error)
		{
			console.info(error);
		}
	};
})

.controller("UsuariosCtrl", function($scope, $state, $auth, $timeout, jwtHelper, FactoryUsuario) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = true;
		$scope.admin = false;
	    $scope.empleado = false;
		$scope.encargado = false;
		$scope.cliente = false;
		$scope.buscarPerfil = "todos";

		if ($auth.isAuthenticated())
		{
			$scope.usuario = jwtHelper.decodeToken($auth.getToken());
			$scope.usuario.logeado = true;
		    switch ($scope.usuarioLogeado.perfil)
			{
				case "admin":
					$scope.admin = true;
					break;
				case "empleado":
					$scope.empleado = true;
					break;
				case "encargado":
					$scope.encargado = true;
					break;
				case "cliente":
					$scope.cliente = true;
					break;
			}
		}
		else
		{
			$state.go("inicio");
		}

	 	FactoryUsuario.BuscarTodos().then(
	 		function(respuesta) {     	
	  			$scope.ListadoUsuarios = respuesta;
	  			console.info(respuesta);
	    	},function(error) {
	 			$scope.ListadoUsuarios= [];
	 	});
	}
	catch(error)
	{
		console.info(error);
	}
 	$scope.Modificar = function(usuario){
 		var param = JSON.stringify(usuario);
    	$state.go('login.usuario', {usuario:param});
 	}

 	$scope.Borrar = function(usuario){
 		try
 		{
 			FactoryUsuario.Borrar(usuario.id);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-success";
			$scope.resultado.mensaje = "Usuario Eliminado";

	 		$timeout(function(){
	 			$state.go('inicio');
	 		}, 1000);
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error al borrar un usuario";
	 	}
 	}

 	$scope.Buscar = function(){
 		try
 		{
 			if ($scope.buscarPerfil == "todos")
 			{
				$scope.ListadoUsuarios = [];
	 			FactoryUsuario.BuscarTodos().then(
			 		function(respuesta) {     	
			  			$scope.ListadoUsuarios = respuesta;
			    	},function(error) {
			 			$scope.ListadoUsuarios= [];
			 	});
 			}
 			else
 			{
	 			$scope.ListadoUsuarios = [];
	 			FactoryUsuario.BuscarPor("usuariosPorPerfil", $scope.buscarPerfil).then(
			 		function(respuesta) {     	
			  			$scope.ListadoUsuarios = respuesta;
			    	},function(error) {
			 			$scope.ListadoUsuarios= [];
			 	});
	 		}
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error al bucar por perfil";
	 	}
 	}
});

;//Cierre modulo
