import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Product from '../../components/product/product';
import ReviewsBlock from '../../components/product/reviews-block/reviews-block';
import SimilarProducts from '../../components/product/similar-products/similar-products';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { AppRoute, Status } from '../../const';
import { getProduct, getProductsStatus, redirectToRoute } from '../../store/action';
import { useEffect } from 'react';
import useSmoothScrollToElement from '../../hooks/use-scroll-to-element';
import Spinner from '../../components/spinner/spinner';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const productLoadStatus = useAppSelector(getProductsStatus);
  const product = useAppSelector((state) => getProduct(state, Number(id)));
  const breadcrumbs = [{ link: AppRoute.Main, text: 'Главная' }, { link: AppRoute.Main, text: 'Каталог' }, { link: `product/${String(id)}`, text: String(product?.name) }];
  const scrollToElement = useSmoothScrollToElement();

  const isLoaded = productLoadStatus === Status.Success;
  const isLoading = productLoadStatus === Status.Loading;

  useEffect(() => {
    scrollToElement();
  }, [scrollToElement]);

  if (!product && isLoaded) {
    dispatch(redirectToRoute(AppRoute.PageNotFound));
  }

  return (
    <div className="page-content">
      {isLoading && <Spinner />}
      {product && isLoaded && (
        <>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Product product={product} />
          <SimilarProducts product={product} />
          <ReviewsBlock productId={Number(id)} />
        </>
      )}

    </div>
  );

};

export default ProductPage;
