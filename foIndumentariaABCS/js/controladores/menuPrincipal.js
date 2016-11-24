angular
  .module('indumentariaABCS')
  .controller('MenuPrincipalCtrl', function($scope, $auth, $http, $state, jwtHelper, FactoryUsuario, FactoryLocal) {
    if ($auth.isAuthenticated())
    {
      $scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
      $scope.logeado = true;
      $scope.menu = true;
      switch ($scope.usuarioLogeado.perfil)
      {
        case 'admin':
          $scope.admin = true;
          $scope.cantidadEncargados = "0";
          $scope.cantidadEmpleados = "0";
          $scope.cantidadClientes = "0";
          $scope.cantidadLocales = "0";

          FactoryUsuario.BuscarPor("usuariosPorPerfil", "encargado").then(
            function(respuesta){
              $scope.cantidadEncargados = respuesta.length;
            },
            function(error){

            }
          );

          FactoryUsuario.BuscarPor("usuariosPorPerfil", "empleado").then(
            function(respuesta){
              $scope.cantidadEmpleados = respuesta.length;
            },
            function(error){

            }
          );

          FactoryUsuario.BuscarPor("usuariosPorPerfil", "cliente").then(
            function(respuesta){
              $scope.cantidadClientes = respuesta.length;
            },
            function(error){

            }
          );

          FactoryLocal.BuscarTodos().then(
            function(respuesta){
              $scope.cantidadLocales = respuesta.length;
            },
            function(error){

            }
          );

        break;
        case "empleado":
          $scope.empleado = true;
          FactoryUsuario.BuscarPor("usuariosPorPerfil", "cliente").then(
            function(respuesta){
              $scope.cantidadClientes = respuesta.length;
            },
            function(error){

            }
          );
        break;
      }
    } 
    else
    {
      $scope.logeado = false;
      $scope.menu = false;
      $scope.admin = false;
    }

    $scope.Salir = function(){
      $auth.logout();
      $state.go("inicio");
    };
  });//Cierre Controlador
