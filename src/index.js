import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import Amplify from 'aws-amplify'
// import config from 'config';

// Amplify.configure({
//   API: {
//     endpoints: [
//       {
//         name: 'prod',
//         endpoint: config.apiGateway.URL,
//         region: config.apiGateway.REGION
//       }
//     ]
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
