
import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class StudentTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : props.datafields,
            coldata : props.coldatafields
        }
    }

    render() {
        const styles = {
            paddingLeft:25,
            paddingRight:25,
            paddingTop:30,
            paddingBottom:50
        }
        return (
            <div style ={styles}>
                <ReactTable 
                className ="-highlight" 
                data={this.state.data} 
                columns={this.state.coldata} 
                defaultPageSize = {5}
                pageSizeOptions = {[5,10,20]}
                />
            </div>  
        );
    }
}

export default StudentTable;