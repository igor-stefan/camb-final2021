export let optionsCO2 = {
    title:
    {
        text: 'Concentração de CO₂',
        align: 'center',
        margin: 12,
        style: { 
            color: '#000000',
        },
    },
    xAxis: {
        type: 'datetime',
        gridLineWidth: 1,
        gridLineDashStyle:'dash',
        gridLineColor: '#000000',
        title:{
            text: 'Tempo',
            margin: 15,
            align: 'middle',
            style: {
                color:'#000000',
                fontSize:'14px'
            },
        },
        labels:{
            style:
                {
                color:'#000000',
                fontSize:'12px',
                },
                rotation: 45,
                align: 'left',
                format: '{value:%H:%M:%S}'
        },
        lineColor:'black',
        minTickInterval: 1,

    },
    yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        plotLines:[
            {
                value: 600,
                width: 2,
                color:'#FFFF00'
            },
            {
                value: 1200,
                width: 2,
                color:'#FF8C00'
            },
            {
                value: 2000,
                width: 2,
                color:'#FF0000'
            },
    ],
        title: {
            text: 'PPM',
            margin: 15,
            align: 'middle',
            style: {
                color:'#000000',
                fontSize:'14px'
            },
        },
        labels:{
            style:
                {
                color:'#000000',
                fontSize:'12px',
                }
        },
        lineColor:'black',
        gridLineWidth: 2,
    },
    plotOptions: {
        series: {
            pointStart: Date.now(),
            pointInterval: 8 * 1000,
            marker: {
                fillColor: '#000000',
                lineWidth: 0,
                radius:4,
                states:{
                    hover:{
                        lineWidthPlus:0,
                        radiusPlus:3,
                        lineColor:'#000000'
                    },
                }
            }
        },
    },
    tooltip:{
        valueSuffix: ' PPM'
    },
    series: [{
        lineColor: '#1d82b8',
        type: 'area',
        name: 'CO₂',
        data: []
    }]
  }