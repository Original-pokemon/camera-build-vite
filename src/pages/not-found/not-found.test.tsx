import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './not-found';

test('renders 404 page with correct content', () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  const titleElement = screen.getByText(/404/i);
  expect(titleElement).toBeInTheDocument();

  const descriptionElement = screen.getByText(/Страница, которую вы ищете, не найдена/i);
  expect(descriptionElement).toBeInTheDocument();

  const linkElement = screen.getByRole('link', { name: /На главную/i });
  expect(linkElement).toHaveAttribute('href', '/');
});
