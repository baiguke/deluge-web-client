import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Head from "next/head";

import distanceInWords from "date-fns/distance_in_words";

import Spinner from "../Spinner/Spinner";
import { primaryColor } from "../../utils/variables";

class Header extends React.Component {
  state = { timeSinceBuild: null };

  componentDidMount() {
    this.updateTimeSinceBuild();
    this.intervalID = setInterval(this.updateTimeSinceBuild, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  buildTime = Number(process.env.BUILD_TIME);

  updateTimeSinceBuild = () => {
    this.setState({
      timeSinceBuild: distanceInWords(Date.now(), this.buildTime)
    });
  };

  render() {
    const { className, isFetching, error } = this.props;
    const { timeSinceBuild } = this.state;
    const title = "Deluge mobile";
    return (
      <header className={classNames(className, "Header")}>
        <Head>
          <meta charSet="utf-8" key="charset" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" key="x-ua-compatible" />
          <title>{title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <meta name="description" content="Deluge mobile client" key="description" />
          <link rel="manifest" href="/static/manifest.json" />

          <link rel="shortcut icon" href="/static/icons/deluge.png" type="image/png" key="shortcutIcon" />
          <link rel="icon" href="/static/icons/deluge.png" type="image/png" key="icon" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            media="screen and (resolution: 163dpi)"
            href="/static/icons/apple-pre-57.png"
            key="appleIconSmall"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            media="screen and (resolution: 132dpi)"
            href="/static/icons/apple-pre-72.png"
            key="appleIconMedium"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            media="screen and (resolution: 326dpi)"
            href="/static/icons/apple-pre-114.png"
            key="appleIconLarge"
          />

          <meta name="theme-color" content={primaryColor} key="themeColor" />

          <meta name="application-name" content="Deluge Mobile" key="app-name" />
          <meta name="mobile-web-app-capable" content="yes" key="web-app-capable" />
          <meta name="apple-mobile-web-app-capable" content="yes" key="apple-web-app-capable" />
          <meta name="apple-mobile-web-app-title" content="Deluge mobile" key="web-app-title" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
            key="web-app-status-bar-style"
          />

          <meta name="format-detection" content="telephone=no" key="format-detection" />
        </Head>
        <h1>{title}</h1>
        {isFetching && <Spinner />}
        {!isFetching && error && <p className="error">{error.message}</p>}
        <p>
          <small>{timeSinceBuild}</small>
        </p>
        <style jsx>{`
          header {
            background: ${primaryColor};
            color: ghostwhite;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5em 1em;
          }

          h1 {
            margin: 0;
          }

          .error {
            background: rgba(65, 105, 225, 0.5);
            border: 1px solid lightsalmon;
            color: gainsboro;
          }

          p {
            font-size: 0.75em;
            font-weight: 100;
            margin: 0;
            padding: 0.5em;
          }
        `}</style>
      </header>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  error: PropTypes.shape({}),
  isFetching: PropTypes.bool.isRequired
};

export default Header;
