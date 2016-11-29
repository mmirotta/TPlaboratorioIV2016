angular
  .module('indumentariaABCS')
  .controller('MenuPrincipalCtrl', function($scope, $auth, $http, $state, jwtHelper, FactoryUsuario, FactoryLocal, FactoryPedido, FactoryProducto) {
    if ($auth.isAuthenticated())
    {
      $scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
      $scope.logeado = true;
      $scope.menu = true;
      switch ($scope.usuarioLogeado.perfil)
      {
        case 'admin':
          $scope.admin = true;
        break;
        case "empleado":
          $scope.empleado = true;
          FactoryPedido.BuscarPor('pedidosPorLocalTop10', $scope.usuarioLogeado.localId).then(
            function(respuesta) {       
                  $scope.ListadoPedidos = respuesta;
              },function(error) {
                $scope.ListadoPedidos= [];
          });
          FactoryProducto.BuscarPor('productosTop10', 1).then(
            function(respuesta) {       
                  $scope.ListadoProductos = respuesta;
              },function(error) {
                $scope.ListadoProductos= [];
          });
        break;
        case "encargado":
          $scope.encargado = true;
          FactoryPedido.BuscarPor('pedidosPorLocalTop10', $scope.usuarioLogeado.localId).then(
            function(respuesta) {       
                  $scope.ListadoPedidos = respuesta;
              },function(error) {
                $scope.ListadoPedidos= [];
          });
          FactoryProducto.BuscarPor('productosTop10', 1).then(
            function(respuesta) {       
                  $scope.ListadoProductos = respuesta;
              },function(error) {
                $scope.ListadoProductos= [];
          });
        break;
        case "cliente":
          $scope.cliente = true;
          FactoryProducto.BuscarPor('productosTop10', 1).then(
            function(respuesta) {       
                  $scope.ListadoProductos = respuesta;
              },function(error) {
                $scope.ListadoProductos= [];
          });
        break;
      }
    } 
    else
    {
      $scope.logeado = false;
      $scope.menu = false;
    }

    $scope.Salir = function(){
      $auth.logout();
      $state.go("inicio");
    };

    $scope.VerProducto = function(producto){
      var param = JSON.stringify(producto);
        $state.go('producto.verProducto', {producto:param});
    }
  });//Cierre Controlador
