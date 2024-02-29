import { Camera, CameraCategory, CameraLevel } from '../const';

type CameraType = typeof Camera[keyof typeof Camera];

type CameraCategoryType = typeof CameraCategory[keyof typeof CameraCategory];

type CameraLevelType = typeof CameraLevel[keyof typeof CameraLevel];

export type ProductType = {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraType;
  category: CameraCategoryType;
  description: string;
  level: CameraLevelType;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}


