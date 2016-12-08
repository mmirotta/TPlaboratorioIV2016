<?php
require_once"AccesoDatos.php";
class Encuesta
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $calificacion;
 	public $variedad;
 	public $masVariedad;
 	public $facilidad;
 	public $mejorPagina;
 	public $peorPagina;
 	public $tiempoEntrega;
 	public $inconvenientes;
 	public $redesSociales;
 	public $recomendacion;
 	public $representarnos;
 	public $sugerencia;
	public $fechaCreacion;
 	public $usuarioClienteId;

//--------------------------------------------------------------------------------//
//--METODO DE CLASE


	public static function Guardar($encuesta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO encuesta (calificacion, 
																			  variedad, 
																			  masVariedad, 
																			  facilidad, 
																			  mejorPagina, 
																			  peorPagina, 
																			  tiempoEntrega, 
																			  inconvenientes, 
																			  redesSociales, 
																			  recomendacion,
																			  representarnos,
																			  sugerencia,
																			  usuarioClienteId,
																			  fechaCreacion)
														VALUES 	(:calificacion, 
																 :variedad, 
																 :masVariedad, 
																 :facilidad, 
																 :mejorPagina, 
																 :peorPagina, 
																 :tiempoEntrega, 
																 :inconvenientes, 
																 :redesSociales, 
																 :recomendacion,
																 :representarnos,
																 :sugerencia,
																 :usuarioClienteId,
																 :fechaCreacion)");

		$consulta->bindValue(':calificacion',$encuesta->calificacion, PDO::PARAM_STR);
		$consulta->bindValue(':variedad',$encuesta->variedad, PDO::PARAM_STR);
		$consulta->bindValue(':masVariedad',$encuesta->masVariedad, PDO::PARAM_STR);
		$consulta->bindValue(':facilidad',$encuesta->facilidad, PDO::PARAM_STR);
		$consulta->bindValue(':mejorPagina',$encuesta->mejorPagina, PDO::PARAM_STR);
		$consulta->bindValue(':peorPagina',$encuesta->peorPagina, PDO::PARAM_STR);
		$consulta->bindValue(':tiempoEntrega',$encuesta->tiempoEntrega, PDO::PARAM_STR);
		$consulta->bindValue(':inconvenientes',$encuesta->inconvenientes, PDO::PARAM_STR);
		$consulta->bindValue(':redesSociales',$encuesta->redesSociales, PDO::PARAM_STR);
		$consulta->bindValue(':recomendacion',$encuesta->recomendacion, PDO::PARAM_STR);
		$consulta->bindValue(':representarnos',$encuesta->representarnos, PDO::PARAM_STR);
		$consulta->bindValue(':sugerencia',$encuesta->sugerencia, PDO::PARAM_STR);
		$consulta->bindValue(':usuarioClienteId', $encuesta->usuarioClienteId, PDO::PARAM_INT);
		$consulta->bindValue(':fechaCreacion', $encuesta->fechaCreacion, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
	
	

}
