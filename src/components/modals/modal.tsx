import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { getActiveModal, selectProduct, showModal } from '../../store/slices/modal-data/modal-data-selectors';
import { ModalName } from '../../const/modal';
import Icon from '../icon/icon';
import ReactFocusLock from 'react-focus-lock';
import ReviewModal from './product-review/product-review';
import CatalogAddItem from './catalog-add-item/catalog-add-item';
import CatalogAddItemSuccess from './catalog-add-item/catalog-add-item-success';
import ReviewSuccessModal from './product-review/product-review-success';
import { useCallback, useEffect } from 'react';

const ActiveModalElement = {
  [ModalName.ProductReview]: <ReviewModal />,
  [ModalName.ProductAdd]: <CatalogAddItem />,
  [ModalName.ProductAddSuccess]: <CatalogAddItemSuccess />,
  [ModalName.ProductReviewSuccess]: <ReviewSuccessModal />
} as const;

const Modal = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(getActiveModal);
  const isActive = !!activeModal;

  const narrowModals: string[] = [ModalName.ProductAddSuccess, ModalName.ProductReviewSuccess];
  const isNarrow = activeModal && narrowModals.includes(activeModal);


  const handleButtonCloseModalClick = useCallback(() => {
    dispatch(showModal(null));
    dispatch(selectProduct(null));
  }, [dispatch]);


  useEffect(() => {
    const handleEscKeydown = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleButtonCloseModalClick();
      }
    };

    window.addEventListener('keydown', handleEscKeydown);

    if (isActive) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
      document.body.style.overflow = '';
    };
  }, [handleButtonCloseModalClick, isActive]);

  return isActive && (
    <ReactFocusLock>
      <div
        className={classNames('modal', 'is-active', { 'modal--narrow': isNarrow })}
        data-testid='modal'
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleButtonCloseModalClick}></div>
          <div className="modal__content">

            {activeModal && ActiveModalElement[activeModal]}


            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleButtonCloseModalClick}
            >
              <Icon icon={'#icon-close'} svgSize={{ width: 10, height: 10 }} ariaHidden />
            </button>
          </div>
        </div>
      </div >
    </ReactFocusLock >
  );

};

export default Modal;
