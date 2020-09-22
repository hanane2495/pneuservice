import React, { useState} from "react";
import Chart from 'react-apexcharts';
  

const Chart2 = () => {

    const opt = {
        chart: {
            width: '50%',
            type: 'pie',
            foreColor:'#777',
          },
          labels: ["Pneus Auto", "Pneus Moto", "Pneu Poids lourds"],
          theme: {
            monochrome: {
                enabled: true,
                color: '#F94336',
                shadeTo: 'light',
                shadeIntensity: 0.65
            }
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -5
              }
            }
          },
          title: {
            text: "Nombre de ventes / categorie"
          },
          dataLabels: {
            formatter(val, opts) {
              const name = opts.w.globals.labels[opts.seriesIndex]
              return [name, val.toFixed(1) + '%']
            }
          },
          legend: {
            show: true
          }
         
        }
    
    const ser = [158,59,28]

    const [options, setOptions] = useState(opt);
    const [series, setSeries] = useState(ser);
    return(
        <Chart
           options={options}
           series={series}
           type="pie" 
           height={200}
        />
    )
}

export default Chart2;