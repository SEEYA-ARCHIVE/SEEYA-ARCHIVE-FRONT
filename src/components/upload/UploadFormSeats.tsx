import React, { FC } from 'react';

import { UploadSeats } from '../common/seats/UploadSeats';
import uploadOlympicData from 'src/components/common/seats/data/uploadOlympic.json';

interface Props {}

export const UploadFormSeats: FC<Props> = () => {
  return (
    <div>
      <UploadSeats hallId={1} data={uploadOlympicData} />;
    </div>
  );
};
