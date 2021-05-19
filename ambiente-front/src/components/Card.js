import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Card.css'

const cor_background = (sit) => {
  // console.log("sit = ", sit);
  let estilos = {};
  switch(sit){
    case "BOM":
      const bom = { backgroundColor: '#3CB371' };
      Object.assign(estilos, bom);
      break;
    case "REGULAR":
      const regular = { backgroundColor: '#FFFF00' };
      Object.assign(estilos, regular);
      break;
    case "RUIM":
      const ruim = { backgroundColor: '#FF8C00' };
      Object.assign(estilos, ruim);
      break;
    case "PÉSSIMO":
      const pessimo = { backgroundColor: '#FF0000' };
      Object.assign(estilos, pessimo);
      break;
    default:
      console.log("ERRO AO DEFINIR SITUAÇÃO DO POLUENTE");
      const indefinido = { backgroundColor: '#6A5ACD' };
      Object.assign(estilos, indefinido);
  }
  // console.log("estilos = ", estilos);
  return estilos;
}

const Card = ({title, ppmValue, ugm3Value, situacao, pol}) => {
      return(
        <div className="card br3 mt1 mb1 bw2 mr1 mr1 pl1 pr1 center">
              <div className="w-100 br3 mb0 dib v-mid cardHeader">
                  <h3>{title}</h3>
                  <div className = "indicative" style = {cor_background(situacao)}>
                  {situacao}
                  </div>
                  <Tabs defaultIndex = {0} className = "br3 br--bottom" style = {cor_background(situacao)}>
                    <TabList>
                      <Tab className = "f5 w-50 br0 pa2 button-a">PPM</Tab>
                      <Tab className = "f5 w-50 br0 pa2 button-a">ug/m³</Tab>
                    </TabList>
                    <div className = "v-mid dib mt0" style = {{padding: '1.25rem', color: 'black'}}>
                      <TabPanel>{ppmValue} PPM</TabPanel>
                      <TabPanel>{ugm3Value} ug/m³</TabPanel>
                    </div>
                  </Tabs>
                  </div>
          </div>
      )
    }

export default Card;