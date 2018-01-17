import React from "react";
import PropTypes from "prop-types";

import Button from "../Button/Button";

const inputName = "magnet-name";

class AddTorrent extends React.Component {
  state = { isLoading: false };

  onAdd = (evt) => {
    evt.preventDefault();
    this.setState({ isLoading: true });
    this.props.addTorrent(evt.target[inputName].value).finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { isLoading } = this.state;

    return (
      <div className="AddTorrent">
        <h2>Add torrent</h2>
        <form onSubmit={this.onAdd}>
          <input type="text" name={inputName} placeholder="magnet link" />
          <Button type="submit" isLoading={isLoading} text="Add" />
        </form>
        <style jsx>{`
          form {
            display: flex;
            padding: 0 0.5rem;
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
      </div>
    );
  }
}

AddTorrent.propTypes = {
  addTorrent: PropTypes.func.isRequired
};

export default AddTorrent;
