import './styles.css';

import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { useEffect } from 'react';
import { ProductType } from '../../../types';
import ProductCard from '../../product-card/product-card';
import Icon from '../../icon/icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { fetchSimilarProducts } from '../../../store/slices/similar-products-data/similar-products-data-thunk';
import { getSimilarProducts, getSimilarProductsStatus } from '../../../store/action';
import { Status } from '../../../const';
import Spinner from '../../spinner/spinner';

type SimilarProductsProps = {
  product: ProductType;
}

const SimilarProducts = ({ product }: SimilarProductsProps) => {
  const dispatch = useAppDispatch();
  const similarProducts = useAppSelector(getSimilarProducts);
  const similarProductsStatus = useAppSelector(getSimilarProductsStatus);
  const isLoading = similarProductsStatus === Status.Loading;
  const isLoaded = similarProductsStatus === Status.Success;
  const { id } = product;

  useEffect(() => {
    dispatch(fetchSimilarProducts(id));
  }, [dispatch, id]);

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          {isLoading && <Spinner />}
          {similarProducts && isLoaded && (
            <div className="product-similar__slider" data-testid="similar-products-slider">
              <div className="product-similar__slider-list">

                <Swiper
                  navigation={
                    {
                      nextEl: '.slider-controls--next',
                      prevEl: '.slider-controls--prev',
                    }
                  }
                  slidesPerView={3}
                  modules={[Navigation]}
                >
                  {similarProducts.map((similarProduct) => (
                    <SwiperSlide key={similarProduct.id} data-testid="similar-product-slide">
                      <ProductCard product={similarProduct} isActive />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <button
                className="slider-controls slider-controls--prev"
                type="button"
                aria-label="Предыдущий слайд"
              >
                <Icon icon={'#icon-arrow'} svgSize={{ width: 7, height: 12 }} ariaHidden />
              </button>

              <button
                className="slider-controls slider-controls--next"
                type="button"
                aria-label="Следующий слайд"
              >
                <Icon icon={'#icon-arrow'} svgSize={{ width: 7, height: 12 }} ariaHidden />
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default SimilarProducts;
