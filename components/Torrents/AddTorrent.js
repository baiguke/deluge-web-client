import React from "react";
import PropTypes from "prop-types";

const inputName = "magnet-name";

class AddTorrent extends React.Component {
  onAdd = (evt) => {
    evt.preventDefault();
    this.props.addTorrent(evt.target[inputName].value);
  };
  render() {
    return (
      <div className="AddTorrent">
        <h2>Add</h2>
        <form onSubmit={this.onAdd}>
          <input type="text" name={inputName} placeholder="magnet link" />
          <button type="submit">Add</button>
        </form>
        <style jsx>{`
          h2 {
            padding: 0.5rem 1rem;
            margin-bottom: 0;
          }
          form {
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
      </div>
    );
  }
}

AddTorrent.propTypes = {
  addTorrent: PropTypes.func.isRequired
};

export default AddTorrent;
