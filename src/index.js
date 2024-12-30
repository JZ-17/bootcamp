import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'firebase/database'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers } from '@reduxjs/toolkit';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { firebaseReducer } from 'react-redux-firebase';
import { createStore } from 'redux';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArwa3PqBffVpy4fb-AwO82BcH_3h8z1a8",
  authDomain: "bootcamp-4b036.firebaseapp.com",
  databaseURL: "https://bootcamp-4b036-default-rtdb.firebaseio.com",
  projectId: "bootcamp-4b036",
  storageBucket: "bootcamp-4b036.appspot.com",
  messagingSenderId: "393561566714",
  appId: "1:393561566714:web:493239a07ae58d325a8843",
  measurementId: "G-PGWV5067Q8"
};

// Initialize Firebase and Database
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

// Console log to ensure Firebase is initialized
console.log('Firebase initialized:', app);
console.log('Database initialized:', database);

// Redux configuration
const rrfConfig = {
  userProfile: 'users', 
  useFirestoreForProfile: false, 
};

const rootReducer = combineReducers({
  firebase: firebaseReducer, // Integrate firebaseReducer
});

const store = createStore(rootReducer);

const rrfProps = {
  firebase: app,
  config: rrfConfig,
  dispatch: store.dispatch,
};

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>
);
