import { atom, selector } from 'recoil';
import { CompareSeatAreaType, getCompareSeatAreaAPI } from 'src/api/compare';

export const compareSeatState = atom<{
  left: { floor: number; area: string; hallId: number } | null;
  right: { floor: number; area: string; hallId: number } | null;
}>({
  key: 'compateSeat',
  default: { left: null, right: null },
});

export const getCompareSeatAreaSelector = selector<{ left: CompareSeatAreaType[]; right: CompareSeatAreaType[] }>({
  key: 'getCompareSeatAreaSelector',
  get: async ({ get }) => {
    const { left: leftCompareArea, right: rightCompareArea } = get(compareSeatState);

    const leftCompareData = await getCompareSeatAreaAPI(leftCompareArea);
    const rightCompareData = await getCompareSeatAreaAPI(rightCompareArea);
    return { left: leftCompareData, right: rightCompareData };
  },
});
