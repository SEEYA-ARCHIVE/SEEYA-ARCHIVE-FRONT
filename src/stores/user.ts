import { atom, selector } from 'recoil';
import { getUserInitialNicknameAPI } from 'src/api/user';
import { UserType } from 'src/types/api/user';

export const userSessionState = atom<UserType | undefined>({
  key: 'userSessionState',
  default: undefined,
});

export const getUserInitialNickname = selector({
  key: 'GET/userInitialNickname',
  get: async () => {
    try {
      const nickname = await getUserInitialNicknameAPI();
      return nickname;
    } catch (e) {
      return '';
    }
  },
});
