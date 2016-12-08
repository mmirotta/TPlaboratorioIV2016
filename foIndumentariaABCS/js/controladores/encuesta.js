angular
  .module('indumentariaABCS')
  .controller('EncuestaCtrl', function($scope, $state, $auth, $timeout, jwtHelper, FactoryEncuesta) {
    if ($auth.isAuthenticated())
    {
      $scope.usuarioLogeado = jwtHelper.decodeToken($auth.getToken());
    } 

    $scope.resultado = {};
	$scope.resultado.ver = false;
    $scope.pregunta = "1";
    $scope.encuesta = {
    	calificacion: "Muy Bueno",
 		variedad: "Muy Bueno",
 		masVariedad: "Remeras",
 		facilidad: "Si",
 		mejorPagina: "Mercado Libre",
 		peorPagina: "Solo Deportes",
 		tiempoEntrega: "Si",
 		inconvenientes: "Si",
 		redesSociales: "Facebook",
 		recomendacion: "Si",
 		representarnos: "Si",
 		sugerencia: "Opinion"
    };

    $scope.Siguiente = function(){
    	$scope.pregunta = parseInt($scope.pregunta) + 1;
    };

    $scope.Finalizar = function(){
    	try
 		{
			$scope.encuesta.usuarioClienteId = $scope.usuarioLogeado.id;
			$scope.encuesta.fechaCreacion = new Date();
 			
 			FactoryEncuesta.Guardar($scope.encuesta).then(
				function(respuesta) {  
					$scope.resultado.ver = true;   	
			    	$scope.resultado.estilo = "alert alert-success";
					$scope.resultado.mensaje = "Gracias por realizar la encuesta";
					$timeout(function(){
			 			$state.go('inicio');
			 		}, 2000);
				},function(error) {
					$scope.resultado.ver = true;
					$scope.resultado.estilo = "alert alert-danger";
					$scope.resultado.mensaje = "Error al guardar la encuesta";
					console.log(error);
		 	});
 		}
	 	catch(error)
	 	{
	 		console.info(error);
	 		$scope.resultado.ver = true;
	 		$scope.resultado.estilo = "alert alert-danger";
			$scope.resultado.mensaje = "Error en Finalizar encuesta.";
	 	}
    };
    
  });
