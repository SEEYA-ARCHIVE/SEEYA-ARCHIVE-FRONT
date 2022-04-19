import React, { FC } from 'react';
import { ImgViewer } from 'src/components/common/imgViewer/ImgViewer';

interface Props {}
const IMG1 = 'https://image.edaily.co.kr/images/photo/files/NP/S/2019/12/PS19121100264.jpg';
const IMG2 = 'https://t1.daumcdn.net/cfile/blog/265619455758EB7434';
const IMG3 = 'https://image.edaily.co.kr/images/photo/files/NP/S/2019/12/PS19121100264.jpg';
const IMG4 = 'https://t1.daumcdn.net/cfile/blog/265619455758EB7434';

const imgviewer: FC<Props> = () => {
  return (
    <div>
      <ImgViewer imgList={[IMG1, IMG2, IMG3, IMG4]} userId={'송하영'} />
    </div>
  );
};

export default imgviewer;
