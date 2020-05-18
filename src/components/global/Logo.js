import React from "react";

const Logo = ({ ...props }) => {
  const styles = {
    logoContainer: {
      cursor: "pointer",
    },
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="188.47"
      height="38.62"
      viewBox="0 0 188.47 38.62"
      style={styles.logoContainer}
      {...props}
    >
      <text
        fill="#0396a6"
        fontFamily="HWTMardell, HWT Mardell"
        fontSize="36"
        transform="translate(0 30.82)"
      >
        <tspan letterSpacing="-.04em">C</tspan>
        <tspan x="21.56" y="0">
          c
        </tspan>
        <tspan x="44.68" y="0" fill="#d95a11" letterSpacing="-.04em">
          G
        </tspan>
        <tspan x="70.88" y="0" fill="#d95a11" letterSpacing="0em">
          aming
        </tspan>
      </text>
      <path
        fill="none"
        stroke="#038c5a"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M2.47 33.62L175.47 33.62"
      ></path>
    </svg>
  );
};

export default Logo;
