import { render, screen, fireEvent } from '@testing-library/react';
import ReviewsBlock from './reviews-block';
import { showModal } from '../../../store/action';
import { ModalName } from '../../../const/modal';
import { NameSpace, Status } from '../../../const';
import { generateReviewsMock, generateMockState } from '../../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../../utils/mock-component';

vi.mock('./review-card/review-card', () => ({
  default: () => <div>Review Card</div>,
}));

describe('ReviewsBlock component', () => {
  const productId = 1;
  const reviews = generateReviewsMock();
  let mockHistory: MemoryHistory;


  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders correctly with default props', () => {
    const VISIBLE_REVIEW_COUNT = 3;
    const initialState = {
      [NameSpace.Review]: {
        status: Status.Success,
        postStatus: Status.Idle,
        reviews
      }
    };
    const withHistoryComponent = withHistory(<ReviewsBlock productId={productId} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));
    render(withStoreComponent);

    const reviewsTitle = screen.getByText('Отзывы');
    expect(reviewsTitle).toBeInTheDocument();

    const reviewCards = screen.getAllByText('Review Card');
    expect(reviewCards).toHaveLength(VISIBLE_REVIEW_COUNT);

    const addButton = screen.getByText('Оставить свой отзыв');
    expect(addButton).toBeInTheDocument();
  });

  it('dispatches showModal action when Add Review button is clicked', () => {
    const initialState = {
      [NameSpace.Review]: {
        status: Status.Success,
        postStatus: Status.Idle,
        reviews
      }
    };
    const withHistoryComponent = withHistory(<ReviewsBlock productId={productId} />, mockHistory);
    const { withStoreComponent, mockStore } = withStore(withHistoryComponent, generateMockState(initialState));
    render(withStoreComponent);

    const addButton = screen.getByText('Оставить свой отзыв');
    fireEvent.click(addButton);

    expect(mockStore.getActions()).toContainEqual(showModal(ModalName.ProductReview));
  });

  it('displays "Show more reviews" button if there are more reviews to show', () => {
    const initialState = {
      [NameSpace.Review]: {
        status: Status.Success,
        postStatus: Status.Idle,
        reviews
      }
    };
    const withHistoryComponent = withHistory(<ReviewsBlock productId={productId} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));
    render(withStoreComponent);

    const showMoreButton = screen.getByText('Показать больше отзывов');
    expect(showMoreButton).toBeInTheDocument();
  });

  it('increments visible reviews count when "Show more reviews" button is clicked', () => {
    const VISIBLE_REVIEW_COUNT = 6;
    const initialState = {
      [NameSpace.Review]: {
        status: Status.Success,
        postStatus: Status.Idle,
        reviews
      }
    };
    const withHistoryComponent = withHistory(<ReviewsBlock productId={productId} />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState(initialState));
    render(withStoreComponent);

    const showMoreButton = screen.getByText('Показать больше отзывов');
    fireEvent.click(showMoreButton);

    const reviewCards = screen.getAllByText('Review Card');
    expect(reviewCards).toHaveLength(VISIBLE_REVIEW_COUNT);
  });
});
