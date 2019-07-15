import React from "react";
import { Button, FormGroup, FormControl, FormLabel,Form} from "react-bootstrap";
import "./Login.css";
import ls from 'local-storage'
import {createMovie} from '../components/restClient'
import '../components/NewMovie.css'

class NewMovie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            publicationDate: "",
            error: ""
        };
    }

    validateForm() {
        return this.state.title.length > 0 && this.state.description.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        let user = ls.get('user')
        if (!user || !user._id) {
            window.location = '/site/login'
            return
        }
        createMovie(this.state.title, this.state.description, this.state.publicationDate).then((res) => {
            window.location = '/site/'
        }).catch((e) => {
            this.setState({
                error: e.response.data.error
            })
        })
    }

    render() {
        return (
            <div className="NewMovie">
                <h1>New Movie</h1>
                <div className="error">{this.state.error}</div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="title" bsSize="large">
                        <FormLabel>Title</FormLabel>
                        <FormControl
                            autoFocus
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" controlId="description" rows="3" value={this.state.description}
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <FormGroup controlId="publicationDate" bsSize="large">
                        <FormLabel>Publication Date</FormLabel>
                        <FormControl
                            value={this.state.publicationDate}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        Create
                    </Button>
                </form>
            </div>
        );
    }
}
export default NewMovie