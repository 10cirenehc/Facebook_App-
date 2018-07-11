import React , {Component} from 'react';
import classnames from 'classnames';

import PropTypes  from 'prop-types';

import { connect } from 'react-redux';

import {registerSensor} from "../../actions/authAction";
import {withRouter} from "react-router-dom";

class SensorReg extends Component {

    constructor() {
        super();
        this.state = {
            sensorId:'',
            label: '',
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const newSensor = {
            sensorId: this.state.sensorId,
            label: this.state.label
        };
        this.props.registerSensor(newSensor, this.props.history);
    }

    render()
    {
        const {errors} =  this.state;
        return(
            <div>
                <h1>Sensor Registration</h1>


                <div className="Sensor Registration">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sensor Registration</h1>
                                <p className="lead text-center">Register your motion sensor</p>
                                <form noValidate onSubmit={this.onSubmit}>

                                    <div className="form-group">
                                        <div className="form-group">
                                            <input type="text"
                                                   className={classnames('form-control form-control-lg', {'is-invalid': errors.sensorId})}
                                                   placeholder="Sensor ID number"
                                                   name="sensorId"
                                                   value={this.state.sensorId}
                                                   onChange={this.onChange}
                                            />
                                            {errors.sensorId && (<div className="invalid-feedback">{errors.sensorId}</div>)}

                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <div className="form-group">
                                            <input type="text"
                                                   className={classnames('form-control form-control-lg', {'is-invalid': errors.label})}
                                                   placeholder="Location of the Sensor"
                                                   name="label"
                                                   value={this.state.label}
                                                   onChange={this.onChange}
                                            />
                                            {errors.label && (<div className="invalid-feedback">{errors.label}</div>)}

                                        </div>
                                    </div>



                                    <input type="submit" className="btn btn-info btn-block mt-4"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

SensorReg.propTypes = {
    registerSensor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerSensor })(withRouter(SensorReg));

//how to add the user field???