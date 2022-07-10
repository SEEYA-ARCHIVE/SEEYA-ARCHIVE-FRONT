import axios from 'axios';
import { UserType } from 'src/types/api/user';

export const getUserAPI = async (): Promise<UserType | undefined> => {
  try {
    const { data } = await axios.get('/me/', {
      withCredentials: true,
    });
    return data;
  } catch (e) {
    return undefined;
  }
};
