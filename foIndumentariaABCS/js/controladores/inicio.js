angular
  .module('indumentariaABCS')
  .controller('InicioCtrl', function($scope, $state, $auth) {
    if ($auth.isAuthenticated())
    {
      $state.go('menuPrincipal');
    } 
  });
