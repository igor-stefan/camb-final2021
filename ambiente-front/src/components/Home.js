import React from 'react'
import Card from './Card.js'
import MyChart from './MyChart.js'

const verificar_situacao = (ppmValue) => {
    if(ppmValue < 600)
      return "BOM";
    if(ppmValue < 1200)
      return "REGULAR";
    if(ppmValue < 2000)
      return "RUIM";
    return "PÉSSIMO";
}

const Home = ({dados, co2Graph}) => {
    return(
    <div>
          <Card 
            title={'CO₂'} 
            ppmValue = {dados.ppm}
            ugm3Value = {dados.ugm3}
            situacao = {verificar_situacao(dados.ppm)} 
            pol = "co2"
          />
        <div className = "Live">
        <div>
         <MyChart
            id = "home_co2"
            newSeries = {co2Graph.series[0].data}
            optionsDefault = {co2Graph}
        />
        </div>
        </div>
      </div>
    )
}

export default Home;