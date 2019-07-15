import React from 'react'
import { Button, Card, Nav, NavItem} from "react-bootstrap";
import {rate} from "../components/restClient"
import ls from 'local-storage'
class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: props.movie,
            error: null,
            onUserClick: props.onUserClick
        };
    }
    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.setState({movie: this.props.movie});
        }
    }

    rateVideo(event) {
        rate(ls.get('user')['_id'], this.state.movie._id, event.target.getAttribute('data-key')).then((res) => {
            this.setState({
                movie: res.data.movie
            })
        }).catch((e) => {
            this.setState({
                error: e.response && e.response.data && e.response.data.error || 'An error occurred'
            })
            setTimeout(() => {
                this.setState({
                    error: null
                })
            }, 3000)
        })
    }

    renderRating () {
        let isLoggedIn = false
        let user = ls.get('user')
        if (!user || !user._id) {
            return <p>Please login in order to be able to rate the movie.</p>
        }
        let rate = undefined
        if (this.state.movie.likesCount === 0 && this.state.movies.hatesCount === 0) {
            return <p>Be the first to rate this movie!</p>
        }
        if (!this.state.movie.userRating) {
            return <Nav>
                <NavItem>You haven't rated this movie</NavItem>
                {this.state.movie.likesCount === 0 &&  this.state. movies.hatesCount === 0
                && <NavItem>Be the first to rate this movie!</NavItem>}
                <Button key={"like"} data-key={"like"} onClick={this.rateVideo.bind(this)} >Like</Button>
                <Button key={"hate"} data-key={"hate"} onClick={this.rateVideo.bind(this)} >Hate</Button>
            </Nav>
        }
        if (this.state.movie.userRating) {
            if (this.state.movie.userRating.ratingType === 'like') {
                return <Nav>
                    <NavItem>You like this movie</NavItem>
                    <Button onClick={this.rateVideo.bind(this)} key={"unlike"} data-key={"unlike"}>Unlike</Button>
                    <Button key={"hate"} data-key={"hate"} onClick={this.rateVideo.bind(this)} >Hate</Button>
                </Nav>
            }  else {
                return <Nav>
                    <NavItem>You hate this movie</NavItem>
                    <Button key={"unhate"} data-key={"unhate"} onClick={this.rateVideo.bind(this)} >Unhate</Button>
                    <Button key={"like"} data-key={"like"} onClick={this.rateVideo.bind(this)} >Like</Button>
                </Nav>
            }
        }
    }

    renderError () {
        return <Card.Text> {this.state.error}</Card.Text>
    }
    render() {
        return <Card>
            <Card.Header></Card.Header>
            <Card.Body>
                <Card.Title>{this.state.movie.title}</Card.Title>
                <Card.Link href="#" data-key-id={this.state.movie.user._id}  data-key-name={this.state.movie.user.displayName}
                           onClick={this.state.onUserClick.bind(this)}>Posted by {this.state.movie.user.displayName}</Card.Link>
                <Card.Text>
                    {this.state.movie.description}
                </Card.Text>
                <Card.Text>
                    {this.state.movie.likesCount} likes
                </Card.Text>
                <Card.Text>
                    {this.state.movie.hatesCount} hates
                </Card.Text>
                {this.renderRating()}
                {this.renderError()}
            </Card.Body>
        </Card>
    }
}
export default MovieCard