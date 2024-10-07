import React, { useEffect, useRef } from "react";
import tw, { styled, css } from "twin.macro";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div(() => [
  tw`relative w-full h-full overflow-hidden`,
  css`
    > div,
    iframe {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: opacity 1s;
    }
  `
]);

const VideoElement = styled.video(({ contain }) => [
  tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vh] sm-t:w-screen h-[100vw] sm-t:h-screen transition-opacity duration-1000 -rotate-90 sm-t:rotate-0 max-w-none`,
  css`
    object-fit: ${contain ? `contain` : `cover`};
  `
]);

const Video = ({
  autoPlay = true,
  className,
  id,
  isMuted = true,
  loop = true,
  sources = [],
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
  }, [sources]);

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
        {sources.map((src) => (
          <source
            key={uuidv4()}
            src={src?.url}
            type={src?.type && `video/${src?.type}`}
          />
        ))}
        Sorry, your browser doesn&#39;t support embedded videos.
      </VideoElement>
    </Container>
  );
};

export default Video;
