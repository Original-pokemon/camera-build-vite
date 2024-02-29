export const SortDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const Sort = {
  Price: 'price',
  Popularity: 'popularity',
} as const;


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
