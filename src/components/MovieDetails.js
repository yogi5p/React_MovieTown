import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

import services from "../services";

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
  }

  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=2434d246ec60c162a86db597467ef4ed`
    )
      .then(resp => resp.json())
      .then(payload =>
        this.setState({
          movie: payload
        })
      )
      .catch(err => console.log(err));
  }

  onFavoriteClick = () => {
    services.Movie.favorite(this.state.movie, this.props.token)
      .then(resp => resp.json())
      .then(payload => console.log(payload))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div style={{ marginLeft: "25px" }}>
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
          <Button onClick={this.onFavoriteClick}>Favorite</Button>
        </Row>
      </div>
    );
  }
}

export default MovieDetails;
