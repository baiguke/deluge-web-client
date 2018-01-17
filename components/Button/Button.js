import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Color from "color";

import Spinner from "../Spinner/Spinner";
import { primaryColor, btnWhite } from "../../utils/variables";

const Button = ({ className, isLoading, text, children, onClick, type = "button", theme = "green" }) => (
  <button className={classNames("Button", `Button--${theme}`, className)} type={type} onClick={onClick}>
    {isLoading ? <Spinner size="1em" /> : <span>{text || children}</span>}
    <style jsx>{`
      .Button {
        min-width: 60px;
        padding: 0.5em 1em;
        text-align: center;
      }
      .Button--green {
        background: ${primaryColor};
        border-color: ${Color(primaryColor).darken(0.3)};
        color: white;
      }
      .Button--white {
        background: ${btnWhite};
        border-color: ${Color(btnWhite).darken(0.3)};
        color: #333;
      }
    `}</style>
  </button>
);

Button.defaultProps = {
  onClick() {}
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  theme: PropTypes.oneOf(["green", "white"]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func
};

export default Button;
