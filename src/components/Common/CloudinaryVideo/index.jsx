import React, { useState, useEffect, useRef } from "react";
import tw, { styled, css } from "twin.macro";

import { useApp } from "~hooks";
import { generateCloudinaryVideoURL } from "~utils/cloudinary";

const Container = styled.div(() => [
  tw`relative w-full h-full overflow-hidden`
]);

const VideoElement = styled.video(({ hide }) => [
  tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-[3vw] -mt-[5vw] sm-t:mt-0 sm-t:ml-0 scale-[1.2] sm-t:scale-[1.07] object-contain object-[65%_50%] sm-t:object-[50%_50] sm-t:object-cover w-[100dvh] sm-t:w-screen h-[100vw] sm-t:h-[100dvh] transition-opacity duration-1000 -rotate-90 sm-t:rotate-0 max-w-none pointer-events-none select-none`,
  hide && tw`opacity-0`
]);

const TIMEOUT_LENGTH = 6000;

const CloudinaryVideo = ({ source, safariSource, options = {} }) => {
  const videoRef = useRef(null);
  const { setShowText } = useApp();
  const [hideVideo, setHideVideo] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");
  const [safariVideoSrc, setSafariVideoSrc] = useState("");
  const timeout = useRef(null);

  useEffect(() => {
    if (!source?.public_id) return;

    try {
      // Generate Cloudinary video URL for main source
      const defaultOptions = {
        quality: "auto",
        format: source.format || "mp4",
        ...options
      };

      const src = generateCloudinaryVideoURL(source.public_id, defaultOptions);
      setVideoSrc(src);

      // Generate Safari fallback if available
      if (safariSource?.public_id) {
        const safariOptions = {
          quality: "auto",
          format: safariSource.format || "mp4",
          ...options
        };
        const safariSrc = generateCloudinaryVideoURL(
          safariSource.public_id,
          safariOptions
        );
        setSafariVideoSrc(safariSrc);
      }
    } catch (error) {
      console.error("Error generating Cloudinary video URL:", error);
      setShowText(true);
      setHideVideo(true);
    }
  }, [source, safariSource, options, setShowText]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !videoSrc) return;

    const handleLoadedData = () => {
      setHideVideo(false);
      // Don't call setShowText here - let the timeout handle it
      // clearTimeout is removed so the timeout always fires
    };

    const handleError = (error) => {
      console.error("Video failed to load:", error);
      setHideVideo(true);
      // Don't call setShowText here - let the timeout handle it
      // clearTimeout is removed so the timeout always fires
    };

    const handleCanPlay = () => {
      setHideVideo(false);
      // Don't call setShowText here - let the timeout handle it
      // clearTimeout is removed so the timeout always fires
    };

    // Set a timeout to show text after 6 seconds regardless of video state
    timeout.current = setTimeout(() => {
      setShowText(true);
    }, TIMEOUT_LENGTH);

    // Add event listeners
    videoElement.addEventListener("loadeddata", handleLoadedData);
    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("error", handleError);

    return () => {
      clearTimeout(timeout.current);
      if (videoElement) {
        videoElement.removeEventListener("loadeddata", handleLoadedData);
        videoElement.removeEventListener("canplay", handleCanPlay);
        videoElement.removeEventListener("error", handleError);
      }
    };
  }, [videoSrc, setShowText]);

  if (!source?.public_id) {
    return null;
  }

  return (
    <Container>
      {videoSrc && (
        <VideoElement
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          hide={hideVideo}
        >
          <source src={videoSrc} type={`video/${source.format || "mp4"}`} />
          {safariVideoSrc && (
            <source
              src={safariVideoSrc}
              type={`video/${safariSource?.format || "mp4"}`}
            />
          )}
          Your browser does not support the video tag.
        </VideoElement>
      )}
    </Container>
  );
};

export default CloudinaryVideo;
