import "promise.prototype.finally";
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
    isFetching: true,
    torrents: [],
    error: null
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

  onSuccess = (torrents) => {
    this.setState({
      isFetching: false,
      error: null,
      torrents
    });
  };

  onError = (error) => {
    this.setState({
      isFetching: false,
      error
    });
  };

  onLogin = () => {
    this.setState({ isAuthenticated: true });
    return this.fetchTorrents();
  };

  onAdd = (magnetLink) => delugeWebApi.addTorrent(magnetLink).then(this.fetchTorrents);

  onDelete = (hash) =>
    delugeWebApi.removeTorrent(hash).then(() =>
      this.setState({
        torrents: this.state.torrents.filter((t) => t.hash !== hash)
      })
    );

  fetchTorrents = () => {
    this.setState({ isFetching: true });
    return delugeWebApi
      .getTorrents()
      .then(({ result: { torrents } }) => this.onSuccess(torrents))
      .catch(this.onError);
  };

  render() {
    const { error, isAuthenticated, isFetching, torrents } = this.state;
    return (
      <div className="Index">
        <Header isFetching={isFetching} error={error} />
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

          h2 {
            margin: 0;
            padding: 1rem 0.5rem;
          }

          input {
            border: 1px solid rgba(127, 127, 127, 0.2);
            border-right: none;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 0.5rem 1rem;
          }
        `}</style>
      </div>
    );
  }
}

export default Index;
