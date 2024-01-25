import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { ExtendPromosType } from '../../types';
import Banner from './banner/banner';


type SliderProps = {
  promos: ExtendPromosType[];
}

const Slider = ({ promos }: SliderProps) => (
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

export default Slider;
