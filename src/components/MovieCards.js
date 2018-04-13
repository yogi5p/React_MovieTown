import React, { Component } from "react";
import { Grid, Row, Col, Thumbnail, Button } from "react-bootstrap";
import MoviePosterList from "./MoviePosterList";

class MovieCards extends Component {
  render() {
    return (
      <Grid>
        <MoviePosterList
          movies={this.props.movies}
          openMovieClicked={this.props.openMovieClicked}
        />
      </Grid>
    );
  }
}

export default MovieCards;
