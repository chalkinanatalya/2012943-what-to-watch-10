import { useEffect, useRef } from 'react';
import { Film } from '../../types/film';
import './videoplayer.css';

type VideoPlayerProps = {
  film: Film,
  isPlaying: boolean,
}

function Videoplayer({ film, isPlaying }: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => videoRef.current?.play(), 1000);
    } else {
      videoRef.current?.load();
    }
    return () => clearTimeout(timer);
  }, [isPlaying]);


  return (
    <video src={film.previewVideoLink} className="player__video" muted poster={film.previewImage} preload="none" ref={videoRef}></video>
  );

}

export default Videoplayer;
