<?php
require_once"AccesoDatos.php";
class Producto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $descripcion;
  	public $precio;
  	public $foto;
  	public $vigente;


//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function Cargar($id) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM producto WHERE id =:id");
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$productoBuscado= $consulta->fetchObject('producto');
		return $productoBuscado;	
					
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM producto WHERE vigente = 0");
		$consulta->execute();			
		$arrProducto= $consulta->fetchAll(PDO::FETCH_CLASS, "producto");	
		return $arrProducto;
	}
	
	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM producto WHERE id=:id");	
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function Editar($producto)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE producto 
				SET nombre=:nombre,
					descripcion=:descripcion,
					precio=:precio,
					vigente=:vigente
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$producto->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':precio',$producto->precio, PDO::PARAM_STR);
			$consulta->bindValue(':vigente',$producto->vigente, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function Guardar($producto)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO producto (nombre,descripcion,precio,foto)
														VALUES (:nombre,:descripcion,:precio,:foto)");
		$consulta->bindValue(':nombre',$producto->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':descripcion',$producto->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $producto->precio, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $producto->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

}
