angular
  .module('indumentariaABCS')
  .directive('utnTitulo', function() {
    return {
      scope:{
        titulo: '@titulo'
      },
      replace: true,
      restrict: "EA", 
      templateUrl: "templates/titulo.html"
    };
  })
  ;//cierra modulo