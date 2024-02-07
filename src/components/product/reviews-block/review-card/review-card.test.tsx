import { render, screen } from '@testing-library/react';
import ReviewCard from './review-card';
import { generateReviewMock } from '../../../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory } from '../../../../utils/mock-component';

describe('ReviewCard component', () => {
  const reviewData = generateReviewMock();
  let mockHistory: MemoryHistory;


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders correctly with default props', () => {
    const withHistoryComponent = withHistory(<ReviewCard {...reviewData} />, mockHistory);
    render(withHistoryComponent);

    const reviewCard = screen.getByTestId('review-card');
    expect(reviewCard).toBeInTheDocument();
  });
});
