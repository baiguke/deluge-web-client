import React, { Component } from "react";

import * as delugeWebApi from "../utils/delugeWebApi";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../components/Login/Login";
import TorrentList from "../components/Torrents/TorrentList";
import AddTorrent from "../components/Torrents/AddTorrent";

class Index extends Component {
  state = {
    isAuthenticated: false,
    isFetching: false,
    torrents: []
  };

  componentDidMount() {
    delugeWebApi
      .isAuthenticated()
      .then(() => {
        this.setState({ isAuthenticated: true });
        this.fetchTorrents();
      })
      .catch(() => this.setState({ isFetching: false }));
  }

  onLogin = () => {
    this.setState({ isAuthenticated: true });
    this.fetchTorrents();
  };

  onAdd = (magnetLink) => {
    delugeWebApi.addTorrent(magnetLink);
  };

  onDelete = (hash) => {
    delugeWebApi.removeTorrent(hash);
  };

  fetchTorrents = () => {
    this.setState({ isFetching: true });
    delugeWebApi.getTorrents().then(({ result: { torrents } }) =>
      this.setState({
        isFetching: false,
        torrents
      })
    );
  };

  render() {
    const { isAuthenticated, isFetching, torrents } = this.state;
    const title = "Deluge web client";
    return (
      <div className="Index">
        <Header title={title} isFetching={isFetching} />
        <main>
          {!isAuthenticated && <Login onLogin={this.onLogin} />}
          <TorrentList torrents={torrents} onDelete={this.onDelete} />
          <AddTorrent addTorrent={this.onAdd} />
        </main>
        <Footer />
        <style jsx>{`
          .Index {
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          main {
            flex: 1;
          }
        `}</style>
        <style global jsx>{`
          html,
          body {
            margin: 0;
            padding: 0;
          }

          html,
          body,
          body > div:first-child,
          #__next,
          [data-reactroot] {
            height: 100%;
          }

          body {
            background: whitesmoke;
            color: #333;
            font-family: system-ui, system, sans-serif;
          }

          input,
          button {
            border: 1px solid transparent;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 0.5em 1em;
          }

          button {
            border-color: rgba(127, 127, 127, 0.5);
            min-width: 60px;
          }
        `}</style>
      </div>
    );
  }
}

export default Index;
