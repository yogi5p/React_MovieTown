import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Grid, Row, Col, Thumbnail, Button, Clearfix } from "react-bootstrap";

class MovieDetails extends Component {
  state = {
    imdb_id: 0,
    movieDetails: {}
  };
  componentWillMount() {
    // fires immediately before the initial render

    const movieId = this.props.match.params.movieId;

    let FetchMovieDetails_URL =
      "https://api.themoviedb.org/3/movie/" +
      movieId +
      "?api_key=2434d246ec60c162a86db597467ef4ed";

    fetch(FetchMovieDetails_URL)
      .then(response => response.json())
      .then(payload => {
        let moviePage_URL = "https://www.imdb.com/title/" + payload.imdb_id;
        this.setState({ movieDetails: payload });
      })
      .catch(err => console.log(err));

    console.log(FetchMovieDetails_URL);
    console.log(this.movieDetails);
  }

  render() {
    return (
      <div>
        {this.state.movieDetails.title}
        <Row>
          <div key={this.state.movieDetails.imdb_id}>
            <a
              href={
                "https://www.imdb.com/title/" + this.state.movieDetails.imdb_id
              }
              target="_blank"
            >
              {this.state.movieDetails.title}
            </a>
          </div>
        </Row>
      </div>
    );
  }
}

export default MovieDetails;
