import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type ProductTabsContentProps = {
  vendorCode: string;
  category: string;
  type: string;
  level: string;
  description: string;
}

const Tabs = {
  Features: 'features',
  Description: 'description',
} as const;


type TabsType = typeof Tabs[keyof typeof Tabs];

const getTabsContent = (
  activeTab: TabsType,
  vendorCode: string,
  category: string,
  type: string,
  level: string,
  description: string
) => {
  const TabContent = {
    [Tabs.Description]: (
      <div className="product__tabs-text">
        {description}
      </div>),
    [Tabs.Features]: (
      <ul className="product__tabs-list">
        <li className="item-list">
          <span className="item-list__title">Артикул:</span>
          <p className="item-list__text">{vendorCode}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Категория:</span>
          <p className="item-list__text">{category}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Тип камеры:</span>
          <p className="item-list__text">{type}</p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Уровень:</span>
          <p className="item-list__text">{level}</p>
        </li>
      </ul>
    ),
  };

  return (
    <div className="tabs__content">
      <div
        className='tabs__element is-active '
      >
        {TabContent[activeTab]}
      </div>

    </div>
  );
};

const getTabsControls = (activeTab: TabsType, onClick: (activeTab: TabsType) => void) => {
  const TabControlContent = {
    [Tabs.Features]: 'Характеристики',
    [Tabs.Description]: 'Описание',
  };

  return (
    <div className="tabs__controls product__tabs-controls">

      {
        Object.values(Tabs).map((key) => (
          <button
            key={key}
            className={`tabs__control ${key === activeTab ? 'is-active' : ''}`}
            type="button"
            onClick={() => onClick(key as TabsType)}
          >
            {TabControlContent[key]}
          </button>
        ))
      }

    </div>
  );
};

const ProductTabsContent = ({ vendorCode, category, type, level, description }: ProductTabsContentProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('activeTab') || Tabs.Description) as TabsType;
  const [activeTab, setActiveTab] = useState<TabsType>(initialTab);

  const onClick = (selectTab: TabsType) => {
    setActiveTab(selectTab);
    setSearchParams({ activeTab: selectTab });
  };

  return (
    <div className="tabs product__tabs">

      {getTabsControls(activeTab, onClick)}

      {getTabsContent(activeTab, vendorCode, category, type, level, description)}
    </div>
  );
};

export default ProductTabsContent;
