import React, { Component } from 'react';
import { Grid, Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';

class Login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(user);
        this.props.loginUser(user);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.errors) {
            return ({ errors: nextProps.errors });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/products');
        }
    }

    render() {
        const { errors } = this.state;
        return(
            <Grid centered columns={2}>
                <Grid.Column>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                    type="email"
                                    name="email"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.email }
                                    placeholder='Email' />
                                    { errors.email && (<div style={errorStyle}>{errors.email}</div>)}
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input
                                    type="password"
                                    name="password"
                                    onChange={ this.handleInputChange }
                                    value={ this.state.password }
                                    placeholder='Password' />
                                    { errors.password && (<div style={errorStyle}>{errors.password}</div>)}
                        </Form.Field>
                        <Button type='submit'>Login</Button>
                    </Form>
                </Grid.Column>
            </Grid>
    );
    }
}

const errorStyle = {
    color: 'red',
};

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login);