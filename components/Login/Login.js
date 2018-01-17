import React, { Component } from "react";
import PropTypes from "prop-types";

import * as delugeWebApi from "../../utils/delugeWebApi";

const PASSWORD_INPUT_NAME = "password";

class Login extends Component {
  login = (evt) => {
    evt.preventDefault();
    delugeWebApi.login(evt.target[PASSWORD_INPUT_NAME].value).then(this.props.onLogin);
  };

  render() {
    return (
      <form onSubmit={this.login} className="Login">
        <input type="password" autoComplete="deluge-password" name={PASSWORD_INPUT_NAME} placeholder="password" />
        <button type="submit">Log in</button>
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
          button {
            background: cadetblue;
            border-color: rgba(255, 255, 255, 0.9);
            color: white;
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
