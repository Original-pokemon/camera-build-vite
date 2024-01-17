import { CouponType } from './coupon';

export type OrderType = {
  camerasIds: number[];
} & CouponType
