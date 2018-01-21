import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Spinner = ({ className, size = "1.5em" }) => (
  <div className={classNames("Spinner", className)} style={{ width: size, height: size }}>
    <style jsx>{`
      .Spinner {
        animation: rotate 0.8s infinite linear;
        border: 0.25em solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        margin: 0 auto;
      }

      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </div>
);

Spinner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string
};

export default Spinner;
