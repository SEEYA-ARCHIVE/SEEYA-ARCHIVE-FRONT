export interface ReviewListType {
  count: number;
  next: string | null;
  previous: string | null;
  results: ReviewPreivew[];
}

export interface ReviewPreivew {
  id: number;
  createAt: string;
  previewImages: string;
  artist: string;
  author?: string;
  tagList?: string[];
  like?: number;
}

export interface ReviewUploader {
  id: number;
  email: string;
  kakaoId: string;
  nickname: string;
}
export interface ReviewDetailType {
  id: number;
  user: ReviewUploader;
  concertHallName: string;
  imageUrlArray: string[];
  createAt: string;
  updateAt: string;
  seatArea: string;
  artist: string;
  review: string;
  comments: any[];
  likeUsers: any[];
  images: string[];
  previousId?: number;
  nextId?: number;
}
