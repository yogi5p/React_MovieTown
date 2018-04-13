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
  InputGroup,
  ControlLabel
} from "react-bootstrap";
import { Link, Route, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

class NavBar extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirect) {
      this.props.history.push(nextProps.redirect);
      this.props.redirectTo();
    }
  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Movie Town</Link>
              </Navbar.Brand>

              <Navbar.Toggle />
            </Navbar.Header>
            <Nav pullLeft>
              {this.props.isAuth ? (
                <Navbar.Text key="user">{this.props.user.username}</Navbar.Text>
              ) : (
                <div>
                  <Navbar.Text>
                    <Navbar.Link href="/Login">Login</Navbar.Link>
                  </Navbar.Text>
                  <Navbar.Text>
                    <Navbar.Link href="/Signup">Signup</Navbar.Link>
                  </Navbar.Text>
                </div>
              )}
            </Nav>
            <Nav pullRight>
              <NavItem>
                <LinkContainer to="/movies">
                  <NavItem>Movies</NavItem>
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
              <InputGroup>
                <FormControl
                  className="searchMovieText"
                  placeholder="Press Enter"
                  type="input"
                  value={this.props.typeOfMovies}
                  onChange={event => {
                    if (event.key === "Enter") {
                      () => this.props.movieSearchTerm();
                    } else {
                      this.props.setSearchTerm(event.target.value);
                    }
                  }}
                />
              </InputGroup>
              {/* <input
                className="searchMovieText"
                type="input"
                placeholder="movie search"
                value={this.props.typeOfMovies}
                onChange={event => {
                  this.props.setSearchTerm(event.target.value);
                }}
              /> */}
              <Nav pullRight>
                <Button
                  bsStyle="link"
                  onClick={() => this.props.movieSearchTerm()}
                >
                  Search
                </Button>
              </Nav>
            </Nav>
          </Grid>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
