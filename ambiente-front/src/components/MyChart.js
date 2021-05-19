import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

class LineChart extends Component{
  constructor(props) {
    super(props);
    this.state = {
      len: 0,
      // To avoid unnecessary update keep all options in the state.
      chartOptions: this.props.optionsDefault
    }
  }
 
  updateSeries = () => {
    // The chart is updated only with new options.
    this.setState(prevState => {
      let chartOptions = Object.assign({}, prevState.chartOptions);
      chartOptions.series[0].data = this.props.newSeries;
      return { chartOptions }
    });
  }

  componentDidMount(){
    //new series recebe o vetor atualizado, seu tamanho é um elemento a mais que o vetor series do grafico
    //state len guarda o tamanho do vetor series do grafico
    // console.log("state len = ", this.state.len, " new series len = ", this.props.newSeries.length);
    
    this.interval = setInterval(() => {
      if(this.state.len < this.props.newSeries.length){
          this.updateSeries();
          this.setState({
            len: this.props.newSeries.length
          })
      }    
    }, 1000);
    // console.log("id = ", this.props.id)
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }
 
  render() {
    return(
      <div>
        <HighchartsReact
          id = {this.props.id}
          highcharts = {Highcharts}
          constructorType = {'chart'}
          options = {this.state.chartOptions}
        />
      </div>
    );
  }
}
export default LineChart;