import React, { useState} from "react";
import Chart from 'react-apexcharts';
  

const Chart3 = () => {

    const opt = {
        chart: {
            height: '50%',
            width:'70%',
            type: 'bar',
            foreColor:'#777',
            events: {
              click: function(chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          theme: {
            monochrome: {
                enabled: true,
                color: '#F94336',
                shadeTo: 'light',
                shadeIntensity: 0.65
            }
          },
          title: {
            text: "Nombre de Commandes / categorie"
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: [
              ['Pneus', 'Auto'],
              ['Pneus', 'Moto'],
              ['Pneus', 'Pds Lourds'],
              ['Pneus', 'Hiver'],
              ['Pneus', '4x4']
            ],
            labels: {
              style: {
                colors: '#999',
                fontSize: '12px'
              }
            }
    }}
    
    const ser = [{
        name:'Commandes',
        data: [48, 77, 37, 25, 30]
      }];

    const [options, setOptions] = useState(opt);
    const [series, setSeries] = useState(ser);
    return(
        <Chart
           options={options}
           series={series}
           type='bar'
           height={200}
        />
    )
}

export default Chart3;