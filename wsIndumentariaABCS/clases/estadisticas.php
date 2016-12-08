<?php
require_once"AccesoDatos.php";
class Estadisticas
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $localId;
 	public $cantidad;
 	public $localNombre;
 	public $usuarioEmpleadoNombre;

//--------------------------------------------------------------------------------//
//--METODO DE CLASE


	public static function BuscarVentasPorLocal()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT COUNT(pedido.id) AS cantidad, local.sucursal AS localNombre
														FROM pedido
														INNER JOIN local ON pedido.localId = local.id
														WHERE pedido.estado = 'Entregado'
														GROUP BY localId, local.sucursal");
		$consulta->execute();			
		$arrLocales= $consulta->fetchAll(PDO::FETCH_CLASS, "estadisticas");	
		return $arrLocales;
	}
	
	public static function BuscarVentasPorLocalYUsuario($localId)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT COUNT(pedido.id) AS cantidad, local.sucursal AS localNombre, usuario.nombre AS usuarioEmpleadoNombre
														FROM pedido
														INNER JOIN local ON pedido.localId = local.id
														INNER JOIN usuario ON pedido.usuarioEmpleadoId = usuario.id
														WHERE pedido.estado = 'Entregado' AND pedido.localId = :localId
														GROUP BY local.sucursal, usuario.nombre");
		$consulta->bindValue(':localId', $localId, PDO::PARAM_INT);
		$consulta->execute();			
		$arrLocales= $consulta->fetchAll(PDO::FETCH_CLASS, "estadisticas");	
		return $arrLocales;
	}
	

}
