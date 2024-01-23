import Slider from '../../components/catalog-section/slider/slider';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogSection from '../../components/catalog-section/catalog-section';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { ProductType } from '../../types';
import CatalogAddItem from '../../components/modals/catalog-add-item';
import { useState } from 'react';
import { addToBasket } from '../../store/action';
import { AppRoute } from '../../const';


export default function CatalogPage() {
  const products = useAppSelector((state) => state.products);
  const promos = useAppSelector((state) => state.promos);
  const [selectProduct, setSelectProduct] = useState<ProductType | null>(null);
  const dispatch = useAppDispatch();
  const breadcrumbs = [{ link: AppRoute.Main, text: 'Главная' }, { link: AppRoute.Main, text: 'Каталог' }];

  const handleSelectProduct = (product: ProductType) => {
    setSelectProduct(product);
  };

  const handleAddToBasket = () => {
    if (selectProduct) {
      dispatch(addToBasket(selectProduct));
    }
  };

  const handleCloseModal = () => {
    setSelectProduct(null);
  };

  return (
    <>
      {promos && <Slider promos={promos} />}
      <div className="page-content">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {
          products && <CatalogSection products={products} onBuyButtonClick={handleSelectProduct} />
        }
        {selectProduct && (
          <CatalogAddItem
            product={selectProduct}
            onAddToBasket={handleAddToBasket}
            onContinueShopping={handleCloseModal}
          />
        )}
      </div>
    </>
  );
}


