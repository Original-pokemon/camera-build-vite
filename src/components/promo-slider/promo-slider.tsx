import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Autoplay, Pagination } from 'swiper/modules';
import Banner from './banner/banner';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { getAllPromos, getPromoStatus } from '../../store/action';
import { useEffect } from 'react';
import { fetchPromo } from '../../store/slices/promo-data/promo-data-thunk';
import { Status } from '../../const';


const Slider = () => {
  const dispatch = useAppDispatch();
  const promos = useAppSelector(getAllPromos);
  const promosLoadStatus = useAppSelector(getPromoStatus);

  useEffect(() => {
    if (promosLoadStatus === Status.Idle) {
      dispatch(fetchPromo());
    }
  }, [dispatch, promosLoadStatus]);

  return promosLoadStatus === Status.Success && (
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
    >
      {
        promos.map((promo) => (
          <SwiperSlide key={promo.id}>
            <Banner promo={promo} />
          </SwiperSlide>
        ))
      }
    </Swiper >
  );
};

export default Slider;
