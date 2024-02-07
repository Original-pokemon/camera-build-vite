import { Link } from 'react-router-dom';
import { PromoType } from '../../../types';
import { useAppSelector } from '../../../hooks/state';
import { getProduct } from '../../../store/action';

type BannerProps = {
  promo: PromoType;
}

const Banner = ({ promo }: BannerProps) => {
  const { id, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name } = promo;
  const product = useAppSelector((state) => getProduct(state, id));


  return (
    <div className="banner" data-testid="banner">
      <picture>
        <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
        <img
          src={previewImg}
          srcSet={`${previewImg2x} 2x`}
          width="1280"
          height="280"
          alt={name}
        />
      </picture>

      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{name}</span>
        <span className="banner__text">{product?.description}</span>
        <Link className="btn" to={`/product/${id}`}>
          Подробнее
        </Link>
      </p>
    </div>
  );
};

export default Banner;
