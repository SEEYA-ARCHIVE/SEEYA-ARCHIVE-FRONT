import axios from 'axios';

export const uploadImage = async (data: FormData): Promise<any> => {
  try {
    const response = await axios.post('/s3/upload/review_images', data);
    console.log('response', response);
  } catch (error) {
    console.error(error);
  }
};
