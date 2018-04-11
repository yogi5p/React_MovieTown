import React, { Component } from "react";
import { Grid, Row, Col, Thumbnail, Button, Clearfix } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  movies: state.common.movies
});

const MoviePosterList = ({ movies, openMovieClicked }) => {
  return (
    <Row>
      {movies.map((movie, index) => (
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
                  onClick={() => openMovieClicked(movie.title, movie.id)}
                >
                  Details
                </Button>
              </p>
            </Thumbnail>
          </Col>

          {(index + 1) % 2 === 0 && <Clearfix visibleSmBlock />}
          {(index + 1) % 3 === 0 && <Clearfix visibleMdBlock visibleLgBlock />}
        </div>
      ))};
    </Row>
  );
};

export default connect(mapStateToProps)(MoviePosterList);
