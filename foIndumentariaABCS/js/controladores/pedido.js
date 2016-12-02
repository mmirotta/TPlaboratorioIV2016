angular
  .module('indumentariaABCS')
  .controller('PedidosCtrl', function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryPedido) {
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

		 	FactoryPedido.BuscarPor('pedidosPorLocal', $scope.usuarioLogeado.localId).then(
		 		function(respuesta) {     	
	      			$scope.ListadoPedidos = respuesta;
		    	},function(error) {
	     			$scope.ListadoPedidos= [];
		 	});
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
		    $scope.resultado.mensaje = "Error en PedidosCtrl.";
	 	}

	 	$scope.VerPedido = function(pedido){
			var param = JSON.stringify(pedido);
        	$state.go('pedido.verPedido', {pedido:param});
	 	}

  }).controller('VerPedidoCtrl', function($scope, $http, $state, $stateParams, $auth, $timeout, jwtHelper, FactoryPedido) {
		try
		{
			$scope.resultado = {};
			$scope.resultado.ver = false;
			if ($auth.isAuthenticated())
			{
				$scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
				$scope.pedido = JSON.parse($stateParams.pedido);
				$scope.logeado = true;
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
		    $scope.resultado.mensaje = "Error en PedidosCtrl.";
	 	}
	 	 	
	 	$scope.Entregar = function(){
	 		try
	 		{
	 			$scope.pedido.usuarioEmpleadoId = $scope.usuarioLogeado.id;
	 			$scope.pedido.fechaEntrega = new Date();
	 			$scope.pedido.estado = "Entregado";

	 			FactoryPedido.Editar($scope.pedido);
 				$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-success";
				$scope.resultado.mensaje = "Pedido entregado";

		 		$timeout(function(){
		 			$state.go('pedido.pedidos');
		 		}, 1000);
	 		}
		 	catch(error)
		 	{
		 		console.info(error);
		 		$scope.resultado.ver = true;
		 		$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al entregar un pedido";
		 	}
		}

		$scope.Volver = function(){
			try
			{
		 		$state.go("pedido.pedidos");
			}
			catch (error)
			{
				console.info(error);
				$scope.resultado.ver = true;
				$scope.resultado.estilo = "alert alert-danger";
				$scope.resultado.mensaje = "Error al volver al listado de pedidos";
			}
		};
  }).controller('MisPedidosCtrl', function($scope, $http, $state, $auth, $timeout, jwtHelper, FactoryPedido) {
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

		 	FactoryPedido.BuscarPor('pedidosPorUsuario', $scope.usuarioLogeado.id).then(
		 		function(respuesta) {     	
	      			$scope.ListadoPedidos = respuesta;
		    	},function(error) {
	     			$scope.ListadoPedidos= [];
		 	});
	 	}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
		    $scope.resultado.mensaje = "Error en PedidosCtrl.";
	 	}

	 	$scope.VerPedido = function(pedido){
			var param = JSON.stringify(pedido);
        	$state.go('pedido.verPedido', {pedido:param});
	 	}

  });
