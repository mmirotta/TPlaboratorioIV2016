<?php
require_once"AccesoDatos.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
 	public $correo;
  	public $clave;
  	public $nombre;
  	public $perfil;
  	public $fechaAcceso;
  	public $fechaCreacion;
  	public $foto;
  	public $activo;
  	public $localId;
	public $localNombre;

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function Cargar($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');
		return $usuarioBuscado;	
	}

	public static function Verificar($correo, $clave) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT usuario.id AS id, usuario.correo AS correo, usuario.clave AS clave,
																usuario.nombre AS nombre, usuario.perfil AS perfil, usuario.fechaAcceso AS fechaAcceso,
																usuario.fechaCreacion AS fechaCreacion, usuario.foto AS foto, usuario.activo AS activo,
																usuario.localId AS localId, local.sucursal AS localNombre
														FROM usuario 
														LEFT JOIN local ON local.id = usuario.localId
														WHERE correo =:correo AND clave =:clave AND activo = 1");
		$consulta->bindValue(':correo', $correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $clave, PDO::PARAM_STR);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');
		return $usuarioBuscado;	
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE activo = 1");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrUsuarios;
	}

	public static function BuscarPorPerfil($perfil)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE perfil=:perfil AND activo = 1");
		$consulta->bindValue(':perfil',$perfil, PDO::PARAM_STR);
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrUsuarios;
	}

	public static function Borrar($id)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("DELETE FROM usuario WHERE id=:id");	
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function Editar($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE usuario 
				SET nombre=:nombre,
					correo=:correo,
					activo=:activo
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':correo',$usuario->correo, PDO::PARAM_STR);
			$consulta->bindValue(':activo',$usuario->activo, PDO::PARAM_INT);
			return $consulta->execute();
	}

	public static function EditarAcceso($usuario)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				UPDATE usuario 
				SET fechaAcceso=:fechaAcceso
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
			$consulta->bindValue(':fechaAcceso',$usuario->fechaAcceso, PDO::PARAM_STR);
			return $consulta->execute();
	}

	public static function Guardar($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuario (nombre,
																			 correo,
																			 clave,
																			 perfil,
																			 fechaCreacion,
																			 foto,
																			 localId,
																			 activo) 
																VALUES (:nombre,
																		:correo,
																		:clave,
																		:perfil,
																		:fechaCreacion,
																		:foto,
																		:localId,
																		1)");
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
		$consulta->bindValue(':perfil', $usuario->perfil, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $usuario->foto, PDO::PARAM_STR);
		$consulta->bindValue(':fechaCreacion', $usuario->fechaCreacion, PDO::PARAM_STR);
		$consulta->bindValue(':localId', $usuario->localId, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	

}
