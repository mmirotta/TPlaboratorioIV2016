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
  	public $productoPrecio;
  	public $fechaPedido;
  	public $fechaEntrega;
  	public $descuento;
  	public $total;
  	public $localId;
  	public $localSucursal;
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

	public static function BuscarPorLocal($localId)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT pedido.id AS id, producto.nombre AS productoNombre, producto.descripcion AS productoDescripcion, producto.precio AS productoPrecio,
																usuarioCliente.nombre AS usuarioClienteNombre, usuarioEmpleado.nombre AS usuarioEmpleadoNombre, 
														        fechaPedido, fechaEntrega, total, local.sucursal AS localSucursal, estado, 
														        (producto.precio - pedido.total) AS descuento
														FROM `pedido` 
														INNER JOIN producto ON producto.id = pedido.productoId
														INNER JOIN usuario AS usuarioCliente ON usuarioCliente.id = pedido.usuarioClienteId
														LEFT JOIN usuario AS usuarioEmpleado ON usuarioEmpleado.id = pedido.usuarioEmpleadoId
														INNER JOIN local ON local.id = pedido.localId
														WHERE pedido.localId = :localId");
		$consulta->bindValue(':localId', $localId, PDO::PARAM_INT);
		$consulta->execute();			
		$arrpedido= $consulta->fetchAll(PDO::FETCH_CLASS, "pedido");	
		return $arrpedido;
	}

	public static function BuscarPorLocalTop10($localId)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT pedido.id AS id, producto.nombre AS productoNombre, producto.descripcion AS productoDescripcion, producto.precio AS productoPrecio,
																usuarioCliente.nombre AS usuarioClienteNombre, usuarioEmpleado.nombre AS usuarioEmpleadoNombre, 
														        fechaPedido, fechaEntrega, total, local.sucursal AS localSucursal, estado, 
														        (producto.precio - pedido.total) AS descuento
														FROM `pedido` 
														INNER JOIN producto ON producto.id = pedido.productoId
														INNER JOIN usuario AS usuarioCliente ON usuarioCliente.id = pedido.usuarioClienteId
														LEFT JOIN usuario AS usuarioEmpleado ON usuarioEmpleado.id = pedido.usuarioEmpleadoId
														INNER JOIN local ON local.id = pedido.localId
														WHERE pedido.localId = :localId
														ORDER BY id DESC 
														LIMIT 10");
		$consulta->bindValue(':localId', $localId, PDO::PARAM_INT);
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

	public static function Editar($pedido)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE pedido 
				SET usuarioEmpleadoId=:usuarioEmpleadoId,
					fechaEntrega=:fechaEntrega,
					estado=:estado
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$pedido->id, PDO::PARAM_INT);
			$consulta->bindValue(':usuarioEmpleadoId',$pedido->usuarioEmpleadoId, PDO::PARAM_INT);
			$consulta->bindValue(':fechaEntrega',$pedido->fechaEntrega, PDO::PARAM_STR);
			$consulta->bindValue(':estado',$pedido->estado, PDO::PARAM_INT);
			return $consulta->execute();
	}
	
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
