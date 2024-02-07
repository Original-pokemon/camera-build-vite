import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Autoplay, Pagination } from 'swiper/modules';
import Banner from './banner/banner';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { getAllPromos, getPromoStatus } from '../../store/action';
import { useEffect } from 'react';
import { fetchPromos } from '../../store/slices/promo-data/promo-data-thunk';
import { Status } from '../../const';


const Slider = () => {
  const dispatch = useAppDispatch();
  const promos = useAppSelector(getAllPromos);
  const promosLoadStatus = useAppSelector(getPromoStatus);

  const isIdle = promosLoadStatus === Status.Idle;

  useEffect(() => {
    if (isIdle) {
      dispatch(fetchPromos());
    }
  }, [dispatch, isIdle]);

  if (promosLoadStatus === Status.Loading) {
    return null;
  }

  return promos && (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
      data-testid="promo-slider"
    >
      {
        promos.map((promo) => (
          <SwiperSlide key={promo.id} data-testid="slide">
            <Banner promo={promo} />
          </SwiperSlide>
        ))
      }
    </Swiper >
  );
};

export default Slider;
