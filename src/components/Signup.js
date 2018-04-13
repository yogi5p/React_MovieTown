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
import { LinkContainer } from "react-router-bootstrap";
import MovieCards from "./MovieCards";
import { connect } from "react-redux";
import services from "../services";

const mapDispatchToProps = dispatch => ({
  register: (username, useremail, password) =>
    dispatch({
      type: "REGISTER",
      payload: services.User.register(username, useremail, password)
    })
});

class Signup extends Component {
  state = {
    username: "",
    useremail: "",
    password: "",
    confirmpassword: ""
  };

  validateForm() {
    if (this.state.useremail.length > 0 && this.state.password.length > 0)
      return this.state.confirmpassword == this.state.password;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.register(
      this.state.username,
      this.state.useremail,
      this.state.password
    );
  };

  componentWillReceiveProps() {
    // fires when component is receiving new props
  }

  componentDidMount() {
    // fires immediately before the initial render
  }

  render() {
    return (
      <div style={{ backgroundColor: "white", alignContent: "center" }}>
        <Grid>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col sm={10}>
                <ControlLabel>
                  Signup to keep a list of movies of your choice:
                </ControlLabel>
              </Col>
              <Col sm={10}>
                <ControlLabel>Username : </ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter text"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm={10}>
                <ControlLabel>Email address : </ControlLabel>
                <FormControl
                  type="email"
                  id="useremail"
                  name="useremail"
                  placeholder="Enter email"
                  value={this.state.useremail}
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm={10}>
                <ControlLabel>Password : </ControlLabel>
                <FormControl
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter a strong password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm={10}>
                <ControlLabel>Confirm Password : </ControlLabel>
                <FormControl
                  type="confirmpassword"
                  id="confirmpassword"
                  name="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <Button type="submit" disable={!this.validateForm()}>
              Submit
            </Button>
          </Form>
        </Grid>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Signup);
