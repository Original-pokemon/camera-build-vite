import { useAppSelector } from '../../hooks/state';
import { getBasketItems } from '../../store/action';
import BasketItem from './basket-item';

const BasketList = () => {
  const products = useAppSelector(getBasketItems);

  return (
    <ul className="basket__list">
      {products.map((basketItem) => (
        <BasketItem key={basketItem.id} basketItem={basketItem} />
      ))}
    </ul>
  );
};

export default BasketList;
