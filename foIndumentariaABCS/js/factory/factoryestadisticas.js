angular
  .module('indumentariaABCS')
  .factory('FactoryEstadisticas', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Estadisticas";
    objeto.BuscarVentasPorLocal = BuscarVentasPorLocal;
    objeto.BuscarVentasPorLocalYUsuario = BuscarVentasPorLocalYUsuario;

    function BuscarVentasPorLocal(){
      return Servicio.BuscarPor('estadisticasVentasPorLocal');
    }

    function BuscarVentasPorLocalYUsuario(parametro){
      return Servicio.BuscarPor('estadisticasVentasPorLocalYUsuario', parametro);
    }
    
    return objeto;
  })//Cierra Factory Oferta
