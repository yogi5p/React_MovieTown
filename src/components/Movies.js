import React, { Component } from "react";
import { Grid, Navbar, Jumbotron } from "react-bootstrap";
import MovieCards from "./MovieCards";
import { connect } from "react-redux";
import services from "../services";

const mapDispatchToProps = dispatch => ({
  newMovies: movies => dispatch({ type: "NEW_MOVIES", payload: movies })
});

const mapStateToProps = state => ({
  movies: state.common.movies
});

class Movies extends Component {
  componentWillReceiveProps() {
    // fires when component is receiving new props
    if (this.props.typeOfMovies) {
      this.props.newMovies(services.Movie.search(this.props.typeOfMovies));
    }
  }

  componentDidMount() {
    // fires immediately before the initial render
    if (this.props.typeOfMovies) {
      this.props.newMovies(services.Movie.search(this.props.typeOfMovies));
    }
  }
  openMovieClicked = (title, movieId) => {
    this.props.history.push(`/movies/${movieId}`);
  };
  render() {
    return (
      <div>
        <MovieCards
          movies={this.props.movies}
          openMovieClicked={this.openMovieClicked}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
