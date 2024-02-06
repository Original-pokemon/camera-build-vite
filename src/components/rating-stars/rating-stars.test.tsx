import { render, screen } from '@testing-library/react';
import RatingStars from './rating-stars';

describe('RatingStars', () => {
  it('renders rating stars correctly', () => {
    const elements = render(<RatingStars rating={3} />);

    const stars = elements.getAllByTestId('icon');

    const fullStars = stars.filter((star) => {
      if (star.firstElementChild) {
        const attribute = star.firstElementChild.getAttribute('xlink:href');
        return attribute === '#icon-full-star';
      }
      return false;
    });
    const emptyStars = stars.filter((star) => {
      if (star.firstElementChild) {
        const attribute = star.firstElementChild.getAttribute('xlink:href');
        return attribute === '#icon-star';
      }
      return false;
    });

    expect(fullStars).toHaveLength(3);

    expect(emptyStars).toHaveLength(2);
  });

  it('renders additional content along with stars', () => {
    render(
      <RatingStars rating={4} className="custom-class">
        <span>Additional Content</span>
      </RatingStars>
    );

    const additionalContent = screen.getByText('Additional Content');
    expect(additionalContent).toBeInTheDocument();
  });
});
