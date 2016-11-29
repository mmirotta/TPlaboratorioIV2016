angular
  .module('indumentariaABCS')
  .factory('FactoryRutas', function () {
    var objeto = {};
    objeto.Nombre = "Factory Rutas";
    objeto.UrlWebService = "http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS";
    objeto.UrlArchivos = "http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/archivos";
    objeto.UrlFotos = "http://localhost:8080/TPlaboratorioIV2016/wsIndumentariaABCS/fotos/";
    return objeto;
  })//Cierra Fatory Rutas
