const SimilarProducts = () => (
  <div className="page-content__section">
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {/* Пример для товара FastShot MR-5 */}
            <div className="product-card is-active">
              <div className="product-card__img">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/fast-shot.webp, img/content/fast-shot@2x.webp 2x"
                  />
                  <img
                    src="img/content/fast-shot.jpg"
                    srcSet="img/content/fast-shot@2x.jpg 2x"
                    width="280"
                    height="240"
                    alt="Фотоаппарат FastShot MR-5"
                  />
                </picture>
              </div>
              <div className="product-card__info">
                <div className="rate product-card__rate">
                  {[...Array(5)].map((_, index) => (
                    <svg key={index} width="17" height="16" aria-hidden="true">
                      {index < 4 ? (
                        <use xlinkHref="#icon-full-star"></use>
                      ) : (
                        <use xlinkHref="#icon-star"></use>
                      )}
                    </svg>
                  ))}
                  <p className="visually-hidden">Рейтинг: 4</p>
                  <p className="rate__count">
                    <span className="visually-hidden">Всего оценок:</span>12
                  </p>
                </div>
                <p className="product-card__title">FastShot MR-5</p>
                <p className="product-card__price">
                  <span className="visually-hidden">Цена:</span>18 970 ₽
                </p>
              </div>
              <div className="product-card__buttons">
                <button className="btn btn--purple product-card__btn" type="button">
                  Купить
                </button>
                <a className="btn btn--transparent" href="#">
                  Подробнее
                </a>
              </div>
            </div>
            {/* Добавьте аналогичные блоки для других похожих товаров */}
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
);

export default SimilarProducts;
