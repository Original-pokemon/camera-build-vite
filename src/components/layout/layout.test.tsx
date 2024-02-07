import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateMockState } from '../../utils/mocks';
import Layout from './layout';

vi.mock('../header/header', () => ({
  default: () => <div>Header</div>
}));
vi.mock('../modals/modal', () => ({
  default: () => <div>Modals</div>
}));
vi.mock('../footer/footer', () => ({
  default: () => <div>Footer</div>
}));

describe('Layout component', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('renders Layout correctly', () => {
    const withHistoryComponent = withHistory(<Layout />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, generateMockState());

    render(withStoreComponent);

    const layout = screen.getByTestId('layout');
    expect(layout).toBeInTheDocument();
  });
});
