import { Link } from 'react-router-dom';
import './not-found.css';
const NotFoundPage = () => (
  <div className="not-found">
    <div className="not-found__content">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__description">Oops! Страница, которую вы ищете, не найдена.</p>
      <Link to="/" className="not-found__link">На главную</Link>
    </div>
  </div>
);

export default NotFoundPage;
