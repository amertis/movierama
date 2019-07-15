import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import ls from 'local-storage'
import {login} from '../components/restClient'
import {Redirect} from "react-router";
class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            redirect: false
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        login(this.state.username, this.state.password).then((res) => {
            ls.set("user", res.data.user)
            window.location = '/site/'
        }).catch((e) => {
            alert(e.response.data.error)
        })
    }

    setRedirect = (evt) => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={'/signup'} push/>
        }
    }

    render() {
        return (
            <div className="Login">
                {this.renderRedirect()}
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
                <p>or <a href={'/site/signup'} onClick={this.setRedirect}>Register</a></p>
            </div>
        );
    }
}
export default Login