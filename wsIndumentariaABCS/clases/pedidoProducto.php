<?php
require_once"AccesoDatos.php";
class PedidoProducto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
  	public $pedidoId;
  	public $productoId;
  	public $cantidad;

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function Cargar($id) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedidoProducto WHERE id =:id");
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$reservaBuscado= $consulta->fetchObject('pedidoProducto');
		return $pedidoProductoBuscado;	
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM pedidoProducto WHERE entregado = 0");
		$consulta->execute();			
		$arrpedidoProducto= $consulta->fetchAll(PDO::FETCH_CLASS, "pedidoProducto");	
		return $arrpedidoProducto;
	}
	
	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM pedidoProducto WHERE id=:id");	
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Guardar($pedidoProducto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO pedidoProducto (pedidoId,productoId,cantidad)
														VALUES (:pedidoId,:productoId,:cantidad)");
		$consulta->bindValue(':pedidoId', $pedidoProducto->pedidoId, PDO::PARAM_INT);
		$consulta->bindValue(':productoId', $pedidoProducto->productoId, PDO::PARAM_INT);
		$consulta->bindValue(':cantidad', $pedidoProducto->cantidad, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	

}
