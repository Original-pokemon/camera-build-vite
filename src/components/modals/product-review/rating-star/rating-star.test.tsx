import { render, screen, } from '@testing-library/react';
import ReviewRatingStar from './rating-star';
import { generateMockState } from '../../../../utils/mocks';
import { withStore } from '../../../../utils/mock-component';


describe('ReviewRatingStar component', () => {
  const props = {
    score: 1,
    title: 'Title',
  };

  it('renders without errors and displays all elements', () => {
    const { withStoreComponent } = withStore(<ReviewRatingStar {...props} />, generateMockState());

    render(withStoreComponent);

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
