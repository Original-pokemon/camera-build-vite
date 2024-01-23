import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Product from '../../components/product/product';
import ReviewsBlock from '../../components/product/reviews-block/reviews-block';
import SimilarProducts from '../../components/product/similar-products/similar-products';
import Icon from '../../components/icon/icon';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { fetchProduct } from '../../store/api-action';

const ProductPage = () => {
  const { id } = useParams();
  const product = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(Number(id)));
    }
  }, [dispatch, id]);

  return product && (
    <div className="page-content">
      <Product product={product} />
      <SimilarProducts />
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
    </div>
  );

};

export default ProductPage;
