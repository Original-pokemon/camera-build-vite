const Camera = {
  Collectible: 'Коллекционная',
  Instant: 'Моментальная',
  Digital: 'Цифровая',
  Film: 'Плёночная',
} as const;

const CameraCategory = {
  VideoCamera: 'Видеокамера',
  PhotoCamera: 'Фотоаппарат',
} as const;

const CameraLevel = {
  Zero: 'Нулевой',
  Amateur: 'Любительский',
  Professional: 'Профессиональный',
} as const;

export {
  Camera,
  CameraCategory,
  CameraLevel,
};
