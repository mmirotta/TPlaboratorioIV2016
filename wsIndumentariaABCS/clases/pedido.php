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
  	public $productoId;
	public $productoNombre;
 	public $productoDescripcion;
  	public $productoPrecion;
  	public $fechaPedido;
  	public $fechaEntrega;
  	public $total;
  	public $localId;
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
																			fechaPedido,
																			productoId,
																			localId,
																			total,
																			estado)
														VALUES (:usuarioClienteId,
																:fechaPedido,
																:productoId,
																:localId,
																:total,
																:estado)");
		$consulta->bindValue(':usuarioClienteId', $pedido->usuarioClienteId, PDO::PARAM_INT);
		$consulta->bindValue(':fechaPedido', $pedido->fechaPedido, PDO::PARAM_STR);
		$consulta->bindValue(':productoId', $pedido->productoId, PDO::PARAM_STR);
		$consulta->bindValue(':localId', $pedido->localId, PDO::PARAM_STR);
		$consulta->bindValue(':total', $pedido->total, PDO::PARAM_STR);
		$consulta->bindValue(':estado', $pedido->estado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	

}
