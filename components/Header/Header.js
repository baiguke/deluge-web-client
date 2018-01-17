import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Head from "next/head";
import Spinner from "../Spinner/Spinner";
import { primaryColor } from "../../utils/variables";

const Header = ({ className, title, isFetching }) => (
  <header className={classNames(className, "Header")}>
    <Head>
      <meta charSet="utf-8" key="charset" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <meta name="theme-color" content="cadetblue" key="themeColor" />
      <link rel="manifest" href="/static/manifest.json" />

      <meta name="metaDescription" content="Deluge web client for mobile" key="description" />
      <link rel="shortcut icon" href="/static/icons/deluge.png" type="image/png" key="shortcutIcon" />
      <link rel="icon" href="/static/icons/deluge.png" type="image/png" key="icon" />
      <link
        rel="apple-touch-icon-precomposed"
        media="screen and (resolution: 163dpi)"
        href="/static/icons/apple-pre-57.png"
        key="appleIconSmall"
      />
      <link
        rel="apple-touch-icon-precomposed"
        media="screen and (resolution: 132dpi)"
        href="/static/icons/apple-pre-72.png"
        key="appleIconMedium"
      />
      <link
        rel="apple-touch-icon-precomposed"
        media="screen and (resolution: 326dpi)"
        href="/static/icons/apple-pre-114.png"
        key="appleIconLarge"
      />
      <title>{title}</title>
    </Head>
    <h1>{title}</h1>
    {isFetching && <Spinner />}
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
    `}</style>
  </header>
);

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Header;
