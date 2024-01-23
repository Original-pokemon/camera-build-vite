
const ReviewsBlock = () => (
  <div className="page-content__section">
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {/* Пример для отзыва Сергея Горского */}
          <li className="review-card">
            <div className="review-card__head">
              <p className="title title--h4">Сергей Горский</p>
              <time className="review-card__data" dateTime="2022-04-13">
                13 апреля
              </time>
            </div>
            <div className="rate review-card__rate">
              {[...Array(5)].map((_, index) => (
                <svg key={index} width="17" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
              ))}
              <p className="visually-hidden">Оценка: 5</p>
            </div>
            <ul className="review-card__list">
              <li className="item-list">
                <span className="item-list__title">Достоинства:</span>
                <p className="item-list__text">
                  Надёжная, хорошо лежит в руке, необычно выглядит
                </p>
              </li>
              <li className="item-list">
                <span className="item-list__title">Недостатки:</span>
                <p className="item-list__text">Тяжеловата, сложно найти плёнку</p>
              </li>
              <li className="item-list">
                <span className="item-list__title">Комментарий:</span>
                <p className="item-list__text">
                  Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы. Ни у кого из
                  знакомых такой нет, все завидуют) Теперь это жемчужина моей коллекции, однозначно стоит своих
                  денег!
                </p>
              </li>
            </ul>
          </li>
          {/* Добавьте аналогичные блоки для других отзывов */}
        </ul>
        <div className="review-block__buttons">
          <button className="btn btn--purple" type="button">
            Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  </div>
);

export default ReviewsBlock;
