import React , {Component} from 'react';
import classnames from 'classnames';

import PropTypes  from 'prop-types';

import * as d3 from "d3";

class SensorDisp extends Component {
    render(){
        return(

            <div>

            <h1>Sensor Logs</h1>

                <table>
                    <tr>
                        <th>Sensor ID</th>
                        <th>Location</th>
                        <th>Time</th>
                    </tr>
                    <tr>
                        <th>4</th>
                        <th>Living room</th>
                        <th>16:40</th>
                    </tr>
                </table>
            </div>
        )


    }
}

export default SensorDisp