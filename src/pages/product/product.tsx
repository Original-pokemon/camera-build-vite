import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Product from '../../components/product/product';
import ReviewsBlock from '../../components/product/reviews-block/reviews-block';
import SimilarProducts from '../../components/product/similar-products/similar-products';
import { useAppSelector } from '../../hooks/state';
import { AppRoute } from '../../const';
import { getProduct } from '../../store/action';
import { useEffect } from 'react';
import useSmoothScrollToElement from '../../hooks/use-scroll-to-element';

const ProductPage = () => {
  const { id } = useParams();
  const product = useAppSelector((state) => getProduct(state, Number(id)));
  const breadcrumbs = [{ link: AppRoute.Main, text: 'Главная' }, { link: AppRoute.Main, text: 'Каталог' }, { link: `product/${String(id)}`, text: String(product?.name) }];
  const scrollToElement = useSmoothScrollToElement();

  useEffect(() => {
    scrollToElement();
  }, [id, scrollToElement]);

  return product && (
    <div className="page-content">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Product product={product} />
      <SimilarProducts product={product} />
      <ReviewsBlock productId={Number(id)} />
    </div>
  );

};

export default ProductPage;
