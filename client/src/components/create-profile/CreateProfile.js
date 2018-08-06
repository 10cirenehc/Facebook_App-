import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { createProfile } from '../../actions/profileAction';

import InputGroup from '../common/InputGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            highschool: '',
            website: '',
            location: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors });
        }
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        const profileData = {
            handle: this.state.handle,
            highschool: this.state.highschool,
            website: this.state.website,
            location: this.state.location,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };

        this.props.createProfile(profileData, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    name="handle"
                                    placeholder="* Profile Handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your fullname, company name, nickname "
                                />
                                <TextFieldGroup
                                    name="highschool"
                                    placeholder="High School"
                                    value={this.state.highschool}
                                    onChange={this.onChange}
                                    error={errors.highschool}
                                    info="Where do you study?"
                                />
                                <TextFieldGroup
                                    name="website"
                                    placeholder="Website"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info="Could be your own website or a company one"
                                />
                                <TextFieldGroup
                                    name="location"
                                    placeholder="Location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Davis, CA)"
                                />
                                <TextFieldGroup
                                    name="githubusername"
                                    placeholder="Github Username"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info="If you want your latest repos and Github link, include your username"
                                />
                                <TextAreaFieldGroup
                                    name="bio"
                                    placeholder="Short Bio"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                />
                                <div>
                                    <InputGroup
                                        placeholder="Twitter Profile URL"
                                        name="twitter"
                                        icon="fab fa-twitter"
                                        value={this.state.twitter}
                                        onChange={this.onChange}
                                        error={errors.twitter}
                                    />
                                    <InputGroup
                                        placeholder="Facebook Profile URL"
                                        name="facebook"
                                        icon="fab fa-facebook"
                                        value={this.state.facebook}
                                        onChange={this.onChange}
                                        error={errors.facebook}
                                    />
                                    <InputGroup
                                        placeholder="Linkedin Profile URL"
                                        name="linkedin"
                                        icon="fab fa-linkedin"
                                        value={this.state.linkedin}
                                        onChange={this.onChange}
                                        error={errors.linkedin}
                                    />
                                    <InputGroup
                                        placeholder="Youtube Profile URL"
                                        name="youtube"
                                        icon="fab fa-youtube"
                                        value={this.state.youtube}
                                        onChange={this.onChange}
                                        error={errors.youtube}
                                    />
                                    <InputGroup
                                        placeholder="Instagram Profile URL"
                                        name="instagram"
                                        icon="fab fa-instagram"
                                        value={this.state.instagram}
                                        onChange={this.onChange}
                                        error={errors.instagram}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));