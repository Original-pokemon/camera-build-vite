import { ChangeEvent, FormEvent, useRef, MouseEvent, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { getBasketIds, getBasketItems, getCoupon, getCouponStatus, getOrderStatus, showModal } from '../../store/action';
import { getProductPriceFormat } from '../../utils/product';
import { postCoupon, postOrder } from '../../store/slices/basket-data/basket-data-thunk';
import { debounce } from '../../utils/debounce';
import { ModalName, Status } from '../../const';
import classNames from 'classnames';
import { toast } from 'react-toastify';

const BasketSummary = () => {
  const dispatch = useAppDispatch();

  const basketProducts = useAppSelector(getBasketItems);
  const basketProductsIds = useAppSelector(getBasketIds);

  const couponInputRef = useRef<HTMLInputElement | null>(null);
  const couponDiscount = useAppSelector(getCoupon);
  const [couponValue, setCouponValue] = useState(couponInputRef.current?.value ?? null);

  const orderStatus = useAppSelector(getOrderStatus);
  const isOrderValid = orderStatus === Status.Success;
  const isOrderLoading = orderStatus === Status.Loading;
  const isOrderInvalid = orderStatus === Status.Error;

  const couponStatus = useAppSelector(getCouponStatus);
  const isCouponInvalid = couponStatus === Status.Error;
  const isCouponLoading = couponStatus === Status.Loading;
  const isCouponValid = couponStatus === Status.Success;

  const summaryPrice = basketProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const summaryPriceFormatted = getProductPriceFormat(summaryPrice);

  const bonus = couponDiscount ? summaryPrice * (couponDiscount / 100) : 0;
  const bonusFormatted = getProductPriceFormat(bonus);

  const totalPrice = summaryPrice - bonus;
  const totalPriceFormatted = getProductPriceFormat(totalPrice);

  const onCouponInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const eventInput = target.value.trim().split(' ')[0];

    target.value = eventInput;
    setCouponValue(eventInput);
  };

  const [onCouponInputChangeDebounced] = debounce(onCouponInputChange, 500);

  const handleCouponSubmitButton = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const couponInput = couponInputRef.current;

    if (couponInput) {

      if (couponValue) {
        dispatch(postCoupon(couponValue));
      }
    }
  };

  const handleSubmitButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(postOrder({
      coupon: couponValue,
      camerasIds: basketProductsIds
    }));
  };

  useEffect(() => {
    if (isOrderInvalid) {
      toast.error('Произошла ошибка при оформлении заказа');
    }

    if (isOrderValid) {
      if (couponInputRef.current) {
        couponInputRef.current.value = '';
      }

      dispatch(showModal(ModalName.OrderPostSuccess));
    }
  });

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#" onSubmit={handleCouponSubmitButton}>
            <div className={classNames('custom-input', { 'is-invalid': isCouponInvalid }, { 'is-valid': isCouponValid })}>

              <label>
                <span className="custom-input__label">Промокод</span>
                <input type="text" defaultValue={couponValue ?? ''} name="promo" placeholder="Введите промокод" ref={couponInputRef} disabled={isCouponLoading || !basketProducts.length} onChange={onCouponInputChangeDebounced} />
              </label>

              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>

            <button className="btn" type="submit" disabled={isCouponLoading || !basketProducts.length}>Применить
            </button>
          </form>
        </div>
      </div>

      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{summaryPriceFormatted} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className="basket__summary-value basket__summary-value--bonus">{bonusFormatted} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
          <span className="basket__summary-value basket__summary-value--total">{totalPriceFormatted} ₽</span>
        </p>

        <button className="btn btn--purple" type="submit" onClick={handleSubmitButtonClick} disabled={(isOrderLoading || !basketProducts.length)}>Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default BasketSummary;

