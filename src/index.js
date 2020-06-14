import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import App from './App'
import reducers from './redux/reducers'
// import { composeWithDevTools } from 'redux-devtools-extension';

require('dotenv').config()

// load back state in local storage to reducers
const persistConfig = {
    key: 'auth',
    storage,
    whitelist : ['isLogin']
  }
  
  const persistedReducer = persistReducer(persistConfig, reducers)
  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
