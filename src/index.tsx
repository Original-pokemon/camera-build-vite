import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import store from './store';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { fetchProducts } from './store/slices/product-data/product-data-thunk';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history/browser-history';

store.dispatch(fetchProducts());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </HistoryRouter>
  </React.StrictMode>
);
