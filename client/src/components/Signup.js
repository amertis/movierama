import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Signup.css";
import {signup} from "../components/restClient"
import ls from 'local-storage'
class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            displayName: "",
            errorMsg: ""
        };
    }

    async validateForm() {
        return true
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        let that = this;
        return signup(this.state.username, this.state.password, this.state.displayName).then((res) => {
            if (res.status === 200) {
                ls.set('user', res.data.user)
                window.location = '/site/';
            }
        }).catch(err => {
            console.error(err)
            that.setState({
                errorMsg: err.response.data.error
            })
        })
    }

    render() {
        return (
            <div className="Signup">
                <div className="error">{this.state.errorMsg}</div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <FormLabel>Username (Email)</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="displayName" bsSize="large">
                        <FormLabel>Display Name</FormLabel>
                        <FormControl
                            type="string"
                            value={this.state.displayName}
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
                        disabled={!this.validateForm()}
                        type="submit">
                        Signup
                    </Button>
                </form>
            </div>
        );
    }
}
export default Signup