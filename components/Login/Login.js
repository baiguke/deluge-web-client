import React, { Component } from "react";
import PropTypes from "prop-types";

import * as delugeWebApi from "../../utils/delugeWebApi";

import Button from "../Button/Button";

const PASSWORD_INPUT_NAME = "password";

class Login extends Component {
  state = {
    isFetching: false
  };

  setInputRef = (node) => {
    this.input = node;
  };

  login = (evt) => {
    evt.preventDefault();
    this.setState({ isFetching: true });
    delugeWebApi
      .login(this.input.value)
      .then(this.props.onLogin)
      .finally(() => this.setState({ isFetching: false }));
  };

  render() {
    const { isFetching } = this.state;
    return (
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={this.login} className="Form">
          <input
            type="password"
            autoComplete="deluge-password"
            name={PASSWORD_INPUT_NAME}
            placeholder="password"
            ref={this.setInputRef}
          />
          <Button type="submit" isLoading={isFetching} text="Log in" />
        </form>
        <style jsx>{`
          .Login {
            display: flex;
            flex-direction: column;
            padding: 0.5em;
          }
          .Form {
            display: flex;
            padding: 0 0.5em;
          }
          input {
            display: block;
            flex-grow: 1;
          }
        `}</style>
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;
