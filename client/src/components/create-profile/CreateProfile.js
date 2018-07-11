import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { createProfile }from '../../actions/profileAction';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            highschool: '',
            website: '',
            location: '',
            bio: '',
            githubusername: '',
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



    onSubmit(event) {
        event.preventDefault();

        const profileData = {
            handle: this.state.handle,
            highschool: this.state.highschool,
            website : this.state.website,
            location: this.state.location,
            bio: this.state.bio,
            githubusername: this.state.githubusername,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube:this.state.youtube,
            instagram: this.state.instagram,
            errors: this.state.errors


        };

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    render(){
        const { errors } = this.state;
        return (
            <div className="createProfile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Profile</h1>
                            <p className="lead text-center">Create your Profile</p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup type="handle" placeholder="Profile handle" name="handle"
                                                value={this.state.handle} onChange={this.onChange} error={errors.handle}/>

                                <TextFieldGroup type="highschool" placeholder="Your Highschool" name="highschool"
                                                value={this.state.highschool} onChange={this.onChange} error={errors.highschool}
                                />
                                <TextFieldGroup type="website" placeholder="Website" name="website"
                                                value={this.state.website} onChange={this.onChange} error={errors.website}/>

                                <TextFieldGroup type="location" placeholder="Your Location" name="location"
                                                value={this.state.location} onChange={this.onChange} error={errors.location}/>

                                <TextAreaFieldGroup type="bio" placeholder="Your Bio" name="bio"
                                                value={this.state.bio} onChange={this.onChange} error={errors.bio}/>

                                <TextFieldGroup type="githubusername" placeholder="Your GitHub username" name="githubusername"
                                                value={this.state.handle} onChange={this.onChange} error={errors.handle}/>

                                <InputGroup icon="fab fa-twitter" type="twitter" placeholder="Twitter" name="twitter"
                                            value={this.state.twitter} onChange={this.onChange} error={errors.twitter}/>

                                <InputGroup icon="fab fa-facebook" type="facebook" placeholder="Facebook" name="facebook"
                                            value={this.state.facebook} onChange={this.onChange} error={errors.facebook}/>

                                <InputGroup icon="fab fa-linkedin" type="linkedin" placeholder="LinkedIn" name="linkedin"
                                            value={this.state.linkedin} onChange={this.onChange} error={errors.linkedin}/>

                                <InputGroup icon="fab fa-youtube" type="youtube" placeholder="Youtube" name="youtube"
                                            value={this.state.youtube} onChange={this.onChange} error={errors.youtube}/>

                                <InputGroup icon="fab fa-instagram" type="instagram" placeholder="Instagram" name="instagram"
                                            value={this.state.instagram} onChange={this.onChange} error={errors.instagram}/>

                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(CreateProfile) ;
