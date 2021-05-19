import React, {Component} from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import './App.css';
import {optionsCO2} from './Opcoes_grafico'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// console.log('Options = ', optionsCO);

class App extends Component{
  constructor(){
    super();
    this.state = {
      dados: {
       ppm: 0,
       ugm3: 0
      },
      co2Graph: optionsCO2,
    }
  }

  alterar_padrao(obj){
    this.setState({dados: obj})
  }
  alterar_opcoes_graph(obj){
    optionsCO2.series[0].data.push([Date.now(), obj.ppm]);
    this.setState({
      co2Graph: optionsCO2
    })
  }

  componentDidMount() {
   // cria a conexão persistente
   this.source = new EventSource('http://camb-servidor.herokuapp.com/startsend');
   // define um evento que é executado quando o servidor envia uma mensagem
  this.source.onmessage =  event => {
    console.log("DADOS RECEBIDOS APÓS NOVO POST NO SERVIDOR SOURCE1");
    let k = event.data;
    console.log('evento = ', k);
    k = JSON.parse(k);
    console.log(k);
    this.alterar_padrao(k);
    this.alterar_opcoes_graph(k);
  }
  this.source.onopen = function() {
    console.log("CONEXAO INICIADA SOURCE1");
  };
  this.source.onerror = function() {
    console.log("OCORREU ALGUM ERRO, VERIFIQUE A COMUNICAÇÃO SOURCE1");
  };
}

componentWillUnmount() {
  this.source.close();
}
  render(){
    return (
      <BrowserRouter>
          <Navigation/>
        <div className = "App" >
        <Routes>
          <Route path = "/" element = {<Home
                                        dados = {this.state.dados}
                                        co2Graph = {this.state.co2Graph}
                                        />}/>                                       
        </Routes>
        </div>
    </BrowserRouter>
    )
  } 
}

export default App;
