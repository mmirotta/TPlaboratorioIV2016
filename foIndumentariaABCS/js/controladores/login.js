angular
  .module('indumentariaABCS')
  .controller('LoginCtrl', function($scope, $state, $auth, jwtHelper) {
	$scope.usuario = {};
	$scope.usuario.correo = "admin@indumentariaABCS.com";
	$scope.usuario.clave = "Admin123$";

	$scope.Verificar = function(){
		$auth.login($scope.usuario)
			.then(function(response){
				if ($auth.isAuthenticated())
				{
					$state.go("inicio");
				}
				
			}).catch(function(response){
				console.info("NO volvio bien", response);
			});
	};
});
