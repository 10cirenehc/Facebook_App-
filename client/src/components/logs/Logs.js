import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/sensorAction';

class Logs extends Component{

    componentDidMount(){
        this.props.getLogs();
    }
    render(){

        const { logs } = this.props.logs;

        const myLogs = logs.map(log => {
             <tr>
                <td>log.sensorId</td>
                <td>log.time</td>
                <td>log.user</td>
                <td>log.label</td>
            </tr>

        });
        return (
            <div>
                <table>
                    <tr>
                        <th>Sensor Id</th>
                        <th>Time</th>
                        <th>User</th>
                        <th>Label</th>
                    </tr>
                    { myLogs }
                </table>
            </div>
        );
    }



}

Logs.PropTypes ={
   logs: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired
};

export default Logs;

