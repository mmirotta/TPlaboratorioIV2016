<?php
require_once"AccesoDatos.php";
class Estadisticas
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $localId;
 	public $cantidad;
 	public $localNombre;

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
	
	

}
