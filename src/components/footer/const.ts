const SOCIAL_ICON_SIZE = {
  width: 20,
  height: 20
};

const socialItems = [
  { icon: { type: '#icon-vk', size: SOCIAL_ICON_SIZE }, label: 'Переход на страницу вконтатке', href: 'https://vk.com' },
  { icon: { type: '#icon-pinterest', size: SOCIAL_ICON_SIZE }, label: 'Переход на страницу pinterest', href: 'https://www.pinterest.com' },
  { icon: { type: '#icon-reddit', size: SOCIAL_ICON_SIZE }, label: 'Переход на страницу reddit', href: 'https://www.reddit.com' },
];

const navigationItems = [
  {
    title: 'Навигация', items: [
      { link: '#', text: 'Каталог' },
      { link: '#', text: 'Гарантии' },
      { link: '#', text: 'Доставка' },
      { link: '#', text: 'О компании' },
    ]
  },
  {
    title: 'Ресурсы', items: [
      { link: '#', text: 'Курсы операторов' },
      { link: '#', text: 'Блог' },
      { link: '#', text: 'Сообщество' },
    ]
  },
  {
    title: 'Поддержка', items: [
      { link: '#', text: 'FAQ' },
      { link: '#', text: 'Задать вопрос' },
    ]
  }
];

export {
  socialItems,
  navigationItems,
};
