import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { createProfile, getCurrentProfile } from '../../actions/profileAction';
import isEmpty from '../../validation/is-empty';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';

class EditProfile extends Component {
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

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors });
        }
        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            // If profile field doesn't exist, make empty string
            profile.highschool = !isEmpty(profile.highschool) ? profile.highschool : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

            // Set component fields state
            this.setState({
                handle: profile.handle,
                highschool: profile.highschool,
                website: profile.website,
                location: profile.location,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram
            });
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
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Edit Profile</h1>
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

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));