import React, { useEffect, useRef } from "react";
import tw, { styled, css } from "twin.macro";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  > div,
  iframe {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: opacity 1s;
  }
`;

const VideoElement = styled.video(({ contain }) => [
  css`
    object-fit: ${contain ? `contain` : `cover`};
    width: 100%;
    height: 100%;
    transition: opacity 1s;
  `
]);

const Video = ({
  autoPlay = true,
  className,
  id,
  isMuted = true,
  loop = true,
  src,
  type = `mp4`,
  contain = false
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isMuted) {
      // open bug since 2017 that you cannot set muted in video element https://github.com/facebook/react/issues/10389
      ref.current.defaultMuted = true;
      ref.current.muted = true;
    }
  }, [src]);

  return (
    <Container className={className}>
      <VideoElement
        ref={ref}
        id={id}
        autoPlay={autoPlay}
        playsInline
        loop={loop}
        contain={contain}
      >
        <source src={src} type={`video/${type}`} />
        Sorry, your browser doesn&#39;t support embedded videos.
      </VideoElement>
    </Container>
  );
};

export default Video;
