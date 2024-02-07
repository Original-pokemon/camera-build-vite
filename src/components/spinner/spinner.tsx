import './spinner.css';

const Spinner = () => (
  <div className="loader" data-testid="loader">
    <div className="loader__spinner" data-testid="spinner"></div>
  </div>
);

export default Spinner;
