import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Product from '../../components/product/product';
import ReviewsBlock from '../../components/product/reviews-block/reviews-block';
import SimilarProducts from '../../components/product/similar-products/similar-products';
import Icon from '../../components/icon/icon';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { fetchProduct } from '../../store/api-action';
import { AppRoute } from '../../const';
import CatalogAddItem from '../../components/modals/catalog-add-item/catalog-add-item';

const ProductPage = () => {
  const { id } = useParams();
  const product = useAppSelector((state) => state.product);
  const selectedProduct = useAppSelector((state) => state.selectedProduct);
  const dispatch = useAppDispatch();
  const breadcrumbs = [{ link: AppRoute.Main, text: 'Главная' }, { link: AppRoute.Main, text: 'Каталог' }, { link: `product/${String(id)}`, text: String(product?.name) }];
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(Number(id)));
    }
  }, [dispatch, id]);
  return product && (
    <div className="page-content">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Product product={product} />
      <SimilarProducts product={product} />
      <ReviewsBlock />

      <Link
        className="up-btn"
        to={'#header'}
      >
        <Icon icon={'#icon-arrow2'} svgSize={{
          width: 12,
          height: 18
        }} ariaHidden
        />
      </Link>
      {selectedProduct && <CatalogAddItem selectedProduct={selectedProduct} />}
    </div>
  );

};

export default ProductPage;
