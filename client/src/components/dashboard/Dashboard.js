import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';


import {getCurrentProfile } from '../../actions/profileAction';
import {deleteAccount} from '../../actions/profileAction';
import CreateProfile from "../create-profile/CreateProfile";

class Dashboard extends Component {

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.getCurrentProfile();
        }
    }

    onDeleteClick(event){
        this.props.deleteAccount();
    }

    render(){
            const { user } = this.props.auth;
            const { profile, loading } = this.props.profile;
            let dashboardContent;
            if(profile === null || loading) {
                dashboardContent = <Spinner />;
            } else {
                // Check if logged in user has profile data
                if(Object.keys(profile).length > 0){
                    dashboardContent = (
                        <div>
                            <p className="lead text-muted">
                                Welcome <Link to={`/profile/${profile.handle}`} > { user.name } </Link>
                            </p>
                            <div>
                                <div className="btn-group mb-4" role="group">
                                    <Link to="/edit-profile" className="btn btn-light">
                                        <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
                                </div>
                            </div>
                            <div style={{marginBottom: '60px'}}>
                                <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)} >
                                    Delete my account
                                </button>
                            </div>

                            <Link to="/logs" className="btn btn-lg btn-light">View Sensor Logs</Link>

                        </div>
                    );
                } else {
                    // user is logged in but has no profile
                    dashboardContent = (
                        <div>
                            <p className="lead text-muted">Welcome { user.name } </p>
                            <p>You have not yet setup a profile , please add some info</p>
                            <Link to="/create-profile" className="btn btn-lg btn-info">
                                Create profile
                            </Link>
                            <br>

                        </br>
                            <Link to="/logs" className="btn btn-lg btn-info">
                                View Sensor Logs
                            </Link>

                        </div>
                    );
                }
            }
            return (
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="display-4">Dashboard</h1>
                                { dashboardContent }
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

}

Dashboard.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard) ;

