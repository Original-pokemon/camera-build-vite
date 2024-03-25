import BasketList from '../../components/basket/basket-list';
import BasketSummary from '../../components/basket/basket-summary';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { AppRoute } from '../../const';

const BasketPage = () => {
  const breadcrumbs = [{ link: AppRoute.Main, text: 'Главная' }, { link: AppRoute.Main, text: 'Каталог' }];


  return (
    <main>
      <div className="page-content">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <section className="basket">
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <BasketList />
            <BasketSummary />
          </div>
        </section>
      </div>
    </main>
  );
};


export default BasketPage;
