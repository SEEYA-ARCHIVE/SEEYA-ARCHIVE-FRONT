import React, { FC } from 'react';

import Image from 'next/image';
import * as images from 'src/components/common/image/imagePath';
import styled from 'styled-components';

interface Props {
  name?: keyof typeof images;
  src?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  alt?: string;
}

export const Img: FC<Props> = ({ name, src, width, height, borderRadius, alt }) => {
  const imgSrc = name ? images[name] : src;

  return (
    <ImgWrapper width={width} height={height} borderRadius={borderRadius}>
      <ImageComponent src={imgSrc ?? ''} width={width} height={height} borderRadius={borderRadius} alt={alt} />
    </ImgWrapper>
  );
};

const ImgWrapper = styled.div<Pick<Props, 'width' | 'height' | 'borderRadius'>>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`;

const ImageComponent = styled(Image)<Pick<Props, 'borderRadius'>>`
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
`;
