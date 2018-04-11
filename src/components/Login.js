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
  login: (useremail, password) =>
    dispatch({
      type: "LOGIN",
      payload: services.User.login(useremail, password)
    })
});

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class Login extends Component {
  state = {
    username: "",
    useremail: "",
    password: ""
  };

  validateForm() {
    return this.state.useremail.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    services.User.login(this.state.useremail, this.state.password)
      .then(res => res.json())
      .then(payload => {
        this.setState({
          userPayload: payload
        });
      })
      .catch(err => this.setState({ error: err }));
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
            <FormGroup controlId="formHorizontalEmail">
              <Col sm={10}>
                <ControlLabel>
                  Signup to keep a list of movies of your choice:
                </ControlLabel>
              </Col>
              <Col sm={10}>
                <ControlLabel>Username : </ControlLabel>
                <FormControl
                  autofocus
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
            </FormGroup>

            <LinkContainer to="/movies">
              <Button
                disable={!this.validateForm()}
                type="submit"
                bsStyle="default"
                onClick={() => this.validateForm()}
              >
                Submit
              </Button>
            </LinkContainer>
          </Form>
        </Grid>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
