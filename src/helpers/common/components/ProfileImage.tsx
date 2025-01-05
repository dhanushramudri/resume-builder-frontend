import styled from '@emotion/styled';
import { SectionValidator } from './ValidSectionRenderer';

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 50%;
  border: 5px solid white;
  flex-shrink: 0;
`;

const RoundedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileImage = ({
  src,
  height,
  width,
  size = '108px',
  imageWrapperClassname = '',
}: {
  src: string;
  height?: string;
  width?: string;
  size?: string;
  imageWrapperClassname?: string;
}) => {
  // Use height or width if provided, otherwise fall back to size
  const finalSize = height || width || size;

  return (
    <div className={imageWrapperClassname}>
      <SectionValidator value={src}>
        <ImageWrapper
          style={{
            width: finalSize,
            height: finalSize,
          }}
        >
          <RoundedImage alt="Profile image" src={src} />
        </ImageWrapper>
      </SectionValidator>
    </div>
  );
};
