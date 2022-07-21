import axios from 'axios';
import { UserType } from 'src/types/api/user';

export const getUserAPI = async (): Promise<UserType | undefined> => {
  try {
    const { data } = await axios.get('/me');
    return data;
  } catch (e) {
    return undefined;
  }
};

export const getUserInitialNicknameAPI = async (): Promise<string> => {
  const { data } = await axios.get('/set/nickname');

  return data.nickname;
};

export const checkDuplicateNicknameAPI = async (nickname: string): Promise<boolean> => {
  const { data } = await axios.get(`/check/nickname/duplicate?nickname=${nickname}`);

  return data;
};

export const setUserNikcnameAPI = async (nickname: string) => {
  await axios.patch('/set/nickname', { nickname });
};
