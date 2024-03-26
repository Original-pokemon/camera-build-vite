import { Route, Routes } from 'react-router-dom';
import CatalogPage from '../../pages/catalog/catalog';
import Layout from '../layout/layout';
import { AppRoute } from '../../const';
import BasketPage from '../../pages/basket/basket';
import NotFoundPage from '../../pages/not-found/not-found';
import ProductPage from '../../pages/product/product';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { BasketItemType } from '../../types';
import { getBasketItems, setBasket } from '../../store/action';
import { useEffect, useState } from 'react';

const App = () => {
  const dispatch = useAppDispatch();
  const basketProducts = useAppSelector(getBasketItems);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) {

      localStorage.setItem('basket', JSON.stringify(basketProducts));
    }
  }, [basketProducts, isMounted]);

  useEffect(() => {
    if (!isMounted) {
      const localStorageBasket = localStorage.getItem('basket');
      const products = localStorageBasket ? JSON.parse(localStorageBasket) as BasketItemType[] : null;

      if (products) {
        dispatch(setBasket(products));
      }
      setIsMounted(true);
    }

  }, [dispatch, isMounted]);

  return (
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
  );
};
export default App;
