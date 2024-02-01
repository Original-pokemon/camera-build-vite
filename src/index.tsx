import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import store from './store';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { fetchProducts } from './store/slices/product-data/product-data-thunk';

store.dispatch(fetchProducts());

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
