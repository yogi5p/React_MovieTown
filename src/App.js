import React, { Component } from "react";
import {
  Grid,
  Navbar,
  Jumbotron,
  Nav,
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

const mapStateToProps = state => ({
  typeOfMovies: state.typeOfMovies
});

const mapDispatchToProps = dispatch => ({
  setSearchTerm: term => dispatch({ type: "CREATE_SEARCH_TERM", payload: term })
});

class App extends Component {
  //movies -> Movie Component
  //movies/:movieId -> MovieDetails Component

  state = {
    typeOfMovies: ""
  };

  componentWillReceiveProps(nextProps) {
    // fires when component is receiving new props
    if (nextProps.location.pathname === "/") {
      this.setState({
        typeOfMovies: ""
      });
    }
  }

  movieSearchTerm = searchTerm => {
    this.props.setSearchTerm(searchTerm);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div style={{ backgroundColor: "lightgray" }}>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Movie Town App</a>
              </Navbar.Brand>

              <Navbar.Toggle />
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
                  this.setState({ typeOfMovies: event.target.value });
                }}
              />

              <LinkContainer to="/movies">
                <Button
                  type="submit"
                  bsStyle="link"
                  style={"margin-top = 15px;"}
                  onClick={() => this.movieSearchTerm(this.state.typeOfMovies)}
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
        <Route
          exact
          path="/movies"
          render={props => (
            <Movies
              {...props}
              typeOfMovies={encodeURIComponent(this.state.typeOfMovies)}
            />
          )}
        />
        <Route path="/movies/:movieId" component={MovieDetails} />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
