angular
  .module('indumentariaABCS')
  .controller("OfertaAltaCtrl", function($scope, $auth, $state, $http, $timeout, jwtHelper, FactoryOferta, FactoryProducto) {
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

		
		$scope.oferta={};
		$scope.oferta.productoId = 0;
	    $scope.oferta.descuento = 15;
	    $scope.oferta.usuarioEmpleadoId = $scope.usuario.id;

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
 		$scope.resultado.estilo = "alert alert-danger";
		$scope.resultado.mensaje = "Error en el controlador producto.";
 	}
	$scope.Guardar = function(){
		try
		{
			FactoryOferta.Guardar($scope.oferta).then(
				function(respuesta) {  
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Oferta Guardada";
					$timeout(function(){
			 			$state.go('oferta.ofertas');
			 		}, 2000);
				},function(error) {
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar la oferta";
					console.log(error);
			 });
		}
	 	catch(error)
	 	{
	 		console.info(error);
	 	}
	};
  }).controller("OfertasCtrl", function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryProducto, FactoryOferta) {
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;
			if ($auth.isAuthenticated())
			{
				$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
			}
			else
			{
				$state.go("inicio");
			}

		 	FactoryOferta.BuscarTodos().then(
		 		function(respuesta) {   
		 		console.info(respuesta);  	
	      			$scope.ListadoOfertas = respuesta;
		    	},function(error) {
	     			$scope.ListadoOfertas= [];
		 	});
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
		    $scope.resultado.mensaje = "Error en OfertasCtrl.";
	 	}
	 	 	
	 	$scope.VerOferta = function(oferta){
	 		var param = JSON.stringify(oferta);
	    	$state.go('oferta.verOferta', {oferta:param});
		}
  }).controller("VerOfertaCtrl", function($scope, $http, $state, $stateParams, $auth, $timeout, jwtHelper, FactoryOferta, FactoryProducto, FactoryLocal, FactoryPedido, NgMap) {
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
				$scope.oferta = JSON.parse($stateParams.oferta);
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
		    $scope.resultado.mensaje = "Error en el controlador VerOfertaCtrl.";
	 	}

	 	$scope.Borrar = function(){
	 		try
	 		{
	 			FactoryOferta.Borrar($scope.oferta.id);
 				$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-success";
				$scope.resultado.mensaje = "Oferta Eliminada";

		 		$timeout(function(){
		 			$state.go('oferta.ofertas');
		 		}, 2000);
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al borrar una oferta";
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
 				$scope.pedido.productoId = $scope.oferta.productoId;
 				$scope.pedido.ofertaId = $scope.oferta.id;
 				$scope.pedido.total = $scope.oferta.precioFinal;
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
						$scope.resultado.mensaje = "Error al guardar el pedido realizado";
						console.log(error);
			 	});
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al confirmar la compra";
		 	}
	 	}

		$scope.Encuesta = function(){
	 		try
	 		{
	 			$state.go('encuesta.encuesta');
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al ir a la encuesta ";
		 	}
	 	}

	 	$scope.Volver = function(){
	 		try
	 		{
	 			$state.go('oferta.ofertas');
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al volver al listado de ofertas";
		 	}
	 	}

  })

;
