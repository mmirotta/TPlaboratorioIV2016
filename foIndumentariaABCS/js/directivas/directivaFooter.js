angular
  .module('indumentariaABCS')
  .directive('utnFooter', function() {
    return {
      replace: true,
      restrict: "EA", 
      templateUrl: "templates/footer.html"
    };
  })
  ;//cierra modulo