/*
1. Input to query for movies
1a. console.log(encodeURIComponent('cowboy aliens &trains'));
2. button for onClick to search
3. Take the input and put in the movie API URL and do the HTTP fetch
4. Redirect to the movies component with the results form that HTTP fetch
5. Our Details page should still work
*/
import React, { Component } from "react";
import { Col, Grid, Button, Row, Form } from "react-bootstrap";
import services from "../services";
import { connect } from "react-redux";
import MovieCards from "./MovieCards";
//import "./movieSearch.css";

const mapStateToProps = state => ({
  favoriteMovies: state.common.favoriteMovies
});

const mapDispatchToProps = dispatch => ({
  movieFavorites: token =>
    dispatch({
      type: "MOVIE_FAVORITES",
      payload: services.Movie.getFavorites(token)
    })
});

class MovieSearch extends Component {
  componentDidMount() {
    if (this.props.token) {
      this.props.movieFavorites(this.props.token);
    }
  }
  onClickDetails = movieId => {
    this.props.history.push(`movies/${movieId}`);
  };

  render() {
    return (
      <Grid>
        {this.props.typeOfMovies == "" ? (
          <h2>My Favorites List</h2> > <hr />
        ) : (
          <hr />
        )}
        <MovieCards
          movies={this.props.favoriteMovies}
          onClickDetails={this.onClickDetails}
        />
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch);
