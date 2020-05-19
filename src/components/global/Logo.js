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
      width="177.76"
      height="29.98"
      viewBox="0 0 177.76 29.98"
      style={styles.logoContainer}
      {...props}
    >
      <path
        fill="#0396a6"
        d="M20.95 23.47a12.52 12.52 0 01-8.14 3A13 13 0 010 13.36 12.94 12.94 0 0112.81.26a12.51 12.51 0 018.14 3l-8.14 10.1zM42.51 23.51a12.51 12.51 0 01-8.13 3 13 13 0 01-12.82-13.12A13 13 0 0134.39.29a12.51 12.51 0 018.13 3l-8.13 10.1z"
      ></path>
      <path
        fill="#d95a11"
        d="M70.27 14.8a12.83 12.83 0 01-25.6-1.41A13 13 0 0157.52.29a12.52 12.52 0 018.14 3L56.48 14.8zM81.46-.02l10.93 26.19H70.52zM106.77 14.83L118.65.11v26.06H94.89V.11zM125.78 26.17h-3.53V.54h3.53zM149.29.54v25.63h-19.9V.11l16.38 20.48V.54zM177.76 14.76a12.82 12.82 0 01-25.59-1.4A13 13 0 01165.02.26a12.48 12.48 0 018.13 3l-9.18 11.52z"
      ></path>
      <path
        fill="none"
        stroke="#038c5a"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M1.39 28.98L174.39 28.98"
      ></path>
    </svg>
  );
};

export default Logo;
