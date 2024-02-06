import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../utils/mock-component';

describe('Footer', () => {
  it('renders correctly', () => {
    const componentWithHistory = withHistory(<Footer />);
    render(componentWithHistory);

    // Проверяем, что логотип отображается
    const logoElement = screen.getByLabelText('Переход на главную');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveClass('footer__logo');

    // Проверяем, что описание футера отображается
    const descriptionElement = screen.getByText('Интернет-магазин фото- и видеотехники');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveClass('footer__description');
  });
});
