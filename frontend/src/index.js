import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GoogleOAuthProvider } from "@react-oauth/google"

import store from './app/store';
import { Provider } from 'react-redux';
import { Provider as TsProvider } from 'react-redux';
import tsStore from "./app/store.ts"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='446869730389-kmc18oa4o7pumdtgeg62nb5s0u1o8dfi.apps.googleusercontent.com'>
    {/* <React.StrictMode> */}
    <TsProvider store={tsStore}>
      <Provider store={store}>
        <App />
      </Provider>
    </TsProvider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
