import { useAppSelector } from '../../hooks/state';
import { getBasketItems } from '../../store/action';
import BasketItem from './basket-item';

const BasketList = () => {
  const products = useAppSelector(getBasketItems);

  return (
    <ul className="basket__list" data-testid="basket-list">
      {!products.length && <li className="basket-item">Корзина пуста</li>}

      {products.map((basketItem) => (
        <BasketItem key={basketItem.id} basketItem={basketItem} />
      ))}
    </ul>
  );
};

export default BasketList;
