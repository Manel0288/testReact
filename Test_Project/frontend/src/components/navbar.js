import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
class Navbar extends Component {

    onLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <div className="right menu">
                <Link to="#" onClick={this.onLogout}>
                    <img src={user.avatar} alt={user.name} title={user.name} className="rounded-circle" style={{ width: '25px', marginRight: '5px'}} />
                    Logout
                </Link>
            </div>
        );

        const guestLinks = (
            <div className="right menu">
                <Link className="item" to="/register">Register</Link>
                <Link className="ui item item" to="/login">Login</Link>
            </div>
        )

        return (
            <div className="ui secondary pointing  menu">
                <Link className="active item" to="/home">Home</Link>
        {isAuthenticated && <Link className="item" to="/products">Products</Link>}
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        );
    }
}


Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));