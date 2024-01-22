import Icon from '../../../icon/icon';

type RatingStarsProps = {
  rating: number;
}

const RatingStars = ({ rating }: RatingStarsProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Icon key={index} icon={star <= rating ? '#icon-full-star' : '#icon-star'} svgSize={{ width: 17, height: 16 }} ariaHidden />

      ))}
    </div>
  );
};

export default RatingStars;
