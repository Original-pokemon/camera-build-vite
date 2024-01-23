import { Route, Routes } from 'react-router-dom';
import CatalogPage from '../../pages/catalog/catalog';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history/browser-history';
import Layout from '../layout/layout';
import { AppRoute } from '../../const';
import BasketPage from '../../pages/basket/basket';
import NotFoundPage from '../../pages/not-found/not-found';
import ProductPage from '../../pages/product/product';

const App = () => (
  <HistoryRouter history={browserHistory}>
    <Routes>
      <Route path={AppRoute.Main} element={<Layout />}>
        <Route
          index
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.Product}
          element={<ProductPage />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage />}
        />
        <Route
          path={AppRoute.PageNotFound}
          element={<NotFoundPage />}
        />
      </Route>
    </Routes >
  </HistoryRouter>
);

export default App;
