import React, { Component } from "react";
import {
  Grid,
  Navbar,
  Jumbotron,
  Nav,
  Col,
  NavDropdown,
  MenuItem,
  NavItem,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Link, Route, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import Movies from "./Movies";
import MovieDetails from "./MovieDetails";
import Login from "./Login";

//this.props.typeOfMovies = state.searchTerm from the store
const mapStateToProps = state => ({
  typeOfMovies: state.common.typeOfMovies
});

const mapDispatchToProps = dispatch => ({
  setSearchTerm: term => dispatch({ type: "CREATE_SEARCH_TERM", payload: term })
});

class App extends Component {
  //movies -> Movie Component
  //movies/:movieId -> MovieDetails Component

  movieSearchTerm = typeOfMovies => {
    this.props.setSearchTerm(typeOfMovies);
    this.props.history.push("/movies");
  };

  movieLogin = () => {
    //this.props.setSearchTerm(searchTerm);
    this.props.history.push("/Login");
  };
  render() {
    return (
      <div style={{ backgroundColor: "lightgray" }}>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <object type="lol/wut">
                  <a href="/">Movie Town App</a>
                </object>
              </Navbar.Brand>

              <Navbar.Toggle />
              <LinkContainer to="/Login">
                <Button
                  type="submit"
                  bsStyle="primary"
                  style={"margin-top = 15px;"}
                  onClick={() => this.movieLogin()}
                >
                  Login
                </Button>
              </LinkContainer>
            </Navbar.Header>
            <Nav pullRight>
              <NavItem>
                <LinkContainer to="/movies">
                  <NavItem eventKey={1}>Movies</NavItem>
                </LinkContainer>
              </NavItem>

              <NavItem>
                <Form inline>
                  <FormGroup controlId="formInlineSearchText">
                    <ControlLabel>
                      Search for movies of your choice:
                    </ControlLabel>
                  </FormGroup>
                </Form>
              </NavItem>
              <input
                className="searchMovieText"
                type="input"
                placeholder="movie search"
                value={this.props.typeOfMovies}
                onChange={event => {
                  this.props.setSearchTerm(event.target.value);
                }}
              />

              <LinkContainer to="/movies">
                <Button
                  type="submit"
                  bsStyle="link"
                  style={"margin-top = 15px;"}
                  onClick={() => this.movieSearchTerm(this.props.typeOfMovies)}
                >
                  Search
                </Button>
              </LinkContainer>
            </Nav>
          </Grid>
        </Navbar>
        <Jumbotron
          style={{ marginBottom: "5px", marginTop: "5px", height: "50px" }}
        >
          <Grid style={{ fontSize: "30px", marginTop: "5px" }}>
            {this.props.typeOfMovies} Movies
          </Grid>
        </Jumbotron>
        <Route exact path="/Login" component={Login} />
        <Route
          exact
          path="/movies"
          render={props => (
            <Movies {...props} typeOfMovies={this.props.typeOfMovies} />
          )}
        />
        <Route path="/movies/:movieId" component={MovieDetails} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
