import React from 'react'
import { Button, Navbar, Nav, ButtonGroup, Breadcrumb} from "react-bootstrap";
import MovieList from "../components/MovieList"
import {getMovies, getMoviesForUser} from "../components/restClient"
import ls from 'local-storage'
import { Redirect } from 'react-router-dom'

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            user: undefined,
            page: 0,
            pageSize: 10,
            order: 'desc',
            sortField: 'likesCount',
            redirect: false,
            redirectScreen: '',
            selectedUserId: undefined,
            selectedUserDisplayName: undefined
        };
    }
    async fetchMovies () {
        console.log(`Fetching page No ${this.state.page} by ${this.state.sortField}`)
        let user = ls.get('user')
        let userId;
        if (user && user._id) {
            userId = user._id
        }
        console.log('b4 fetching');
        (this.state.selectedUserId ?
            getMoviesForUser(this.state.page, this.state.order, this.state.sortField, userId, this.state.selectedUserId) :
            getMovies(this.state.page, this.state.order, this.state.sortField, userId, this.state.selectedUserId))
        .then((res) => {
            console.log('Helllo')
            console.log("Data: " + res.data.response.length)
            this.setState({
                movies: res.data.response
            })
        }).catch((err) => {
            console.error(err)
        })
    }
    async componentDidMount(){
        this.setState({
            user: ls.get('user')

        })
        await this.fetchMovies()
    }

    logout() {
        ls.set('user', '')
        window.location = '/site/'
    }
    async previousResults() {
        this.setState({
            page: this.state.page - 1
        }, async () => {
            await this.fetchMovies()
        })
    }
    async nextResults() {
        this.setState({
            page: this.state.page + 1
        }, async () => {
            await this.fetchMovies()
        })
    }

    async getMoviesOrdered(evt) {
        let newOrder = this.state.order === 'asc' ? 'desc' : 'asc'
        let sortField = evt.target.getAttribute('data-key')
        this.setState({
            order: newOrder,
            sortField: sortField
        }, async () => {
            await this.fetchMovies()
        })
    }

    goToNewMovieForm() {
        window.location = '/site/new'
    }

    setRedirect = (evt) => {
        this.setState({
            redirect: true,
            redirectScreen: evt.target.getAttribute('data-key')
        })
    }
    renderRedirect() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectScreen} push/>
        }
    }
    showMoviesFromEveryone() {
        this.setState({
            selectedUserId: undefined,
            selectedUserDisplayName: undefined
        }, () => {
            this.fetchMovies()
        })
    }
    onUserClick = (evt) => {
        this.setState({
            selectedUserId: evt.target.getAttribute('data-key-id'),
            selectedUserDisplayName: evt.target.getAttribute('data-key-name'),
            page: 0,
            sortFields: 'likesCount'
        }, async () => {
            await this.fetchMovies()
        })
    }

    /**
     * Renders a breadcrumb consisting of at most two choices:
     *  - all movies
     *  - the movies of a specific user
     */
    renderBreadCrumb() {
        return <Breadcrumb>
            <Breadcrumb.Item onClick={this.showMoviesFromEveryone.bind(this)} active={this.state.selectedUserId === undefined}>All movies</Breadcrumb.Item>
            {this.state.selectedUserId && <Breadcrumb.Item active={true}>
                Movies From {this.state.selectedUserDisplayName}
            </Breadcrumb.Item>
            }
        </Breadcrumb>
    }


    render() {
        return <div>
            {this.renderRedirect()}
            {this.renderBreadCrumb()}
            <Navbar>
                <Navbar.Brand href="/site/">Movierama</Navbar.Brand>
                <Navbar.Toggle />
                <ButtonGroup>
                    <Button data-key="likesCount" onClick={this.getMoviesOrdered.bind(this)}>Sort By Likes</Button>
                    <Button data-key="hatesCount" onClick={this.getMoviesOrdered.bind(this)}>Sort By Hates</Button>
                    <Button data-key="createdAt" onClick={this.getMoviesOrdered.bind(this)}>Sort By Date</Button>
                    <Button data-key="/site/new" onClick={this.setRedirect}>New Movie</Button>
                </ButtonGroup>


                <Navbar.Collapse>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Item>
                            {this.state.user ? this.state.user.displayName : ''}
                        </Nav.Item>
                        <Nav.Item>
                        </Nav.Item>
                        {this.state.user ? <Button onClick={this.logout.bind(this)}>Logout</Button> : <Button data-key="/site/login" onClick={this.setRedirect}>Login</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {this.state.page > 0 ? <Button onClick={this.previousResults.bind(this)}>Previous Results </Button> : ''}
            {this.state.movies.length >= this.state.pageSize ? <Button onClick={this.nextResults.bind(this)}>Next Results</Button> : ''}
            <MovieList movies={ this.state.movies } onUserClick={this.onUserClick}/>
        </div>
    }
}
export default Main