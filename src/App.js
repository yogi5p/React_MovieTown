import React, { Component } from "react";
import { Grid, Navbar, Jumbotron, Button } from "react-bootstrap";
import { BrowserRouter, Route, Link } from "react-router-dom";
import MovieList from "./MovieList";
import MovieCards from "./MovieCards";
import MovieDetails from "./MovieDetails";

const MOVIE_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=2434d246ec60c162a86db597467ef4ed&language=en-US&query=alien&include_adult=false&sort_by=created_at.asc&page=1";

class App extends Component {
  state = {
    movies: []
  };

  componentDidMount() {
    fetch(MOVIE_URL)
      .then(response => response.json())
      .then(payload =>
        this.setState({
          movies: payload.results
        })
      )
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state.movies);
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>Alien Movie Town</h1>
            <MovieCards movies={this.state.movies} />
          </Grid>
        </Jumbotron>

        <Route path="/moviedetails" component={MovieDetails} />
      </div>
    );
  }
}

export default App;
