import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import store from './store';
import { fetchProducts, fetchPromos } from './store/api-action';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

store.dispatch(fetchProducts());
store.dispatch(fetchPromos());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
