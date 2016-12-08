angular
  .module('indumentariaABCS')
  .factory('FactoryEncuesta', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Encuesta";
    objeto.Guardar = Guardar;

    function Guardar(parametro){
      console.info(parametro);
      return Servicio.Guardar('encuesta', JSON.stringify(parametro));
    }

    return objeto;
  })//Cierra Factory Encuesta
