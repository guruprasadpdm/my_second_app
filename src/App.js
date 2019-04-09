import React, { Component } from 'react';
import StudentTable from './StudentTable'
import StudentDeptChart from './StudentDeptChart'
import StudentYearChart from './StudentYearChart'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        loading: false,
        data : [],
        coldata : []
    }
  }
  
  componentDidMount(){
    this.setState({loading:true})
    let results1 = []
    let results2 =[]
    Promise.all([fetch('http://localhost:9200/students/engineering/_search?pretty&size=22&filter_path=hits.hits._source.name,hits.hits._source.dept,hits.hits._source.year,hits.hits._source.grade'),
    fetch('http://localhost:9200/column/heading/_search?pretty&size=5&filter_path=hits.hits._source.Header,hits.hits._source.accessor')])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([data1,data2]) => {
      results1 = data1['hits']['hits'].map( i =>i['_source'])
      results2 = data2['hits']['hits'].map( j =>j['_source'])
    })
    .then(() => {
      this.setState({
        loading: false,
        data : results1,
        coldata : results2
      })
    })
  }

  render() {
    const styles = {
      color: "#e0dbdd",
      backgroundColor: "#e0dbdd",
      height: 5
    }
    const fields = this.state.loading ? "loading...." : <div>
                                                          <StudentTable datafields = {this.state.data} coldatafields = {this.state.coldata}/>
                                                          <hr style ={styles}></hr>
                                                          <StudentDeptChart datafields = {this.state.data}/>
                                                          <hr style ={styles}></hr>
                                                          <StudentYearChart datafields = {this.state.data}/>  
                                                       </div>;                                                        

    return (
      <div>
        {fields}
      </div> 
    );
  }
}

export default App;