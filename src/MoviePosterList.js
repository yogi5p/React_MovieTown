import React, { Component } from "react";
import { Grid, Row, Col, Thumbnail, Button, Clearfix } from "react-bootstrap";

class MoviePosterList extends Component {
  state = {
    imdb_id: 0,
    movieDetails: {}
  };

  openMovieClicked(movieId) {
    let FetchMovieDetails_URL =
      "https://api.themoviedb.org/3/movie/" +
      movieId +
      "?api_key=2434d246ec60c162a86db597467ef4ed";
    fetch(FetchMovieDetails_URL)
      .then(response => response.json())
      .then(payload => {
        let moviePage_URL = "https://www.imdb.com/title/" + payload.imdb_id;
        this.setState({ movieDetails: payload });
        window.open(moviePage_URL, "_blank");
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Row>
        {this.props.movies.map((movie, index) => (
          <div key={movie.id}>
            <Col xs={6} md={4}>
              <Thumbnail
                src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                alt={"242x200"}
              >
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <p>
                  <Button
                    bsStyle="primary"
                    onClick={() => this.openMovieClicked(movie.id)}
                  >
                    Details
                  </Button>
                </p>
              </Thumbnail>
            </Col>

            {(index + 1) % 2 === 0 && <Clearfix visibleSmBlock />}
            {(index + 1) % 3 === 0 && (
              <Clearfix visibleMdBlock visibleLgBlock />
            )}
          </div>
        ))};
      </Row>
    );
  }
}

export default MoviePosterList;
