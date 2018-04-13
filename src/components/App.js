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
import Signup from "./Signup";
import NavBar from "./NavBar";

//this.props.typeOfMovies = state.searchTerm from the store
const mapStateToProps = state => ({
  typeOfMovies: state.common.typeOfMovies,
  user: state.common.user,
  token: state.common.token,
  redirect: state.common.redirect,
  userAuthenticated: state.common.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  setSearchTerm: term =>
    dispatch({ type: "CREATE_SEARCH_TERM", payload: term }),
  redirectTo: () => dispatch({ type: "REDIRECT", payload: null })
});

class App extends Component {
  //movies -> Movie Component
  //movies/:movieId -> MovieDetails Component

  componentWillReceiveProps(nextProps) {
    // reset search term for a new clean search
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.setSearchTerm("");
    }
    if (nextProps.redirect) {
      this.props.history.push(nextProps.redirect);
      this.props.redirectTo();
    }
  }

  movieSearchTerm = () => {
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div style={{ backgroundColor: "lightgray" }}>
        <NavBar
          isAuth={this.props.userAuthenticated}
          user={this.props.user}
          typeOfMovies={this.props.typeOfMovies}
          setSearchTerm={this.props.setSearchTerm}
          movieSearchTerm={this.movieSearchTerm}
        />
        <Jumbotron
          style={{ marginBottom: "5px", marginTop: "50px", height: "50px" }}
        >
          <Grid style={{ fontSize: "30px", marginTop: "5px" }}>
            {this.props.typeOfMovies} Movies
          </Grid>
        </Jumbotron>
        <Route exact path="/Login" component={Login} />
        <Route path="/Signup" name="Signup" component={Signup} />
        <Route
          exact
          path="/movies"
          render={props => (
            <Movies {...props} typeOfMovies={this.props.typeOfMovies} />
          )}
        />
        <Route
          path="/movies/:movieId"
          render={props => <MovieDetails {...props} token={this.props.token} />}
        />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
