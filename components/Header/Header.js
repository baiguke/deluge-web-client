import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Head from "next/head";

const Header = ({ className, title, isFetching }) => (
  <header className={classNames(className, "Header")}>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <meta name="metaDescription" content="Deluge web client for mobile" key="description" />
      <meta name="theme-color" content="whitesmoke" key="theme" />
    </Head>
    <h1>{title}</h1>
    {isFetching && <div className="spinner" />}
    <style jsx>{`
      header {
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
    `}</style>
  </header>
);

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Header;
