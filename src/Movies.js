import React, { Component } from "react";
import { Grid, Navbar, Jumbotron } from "react-bootstrap";
import MovieCards from "./MovieCards";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  newMovies: movies => dispatch({ type: "NEW_MOVIES", payload: movies })
});

class Movies extends Component {
  state = {
    movies: []
  };

  fetchRequestedMovies() {
    const MOVIE_URL =
      "https://api.themoviedb.org/3/search/movie?api_key=2434d246ec60c162a86db597467ef4ed&language=en-US&query=" +
      this.props.typeOfMovies +
      "&include_adult=false&sort_by=created_at.asc&page=1";
    console.log(this.props.typeOfMovies);
    console.log(MOVIE_URL);

    fetch(MOVIE_URL)
      .then(response => response.json())
      .then(payload =>
        this.props.newMovies(payload.results.filter(movie => movie.poster_path))
      )
      .catch(err => console.log(err));
  }
  componentWillReceiveProps() {
    // fires when component is receiving new props
    this.fetchRequestedMovies();
  }

  componentDidMount() {
    // fires immediately before the initial render
    this.fetchRequestedMovies();
  }
  openMovieClicked = (title, movieId) => {
    this.props.history.push(`/movies/${movieId}`);
  };
  render() {
    return <MovieCards openMovieClicked={this.openMovieClicked} />;
  }
}

export default connect(null, mapDispatchToProps)(Movies);
