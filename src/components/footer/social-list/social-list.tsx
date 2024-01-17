import React from 'react';
import SocialItem, { SocialItemProps } from './social-item/social-item';

type SocialListProps = {
  socialItems: SocialItemProps[];
}

const SocialList: React.FC<SocialListProps> = ({ socialItems }) => (
  <ul className="social">
    {socialItems.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <SocialItem key={index} {...item} />
    ))}
  </ul>
);

export default SocialList;
