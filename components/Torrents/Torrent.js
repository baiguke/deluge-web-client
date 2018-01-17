import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Torrent = ({ className, torrent, onDelete }) => (
  <li className={classNames("Torrent", className)}>
    <span>{torrent.name}</span>
    <button onCLick={() => onDelete(torrent.hash)}>Delete</button>
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

Torrent.propTypes = {
  className: PropTypes.string,
  torrent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired
  }),
  onDelete: PropTypes.func.isRequired
};

export default Torrent;
