import React, { useState, useEffect, useRef } from "react";
import tw, { styled, css } from "twin.macro";
import Player from "@vimeo/player";

import { useApp } from "~hooks";

const Container = styled.div(({ active }) => [
  tw`relative w-full h-full overflow-hidden opacity-0 transition-opacity delay-300`,
  active && tw`opacity-100`
]);

const VideoElement = styled.div(() => [
  tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.5] sm-t:scale-100 object-contain object-[65%_50%] sm-t:object-[50%_50] sm-t:object-cover w-[100dvh] sm-t:w-screen h-[100vw] sm-t:h-[100dvh] transition-opacity duration-1000 -rotate-90 sm-t:rotate-0 max-w-none pointer-events-none select-none`,
  css`
    & iframe {
      width: 100%;
      height: 100%;

      & #player {
        width: 100% !important;
        max-width: unset !important;
        height: 100% !important;
      }
    }
  `
]);

const TIMEOUT_LENGTH = 6000;

const VimeoVideo = ({ source }) => {
  const ref = useRef(null);
  const playerRef = useRef(null);

  const { setShowText } = useApp();
  const timeout = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const videoElement = ref.current;
    if (!videoElement) return;

    playerRef.current = new Player("vimeo-content", {
      url: source,
      controls: false,
      autoplay: true,
      muted: true,
      loop: true
      //   responsive: true
    });
  }, [source]);

  useEffect(() => {
    playerRef.current.on(`playing`, () => {
      console.log(`Playing`);
      setIsPlaying(true);
    });
  }, [playerRef]);

  useEffect(() => {
    const videoElement = ref.current;
    if (!videoElement) return;

    // Timeout to show text if video doesn't load
    timeout.current = setTimeout(() => {
      setShowText(true);
    }, TIMEOUT_LENGTH);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [setShowText]);

  return (
    <Container active={isPlaying}>
      <VideoElement ref={ref} id="vimeo-content" />
    </Container>
  );
};

export default VimeoVideo;
