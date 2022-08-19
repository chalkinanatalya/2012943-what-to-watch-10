/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { Film } from '../../types/film';

type VideoPlayerProps = {
  film: Film,
  isPlaying: boolean,
  delay: boolean,
}

function Videoplayer({ film, isPlaying, delay = false }: VideoPlayerProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (delay) {
      let timer: NodeJS.Timeout;
      if (isPlaying) {
        timer = setTimeout(() => videoRef.current?.play(), 1000);
      } else {
        videoRef.current?.load();
      }
      return () => clearTimeout(timer);
    } else {
      if (isPlaying) {
        console.log('1');
        videoRef.current?.load();
        videoRef.current?.addEventListener('loadeddata', () => setIsLoading(false));
        if (!isLoading) {
          videoRef.current?.play();
        }
      }
    }
  }, [delay, isLoading, isPlaying]);

  if (isLoading && isPlaying) {
    return (
      <LoadingScreen />
    );
  } else {
    return (
      <video src={film.previewVideoLink} className="player__video" muted poster={film.previewImage} preload="none" ref={videoRef}></video>
    );
  }
}

export default Videoplayer;
