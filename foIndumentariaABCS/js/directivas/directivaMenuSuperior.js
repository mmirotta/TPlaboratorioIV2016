angular
  .module('indumentariaABCS')
  .directive('utnMenuSuperior', function() {
    return {
      scope:{
        usuario: '@usuario'
      },
      replace: true,
      restrict: "EA", 
      templateUrl: "templates/menuSuperior.html"
    };
  })
  ;//cierra modulo