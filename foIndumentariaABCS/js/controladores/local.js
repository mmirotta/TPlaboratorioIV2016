angular
  .module('indumentariaABCS')
  .controller("LocalCtrl", function($scope, $auth, $state, $http, $timeout, jwtHelper, FileUploader, FactoryRutas, FactoryLocal) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.usuario = jwtHelper.decodeToken($auth.getToken());
			$scope.usuario.logeado = true;
		}
		else
		{
			$state.go("inicio");
		}
		
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

		$scope.local={};
	    $scope.local.direccion = "Av. Rivadavia";
	    $scope.local.numero = "7302";
	    $scope.local.localidad = "Capital Federal";
	    $scope.local.provincia = "Buenos Aires";
	    $scope.local.longitud = "-58.468439";
	    $scope.local.latitud = "-34.629645";
	    $scope.local.sucursal = "Flores";
	}
	catch (error)
	{
		console.info(error);
		$scope.resultado.ver = true;
		$scope.resultado.estilo = "alert alert-danger";
		$scope.resultado.mensaje = "Error en LocalCtrl";
	}

	$scope.Guardar = function(){
		try
		{
			$scope.uploader.uploadAll();
			for (var i = 0; i < $scope.uploader.queue.length; i++) {
				$scope.foto = $scope.uploader.queue[i];
				if (i==0)
					$scope.local.foto = $scope.foto.file.name;
				else
					$scope.local.foto = $scope.usuario.foto + ';' + $scope.foto.file.name;
			};

			FactoryLocal.Guardar($scope.local).then(
				function(respuesta) {     	
			    	$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Local Guardado";
					$timeout(function(){
			 			$state.go("local.locales");
			 		}, 2000);
				},function(error) {
					console.info(error);
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar el local";
			});
		}
		catch (error)
		{
			console.info(error);
			$scope.resultado.ver = true;
			$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error en al guardar el local";
		}
	};
  })
  .controller("LocalesCtrl", function($scope, $http, $state, $auth, jwtHelper, FactoryLocal) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		if ($auth.isAuthenticated())
		{
			$scope.logeado = true;
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
		}
		else
		{
			$scope.logeado = false;
			$state.go("inicio");
		}

	 	FactoryLocal.BuscarTodos().then(
	 		function(respuesta) {     	
	  			$scope.ListadoLocales = respuesta;
	    	},function(error) {
	 			$scope.ListadoLocales= [];
				console.info(error);
				$scope.resultado.ver = true;
				$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al buscar el listado de locales";
	 	});
	}
	catch(error)
	{
		console.info(error);
		$scope.resultado.ver = true;
		$scope.resultado.estilo = "alert alert-danger";
		$scope.resultado.mensaje = "Error en LocalesCtrl";
	}

	$scope.VerLocal = function(local){
		try
		{
			var param = JSON.stringify(local);
	    	$state.go('local.verLocal', {local:param});
		}
		catch (error)
		{
			console.info(error);
			$scope.resultado.ver = true;
			$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error al ver el local";
		}
	};
}).controller("VerLocalCtrl", function($scope, $http, $state, $stateParams, $timeout, $auth, jwtHelper, FactoryLocal) {
	try
	{
		$scope.resultado = {};
		$scope.resultado.ver = false;
		$scope.ver = true;
		if ($auth.isAuthenticated())
		{
			$scope.logeado = true;
			$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
			$scope.local = JSON.parse($stateParams.local);
		}
		else
		{
			$scope.logeado = false;
			$state.go("inicio");
		}


	}
	catch(error)
	{
		console.info(error);
		$scope.resultado.ver = true;
		$scope.resultado.estilo = "alert alert-danger";
		$scope.resultado.mensaje = "Error en LocalesCtrl";
	}

	$scope.Editar = function(){
		try
		{
	 		$scope.ver = false;
		}
		catch (error)
		{
			console.info(error);
			$scope.resultado.ver = true;
			$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error en editar el local";
		}
	};

	$scope.Volver = function(){
		try
		{
	 		$state.go("local.locales");
		}
		catch (error)
		{
			console.info(error);
			$scope.resultado.ver = true;
			$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error al volver al listado de locales";
		}
	};

	$scope.VolverEditar = function(){
		try
		{
	 		$scope.ver = true;
		}
		catch (error)
		{
			console.info(error);
			$scope.resultado.ver = true;
			$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error en el volver de la edición del local";
		}
	};

	$scope.GuardarEditar = function(){
		try
		{
			FactoryLocal.Editar($scope.local);
			$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-success";
			$scope.resultado.mensaje = "Local editado";
			$timeout(function(){
	 			$scope.ver = true;
	 			$scope.resultado.ver = false;
	 		}, 2000);
	 		
		}
		catch (error)
		{
			console.info(error);
			$scope.resultado.ver = true;
			$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error en el guardar edición del local";
		}
	};
});
