let graph_drawn = false;
let donut_graph;
let barra_graph;
document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("grafica").addEventListener("click",choose_data);
});
//Uso esta function se limpia la grafica que aparece al seleccionar las otras opciones.
function clear_data() {
    document.getElementById("donut").innerHTML = null;
    document.getElementById("barra").innerHTML = null;
    if (donut_graph) {
        donut_graph.destroy();
        donut_graph = null;
    }
    if (barra_graph) {
        barra_graph.destroy();
        barra_graph = null;
    }
}
//Con function al seleccionar una de las opciones se verifica y ejecuta esa grafica.
function choose_data() {
    const chosen = document.getElementById("selector_datos").value;
    if(graph_drawn){
        clear_data();
        graph_drawn = false;
    }
    if(chosen == "senadores") {
        fetch('/json/role.json')
    .then((response) => response.json())
    .then((json) => process_data_role(json));
    if(!graph_drawn){
        graph_drawn = true;
    }
    } else if(chosen == "nobel") {
        fetch('/json/nobel.json')
    .then((response) => response.json())
    .then((json) => process_data_nobel(json));
    if(!graph_drawn){
        graph_drawn = true;
    }
    }
    
}
//Esta function se usa para procesar los datos json de los premios nobel.
function process_data_nobel(json_data) {
    let countries = [];
    let countries_count = [];
    let country;
    let aux;
    //Con este for se registran los 1000 primeros premios nobel y filtra para escoger los de economia.
    for(let i = 0; i < 1000; i++) {
        if(json_data.laureates[i].prizes[0].category == "economics"){
        country = json_data.laureates[i].bornCountry;
        //Si el pais ya esta en el array hace que se incremente su contador, en el caso que no este lo agrega a la lista.
        if(countries.includes(country)) {
            aux = countries.findIndex((el) => el == country);
            countries_count[aux]++;
        } else {
            countries.push(country);
            countries_count.push(1);
        }
        }
    }
    //Con el options_barra se configura el grafico de barras para los premios nobel.
    let options_barra = {
        series: [{
            data: countries_count
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        title: {
            text: "Nóbeles en economía",
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '30px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  '#263238'
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
                distributed: true,

            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: countries,
        },    responsive: [
            {
                breakpoint: 1200,
                options: {
                    chart: {
                        height: 400,
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    },
                    title: {
                        style: {
                            fontSize: '26px',
                        }
                    }
                }
            },
            {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 300,
                    },
                    title: {
                        style: {
                            fontSize: '22px',
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    }
                }
            },
            {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 250,
                    },
                    title: {
                        style: {
                            fontSize: '18px',
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    }
                }
            }
        ]
    };
//Con el options_donut se configura el grafico de donut para los premios nobel.
    let options_donut = {
        series: countries_count,
        chart: {
        type: 'donut',
        distributed: true,

    
    },
    title: {
        text: "Nóbeles en economía",
        align: 'center',
        margin: 10,
        offsetX: -120,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '30px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
    },
    
      labels: countries,
      responsive: [
        {
            breakpoint: 1200,
            options: {
                chart: {
                    height: 400,
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                title: {
                    style: {
                        fontSize: '26px',
                    }
                }
            }
        },
        {
            breakpoint: 768,
            options: {
                chart: {
                    height: 300,
                },
                title: {
                    style: {
                        fontSize: '22px',
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                }
            }
        },
        {
            breakpoint: 480,
            options: {
                chart: {
                    height: 250,
                },
                title: {
                    style: {
                        fontSize: '18px',
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                }
            }
        }
    ]
      };

    donut_graph = new ApexCharts(document.getElementById("donut"), options_donut);
    donut_graph.render();
    
    barra_graph = new ApexCharts(document.getElementById("barra"), options_barra);
    barra_graph.render();
}

//Esta function se usa para procesar los datos json de los democratas y republicanos.
function process_data_role(json_data) {
    let democrats = 0;
    let republicans = 0;
    for(let i = 0; i < 100; i++){
        if(json_data.objects[i].party == "Democrat") {
            democrats++;
        } else {
            republicans++;
        }
    }
//Con el options_barra se configura el grafico de barras para los democratas y republicanos.
    let options_barra = {
        series: [{
            data: [democrats,republicans]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horitontal: true,
                distributed: true,
            }
        },
        title: {
            text: "Senadores de EEUU",
            align: 'center',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '30px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  '#263238'
            },
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Democrats', 'Republicans'],
        }
    };
//Con el options_donut se configura el grafico de barras para los democratas y republicanos.
    let options_donut = {
        series: [democrats, republicans],
        chart: {
        type: 'donut',
      },
      labels: [
        "Democrats",
        "Republicans",
      ],
      title: {
        text: "Senadores de EEUU",
        align: 'center',
        margin: 10,
        offsetX: -70,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '30px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
    },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
      };
//Se crean las graficas usandose ApexCharts y se renderizan.
    donut_graph = new ApexCharts(document.getElementById("donut"), options_donut);
    donut_graph.render();
    
    barra_graph = new ApexCharts(document.getElementById("barra"), options_barra);
    barra_graph.render();
}