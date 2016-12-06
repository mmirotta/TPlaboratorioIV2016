angular
  .module('indumentariaABCS')
  .controller('GraficoDCNCtrl', function($scope, $state, $auth) {

  	$scope.graficos = ['divGrafico','divGrafico1','divGrafico2','divGrafico3','divGrafico4','divGrafico5','divGrafico6'];
  	$scope.dias = ['31/10','01/11','02/11','03/11','04/11','05/11','06/11'];
  	$scope.porcentajeComunico = [90.7, 90.5, 90.7, 90.3, 90, 76, 66.1];
  	$scope.porcentajeNoComunico = [9.7, 9.5, 9.3, 9.7, 10, 24, 44.9];

	for (var i = 0; i <= 6; i++) {
		Highcharts.chart($scope.graficos[i], {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        title: {
            text: 'Actividad ' + $scope.dias[i],
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Comunico',
            borderColor: Highcharts.getOptions().colors[0],
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: $scope.porcentajeComunico[i]
            }]
        }, {
            name: 'No Comunico',
            borderColor: Highcharts.getOptions().colors[1],
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '75%',
                innerRadius: '75%',
                y: $scope.porcentajeNoComunico[i]
            }]
        }]
    },
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[1].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[1].group);
    });
	};

  }).controller('VentasPorLocalCtrl', function($scope, $state, $auth, $timeout, jwtHelper, FactoryEstadisticas) {
    try
    {
        $scope.resultado = {};
        $scope.resultado.ver = false;
        $scope.cantidad = [];
        $scope.local = [];

        if ($auth.isAuthenticated())
        {
            $scope.usuario = jwtHelper.decodeToken($auth.getToken());
            $scope.usuario.logeado = true;
        }
        else
        {
        $state.go("inicio");
        }


        FactoryEstadisticas.BuscarVentasPorLocal().then(
        function(respuesta) {   
            $scope.ListadoVentas = respuesta;
          },function(error) {
            $scope.ListadoVentas= [];
        });

        $timeout(function() {
            $scope.ListadoVentas.forEach(function(venta){
                $scope.cantidad.push(venta.cantidad);
                $scope.local.push(venta.localNombre);
            });

            Highcharts.chart('divGrafico', {
                chart: {
                type: 'column',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 25,
                    depth: 70
                }
            },
            title: {
                text: 'Ventas por Local'
            },
            subtitle: {
                text: 'Cantidad de ventas que realizo cada local'
            },
            plotOptions: {
                column: {
                    depth: 25
                }
            },
            xAxis: {
                categories: $scope.local
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: [{
                name: 'Ventas',
                data: $scope.cantidad
            }]
            });
        }, 1000); 
    }
    catch(error)
    {
      console.info(error);
      $scope.resultado.estilo = "alert alert-danger";
      $scope.resultado.mensaje = "Error en el controlador producto.";
    }
  });
