import { Link } from 'react-router-dom';
import { ExtendPromosType } from '../../types';

type BannerProps = {
  promo: ExtendPromosType;
}

const BannerComponent = ({ promo }: BannerProps) => {
  const { id, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, description } = promo;


  return (
    <div className="banner">
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
        <span className="banner__text">{description}</span>
        <Link className="btn" to={`/product/${id}`}>
          Подробнее
        </Link>
      </p>
    </div>
  );
};

export default BannerComponent;
