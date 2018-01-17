import React, { Component } from "react";
import Head from "next/head";

import * as delugeWebApi from "../utils/delugeWebApi";

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
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <meta name="metaDescription" content="Deluge web client for mobile" key="description" />
          <meta name="theme-color" content="whitesmoke" key="theme" />
        </Head>
        <header>
          <h1>{title}</h1>
          {isFetching && <div className="spinner" />}
        </header>
        <main>
          {!isAuthenticated && <Login onLogin={this.onLogin} />}
          <TorrentList torrents={torrents} onDelete={this.onDelete} />
          <AddTorrent addTorrent={this.onAdd} />
        </main>
        <footer>
          <p>
            Built with{" "}
            <span role="img" aria-label="heart">
              ❤
            </span>{" "}
            by{" "}
            <a className="animated" href="https://github.com/hontas">
              hontas
            </a>
          </p>
          <p>
            <a className="animated" href="https://github.com/hontas/">
              GitHub
            </a>
          </p>
        </footer>
        <style jsx>{`
          .Index {
            display: flex;
            flex-direction: column;
            height: 100%;
          }

          main {
            flex: 1;
          }

          header,
          footer {
            background: cadetblue;
            color: ghostwhite;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5em 1em;
          }

          h1 {
            margin: 0;
          }

          footer {
            background: cornflowerblue;
            padding: 0 1em;
          }

          footer a {
            color: white;
          }

          .spinner {
            height: 1.5em;
            width: 1.5em;
            animation: rotate 0.8s infinite linear;
            border: 0.25em solid white;
            border-right-color: transparent;
            border-radius: 50%;
          }

          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .animated {
            position: relative;
            display: inline-block;
            text-decoration: none;
          }
          .animated:after {
            background-color: currentColor;
            content: "";
            display: block;
            height: 1px;
            transform: scaleX(0.001);
            transition: transform 0.2s ease-out;
          }
          .animated:hover {
            text-decoration: none;
          }
          .animated:hover:after {
            transform: scaleX(1);
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
