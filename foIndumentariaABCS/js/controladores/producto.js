angular
  .module('indumentariaABCS')
  .controller("ProductoAltaCtrl", function($scope, $auth, $state, $http, jwtHelper, FileUploader, FactoryProducto, FactoryRutas) {
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
		
		$scope.producto={};
	    $scope.producto.nombre = "Producto 1";
	    $scope.producto.descripcion = "Producto 1";
	    $scope.producto.precio = 15;
	    $scope.producto.foto = "";
	    $scope.producto.usuarioEmpleadoId = $scope.usuario.id;
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
			$scope.uploader.uploadAll();
			for (var i = 0; i < $scope.uploader.queue.length; i++) {
				$scope.foto = $scope.uploader.queue[i];
				if (i==0)
					$scope.producto.foto = $scope.foto.file.name;
				else
					$scope.producto.foto = $scope.producto.foto + ';' + $scope.foto.file.name;
			};
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
	 	 	
	 	$scope.VerProducto = function(producto){
	 		var param = JSON.stringify(producto);
	    	$state.go('producto.verProducto', {producto:param});
		}
  })
  .controller("VerProductoCtrl", function($scope, $http, $state, $stateParams, $auth, $timeout, jwtHelper, FactoryProducto, FactoryLocal, NgMap) {
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;
			$scope.comprar = false;
			$scope.localId = "";
			if ($auth.isAuthenticated())
			{
				$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
				$scope.producto = JSON.parse($stateParams.producto);
				$scope.logeado = true;
			}
			else
			{
				$scope.logeado = false;
				$state.go("inicio");
			}

			FactoryLocal.BuscarTodos().then(
		 		function(respuesta) {     	
		  			$scope.ListaLocales = respuesta;
		    	},function(error) {
		 			$scope.ListaLocales= [];
		 	});
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
		    $scope.resultado.mensaje = "Error en el controlador VerProductoCtrl.";
	 	}

	 	$scope.Borrar = function(){
	 		try
	 		{
	 			FactoryProducto.Borrar($scope.producto.id);
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

	 	$scope.Comprar = function(){
	 		try
	 		{
	 			$scope.comprar = true;
			 	$scope.Latitud = -34.623743;
				$scope.Longitud = -58.493723;
				$scope.customIcon = {
				  "scaledSize": [32, 32],
				  "url":  $scope.nombre
				};

				NgMap.getMap().then(function (map) {
				    //console.log(map.getBounds().toString());
				});
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al comprar ";
		 	}
	 	}

	 	$scope.ConfirmarCompra = function(){
	 		try
	 		{
	 			$scope.pedido = {
	 				usuarioClienteId = $scope.usuario.id,
	 				fechaPedido = new Date(),
	 				productoId = $scope.producto.id,
	 				localId = $scope.localId,
	 				estado = "Pedido"
	 			};
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al comprar ";
		 	}
	 	}
  });

;// cierra modulo
