/* eslint-disable camelcase */
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Torrent from "./Torrent";

class TorrentList extends Component {
  render() {
    const { className, torrents, onDelete } = this.props;
    return (
      <div className={classNames("TorrentList", className)}>
        <h2>Torrents</h2>
        <div className="TorrentList__list">
          {torrents.map((torrent) => <Torrent torrent={torrent} onDelete={onDelete} key={torrent.hash} />)}
        </div>
        <style jsx>{`
          .TorrentList__list {
            border-bottom: 1px solid lightgray;
          }
        `}</style>
      </div>
    );
  }
}

TorrentList.propTypes = {
  className: PropTypes.string,
  torrents: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TorrentList;
