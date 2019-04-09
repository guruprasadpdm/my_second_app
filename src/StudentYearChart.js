import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class StudentYearChart extends Component {
    constructor(props){
      super(props);
      this.state = {
          data : props.datafields,
          yeargraphdata : [{
              "year": "2019",
              "total": 0
          },
          {
              "year": "2018",
              "total": 0
          }]
      }
  }

    componentDidMount() {
        let cnt1 =0,cnt2 =0;
        this.setState({loading:true})
        let results = this.state.data.map(function(i) {
            if(i.year === "2019"){
            cnt1 = cnt1+1;
            } 
            else if(i.year === "2018"){
                cnt2 = cnt2+1;
            }
            return i;
        })
        var stateCopy = Object.assign({}, this.state);
        stateCopy.yeargraphdata = stateCopy.yeargraphdata.slice();
        stateCopy.yeargraphdata[0] = Object.assign({}, stateCopy.yeargraphdata[0]);
        stateCopy.yeargraphdata[0].total = this.state.yeargraphdata[0].total + cnt1;
        stateCopy.yeargraphdata[1] = Object.assign({}, stateCopy.yeargraphdata[1]);
        stateCopy.yeargraphdata[1].total = this.state.yeargraphdata[1].total + cnt2;
        this.setState(stateCopy);
  
        var chart = am4core.create("chartdiv1", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.state.yeargraphdata
        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";
        this.chart = chart;

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "total";
        pieSeries.dataFields.category = "year";
        pieSeries.colors.step = 3;
    }

    componentDidUpdate(oldProps,oldState) {
        if ((oldState.yeargraphdata !== this.state.yeargraphdata) || (oldProps.datafields !== this.state.datafields)) {
        this.chart.data = this.state.yeargraphdata
        }
    }

  render() {
    return (
      <div>
         <div id="chartdiv1" style={{ width: "75%", height: "250px" }}></div>
      </div> 
    );
  }
}

export default StudentYearChart;