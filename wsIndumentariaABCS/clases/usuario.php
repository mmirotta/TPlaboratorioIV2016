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

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetCorreo()
	{
		return $this->correo;
	}
	public function GetClave()
	{
		return $this->clave;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetPerfil()
	{
		return $this->perfil;
	}
	public function GetFechaAcceso()
	{
	return $this->fechaAcceso;
	}
	public function GetFechaCreacion()
	{
	return $this->fechaCreacion;
	}


	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetCorreo($valor)
	{
		$this->correo = $valor;
	}
	public function SetClave($valor)
	{
		$this->clave = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetPerfil($valor)
	{
		$this->perfil = $valor;
	}
	public function SetFechaAcceso($valor)
	{
		$this->fechaAcceso = $valor;
	}
	public function SetFechaCreacion($valor)
	{
		$this->fechaCreacion = $valor;
	}


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
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE correo =:correo AND clave =:clave AND activo = 0");
		$consulta->bindValue(':correo', $correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $clave, PDO::PARAM_STR);
		$consulta->execute();
		$usuarioBuscado= $consulta->fetchObject('usuario');
		return $usuarioBuscado;	
					
	}
	
	public static function Buscar()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE activo = 0");
		$consulta->execute();			
		$arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
		return $arrUsuarios;
	}

	public static function BuscarPorPerfil($perfil)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuario WHERE perfil=:perfil AND activo = 0");
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
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuario (nombre,correo,clave,perfil,fechaCreacion,foto) 
														VALUES(:nombre,:correo,:clave,:perfil,:fechaCreacion,:foto)");
		$consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':correo', $usuario->correo, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $usuario->clave, PDO::PARAM_STR);
		$consulta->bindValue(':perfil', $usuario->perfil, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $usuario->foto, PDO::PARAM_STR);
		$consulta->bindValue(':fechaCreacion', $usuario->fechaCreacion, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	

}
