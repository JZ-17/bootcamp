import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { firebaseReducer } from 'react-redux-firebase';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAPeoHXmab_rl6-ilnG0JvijcJQea_g3Ng",
  authDomain: "bootcamp-part-2-c4c74.firebaseapp.com",
  projectId: "bootcamp-part-2-c4c74",
  storageBucket: "bootcamp-part-2-c4c74.firebasestorage.app",
  messagingSenderId: "800174203070",
  appId: "1:800174203070:web:80050e7d4d5bbb5ab47eef",
  databaseURL: "https://bootcamp-part-2-c4c74-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
console.log("Database initialized:", database);

// Combine Reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

// Create Redux Store
const store = configureStore({
  reducer: rootReducer,
});

// react-redux-firebase Config
const rrfConfig = {
  userProfile: "users",
};

const rrfProps = {
  firebase: firebaseApp,
  config: rrfConfig,
  dispatch: store.dispatch,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>
);
