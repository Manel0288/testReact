import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Form, Button } from 'semantic-ui-react';
import classnames from 'classnames';


import { registerUser } from '../actions/authentication';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }

        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        console.log(user);
        this.props.registerUser(user, this.props.history);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.errors) {
            return ({ errors: nextProps.errors });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
            <Grid centered columns={2}>
                <Grid.Column>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Name</label>
                            <input
                                    type="text"
                                    name="name"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.name }
                                    placeholder='Name' />
                                    {errors.name && (<div style={errorStyle}>{errors.name}</div>)}
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                    type="email"
                                    name="email"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.email }
                                    placeholder='Email' />
                                    {errors.email && (<div style={errorStyle}>{errors.email}</div>)}
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input
                                    type="password"
                                    name="password"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.password }
                                    placeholder='Password' />
                                    {errors.password && (<div style={errorStyle}>{errors.password}</div>)}
                        </Form.Field>
                        <Form.Field>
                            <label>Password Confirmation</label>
                            <input
                                    type="password"
                                    name="password_confirm"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.password_confirm }
                                    placeholder='Password Confirmation' />
                                    {errors.password_confirm && (<div style={errorStyle}>{errors.password_confirm}</div>)}
                        </Form.Field>
                        <Button type='submit'>Register</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const errorStyle = {
    color: 'red',
};
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default  connect(mapStateToProps,{ registerUser })(withRouter(Register));