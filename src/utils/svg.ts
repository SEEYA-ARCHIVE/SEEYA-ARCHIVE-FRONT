export const getSvgData = (elem: any) => {
  if (!elem) return;
  const pathList = elem.querySelectorAll('path');
  let seatObj: any = {
    polygon: [],
    word: [],
  };

  const isPolygon = (element: any) => {
    return !!element.getAttribute('stroke');
  };

  (pathList as any).forEach((v: any, idx: number) => {
    const obj: any = {};
    obj.d = v.getAttribute('d');
    obj.floor = '';
    obj.area = '';
    if (isPolygon(v)) {
      obj.stroke = '#C4C4C4';
      obj.fill = '#EFEFEF';
      obj['stroke-width'] = '2';
      obj['stroke-dasharray'] = '4 4';

      seatObj.polygon.push(obj);
    } else {
      obj.fill = '#C4C4C4';
      seatObj.word.push(obj);
    }
  });
  console.log(JSON.stringify(seatObj));
};

const getFloorFromId = (id: string) => Number(id.split('-')[0][1]);
const getAreaFromId = (id: string) => id.split('-')[1] ?? null;
