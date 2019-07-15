import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MovieCard from "./components/MovieCard";
import MovieList from "./components/MovieList";
import NewMovie from "./components/NewMovie";

class App extends Component {
    state = {
        data: null
    };

    componentDidMount() {
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Movierama</h1>
                </header>
                <Router>
                    <div>
                        <Route exact path="/site/" component={Main} />
                        <Route exact path="/site/login" component={Login} />
                        <Route exact path="/site/signup" component={Signup} />
                        <Route exact path="/site/movie" component={MovieCard} />
                        <Route exact path="/site/movielist" component={MovieList} />
                        <Route exact path="/site/new" component={NewMovie} />
                    </div>
                </Router>

            </div>
        );
    }
}

export default App;
