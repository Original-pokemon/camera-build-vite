import faker from 'faker';
import { CameraCategory, CameraLevel, Camera } from '../const';
import type { ProductType, PromoType, ReviewType, NewReviewType, BasketItemType } from '../types';
import { Action } from '@reduxjs/toolkit';

const generateProductMock = (): ProductType => ({
  id: faker.datatype.number(),
  name: faker.commerce.productName(),
  vendorCode: faker.datatype.uuid(),
  type: faker.random.arrayElement(Object.values(Camera)),
  category: faker.random.arrayElement(Object.values(CameraCategory)),
  description: faker.lorem.paragraph(),
  level: faker.random.arrayElement(Object.values(CameraLevel)),
  price: faker.datatype.number({ min: 100, max: 10000 }),
  rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
  reviewCount: faker.datatype.number(100),
  previewImg: faker.image.imageUrl(),
  previewImg2x: faker.image.imageUrl(),
  previewImgWebp: faker.image.imageUrl(),
  previewImgWebp2x: faker.image.imageUrl(),
});

const generateProductsMock = (): ProductType[] => Array.from({ length: 10 }, generateProductMock);

const generateBasketItemMock = (quantity: number): BasketItemType => {
  const product = generateProductMock();

  return {
    ...product,
    quantity: quantity,
  };
};

const generatePromoMock = (): PromoType => ({
  id: faker.datatype.number(),
  name: faker.lorem.words(3),
  previewImg: faker.image.imageUrl(),
  previewImg2x: faker.image.imageUrl(),
  previewImgWebp: faker.image.imageUrl(),
  previewImgWebp2x: faker.image.imageUrl()
});

const generatePromosMock = (): PromoType[] => Array.from({ length: 10 }, generatePromoMock);

const generateReviewMock = (): ReviewType => ({
  id: faker.datatype.uuid(),
  createAt: faker.date.recent().toISOString(),
  cameraId: faker.datatype.number(),
  userName: faker.internet.userName(),
  advantage: faker.lorem.words(),
  disadvantage: faker.lorem.words(),
  review: faker.lorem.paragraph(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

const generateReviewsMock = (): ReviewType[] => Array.from({ length: 10 }, generateReviewMock);

const generateNewReviewMock = (): NewReviewType => ({
  cameraId: faker.datatype.number(),
  userName: faker.internet.userName(),
  advantage: faker.lorem.words(),
  disadvantage: faker.lorem.words(),
  review: faker.lorem.paragraph(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);


export {
  generateBasketItemMock,
  generateProductMock,
  generatePromoMock,
  generateReviewMock,
  generateNewReviewMock,
  generateProductsMock,
  extractActionsTypes,
  generatePromosMock,
  generateReviewsMock
};
