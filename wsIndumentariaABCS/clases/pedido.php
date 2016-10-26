<?php
require_once"AccesoDatos.php";
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
  	public $usuarioId;
  	public $fechaPedido;
  	public $fechaCreacion;
  	public $entregado;

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
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedido WHERE entregado = 0");
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
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO pedido (usuarioId,fechaPedido,fechaEntrega)
														VALUES (:usuarioId,:fechaPedido,:fechaEntrega)");
		$consulta->bindValue(':usuarioId', $reserva->usuarioId, PDO::PARAM_INT);
		$consulta->bindValue(':fechaPedido', $reserva->fechaPedido, PDO::PARAM_STR);
		$consulta->bindValue(':fechaEntrega', $reserva->fechaEntrega, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	

}
