angular
  .module('indumentariaABCS')
  .factory('FactoryPedido', function (Servicio) {
    var objeto = {};
    objeto.Nombre = "Factory Pedido";
    objeto.BuscarTodos = BuscarTodos;
    objeto.BuscarPor = BuscarPor;
    objeto.Guardar = Guardar;
    objeto.Editar = Editar;
    objeto.Borrar = Borrar;

    function BuscarPor(entidad, parametro){
      console.info(parametro);
      return Servicio.BuscarPor(entidad, parametro);
    }

    function BuscarTodos(){
      return Servicio.BuscarTodos('pedidos');
    }

    function Borrar(parametro){
      return Servicio.Borrar('pedido', parametro);
    }    

    function Guardar(parametro){
      return Servicio.Guardar('pedido', JSON.stringify(parametro));
    }

    function Editar(parametro){
      return Servicio.Editar('pedido', JSON.stringify(parametro));
    }

    return objeto;
  })//Cierra Factory Pedido
