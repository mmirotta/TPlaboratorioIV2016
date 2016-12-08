angular
  .module('indumentariaABCS')
  .factory('FactoryEstadisticas', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Estadisticas";
    objeto.BuscarVentasPorLocal = BuscarVentasPorLocal;
    objeto.BuscarVentasPorLocalYUsuario = BuscarVentasPorLocalYUsuario;
    objeto.BuscarCalificacion = BuscarCalificacion;

    function BuscarVentasPorLocal(){
      return Servicio.BuscarPor('estadisticasVentasPorLocal');
    }

    function BuscarVentasPorLocalYUsuario(parametro){
      return Servicio.BuscarPor('estadisticasVentasPorLocalYUsuario', parametro);
    }

    function BuscarCalificacion(){
      return Servicio.BuscarPor('calificacion');
    }
    
    return objeto;
  })//Cierra Factory Oferta
