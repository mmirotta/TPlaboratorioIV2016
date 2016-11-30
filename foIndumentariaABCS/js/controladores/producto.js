angular
  .module('indumentariaABCS')
  .controller("ProductoAltaCtrl", function($scope, $auth, $state, $http, $timeout, jwtHelper, FileUploader, FactoryProducto, FactoryRutas) {
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
					$timeout(function(){
			 			$state.go('producto.productos');
			 		}, 2000);
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
			}
			else
			{
				$scope.logeado = false;
				$state.go("inicio");
			}

		 	FactoryProducto.BuscarTodos().then(
		 		function(respuesta) {   
		 		console.info(respuesta);  	
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
  .controller("VerProductoCtrl", function($scope, $http, $state, $stateParams, $auth, $timeout, jwtHelper, FactoryProducto, FactoryLocal, FactoryPedido, NgMap) {
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;

			$scope.admin = false;
		    $scope.empleado = false;
			$scope.encargado = false;
			$scope.cliente = false;

			$scope.comprar = false;
			$scope.finComprar = false;
			$scope.pedido = {};
			$scope.pedido.localId = "";
			if ($auth.isAuthenticated())
			{
				$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
				$scope.producto = JSON.parse($stateParams.producto);
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
		 			$state.go('producto.productos');
		 		}, 2000);
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
 				$scope.pedido.usuarioClienteId = $scope.usuarioLogeado.id;
 				$scope.pedido.fechaPedido = new Date();
 				$scope.pedido.productoId = $scope.producto.id;
 				$scope.pedido.total = $scope.producto.precio;
 				$scope.pedido.estado = "Pedido";
	 			
	 			FactoryPedido.Guardar($scope.pedido).then(
					function(respuesta) {  
						$scope.resultado.ver = true;   	
				    	$scope.resultado.estilo = "alert alert-success";
						$scope.resultado.mensaje = "Pedido realizado";
						$timeout(function(){
				 			$scope.finComprar = true;
				 			$scope.comprar = false;
				 		}, 2000);
					},function(error) {
						$scope.resultado.ver = true;
						$scope.resultado.estilo = "alert alert-danger";
						$scope.resultado.mensaje = "Error al guardar el realizado";
						console.log(error);
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

	 	$scope.Editar = function(producto){
	 		try
	 		{
	 			var param = JSON.stringify(producto);
    			$state.go('producto.modificar', {producto:param});
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al editar un producto ";
		 	}
	 	}

	 	$scope.Volver = function(){
	 		try
	 		{
	 			$state.go('producto.productos');
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al comprar ";
		 	}
	 	}

  }).controller("ProductoModificarCtrl", function($scope, $http, $state, $stateParams, $auth, $timeout, jwtHelper, FactoryProducto, FactoryLocal, FactoryPedido, NgMap) {
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;

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
			console.info($scope.producto);
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
		    $scope.resultado.mensaje = "Error en el controlador ProductoModificarCtrl.";
	 	}

	 	$scope.Guardar = function(){
	 		try
	 		{
	 			FactoryProducto.Editar($scope.producto);
 				$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-success";
				$scope.resultado.mensaje = "Producto Editado";

		 		$timeout(function(){
		 			$state.go('producto.productos');
		 		}, 2000);
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al borrar un producto";
		 	}
	 	}

	 	$scope.Volver = function(){
	 		try
	 		{
	 			$state.go('producto.productos');
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
