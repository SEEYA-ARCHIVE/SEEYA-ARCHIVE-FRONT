export interface IReviewListType {
  count: number;
  next: string | null;
  previous: string | null;
  results: IReviewPreivew[];
}

export interface IReviewPreivew {
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
