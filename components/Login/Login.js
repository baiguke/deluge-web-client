import React, { Component } from "react";
import PropTypes from "prop-types";

import * as delugeWebApi from "../../utils/delugeWebApi";

import Button from "../Button/Button";

const PASSWORD_INPUT_NAME = "password";

class Login extends Component {
  state = {
    isFetching: false
  };

  login = (evt) => {
    evt.preventDefault();
    this.setState({ isFetching: true });
    delugeWebApi
      .login(evt.target[PASSWORD_INPUT_NAME].value)
      .then(this.props.onLogin)
      .finally(() => this.setState({ isFetching: false }));
  };

  render() {
    const { isFetching } = this.state;
    return (
      <form onSubmit={this.login} className="Login">
        <input type="password" autoComplete="deluge-password" name={PASSWORD_INPUT_NAME} placeholder="password" />
        <Button type="submit" isLoading={isFetching} text="Log in" />
        <style jsx>{`
          .Login {
            background: cadetblue;
            display: flex;
            padding: 0.5em;
          }
          input {
            display: block;
            flex-grow: 1;
          }
        `}</style>
      </form>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
