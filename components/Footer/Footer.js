import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { primaryColor } from "../../utils/variables";

const Footer = ({ className }) => (
  <footer className={classNames("Footer", className)}>
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
      <a className="animated" href="https://github.com/hontas/deluge-web-client">
        GitHub
      </a>
    </p>
    <style jsx>{`
      .Footer {
        background: ${primaryColor};
        color: ghostwhite;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em;
      }

      .Footer a {
        color: white;
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
  </footer>
);

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
