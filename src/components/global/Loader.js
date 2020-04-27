import React from 'react';

const Loader = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: 'auto',
          background: 'rgb(255, 255, 255)',
          WebkitAnimationPlayState: 'running',
          animationPlayState: 'running',
          WebkitAnimationDelay: '0s',
          animationDelay: '0s',
        }}
        width="200"
        height="200"
        display="block"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 100 100"
      >
        <g
          style={{
            WebkitAnimationPlayState: 'running',
            animationPlayState: 'running',
            WebkitAnimationDelay: '0s',
            animationDelay: '0s',
          }}
          fill="#e15b64"
        >
          <circle
            cx="70.085"
            cy="50"
            r="4"
            style={{
              WebkitAnimationPlayState: 'running',
              animationPlayState: 'running',
              WebkitAnimationDelay: '0s',
              animationDelay: '0s',
            }}
          >
            <animate
              attributeName="cx"
              begin="-0.67s"
              dur="1s"
              keyTimes="0;1"
              repeatCount="indefinite"
              values="95;35"
            ></animate>
            <animate
              attributeName="fill-opacity"
              begin="-0.67s"
              dur="1s"
              keyTimes="0;0.2;1"
              repeatCount="indefinite"
              values="0;1;1"
            ></animate>
          </circle>
          <circle
            cx="90.485"
            cy="50"
            r="4"
            style={{
              WebkitAnimationPlayState: 'running',
              animationPlayState: 'running',
              WebkitAnimationDelay: '0s',
              animationDelay: '0s',
            }}
          >
            <animate
              attributeName="cx"
              begin="-0.33s"
              dur="1s"
              keyTimes="0;1"
              repeatCount="indefinite"
              values="95;35"
            ></animate>
            <animate
              attributeName="fill-opacity"
              begin="-0.33s"
              dur="1s"
              keyTimes="0;0.2;1"
              repeatCount="indefinite"
              values="0;1;1"
            ></animate>
          </circle>
          <circle
            cx="50.285"
            cy="50"
            r="4"
            style={{
              WebkitAnimationPlayState: 'running',
              animationPlayState: 'running',
              WebkitAnimationDelay: '0s',
              animationDelay: '0s',
            }}
          >
            <animate
              attributeName="cx"
              begin="0s"
              dur="1s"
              keyTimes="0;1"
              repeatCount="indefinite"
              values="95;35"
            ></animate>
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1s"
              keyTimes="0;0.2;1"
              repeatCount="indefinite"
              values="0;1;1"
            ></animate>
          </circle>
        </g>
        <g
          style={{
            WebkitAnimationPlayState: 'running',
            animationPlayState: 'running',
            WebkitAnimationDelay: '0s',
            animationDelay: '0s',
          }}
          fill="#f8b26a"
        >
          <path
            d="M50 50V20a30 30 0 000 60z"
            style={{
              WebkitAnimationPlayState: 'running',
              animationPlayState: 'running',
              WebkitAnimationDelay: '0s',
              animationDelay: '0s',
            }}
            transform="translate(-15)"
          ></path>
          <path
            d="M50 50L22.37 38.313a30 30 0 0055.26 23.374z"
            style={{
              WebkitAnimationPlayState: 'running',
              animationPlayState: 'running',
              WebkitAnimationDelay: '0s',
              animationDelay: '0s',
            }}
            transform="translate(-15)"
          >
            <animateTransform
              attributeName="transform"
              dur="1s"
              keyTimes="0;0.5;1"
              repeatCount="indefinite"
              type="rotate"
              values="0 50 50;45 50 50;0 50 50"
            ></animateTransform>
          </path>
          <path
            d="M50 50L22.37 61.687a30 30 0 0155.26-23.374z"
            style={{
              WebkitAnimationPlayState: 'running',
              animationPlayState: 'running',
              WebkitAnimationDelay: '0s',
              animationDelay: '0s',
            }}
            transform="translate(-15)"
          >
            <animateTransform
              attributeName="transform"
              dur="1s"
              keyTimes="0;0.5;1"
              repeatCount="indefinite"
              type="rotate"
              values="0 50 50;-45 50 50;0 50 50"
            ></animateTransform>
          </path>
        </g>
      </svg>
    </div>
  );
};

export default Loader;
