import React from 'react'
import MovieCard from "../components/MovieCard"
class MovieList extends React.Component {

    // constructor(props) {
    //     super(props);
    // }
    render() {
        return this.props.movies.map((movie => <MovieCard movie={movie} onUserClick={this.props.onUserClick}/>))
    }
}
export default MovieList