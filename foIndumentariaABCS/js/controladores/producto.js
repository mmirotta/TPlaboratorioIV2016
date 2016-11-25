angular
  .module('indumentariaABCS')
  .controller("ProductoAltaCtrl", function($scope, $auth, $state, $http, jwtHelper, FactoryProducto, FactoryRutas) {
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
		
		$scope.producto={};
	    $scope.producto.nombre = "Producto 1";
	    $scope.producto.descripcion = "Producto 1";
	    $scope.producto.precio = "15";
	}
 	catch(error)
 	{
 		console.info(error);
 		$scope.resultado.estilo = "alert alert-danger";
		$scope.resultado.mensaje = "Error en el controlador producto.";
 	}
	$scope.Guardar = function(){
		try
		{
			FactoryProducto.Guardar($scope.producto).then(
				function(respuesta) {  
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Producto Guardado";
				},function(error) {
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar el producto";
					console.log(error);
			 });
		}
	 	catch(error)
	 	{
	 		console.info(error);
	 	}
	};
  })
  .controller("ProductosCtrl", function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryProducto) {
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;
			if ($auth.isAuthenticated())
			{
				$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
				$scope.logeado = true;
				if ($scope.usuarioLogeado.perfil == 'vendedor')
					$scope.borrarProducto = true;
				else
					$scope.borrarProducto = false;
			}
			else
			{
				$scope.logeado = false;
				$state.go("inicio");
			}

		 	FactoryProducto.BuscarTodos().then(
		 		function(respuesta) {     	
	      			$scope.ListadoProductos = respuesta;
		    	},function(error) {
	     			$scope.ListadoProductos= [];
		 	});
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
		    $scope.resultado.mensaje = "Error en el controlador productos.";
	 	}

	 	$scope.Borrar = function(producto){
	 		try
	 		{
	 			FactoryProducto.Borrar(producto.id);
 				$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-success";
				$scope.resultado.mensaje = "Producto Eliminado";

		 		$timeout(function(){
		 			$state.go('inicio');
		 		}, 1000);
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al borrar un producto";
		 	}
	 	}
  });

;// cierra modulo
