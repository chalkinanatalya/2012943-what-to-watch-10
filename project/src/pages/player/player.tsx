import { useEffect, useRef, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import NotFound from '../../components/not-found/not-found';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { getFilms } from '../../store/film-store/selector';
import { Film } from '../../types/film';
import './player.css';

const getPlayMarkup = (isPlaying: boolean): JSX.Element => (
  <svg viewBox="0 0 19 19" width="19" height="19">
    <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
  </svg>
);

function Player(): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const films = useAppSelector(getFilms);
  const { id, filmType } = useParams();
  const dispatch = useAppDispatch();

  const selectedFilm: Film | undefined = films.find((film) => String(film.id) === id);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const togglerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<HTMLDivElement | null>(null);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const hoursString = (hours >= 10) ? hours : `0${hours}`;
    const minutesString = (minutes >= 10) ? minutes - (hours * 60) : `0${minutes}`;
    const secondsString = (seconds >= 10) ? seconds - (minutes * 60) : `0${seconds}`;

    return (hours ? `-${hoursString}:${minutesString}:${secondsString}` : `-${minutesString}:${secondsString}`);
  };

  const changeVisibility = (display: string): void => {
    if (spinnerRef.current) {
      spinnerRef.current.style.display = display;
    }
  };

  const handleBackToFilm = (): void => {
    if (filmType === 'film') {
      dispatch(redirectToRoute(generatePath(AppRoute.Film, { id: id })));
    } else if (filmType === 'promo') {
      dispatch(redirectToRoute(AppRoute.Main));
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      changeVisibility('none');
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
      videoRef.current?.addEventListener('waiting', () => changeVisibility('block'));
      videoRef.current?.addEventListener('loadeddata', () => changeVisibility('none'));
      videoRef.current?.addEventListener('playing', () => changeVisibility('none'));

      progressRef.current?.addEventListener('click', (evt) => {
        if (progressRef.current && videoRef.current && togglerRef.current && timerRef.current) {
          const positionCoordinate = evt.offsetX - progressRef.current.offsetLeft;
          const positionPercentage = Math.round(positionCoordinate * progressRef.current.max / progressRef.current.offsetWidth);
          videoRef.current.currentTime = videoRef.current.duration * positionPercentage / 100;
          togglerRef.current.style.left = `${positionPercentage}%`;
        }
      });

      setInterval(() => {
        if (progressRef.current && videoRef.current && togglerRef.current && timerRef.current) {
          const calculate = videoRef.current.duration ? Math.round((videoRef.current.currentTime / videoRef.current.duration) * 100) : 0;
          progressRef.current.value = calculate;
          togglerRef.current.style.left = `${calculate}%`;
          timerRef.current.innerHTML = formatTime(Math.round(videoRef.current.duration - videoRef.current.currentTime));
        }
      });
    }
  }, [isPlaying]);

  if (!selectedFilm) {
    return <NotFound />;
  } else {
    return (
      <div className="player">
        <video src={selectedFilm.previewVideoLink} className="player__video" muted poster={selectedFilm.previewImage} preload="none" ref={videoRef}></video>
        <div className="loader" ref={spinnerRef}>
          <div className="inner one"></div>
          <div className="inner two"></div>
          <div className="inner three"></div>
        </div>
        <button type="button" className="player__exit" onClick={handleBackToFilm}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="0" max="100" ref={progressRef}></progress>
              <div className="player__toggler" style={{ left: '0' }} ref={togglerRef} >Toggler</div>
            </div>
            <div className="player__time-value" ref={timerRef}>{formatTime(selectedFilm.runTime * 60)}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={() => setIsPlaying(!isPlaying)}>
              {getPlayMarkup(isPlaying)}
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen" onClick={() => videoRef.current?.requestFullscreen()}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
