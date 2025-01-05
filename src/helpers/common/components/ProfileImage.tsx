import styled from '@emotion/styled';
import { SectionValidator } from './ValidSectionRenderer';

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 50%;
  border: 5px solid white;
`;

const RoundedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ProfileImage = ({
  src,
  height = '108px',
  width = '108px',
  imageWrapperClassname = '',
}: {
  src: string;
  height?: string;
  width?: string;
  imageWrapperClassname?: string;
}) => {
  return (
    <div className={imageWrapperClassname}>
      <SectionValidator value={src}>
        <ImageWrapper
          style={{
            width,
            height,
            minWidth: width,
            minHeight: height,
            maxWidth: width,
            maxHeight: height,
          }}
        >
          <RoundedImage alt="Profile image" src={src} />
        </ImageWrapper>
      </SectionValidator>
    </div>
  );
};
