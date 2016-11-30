<?php
require_once"AccesoDatos.php";
class Oferta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $productoId;
	public $productoNombre;
 	public $productoDescripcion;
  	public $productoPrecio;
  	public $productoFoto;
  	public $descuento;
  	public $precioFinal;
  	public $vigente;
  	public $usuarioEmpleadoId;
  	public $usuarioEmpleadoNombre;


//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function Cargar($id) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM oferta WHERE id =:id");
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$ofertaBuscada= $consulta->fetchObject('oferta');
		return $ofertaBuscado;	
					
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT oferta.id AS id, producto.id AS productoId, producto.nombre AS productoNombre, producto.descripcion, 
																producto.precio AS productoPrecio, oferta.descuento AS descuento, usuario.nombre as usuarioEmpleadoNombre,
																producto.fotoPrincipal AS productoFoto, (producto.precio - oferta.descuento) AS precioFinal
														FROM oferta
														INNER JOIN producto ON producto.id = oferta.productoId
														INNER JOIN usuario ON usuario.id = oferta.usuarioEmpleadoId");
		$consulta->execute();			
		$arrOferta= $consulta->fetchAll(PDO::FETCH_CLASS, "oferta");	
		return $arrOferta;
	}

	public static function BuscarTop5()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT oferta.id AS id, producto.id AS productoId, producto.nombre AS productoNombre, producto.descripcion, 
																producto.precio AS productoPrecio, oferta.descuento AS descuento, usuario.nombre as usuarioEmpleadoNombre,
																producto.fotoPrincipal AS productoFoto, (producto.precio - oferta.descuento) AS precioFinal
														FROM oferta
														INNER JOIN producto ON producto.id = oferta.productoId
														INNER JOIN usuario ON usuario.id = oferta.usuarioEmpleadoId
														ORDER BY oferta.id DESC
														LIMIT 5");
		$consulta->execute();			
		$arrOferta= $consulta->fetchAll(PDO::FETCH_CLASS, "oferta");	
		return $arrOferta;
	}
	
	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE oferta SET vigente = 0 WHERE id=:id");	
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Guardar($oferta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO oferta (productoId,
																			  descuento,
																			  usuarioEmpleadoId,
																			  vigente)
														VALUES (:productoId,
															    :descuento,
															    :usuarioEmpleadoId,
																1)");
		$consulta->bindValue(':productoId',$oferta->productoId, PDO::PARAM_INT);
		$consulta->bindValue(':descuento', $oferta->descuento, PDO::PARAM_STR);
		$consulta->bindValue(':usuarioEmpleadoId', $oferta->usuarioEmpleadoId, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
