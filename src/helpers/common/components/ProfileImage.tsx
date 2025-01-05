import styled from '@emotion/styled';
import { SectionValidator } from './ValidSectionRenderer';

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 50%;
  border: 5px solid white;
  flex-shrink: 0; // Prevents shrinking
`;

const RoundedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileImage = ({
  src,
  size = '108px', // Single size prop instead of separate width/height
  imageWrapperClassname = '',
}: {
  src: string;
  size?: string;
  imageWrapperClassname?: string;
}) => {
  return (
    <div className={imageWrapperClassname}>
      <SectionValidator value={src}>
        <ImageWrapper
          style={{
            width: size,
            height: size,
          }}
        >
          <RoundedImage alt="Profile image" src={src} />
        </ImageWrapper>
      </SectionValidator>
    </div>
  );
};
