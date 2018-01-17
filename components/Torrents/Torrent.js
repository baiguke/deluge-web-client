import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Button from "../Button/Button";

class Torrent extends React.Component {
  state = { isLoading: false };

  onDelete = () => {
    const { onDelete, torrent } = this.props;
    this.setState({ isLoading: true });
    onDelete(torrent.hash).finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { className, torrent } = this.props;
    const { isLoading } = this.state;

    return (
      <li className={classNames("Torrent", className)}>
        <span>{torrent.name}</span>
        <Button onClick={this.onDelete} isLoading={isLoading} text="Delete" theme="white" />
        <style jsx>{`
          .Torrent {
            align-items: center;
            background-color: #eee;
            display: flex;
            justify-content: space-between;
            padding: 0.5em;
          }
          .Torrent:nth-child(odd) {
            background-color: lightgray;
          }
        `}</style>
      </li>
    );
  }
}

Torrent.propTypes = {
  className: PropTypes.string,
  torrent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired
  }),
  onDelete: PropTypes.func.isRequired
};

export default Torrent;
