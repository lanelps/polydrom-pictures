import React, { useState, useEffect, useRef } from "react";
import tw, { styled, css } from "twin.macro";
import Player from "@vimeo/player";

import { useApp } from "~hooks";
import { Image } from "~components";

import logo from "../../../../static/polydrom-white.png";

const Container = styled.div(() => [
  tw`relative w-full h-full overflow-hidden`
]);

const PlaceHolder = styled.img(({ show }) => [
  tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-[2.5vw] sm-t:ml-0 sm-t:-mt-[2.5vw] object-contain w-[140%] sm-t:w-[60%] h-[100vw] sm-t:h-[100dvh] transition-opacity duration-1000 -rotate-90 sm-t:rotate-0 max-w-none pointer-events-none select-none opacity-0`,
  show && tw`opacity-100`
]);

const VideoElement = styled.div(({ hide }) => [
  tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-[3vw] -mt-[5vw] sm-t:mt-0 sm-t:ml-0 scale-[1.2] sm-t:scale-[1.07] object-contain object-[65%_50%] sm-t:object-[50%_50] sm-t:object-cover w-[100dvh] sm-t:w-screen h-[100vw] sm-t:h-[100dvh] transition-opacity duration-1000 -rotate-90 sm-t:rotate-0 max-w-none pointer-events-none select-none`,
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
  `,
  hide && tw`opacity-0`
]);

const TIMEOUT_LENGTH = 6000;

const VimeoVideo = ({ source }) => {
  const ref = useRef(null);
  const playerRef = useRef(null);

  const { setShowText } = useApp();
  const [hideVideo, setHideVideo] = useState(false);
  const timeout = useRef(null);

  useEffect(() => {
    const videoElement = ref.current;
    if (!videoElement) return;

    playerRef.current = new Player("vimeo-content", {
      url: source,
      controls: false,
      autoplay: true,
      muted: true,
      loop: true
    });

    // Listen for the 'loaded' event
    playerRef.current.on("loaded", () => {
      setHideVideo(false);
      // clearTimeout(timeout.current); // Clear the timeout if video loads
    });

    // Listen for the 'error' event
    playerRef.current.on("error", (error) => {
      console.error("An error occurred:", error.name);
      setShowText(true);
      setHideVideo(true);
    });

    // Set a timeout to handle cases where the video doesn't load
    timeout.current = setTimeout(() => {
      setShowText(true);
    }, TIMEOUT_LENGTH);

    return () => {
      clearTimeout(timeout.current);
      playerRef.current.off("loaded");
      playerRef.current.off("error");
    };
  }, [source, setShowText]);

  return (
    <Container>
      <PlaceHolder src={logo} show={hideVideo} />
      <VideoElement ref={ref} id="vimeo-content" hide={hideVideo} />
    </Container>
  );
};

export default VimeoVideo;
