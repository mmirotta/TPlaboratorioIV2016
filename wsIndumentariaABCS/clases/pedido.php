<?php
require_once"AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
  	public $usuarioClienteId;
  	public $usuarioClienteNombre;
  	public $usuarioEmpleadoId;
  	public $usuarioEmpleadoNombre;
	public $nombreProducto;
 	public $descripcionProducto;
  	public $precioProducto;
  	public $fechaPedido;
  	public $fechaCreacion;
  	public $estado;

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function Cargar($id) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedido WHERE id =:id");
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$reservaBuscada= $consulta->fetchObject('pedido');
		return $pedidoBuscada;	
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedido WHERE estado <> 'Entregado'");
		$consulta->execute();			
		$arrpedido= $consulta->fetchAll(PDO::FETCH_CLASS, "pedido");	
		return $arrpedido;
	}
	
	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM pedido WHERE id=:id");	
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Guardar($pedido)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO pedido (usuarioClienteId,
																			usuarioClienteNombre,
																			fechaPedido,
																			nombreProducto,
																			descripcionProducto,
																			precioProducto,
																			estado)
														VALUES (:usuarioClienteId,
																:usuarioClienteNombre,
																:fechaPedido,
																:nombreProducto,
																:descripcionProducto,
																:precioProducto,
																:estado)");
		$consulta->bindValue(':usuarioClienteId', $reserva->usuarioClienteId, PDO::PARAM_INT);
		$consulta->bindValue(':usuarioClienteNombre', $reserva->usuarioClienteId, PDO::PARAM_STR);
		$consulta->bindValue(':nombreProducto', $reserva->nombreProducto, PDO::PARAM_STR);
		$consulta->bindValue(':descripcionProducto', $reserva->descripcionProducto, PDO::PARAM_STR);
		$consulta->bindValue(':precioProducto', $reserva->precioProducto, PDO::PARAM_STR);
		$consulta->bindValue(':fechaPedido', $reserva->fechaPedido, PDO::PARAM_STR);
		$consulta->bindValue(':estado', $reserva->estado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	

}
