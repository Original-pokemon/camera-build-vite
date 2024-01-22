import { ProductType } from '.';

export type BasketType = { [id: number]: ProductType & { quantity: number } }

