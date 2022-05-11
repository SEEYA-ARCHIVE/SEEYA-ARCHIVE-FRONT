export interface ReviewListType {
  count: number;
  next: string | null;
  previous: string | null;
  results: ReviewPreivew[];
}

export interface ReviewPreivew {
  id: number;
  createAt: string;
  images: {
    previewImages: string;
    numImages: number;
  };
  author?: string;
  tagList?: string[];
  like?: number;
}

export interface ReviewDetailType {
  id: number;
  concertHallName: string;
  createAt: string;
  updateAt: string;
  seatArea: string;
  images: string[];
  artist: string | null;
  nextId: number | null;
  previousId: number | null;
}
