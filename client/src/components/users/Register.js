import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from "../../actions/authAction";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(event) {
        event.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Summer Friends account</p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextFieldGroup type="name" placeholder="Name" name="name"
                                                    value={this.state.name} onChange={this.onChange} error={errors.name}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextFieldGroup type="email" placeholder="Email Address" name="email"
                                                    value={this.state.email} onChange={this.onChange} error={errors.email}
                                    />
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email
                                    </small>
                                </div>
                                <div className="form-group">
                                    <TextFieldGroup type="password" placeholder="Password" name="password"
                                                    value={this.state.password} onChange={this.onChange} error={errors.password}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextFieldGroup type="password" placeholder="Confirm password" name="password2"
                                                    value={this.state.password2} onChange={this.onChange} error={errors.password2}
                                    />
                                </div>
                                <input type="submit"
                                       className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));