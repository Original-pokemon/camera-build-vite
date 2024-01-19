import { Route, Routes } from 'react-router-dom';
import CatalogPage from '../../pages/catalog/catalog';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history/browser-history';

const App = () => (
  <HistoryRouter history={browserHistory}>
    <Routes>
      <Route path='/'>
        <Route
          index
          element={<CatalogPage />}
        />

      </Route>
    </Routes >
  </HistoryRouter>
);

export default App;
