import React, { useEffect, useRef } from "react";
import tw, { styled, css } from "twin.macro";

import { useApp } from "~hooks";

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
  tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.5] sm-t:scale-100 object-contain object-[65%_50%] sm-t:object-[50%_50] sm-t:object-cover w-[100dvh] sm-t:w-screen h-[100vw] sm-t:h-[100dvh] transition-opacity duration-1000 -rotate-90 sm-t:rotate-0 max-w-none`
]);

const TIMEOUT_LENGTH = 5000;

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

  const { setShowText } = useApp();
  const timeout = useRef(null);

  const handleLoadedData = () => {
    const videoElement = ref.current;
    if (!videoElement) return;

    videoElement.play().catch((error) => {
      console.error("Error attempting to play:", error);
    });
  };

  // Function to handle multiple events
  const handleVideoReady = (e) => {
    handleLoadedData();
  };

  useEffect(() => {
    const videoElement = ref.current;
    if (!videoElement) return;

    // Timeout to show text if video doesn't load
    timeout.current = setTimeout(() => {
      setShowText(true);
    }, TIMEOUT_LENGTH);

    if (isMuted) {
      // Workaround for muting in React
      videoElement.defaultMuted = true;
      videoElement.muted = true;
    }

    // Event listeners
    const events = [
      "loadeddata",
      "canplay",
      "canplaythrough",
      "loadedmetadata",
      "play"
    ];
    events.forEach((event) => {
      videoElement.addEventListener(event, handleVideoReady);
    });

    // Check if the video is already ready
    if (videoElement.readyState >= 3) {
      // HAVE_FUTURE_DATA
      handleLoadedData();
    }

    // Cleanup event listeners on unmount or when sources change
    return () => {
      events.forEach((event) => {
        videoElement.removeEventListener(event, handleVideoReady);
      });

      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    };
  }, [sources, isMuted]); // Re-run effect if sources or isMuted change

  return (
    <Container className={className}>
      <VideoElement
        ref={ref}
        id={id}
        autoPlay={autoPlay}
        playsInline
        loop={loop}
        contain={contain}
        muted={isMuted}
      >
        {sources.map((src) => (
          <source
            key={src.id || src.url}
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
