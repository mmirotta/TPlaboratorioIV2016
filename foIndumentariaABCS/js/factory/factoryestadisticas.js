angular
  .module('indumentariaABCS')
  .factory('FactoryEstadisticas', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Estadisticas";
    objeto.BuscarVentasPorLocal = BuscarVentasPorLocal;

    function BuscarVentasPorLocal(){
      return Servicio.BuscarPor('estadisiticasVentasPorLocal');
    }

    return objeto;
  })//Cierra Factory Oferta
