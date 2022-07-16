import { selector } from 'recoil';

import { getHallListAPI, HallListType } from 'src/api/hall';

export const getHallListSelector = selector<HallListType>({
  key: 'getCompareSeatAreaSelector',
  get: async () => {
    const data = await getHallListAPI();
    return data;
  },
});
