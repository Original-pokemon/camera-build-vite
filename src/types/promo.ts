import { ProductType } from './product';

export type PromoType = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

export type ExtendPromosType = PromoType & Pick<ProductType, 'description'>
