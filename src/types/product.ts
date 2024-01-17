const CameraType = {
  Collectible: 'Коллекционная',
  Instant: 'Моментальная',
  Digital: 'Цифровая',
  Film: 'Плёночная',
} as const;

type CameraType = typeof CameraType[keyof typeof CameraType];

const CameraCategory = {
  VideoCamera: 'Видеокамера',
  PhotoCamera: 'Фотоаппарат',
} as const;

type CameraCategory = typeof CameraCategory[keyof typeof CameraCategory];

const CameraLevel = {
  Zero: 'Нулевой',
  Amateur: 'Любительский',
  Professional: 'Профессиональный',
} as const;

type CameraLevel = typeof CameraLevel[keyof typeof CameraLevel];


export type ProductType = {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraType;
  category: CameraCategory;
  description: string;
  level: CameraLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}
