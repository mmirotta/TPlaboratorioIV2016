angular
  .module('indumentariaABCS')
  .factory('FactoryOferta', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Oferta";
    objeto.BuscarTodos = BuscarTodos;
    objeto.BuscarPor = BuscarPor;
    objeto.Guardar = Guardar;
    objeto.Cargar = Cargar;
    objeto.Borrar = Borrar;
    objeto.Editar = Editar;

    function BuscarPor(entidad, parametro){
      return Servicio.BuscarPor(entidad, parametro);
    }

    function BuscarTodos(){
      
      return Servicio.BuscarTodos('ofertas');
    }

    function Cargar(parametro){
      return Servicio.Cargar('oferta', parametro);
    }

    function Borrar(parametro){
      return Servicio.Borrar('oferta', parametro);
    }    

    function Guardar(parametro){
      return Servicio.Guardar('oferta', JSON.stringify(parametro));
    }

    function Editar(parametro){
      return Servicio.Editar('oferta', JSON.stringify(parametro));
    }    
    
    return objeto;
  })//Cierra Factory Oferta
