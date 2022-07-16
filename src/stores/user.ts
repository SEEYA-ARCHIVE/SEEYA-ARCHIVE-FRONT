import { atom } from 'recoil';
import { UserType } from 'src/types/api/user';

export const userSessionState = atom<UserType | undefined>({
  key: 'userSessionState',
  default: undefined,
});
