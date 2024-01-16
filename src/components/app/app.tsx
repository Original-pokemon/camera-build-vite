import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CatalogPage from '../../pages/catalog/catalog';

const App = () => (
  <BrowserRouter>

    <Routes>
      <Route path='/'>
        <Route
          index
          element={<CatalogPage />}
        />

      </Route>
    </Routes >
  </BrowserRouter>
);

export default App;
