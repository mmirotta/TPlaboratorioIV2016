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
	 	 	
	 	$scope.Entregar = function(pedido){
	 		try
	 		{
	 			$scope.pedido = pedido;
	 			$scope.pedido.usuarioEmpleadoId = $scope.usuarioLogeado.id;
	 			$scope.pedido.fechaEntrega = new Date();
	 			$scope.pedido.estado = "Entregado";

	 			FactoryPedido.Editar($scope.pedido);
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
