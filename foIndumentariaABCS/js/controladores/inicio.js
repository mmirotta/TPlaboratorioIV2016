angular
  .module('indumentariaABCS')
  .controller('InicioCtrl', function($scope, $state, $auth, FactoryLocal, FactoryProducto) {
    if ($auth.isAuthenticated())
    {
      $state.go('menuPrincipal');
    } 

    FactoryLocal.BuscarTodos().then(
 		function(respuesta) {     	
  			$scope.ListadoSucursal = respuesta;
    	},function(error) {
 			$scope.ListadoSucursal= [];
 	});

 	FactoryProducto.BuscarPor('productosTop6', 1).then(
		function(respuesta) {       
	      	$scope.ListadoProductos = respuesta;
	  	},function(error) {
	    	$scope.ListadoProductos= [];
	});
  });
