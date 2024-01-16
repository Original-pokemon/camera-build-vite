import IconComponent from '../../../icon/icon';

type RatingStarsProps = {
  rating: number;
}

const RatingStarsComponent = ({ rating }: RatingStarsProps) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <IconComponent key={index} icon={star <= rating ? '#icon-full-star' : '#icon-star'} svgSize={{ width: 17, height: 16 }} ariaHidden />

      ))}
    </div>
  );
};

export default RatingStarsComponent;
