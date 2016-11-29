<?php
require_once"AccesoDatos.php";
class Local
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
 	public $direccion;
 	public $numero;
  	public $localidad;
  	public $provincia;
  	public $longitud;
	public $latitud;
	public $foto;
	public $sucursal;
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function Cargar($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM local WHERE id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$localBuscado= $consulta->fetchObject('local');
		return $localBuscado;	
	}

	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM local");
		$consulta->execute();			
		$arrLocales= $consulta->fetchAll(PDO::FETCH_CLASS, "local");	
		return $arrLocales;
	}
	
	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM local WHERE id=:id");	
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function Editar($local)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE local 
				SET direccion=:direccion,
					numero=:numero,
					localidad=:localidad,
					provincia=:provincia,
					latitud=:latitud,
					longitud=:longitud
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$local->id, PDO::PARAM_INT);
			$consulta->bindValue(':direccion',$local->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':numero',$local->numero, PDO::PARAM_INT);
			$consulta->bindValue(':localidad',$local->localidad, PDO::PARAM_STR);
			$consulta->bindValue(':provincia',$local->provincia, PDO::PARAM_STR);
			$consulta->bindValue(':latitud',$local->latitud, PDO::PARAM_STR);
			$consulta->bindValue(':longitud',$local->longitud, PDO::PARAM_STR);
			return $consulta->execute();
	}

	public static function Guardar($local)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO local (direccion,numero,localidad,provincia,latitud,longitud,foto,sucursal) 
																VALUES(:direccion,:numero,:localidad,:provincia,:latitud,:longitud,:foto,:sucursal)");
		$consulta->bindValue(':direccion',$local->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':numero',$local->numero, PDO::PARAM_INT);
		$consulta->bindValue(':localidad',$local->localidad, PDO::PARAM_STR);
		$consulta->bindValue(':provincia',$local->provincia, PDO::PARAM_STR);
		$consulta->bindValue(':latitud',$local->latitud, PDO::PARAM_STR);
		$consulta->bindValue(':longitud',$local->longitud, PDO::PARAM_STR);
		$consulta->bindValue(':foto',$local->foto, PDO::PARAM_STR);
		$consulta->bindValue(':sucursal',$local->sucursal, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	

}
