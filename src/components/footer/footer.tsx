import { navigationItems, socialItems } from '../../const/footer';
import Logo from '../logo/logo';
import FooterNavItem from './footer-nav-item/footer-nav-item';
import SocialList from './social-list/social-list';

const FooterComponent = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__info">
        <Logo className={'footer__logo'} href={'index.html'} label={'Переход на главную'} svgSize={{
          width: 100,
          height: 36
        }}
        />
        <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
        <SocialList socialItems={socialItems} />
      </div>
      <ul className="footer__nav">
        {navigationItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <FooterNavItem key={index} {...item} />
        ))}
      </ul>
    </div>
  </footer>
);

export default FooterComponent;
