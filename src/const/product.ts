export const Filter = {
  Category: {
    PhotoCamera: 'photocamera',
    VideoCamera: 'videocamera',
  },
  CameraType: {
    Digital: 'digital',
    Film: 'film',
    Snapshot: 'snapshot',
    Collection: 'collection',
  },
  Level: {
    Zero: 'zero',
    Amateur: 'non-professional',
    Professional: 'professional',
  },
} as const;

const Camera = {
  [Filter.CameraType.Collection]: 'Коллекционная',
  [Filter.CameraType.Snapshot]: 'Моментальная',
  [Filter.CameraType.Digital]: 'Цифровая',
  [Filter.CameraType.Film]: 'Плёночная',
} as const;

const CameraCategory = {
  [Filter.Category.VideoCamera]: 'Видеокамера',
  [Filter.Category.PhotoCamera]: 'Фотоаппарат',
} as const;

const CameraLevel = {
  [Filter.Level.Zero]: 'Нулевой',
  [Filter.Level.Amateur]: 'Любительский',
  [Filter.Level.Professional]: 'Профессиональный',
} as const;


const QuantityLimit = {
  MIN: 1,
  MAX: 99,
} as const;


export {
  Camera,
  CameraCategory,
  CameraLevel,
  QuantityLimit
};
